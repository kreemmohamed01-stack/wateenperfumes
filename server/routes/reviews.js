const express = require('express');
const { db } = require('../db');
const { requireAuth, requirePermission, logActivity } = require('../middleware/auth');
const { notify } = require('../lib/notify');

const router = express.Router();

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { status, productId, page = 1, pageSize = 20 } = req.query;
    const where = [];
    const params = {};
    if (status) { where.push('r.status = @status'); params.status = status; }
    if (productId) { where.push('r.product_id = @productId'); params.productId = productId; }
    const whereSql = where.length ? 'WHERE ' + where.join(' AND ') : '';

    const total = Number((await db.prepare(`SELECT COUNT(*) c FROM reviews r ${whereSql}`).get(params)).c);
    const limit = Math.min(100, Math.max(1, Number(pageSize) || 20));
    const offset = (Math.max(1, Number(page) || 1) - 1) * limit;

    const rows = await db.prepare(`
      SELECT r.*, p.name as product_name FROM reviews r
      JOIN products p ON p.id = r.product_id
      ${whereSql} ORDER BY r.created_at DESC LIMIT @limit OFFSET @offset
    `).all({ ...params, limit, offset });

    const statsRow = await db.prepare(`
      SELECT COUNT(*) total, COALESCE(AVG(rating),0) "avgRating",
        SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) pending
      FROM reviews
    `).get();
    const stats = { total: Number(statsRow.total), avgRating: Number(statsRow.avgRating), pending: Number(statsRow.pending) };

    res.json({
      total, page: Number(page), pageSize: limit, stats,
      items: rows.map(r => ({
        id: r.id, productId: r.product_id, productName: r.product_name,
        customerName: r.customer_name, customerEmail: r.customer_email,
        rating: r.rating, title: r.title, body: r.body, status: r.status, createdAt: r.created_at
      }))
    });
  } catch (e) { next(e); }
});

router.put('/:id/status', requireAuth, requirePermission('reviews'), async (req, res, next) => {
  try {
    const existing = await db.prepare('SELECT * FROM reviews WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Review not found.' });
    const { status } = req.body || {};
    if (!['pending', 'approved', 'rejected', 'hidden'].includes(status)) return res.status(400).json({ error: 'Invalid status.' });
    await db.prepare('UPDATE reviews SET status = ? WHERE id = ?').run(status, existing.id);
    logActivity(req, { action: 'review.status_change', entityType: 'review', entityId: existing.id, description: `Review #${existing.id} marked "${status}".` });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.delete('/:id', requireAuth, requirePermission('reviews'), async (req, res, next) => {
  try {
    const existing = await db.prepare('SELECT * FROM reviews WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Review not found.' });
    await db.prepare('DELETE FROM reviews WHERE id = ?').run(existing.id);
    logActivity(req, { action: 'review.delete', entityType: 'review', entityId: existing.id, description: `Deleted review #${existing.id}.` });
    res.json({ deleted: true });
  } catch (e) { next(e); }
});

/* ---------- public: submit a review ---------- */
router.submitPublic = async (req, res, next) => {
  try {
    const b = req.body || {};
    if (!b.productId || !b.customerName || !b.rating) return res.status(400).json({ error: 'Missing required fields.' });
    const rating = Number(b.rating);
    if (rating < 1 || rating > 5) return res.status(400).json({ error: 'Rating must be between 1 and 5.' });

    const result = await db.prepare(`
      INSERT INTO reviews (product_id, customer_name, customer_email, rating, title, body, status)
      VALUES (?, ?, ?, ?, ?, ?, 'pending')
    `).run(b.productId, b.customerName.trim(), b.customerEmail || null, rating, b.title || null, b.body || null);

    notify('new_review', 'New review submitted', `${b.customerName} left a ${rating}-star review.`, '/reviews');
    res.status(201).json({ id: result.lastInsertRowid });
  } catch (e) { next(e); }
};

module.exports = router;
