const express = require('express');
const { db } = require('../db');
const { requireAuth, requirePermission, logActivity } = require('../middleware/auth');

const router = express.Router();

function withStats(c) {
  const stats = db.prepare(`
    SELECT COUNT(*) orders, COALESCE(SUM(total),0) totalSpent, MAX(created_at) lastOrder
    FROM orders WHERE customer_id = ? AND status NOT IN ('cancelled')
  `).get(c.id);
  const avgOrder = stats.orders > 0 ? stats.totalSpent / stats.orders : 0;

  return {
    id: c.id, name: c.name, email: c.email, phone: c.phone,
    governorate: c.governorate, city: c.city, address: c.address, apartment: c.apartment,
    status: c.status, segment: c.segment, notes: c.notes,
    createdAt: c.created_at, updatedAt: c.updated_at,
    ordersCount: stats.orders, totalSpent: stats.totalSpent, averageOrder: avgOrder, lastOrderAt: stats.lastOrder
  };
}

router.get('/', requireAuth, (req, res) => {
  const { q, segment, page = 1, pageSize = 20 } = req.query;
  const where = [];
  const params = {};
  if (q) { where.push('(name LIKE @q OR phone LIKE @q OR email LIKE @q)'); params.q = '%' + q + '%'; }
  if (segment) { where.push('segment = @segment'); params.segment = segment; }
  const whereSql = where.length ? 'WHERE ' + where.join(' AND ') : '';

  const total = db.prepare(`SELECT COUNT(*) c FROM customers ${whereSql}`).get(params).c;
  const limit = Math.min(100, Math.max(1, Number(pageSize) || 20));
  const offset = (Math.max(1, Number(page) || 1) - 1) * limit;

  const rows = db.prepare(`SELECT * FROM customers ${whereSql} ORDER BY created_at DESC LIMIT @limit OFFSET @offset`)
    .all({ ...params, limit, offset });

  res.json({ total, page: Number(page), pageSize: limit, items: rows.map(withStats) });
});

router.get('/:id', requireAuth, (req, res) => {
  const c = db.prepare('SELECT * FROM customers WHERE id = ?').get(req.params.id);
  if (!c) return res.status(404).json({ error: 'Customer not found.' });
  const orders = db.prepare('SELECT * FROM orders WHERE customer_id = ? ORDER BY created_at DESC').all(c.id);
  res.json({
    ...withStats(c),
    orders: orders.map(o => ({
      id: o.id, orderNumber: o.order_number, total: o.total, status: o.status,
      paymentStatus: o.payment_status, createdAt: o.created_at
    }))
  });
});

router.put('/:id', requireAuth, requirePermission('customers'), (req, res) => {
  const existing = db.prepare('SELECT * FROM customers WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Customer not found.' });
  const b = req.body || {};
  db.prepare(`
    UPDATE customers SET
      name=@name, email=@email, phone=@phone, governorate=@governorate, city=@city,
      address=@address, apartment=@apartment, status=@status, segment=@segment, notes=@notes,
      updated_at=datetime('now')
    WHERE id=@id
  `).run({
    id: existing.id,
    name: b.name != null ? b.name : existing.name,
    email: b.email != null ? b.email : existing.email,
    phone: b.phone != null ? b.phone : existing.phone,
    governorate: b.governorate != null ? b.governorate : existing.governorate,
    city: b.city != null ? b.city : existing.city,
    address: b.address != null ? b.address : existing.address,
    apartment: b.apartment != null ? b.apartment : existing.apartment,
    status: b.status != null ? b.status : existing.status,
    segment: b.segment != null ? b.segment : existing.segment,
    notes: b.notes != null ? b.notes : existing.notes
  });
  logActivity(req, { action: 'customer.update', entityType: 'customer', entityId: existing.id, description: `Updated customer "${existing.name}".` });
  res.json(withStats(db.prepare('SELECT * FROM customers WHERE id = ?').get(existing.id)));
});

module.exports = router;
