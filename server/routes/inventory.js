const express = require('express');
const { db } = require('../db');
const { requireAuth, requirePermission, logActivity } = require('../middleware/auth');
const { notify } = require('../lib/notify');

const router = express.Router();

router.get('/', requireAuth, (req, res) => {
  const { q, lowOnly, outOnly, page = 1, pageSize = 30 } = req.query;
  const where = [];
  const params = {};
  if (q) { where.push('(p.name LIKE @q OR v.sku LIKE @q OR p.sku LIKE @q)'); params.q = '%' + q + '%'; }
  if (lowOnly === 'true') where.push('(v.stock - v.reserved) <= p.low_stock_threshold AND (v.stock - v.reserved) > 0');
  if (outOnly === 'true') where.push('(v.stock - v.reserved) <= 0');
  const whereSql = where.length ? 'WHERE ' + where.join(' AND ') : '';

  const total = db.prepare(`
    SELECT COUNT(*) c FROM product_variants v JOIN products p ON p.id = v.product_id ${whereSql}
  `).get(params).c;

  const limit = Math.min(200, Math.max(1, Number(pageSize) || 30));
  const offset = (Math.max(1, Number(page) || 1) - 1) * limit;

  const rows = db.prepare(`
    SELECT v.id as variant_id, v.size, v.sku as variant_sku, v.price, v.stock, v.reserved,
           p.id as product_id, p.name, p.sku as product_sku, p.low_stock_threshold,
           (SELECT url FROM product_images WHERE product_id = p.id ORDER BY is_main DESC, sort_order LIMIT 1) as image
    FROM product_variants v JOIN products p ON p.id = v.product_id
    ${whereSql}
    ORDER BY p.name, v.sort_order
    LIMIT @limit OFFSET @offset
  `).all({ ...params, limit, offset });

  res.json({
    total, page: Number(page), pageSize: limit,
    items: rows.map(r => ({
      variantId: r.variant_id, productId: r.product_id, productName: r.name, size: r.size,
      sku: r.variant_sku || r.product_sku, price: r.price, stock: r.stock, reserved: r.reserved,
      available: r.stock - r.reserved, lowStockThreshold: r.low_stock_threshold,
      isLow: (r.stock - r.reserved) <= r.low_stock_threshold && (r.stock - r.reserved) > 0,
      isOut: (r.stock - r.reserved) <= 0, image: r.image
    }))
  });
});

router.post('/adjust', requireAuth, requirePermission('inventory'), (req, res) => {
  const { variantId, changeQty, reason, note } = req.body || {};
  if (!variantId || !Number.isInteger(changeQty) || changeQty === 0) {
    return res.status(400).json({ error: 'variantId and a non-zero changeQty are required.' });
  }
  const variant = db.prepare('SELECT * FROM product_variants WHERE id = ?').get(variantId);
  if (!variant) return res.status(404).json({ error: 'Variant not found.' });

  const newStock = Math.max(0, variant.stock + changeQty);
  db.prepare('UPDATE product_variants SET stock = ?, updated_at = datetime(\'now\') WHERE id = ?').run(newStock, variantId);
  db.prepare(`
    INSERT INTO inventory_log (variant_id, change_qty, reason, note, user_id) VALUES (?, ?, ?, ?, ?)
  `).run(variantId, newStock - variant.stock, reason || 'adjustment', note || null, req.user.id);

  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(variant.product_id);
  logActivity(req, { action: 'inventory.adjust', entityType: 'product', entityId: product.id, description: `Adjusted stock for "${product.name} (${variant.size})" by ${changeQty > 0 ? '+' : ''}${changeQty}.` });

  if (newStock <= 0) notify('out_of_stock', 'Out of stock', `${product.name} (${variant.size}) is out of stock.`, '/products/' + product.id);
  else if (newStock <= product.low_stock_threshold) notify('low_stock', 'Low stock', `${product.name} (${variant.size}) is running low (${newStock} left).`, '/products/' + product.id);

  res.json({ variantId, stock: newStock });
});

router.post('/bulk-adjust', requireAuth, requirePermission('inventory'), (req, res) => {
  const { variantIds, changeQty, reason } = req.body || {};
  if (!Array.isArray(variantIds) || !variantIds.length || !Number.isInteger(changeQty)) {
    return res.status(400).json({ error: 'variantIds[] and changeQty are required.' });
  }
  const stmt = db.prepare('UPDATE product_variants SET stock = MAX(0, stock + ?), updated_at = datetime(\'now\') WHERE id = ?');
  const logStmt = db.prepare('INSERT INTO inventory_log (variant_id, change_qty, reason, user_id) VALUES (?, ?, ?, ?)');
  variantIds.forEach(id => { stmt.run(changeQty, id); logStmt.run(id, changeQty, reason || 'bulk_adjustment', req.user.id); });
  logActivity(req, { action: 'inventory.bulk_adjust', description: `Bulk stock adjustment (${changeQty > 0 ? '+' : ''}${changeQty}) on ${variantIds.length} variant(s).` });
  res.json({ ok: true, affected: variantIds.length });
});

router.get('/history/:variantId', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM inventory_log WHERE variant_id = ? ORDER BY created_at DESC LIMIT 100').all(req.params.variantId);
  res.json(rows);
});

module.exports = router;
