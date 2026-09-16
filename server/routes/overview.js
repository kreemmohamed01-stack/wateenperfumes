const express = require('express');
const { db } = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const NON_REVENUE_STATUSES = ['cancelled', 'returned', 'refunded'];

function revenueBetween(fromIso, toIso) {
  const placeholders = NON_REVENUE_STATUSES.map(() => '?').join(',');
  return db.prepare(`
    SELECT COALESCE(SUM(total),0) revenue, COUNT(*) orders
    FROM orders WHERE created_at >= ? AND created_at < ? AND status NOT IN (${placeholders})
  `).get(fromIso, toIso, ...NON_REVENUE_STATUSES);
}

function isoDaysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 19).replace('T', ' ');
}

router.get('/kpis', requireAuth, (req, res) => {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const todayStart = new Date().toISOString().slice(0, 10) + ' 00:00:00';
  const yesterdayStart = isoDaysAgo(1).slice(0, 10) + ' 00:00:00';

  const today = revenueBetween(todayStart, now);
  const yesterday = revenueBetween(yesterdayStart, todayStart);

  const totalRevenue = db.prepare(`
    SELECT COALESCE(SUM(total),0) r FROM orders WHERE status NOT IN ('cancelled','returned','refunded')
  `).get().r;

  const totalOrders = db.prepare('SELECT COUNT(*) c FROM orders').get().c;
  const pendingOrders = db.prepare(`SELECT COUNT(*) c FROM orders WHERE status = 'pending'`).get().c;
  const completedOrders = db.prepare(`SELECT COUNT(*) c FROM orders WHERE status = 'delivered'`).get().c;
  const totalCustomers = db.prepare('SELECT COUNT(*) c FROM customers').get().c;
  const totalProducts = db.prepare(`SELECT COUNT(*) c FROM products WHERE status != 'archived'`).get().c;
  const lowStockProducts = db.prepare(`
    SELECT COUNT(DISTINCT p.id) c FROM products p JOIN product_variants v ON v.product_id = p.id
    WHERE (v.stock - v.reserved) <= p.low_stock_threshold
  `).get().c;

  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const pctChange = (curr, prev) => prev === 0 ? (curr > 0 ? 100 : 0) : ((curr - prev) / prev) * 100;

  res.json({
    totalRevenue,
    todayRevenue: today.revenue,
    todayRevenueChangePct: pctChange(today.revenue, yesterday.revenue),
    ordersToday: today.orders,
    ordersTodayChangePct: pctChange(today.orders, yesterday.orders),
    totalOrders, pendingOrders, completedOrders, totalCustomers,
    totalProducts, lowStockProducts, averageOrderValue: avgOrderValue,
    conversionRate: null // requires site traffic tracking, not available yet
  });
});

router.get('/revenue-series', requireAuth, (req, res) => {
  const { range = '30d' } = req.query;
  const daysMap = { today: 1, '7d': 7, '30d': 30, '3m': 90, '12m': 365 };
  const days = daysMap[range] || 30;

  const rows = db.prepare(`
    SELECT date(created_at) as day, COALESCE(SUM(total),0) revenue, COUNT(*) orders
    FROM orders
    WHERE created_at >= date('now', '-${days} days') AND status NOT IN ('cancelled','returned','refunded')
    GROUP BY day ORDER BY day
  `).all();

  res.json(rows);
});

router.get('/top-products', requireAuth, (req, res) => {
  const rows = db.prepare(`
    SELECT p.id, p.name, COALESCE(SUM(oi.qty),0) unitsSold, COALESCE(SUM(oi.qty * oi.unit_price),0) revenue,
      (SELECT url FROM product_images WHERE product_id = p.id ORDER BY is_main DESC LIMIT 1) image
    FROM products p LEFT JOIN order_items oi ON oi.product_id = p.id
    LEFT JOIN orders o ON o.id = oi.order_id AND o.status NOT IN ('cancelled','returned','refunded')
    GROUP BY p.id ORDER BY unitsSold DESC LIMIT 10
  `).all();
  res.json(rows);
});

router.get('/sales-by-category', requireAuth, (req, res) => {
  const rows = db.prepare(`
    SELECT c.name, COALESCE(SUM(oi.qty * oi.unit_price),0) revenue
    FROM categories c
    JOIN product_categories pc ON pc.category_id = c.id
    JOIN order_items oi ON oi.product_id = pc.product_id
    JOIN orders o ON o.id = oi.order_id AND o.status NOT IN ('cancelled','returned','refunded')
    GROUP BY c.id ORDER BY revenue DESC
  `).all();
  res.json(rows);
});

router.get('/sales-by-brand', requireAuth, (req, res) => {
  const rows = db.prepare(`
    SELECT b.name, COALESCE(SUM(oi.qty * oi.unit_price),0) revenue
    FROM brands b
    JOIN products p ON p.brand_id = b.id
    JOIN order_items oi ON oi.product_id = p.id
    JOIN orders o ON o.id = oi.order_id AND o.status NOT IN ('cancelled','returned','refunded')
    GROUP BY b.id ORDER BY revenue DESC LIMIT 10
  `).all();
  res.json(rows);
});

router.get('/recent-orders', requireAuth, (req, res) => {
  const rows = db.prepare(`
    SELECT id, order_number, customer_name, total, status, payment_status, created_at
    FROM orders ORDER BY created_at DESC LIMIT 8
  `).all();
  res.json(rows.map(o => ({
    id: o.id, orderNumber: o.order_number, customerName: o.customer_name,
    total: o.total, status: o.status, paymentStatus: o.payment_status, createdAt: o.created_at
  })));
});

router.get('/recent-customers', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT id, name, phone, created_at FROM customers ORDER BY created_at DESC LIMIT 8').all();
  res.json(rows);
});

router.get('/low-stock', requireAuth, (req, res) => {
  const rows = db.prepare(`
    SELECT p.id, p.name, v.size, v.stock, v.reserved, p.low_stock_threshold
    FROM products p JOIN product_variants v ON v.product_id = p.id
    WHERE (v.stock - v.reserved) <= p.low_stock_threshold
    ORDER BY (v.stock - v.reserved) ASC LIMIT 10
  `).all();
  res.json(rows);
});

module.exports = router;
