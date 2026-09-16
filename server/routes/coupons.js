const express = require('express');
const { db } = require('../db');
const { requireAuth, requirePermission, logActivity } = require('../middleware/auth');

const router = express.Router();

function serialize(c) {
  const redeemed = db.prepare('SELECT COUNT(*) n FROM coupon_redemptions WHERE coupon_id = ?').get(c.id).n;
  return {
    id: c.id, code: c.code, type: c.type, amount: c.amount, minOrder: c.min_order,
    maxDiscount: c.max_discount, usageLimit: c.usage_limit, perCustomerLimit: c.per_customer_limit,
    usedCount: c.used_count, redeemedCount: redeemed, startsAt: c.starts_at, expiresAt: c.expires_at,
    applicableProducts: JSON.parse(c.applicable_products || '[]'),
    applicableCategories: JSON.parse(c.applicable_categories || '[]'),
    applicableBrands: JSON.parse(c.applicable_brands || '[]'),
    isActive: !!c.is_active, isFeatured: !!c.is_featured,
    createdAt: c.created_at, updatedAt: c.updated_at
  };
}

router.get('/', requireAuth, (req, res) => {
  res.json(db.prepare('SELECT * FROM coupons ORDER BY created_at DESC').all().map(serialize));
});

router.post('/', requireAuth, requirePermission('discounts'), (req, res) => {
  const b = req.body || {};
  if (!b.code || !b.code.trim()) return res.status(400).json({ error: 'Coupon code is required.' });
  const code = b.code.trim().toUpperCase();
  if (db.prepare('SELECT id FROM coupons WHERE code = ?').get(code)) {
    return res.status(400).json({ error: 'A coupon with this code already exists.' });
  }
  if (!['percent', 'fixed', 'free_shipping', 'bogo', 'first_order'].includes(b.type)) {
    return res.status(400).json({ error: 'Invalid coupon type.' });
  }

  const makeFeatured = db.transaction(() => {
    if (b.isFeatured) db.prepare('UPDATE coupons SET is_featured = 0').run();
    const result = db.prepare(`
      INSERT INTO coupons (code, type, amount, min_order, max_discount, usage_limit, per_customer_limit,
        starts_at, expires_at, applicable_products, applicable_categories, applicable_brands, is_active, is_featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(code, b.type, b.amount || 0, b.minOrder || 0, b.maxDiscount || null, b.usageLimit || null,
           b.perCustomerLimit || null, b.startsAt || null, b.expiresAt || null,
           JSON.stringify(b.applicableProducts || []), JSON.stringify(b.applicableCategories || []),
           JSON.stringify(b.applicableBrands || []), b.isActive !== false ? 1 : 0, b.isFeatured ? 1 : 0);
    return result.lastInsertRowid;
  });

  const id = makeFeatured();
  logActivity(req, { action: 'coupon.create', entityType: 'coupon', entityId: id, description: `Created coupon "${code}".` });
  res.status(201).json(serialize(db.prepare('SELECT * FROM coupons WHERE id = ?').get(id)));
});

router.put('/:id', requireAuth, requirePermission('discounts'), (req, res) => {
  const existing = db.prepare('SELECT * FROM coupons WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Coupon not found.' });
  const b = req.body || {};

  const update = db.transaction(() => {
    if (b.isFeatured) db.prepare('UPDATE coupons SET is_featured = 0 WHERE id != ?').run(existing.id);
    db.prepare(`
      UPDATE coupons SET
        type=@type, amount=@amount, min_order=@min_order, max_discount=@max_discount,
        usage_limit=@usage_limit, per_customer_limit=@per_customer_limit, starts_at=@starts_at,
        expires_at=@expires_at, applicable_products=@applicable_products, applicable_categories=@applicable_categories,
        applicable_brands=@applicable_brands, is_active=@is_active, is_featured=@is_featured, updated_at=datetime('now')
      WHERE id=@id
    `).run({
      id: existing.id,
      type: b.type != null ? b.type : existing.type,
      amount: b.amount != null ? b.amount : existing.amount,
      min_order: b.minOrder != null ? b.minOrder : existing.min_order,
      max_discount: b.maxDiscount != null ? b.maxDiscount : existing.max_discount,
      usage_limit: b.usageLimit != null ? b.usageLimit : existing.usage_limit,
      per_customer_limit: b.perCustomerLimit != null ? b.perCustomerLimit : existing.per_customer_limit,
      starts_at: b.startsAt != null ? b.startsAt : existing.starts_at,
      expires_at: b.expiresAt != null ? b.expiresAt : existing.expires_at,
      applicable_products: b.applicableProducts != null ? JSON.stringify(b.applicableProducts) : existing.applicable_products,
      applicable_categories: b.applicableCategories != null ? JSON.stringify(b.applicableCategories) : existing.applicable_categories,
      applicable_brands: b.applicableBrands != null ? JSON.stringify(b.applicableBrands) : existing.applicable_brands,
      is_active: b.isActive != null ? (b.isActive ? 1 : 0) : existing.is_active,
      is_featured: b.isFeatured != null ? (b.isFeatured ? 1 : 0) : existing.is_featured
    });
  });
  update();
  logActivity(req, { action: 'coupon.update', entityType: 'coupon', entityId: existing.id, description: `Updated coupon "${existing.code}".` });
  res.json(serialize(db.prepare('SELECT * FROM coupons WHERE id = ?').get(existing.id)));
});

router.delete('/:id', requireAuth, requirePermission('discounts'), (req, res) => {
  const existing = db.prepare('SELECT * FROM coupons WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Coupon not found.' });
  db.prepare('DELETE FROM coupons WHERE id = ?').run(existing.id);
  logActivity(req, { action: 'coupon.delete', entityType: 'coupon', entityId: existing.id, description: `Deleted coupon "${existing.code}".` });
  res.json({ deleted: true });
});

/* ---------- public: validate + compute discount for the checkout ---------- */
router.validatePublic = (req, res) => {
  const { code, subtotal, productIds = [], categoryIds = [], brandIds = [] } = req.body || {};
  if (!code) return res.status(400).json({ error: 'Enter a code.' });

  const coupon = db.prepare('SELECT * FROM coupons WHERE code = ?').get(String(code).trim().toUpperCase());
  if (!coupon || !coupon.is_active) return res.status(404).json({ error: 'That code is not valid.' });

  const now = new Date();
  if (coupon.starts_at && new Date(coupon.starts_at) > now) return res.status(400).json({ error: 'This code is not active yet.' });
  if (coupon.expires_at && new Date(coupon.expires_at) < now) return res.status(400).json({ error: 'This code has expired.' });
  if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) return res.status(400).json({ error: 'This code has reached its usage limit.' });
  if (subtotal < coupon.min_order) return res.status(400).json({ error: `Minimum order of ${coupon.min_order} EGP required.` });

  const applicableProducts = JSON.parse(coupon.applicable_products || '[]');
  const applicableCategories = JSON.parse(coupon.applicable_categories || '[]');
  const applicableBrands = JSON.parse(coupon.applicable_brands || '[]');

  const scoped = applicableProducts.length || applicableCategories.length || applicableBrands.length;
  if (scoped) {
    const matches = productIds.some(id => applicableProducts.includes(id))
      || categoryIds.some(id => applicableCategories.includes(id))
      || brandIds.some(id => applicableBrands.includes(id));
    if (!matches) return res.status(400).json({ error: 'This code does not apply to the items in your cart.' });
  }

  let discount = 0;
  let freeShipping = false;
  if (coupon.type === 'percent') {
    discount = subtotal * (coupon.amount / 100);
    if (coupon.max_discount) discount = Math.min(discount, coupon.max_discount);
  } else if (coupon.type === 'fixed') {
    discount = Math.min(coupon.amount, subtotal);
  } else if (coupon.type === 'free_shipping') {
    freeShipping = true;
  }

  res.json({
    code: coupon.code, type: coupon.type, discount: Math.round(discount), freeShipping,
    label: coupon.type === 'percent' ? `${coupon.amount}% off` : coupon.type === 'fixed' ? `${coupon.amount} EGP off` : 'Free shipping'
  });
};

/* ---------- public: the one coupon currently promoted site-wide ---------- */
router.featuredPublic = (req, res) => {
  const coupon = db.prepare(`
    SELECT * FROM coupons WHERE is_featured = 1 AND is_active = 1
    AND (starts_at IS NULL OR starts_at <= datetime('now'))
    AND (expires_at IS NULL OR expires_at >= datetime('now'))
    LIMIT 1
  `).get();
  if (!coupon) return res.json(null);
  res.json({
    code: coupon.code, type: coupon.type, amount: coupon.amount,
    label: coupon.type === 'percent' ? `${coupon.amount}% OFF` : coupon.type === 'fixed' ? `${coupon.amount} EGP OFF` : 'FREE SHIPPING'
  });
};

module.exports = router;
