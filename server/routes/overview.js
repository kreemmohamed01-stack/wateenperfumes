const express = require('express');
const { db } = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const NON_REVENUE_STATUSES = ['cancelled', 'returned', 'refunded'];

async function revenueBetween(fromIso, toIso) {
  const placeholders = NON_REVENUE_STATUSES.map(() => '?').join(',');
  const row = await db.prepare(`
    SELECT COALESCE(SUM(total),0) revenue, COUNT(*) orders
    FROM orders WHERE created_at >= ? AND created_at < ? AND status NOT IN (${placeholders})
  `).get(fromIso, toIso, ...NON_REVENUE_STATUSES);
  return { revenue: Number(row.revenue), orders: Number(row.orders) };
}

function isoDaysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 19).replace('T', ' ');
}

router.get('/kpis', requireAuth, async (req, res, next) => {
  try {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const todayStart = new Date().toISOString().slice(0, 10) + ' 00:00:00';
    const yesterdayStart = isoDaysAgo(1).slice(0, 10) + ' 00:00:00';

    const today = await revenueBetween(todayStart, now);
    const yesterday = await revenueBetween(yesterdayStart, todayStart);

    const totalRevenue = Number((await db.prepare(`
      SELECT COALESCE(SUM(total),0) r FROM orders WHERE status NOT IN ('cancelled','returned','refunded')
    `).get()).r);

    const totalOrders = Number((await db.prepare('SELECT COUNT(*) c FROM orders').get()).c);
    const pendingOrders = Number((await db.prepare(`SELECT COUNT(*) c FROM orders WHERE status = 'pending'`).get()).c);
    const completedOrders = Number((await db.prepare(`SELECT COUNT(*) c FROM orders WHERE status = 'delivered'`).get()).c);
    const totalCustomers = Number((await db.prepare('SELECT COUNT(*) c FROM customers').get()).c);
    const totalProducts = Number((await db.prepare(`SELECT COUNT(*) c FROM products WHERE status != 'archived'`).get()).c);
    const lowStockProducts = Number((await db.prepare(`
      SELECT COUNT(DISTINCT p.id) c FROM products p JOIN product_variants v ON v.product_id = p.id
      WHERE (v.stock - v.reserved) <= p.low_stock_threshold
    `).get()).c);

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
  } catch (e) { next(e); }
});

router.get('/revenue-series', requireAuth, async (req, res, next) => {
  try {
    const { range = '30d' } = req.query;
    const daysMap = { today: 1, '7d': 7, '30d': 30, '3m': 90, '90d': 90, '12m': 365, '365d': 365 };
    const days = daysMap[range] || 30;

    const rows = await db.prepare(`
      SELECT created_at::date as day, COALESCE(SUM(total),0) revenue, COUNT(*) orders
      FROM orders
      WHERE created_at >= NOW() - INTERVAL '${days} days' AND status NOT IN ('cancelled','returned','refunded')
      GROUP BY day ORDER BY day
    `).all();

    res.json(rows.map(r => ({ day: r.day, revenue: Number(r.revenue), orders: Number(r.orders) })));
  } catch (e) { next(e); }
});

router.get('/top-products', requireAuth, async (req, res, next) => {
  try {
    const rows = await db.prepare(`
      SELECT p.id, p.name, COALESCE(SUM(oi.qty),0) "unitsSold", COALESCE(SUM(oi.qty * oi.unit_price),0) revenue,
        (SELECT url FROM product_images WHERE product_id = p.id ORDER BY is_main DESC LIMIT 1) image
      FROM products p LEFT JOIN order_items oi ON oi.product_id = p.id
      LEFT JOIN orders o ON o.id = oi.order_id AND o.status NOT IN ('cancelled','returned','refunded')
      GROUP BY p.id ORDER BY "unitsSold" DESC LIMIT 10
    `).all();
    res.json(rows.map(r => ({ id: r.id, name: r.name, unitsSold: Number(r.unitsSold), revenue: Number(r.revenue), image: r.image })));
  } catch (e) { next(e); }
});

router.get('/sales-by-category', requireAuth, async (req, res, next) => {
  try {
    const rows = await db.prepare(`
      SELECT c.name, COALESCE(SUM(oi.qty * oi.unit_price),0) revenue
      FROM categories c
      JOIN product_categories pc ON pc.category_id = c.id
      JOIN order_items oi ON oi.product_id = pc.product_id
      JOIN orders o ON o.id = oi.order_id AND o.status NOT IN ('cancelled','returned','refunded')
      GROUP BY c.id ORDER BY revenue DESC
    `).all();
    res.json(rows.map(r => ({ name: r.name, revenue: Number(r.revenue) })));
  } catch (e) { next(e); }
});

router.get('/sales-by-brand', requireAuth, async (req, res, next) => {
  try {
    const rows = await db.prepare(`
      SELECT b.name, COALESCE(SUM(oi.qty * oi.unit_price),0) revenue
      FROM brands b
      JOIN products p ON p.brand_id = b.id
      JOIN order_items oi ON oi.product_id = p.id
      JOIN orders o ON o.id = oi.order_id AND o.status NOT IN ('cancelled','returned','refunded')
      GROUP BY b.id ORDER BY revenue DESC LIMIT 10
    `).all();
    res.json(rows.map(r => ({ name: r.name, revenue: Number(r.revenue) })));
  } catch (e) { next(e); }
});

router.get('/recent-orders', requireAuth, async (req, res, next) => {
  try {
    const rows = await db.prepare(`
      SELECT o.id, o.order_number, o.customer_name, o.total, o.status, o.payment_status, o.created_at,
        (SELECT COALESCE(SUM(qty),0) FROM order_items WHERE order_id = o.id) item_count
      FROM orders o ORDER BY o.created_at DESC LIMIT 8
    `).all();
    res.json(rows.map(o => ({
      id: o.id, orderNumber: o.order_number, customerName: o.customer_name,
      total: o.total, status: o.status, paymentStatus: o.payment_status, createdAt: o.created_at,
      itemCount: Number(o.item_count)
    })));
  } catch (e) { next(e); }
});

// donut breakdown for the overview page — every status that has at least one order
router.get('/status-counts', requireAuth, async (req, res, next) => {
  try {
    const rows = await db.prepare(`
      SELECT status, COUNT(*) count FROM orders GROUP BY status ORDER BY COUNT(*) DESC
    `).all();
    res.json(rows.map(r => ({ status: r.status, count: Number(r.count) })));
  } catch (e) { next(e); }
});

router.get('/recent-customers', requireAuth, async (req, res, next) => {
  try {
    const rows = await db.prepare('SELECT id, name, phone, created_at FROM customers ORDER BY created_at DESC LIMIT 8').all();
    res.json(rows);
  } catch (e) { next(e); }
});

router.get('/low-stock', requireAuth, async (req, res, next) => {
  try {
    const rows = await db.prepare(`
      SELECT p.id, p.name, v.size, v.stock, v.reserved, p.low_stock_threshold,
        (SELECT url FROM product_images WHERE product_id = p.id ORDER BY is_main DESC LIMIT 1) image
      FROM products p JOIN product_variants v ON v.product_id = p.id
      WHERE (v.stock - v.reserved) <= p.low_stock_threshold
      ORDER BY (v.stock - v.reserved) ASC LIMIT 10
    `).all();
    res.json(rows);
  } catch (e) { next(e); }
});

module.exports = router;
