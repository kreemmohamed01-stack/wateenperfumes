const express = require('express');
const { db, withTransaction } = require('../db');
const { requireAuth, requirePermission, logActivity } = require('../middleware/auth');
const { notify } = require('../lib/notify');
const { sendOrderWhatsApp } = require('../lib/whatsapp');
const metaCapi = require('../lib/meta-capi');
const { buildCatalog, settingsMap } = require('./public-catalog');
const { evaluateCoupon } = require('./coupons');

const router = express.Router();

// Re-prices a checkout cart from the database: unit prices, shipping and the
// coupon discount are all recomputed here, so the totals the browser sends
// are never trusted (anyone can edit that request). Mirrors the rules in
// checkout.js — watches ship free while that's enabled, anything else ships
// at the selected governorate's rate.
async function priceOrder(b) {
  const settings = await settingsMap();
  const catalog = await buildCatalog(settings, { keepVariants: true });
  const byId = new Map(catalog.map(p => [p.dbId, p]));

  const items = [];
  for (const item of b.items) {
    const p = byId.get(Number(item.productId));
    const qty = Math.floor(Number(item.qty));
    if (!p || !(qty > 0)) return { error: 'One of the items in your cart is no longer available.' };
    const variants = p.variants || [];
    const variant = variants.find(v => v.size === item.size) || variants.find(v => v.size === p.size) || variants[0];
    items.push({
      productId: p.dbId, variantId: variant ? variant.id : null, name: p.name, brand: p.brand,
      size: variant ? variant.size : p.size, qty, unitPrice: variant ? variant.price : p.price, image: p.img,
      isWatch: p.cat === 'watches' || (p.extraCats || []).includes('watches'), brandId: p.brandId
    });
  }

  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);

  const govRates = JSON.parse(settings.shipping_rates_by_governorate || '{}');
  const gov = b.address?.governorate;
  const perfumeFee = Number(gov && govRates[gov] != null ? govRates[gov] : (settings.default_shipping_fee || 80));
  const watchesFree = settings.watches_free_shipping !== 'false';
  let shippingFee = (items.some(i => !i.isWatch) || !watchesFree) ? perfumeFee : 0;

  let discountTotal = 0;
  let couponCode = null;
  if (b.couponCode) {
    const c = await evaluateCoupon(b.couponCode, subtotal, items.map(i => i.productId), [], items.map(i => i.brandId));
    if (c.error) return { error: c.error };
    discountTotal = c.discount;
    if (c.freeShipping) shippingFee = 0;
    couponCode = c.coupon.code;
  }

  return {
    items, subtotal, shippingFee, discountTotal, couponCode,
    total: Math.max(0, subtotal - discountTotal) + shippingFee
  };
}

const STATUS_FLOW = ['pending', 'confirmed', 'processing', 'packed', 'shipped', 'out_for_delivery', 'delivered'];
const ALL_STATUSES = [...STATUS_FLOW, 'cancelled', 'returned', 'refunded'];

function genOrderNumber() {
  const n = Math.floor(10000 + Math.random() * 89999);
  return 'WP-' + n;
}

async function serializeOrder(o) {
  const items = await db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(o.id);
  const timeline = await db.prepare('SELECT * FROM order_timeline WHERE order_id = ? ORDER BY created_at').all(o.id);
  return {
    id: o.id, orderNumber: o.order_number, customerId: o.customer_id,
    customer: { name: o.customer_name, phone: o.customer_phone, email: o.customer_email },
    address: {
      governorate: o.governorate, city: o.city, address: o.address, apartment: o.apartment
    },
    subtotal: o.subtotal, discountTotal: o.discount_total, shippingFee: o.shipping_fee, total: o.total,
    couponCode: o.coupon_code, paymentMethod: o.payment_method, paymentStatus: o.payment_status,
    paymentReference: o.payment_reference, shippingMethod: o.shipping_method, status: o.status,
    customerNotes: o.customer_notes, adminNotes: o.admin_notes,
    createdAt: o.created_at, updatedAt: o.updated_at,
    items: items.map(i => ({
      id: i.id, productId: i.product_id, variantId: i.variant_id, name: i.product_name,
      brand: i.brand_name, size: i.size, qty: i.qty, unitPrice: i.unit_price, image: i.image
    })),
    timeline: timeline.map(t => ({ status: t.status, note: t.note, createdAt: t.created_at }))
  };
}

/* ---------- public: create order from checkout ---------- */
// mounted separately without requireAuth — see server.js (/api/public/orders)
router.createPublicOrder = async (req, res, next) => {
  try {
    const b = req.body || {};
    if (!b.customer || !b.customer.name || !b.customer.phone) {
      return res.status(400).json({ error: 'Customer name and phone are required.' });
    }
    if (!Array.isArray(b.items) || !b.items.length) {
      return res.status(400).json({ error: 'Order must contain at least one item.' });
    }

    const priced = await priceOrder(b);
    if (priced.error) return res.status(400).json({ error: priced.error });
    b.items = priced.items;
    b.subtotal = priced.subtotal;
    b.discountTotal = priced.discountTotal;
    b.shippingFee = priced.shippingFee;
    b.total = priced.total;
    b.couponCode = priced.couponCode;

    const { orderId, orderNumber } = await withTransaction(async (tdb) => {
      let customer = await tdb.prepare('SELECT * FROM customers WHERE phone = ?').get(b.customer.phone.trim());
      if (!customer) {
        const result = await tdb.prepare(`
          INSERT INTO customers (name, email, phone, governorate, city, address, apartment)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(b.customer.name.trim(), b.customer.email || null, b.customer.phone.trim(),
               b.address?.governorate || null, b.address?.city || null, b.address?.address || null, b.address?.apartment || null);
        customer = await tdb.prepare('SELECT * FROM customers WHERE id = ?').get(result.lastInsertRowid);
      } else {
        await tdb.prepare(`
          UPDATE customers SET name=?, email=COALESCE(?, email), governorate=?, city=?, address=?, apartment=?, updated_at=NOW()
          WHERE id=?
        `).run(b.customer.name.trim(), b.customer.email || null, b.address?.governorate || null,
               b.address?.city || null, b.address?.address || null, b.address?.apartment || null, customer.id);
      }

      let orderNumber = genOrderNumber();
      while (await tdb.prepare('SELECT id FROM orders WHERE order_number = ?').get(orderNumber)) orderNumber = genOrderNumber();

      const result = await tdb.prepare(`
        INSERT INTO orders (
          order_number, customer_id, customer_name, customer_phone, customer_email,
          governorate, city, address, apartment, subtotal, discount_total, shipping_fee, total,
          coupon_code, payment_method, payment_status, payment_reference, shipping_method, customer_notes
        ) VALUES (@order_number, @customer_id, @customer_name, @customer_phone, @customer_email,
          @governorate, @city, @address, @apartment, @subtotal, @discount_total, @shipping_fee, @total,
          @coupon_code, @payment_method, @payment_status, @payment_reference, @shipping_method, @customer_notes)
      `).run({
        order_number: orderNumber, customer_id: customer.id, customer_name: b.customer.name.trim(),
        customer_phone: b.customer.phone.trim(), customer_email: b.customer.email || null,
        governorate: b.address?.governorate || null, city: b.address?.city || null,
        address: b.address?.address || null, apartment: b.address?.apartment || null,
        subtotal: b.subtotal || 0, discount_total: b.discountTotal || 0, shipping_fee: b.shippingFee || 0,
        total: b.total || 0, coupon_code: b.couponCode || null, payment_method: b.paymentMethod || 'cod',
        payment_status: b.paymentMethod === 'cod' ? 'pending' : 'pending',
        payment_reference: b.paymentReference || null, shipping_method: b.shippingMethod || 'standard',
        customer_notes: b.customerNotes || null
      });
      const orderId = result.lastInsertRowid;

      for (const item of b.items) {
        await tdb.prepare(`
          INSERT INTO order_items (order_id, product_id, variant_id, product_name, brand_name, size, qty, unit_price, image)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(orderId, item.productId || null, item.variantId || null, item.name, item.brand || null,
               item.size || null, item.qty, item.unitPrice, item.image || null);

        if (item.variantId) {
          await tdb.prepare('UPDATE product_variants SET stock = GREATEST(0, stock - ?), updated_at=NOW() WHERE id = ?')
            .run(item.qty, item.variantId);
          await tdb.prepare(`
            INSERT INTO inventory_log (variant_id, change_qty, reason, note) VALUES (?, ?, 'sale', ?)
          `).run(item.variantId, -item.qty, 'Order ' + orderNumber);
        }
      }

      await tdb.prepare('INSERT INTO order_timeline (order_id, status, note) VALUES (?, ?, ?)').run(orderId, 'pending', 'Order placed by customer.');

      if (b.couponCode) {
        const coupon = await tdb.prepare('SELECT * FROM coupons WHERE code = ?').get(b.couponCode.toUpperCase());
        if (coupon) {
          await tdb.prepare('UPDATE coupons SET used_count = used_count + 1 WHERE id = ?').run(coupon.id);
          await tdb.prepare('INSERT INTO coupon_redemptions (coupon_id, order_id, customer_id) VALUES (?, ?, ?)').run(coupon.id, orderId, customer.id);
        }
      }

      return { orderId, orderNumber };
    });

    notify('new_order', 'New order ' + orderNumber, b.customer.name + ' placed an order for ' + (b.total || 0) + ' EGP.', '/orders/' + orderId);

    // awaited so the send actually completes before this serverless function
    // is frozen/torn down — a failure here still must never fail the order,
    // since the order is already committed to the DB at this point.
    await sendOrderWhatsApp({
      orderNumber, customer: b.customer, address: b.address, items: b.items,
      subtotal: b.subtotal || 0, discountTotal: b.discountTotal || 0, shippingFee: b.shippingFee || 0,
      total: b.total || 0, paymentMethod: b.paymentMethod || 'cod', couponCode: b.couponCode || null,
      customerNotes: b.customerNotes || null
    }).catch(() => {});

    // Meta Conversions API Purchase — same reasoning: awaited, never fatal
    await metaCapi.sendPurchase(req, {
      orderNumber, customer: b.customer, address: b.address, items: b.items, total: b.total || 0
    }).catch(() => {});

    res.status(201).json({ orderId, orderNumber });
  } catch (e) { next(e); }
};

/* ---------- admin: list ---------- */

// split of orders by payment method, for the Payments page
// declared before '/:id' so "payment-breakdown" isn't parsed as an order id
router.get('/payment-breakdown', requireAuth, async (req, res, next) => {
  try {
    const rows = await db.prepare(`
      SELECT payment_method method, COUNT(*) count
      FROM orders WHERE status NOT IN ('cancelled','returned','refunded')
      GROUP BY payment_method ORDER BY COUNT(*) DESC
    `).all();
    res.json(rows.map(r => ({ method: r.method, count: Number(r.count) })));
  } catch (e) { next(e); }
});

// orders per day (Cairo time) for comparing with Meta Ads "Purchases" —
// every order is counted, plus how many of them were later cancelled/returned
router.get('/daily', requireAuth, async (req, res, next) => {
  try {
    const days = Math.min(Math.max(parseInt(req.query.days, 10) || 30, 1), 365);
    const rows = await db.prepare(`
      SELECT to_char((created_at AT TIME ZONE 'Africa/Cairo')::date, 'YYYY-MM-DD') AS day,
             COUNT(*) AS orders,
             COALESCE(SUM(total), 0) AS revenue,
             COUNT(*) FILTER (WHERE status IN ('cancelled','returned','refunded')) AS cancelled,
             COALESCE(SUM(total) FILTER (WHERE status IN ('cancelled','returned','refunded')), 0) AS cancelled_revenue,
             COUNT(*) FILTER (WHERE status = 'delivered') AS delivered
      FROM orders
      WHERE created_at >= (date_trunc('day', NOW() AT TIME ZONE 'Africa/Cairo') - make_interval(days => ${days - 1})) AT TIME ZONE 'Africa/Cairo'
      GROUP BY 1 ORDER BY 1 DESC
    `).all();
    res.json(rows.map(r => ({
      day: r.day, orders: Number(r.orders), revenue: Number(r.revenue),
      cancelled: Number(r.cancelled), cancelledRevenue: Number(r.cancelled_revenue), delivered: Number(r.delivered)
    })));
  } catch (e) { next(e); }
});

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { q, status, paymentStatus, page = 1, pageSize = 20, from, to } = req.query;
    const where = [];
    const params = {};

    if (q) { where.push('(o.order_number LIKE @q OR o.customer_name LIKE @q OR o.customer_phone LIKE @q)'); params.q = '%' + q + '%'; }
    if (status) { where.push('o.status = @status'); params.status = status; }
    if (paymentStatus) { where.push('o.payment_status = @paymentStatus'); params.paymentStatus = paymentStatus; }
    if (from) { where.push('o.created_at >= @from'); params.from = from; }
    if (to) { where.push('o.created_at <= @to'); params.to = to; }

    const whereSql = where.length ? 'WHERE ' + where.join(' AND ') : '';
    const total = (await db.prepare(`SELECT COUNT(*) c FROM orders o ${whereSql}`).get(params)).c;

    const limit = Math.min(100, Math.max(1, Number(pageSize) || 20));
    const offset = (Math.max(1, Number(page) || 1) - 1) * limit;

    const rows = await db.prepare(`
      SELECT o.* FROM orders o ${whereSql} ORDER BY o.created_at DESC LIMIT @limit OFFSET @offset
    `).all({ ...params, limit, offset });

    const items = await Promise.all(rows.map(serializeOrder));
    res.json({ total: Number(total), page: Number(page), pageSize: limit, items });
  } catch (e) { next(e); }
});

router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const o = await db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    if (!o) return res.status(404).json({ error: 'Order not found.' });
    res.json(await serializeOrder(o));
  } catch (e) { next(e); }
});

router.put('/:id/status', requireAuth, requirePermission('orders'), async (req, res, next) => {
  try {
    const o = await db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    if (!o) return res.status(404).json({ error: 'Order not found.' });
    const { status, note } = req.body || {};
    if (!ALL_STATUSES.includes(status)) return res.status(400).json({ error: 'Invalid status.' });

    await withTransaction(async (tdb) => {
      await tdb.prepare('UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?').run(status, o.id);
      await tdb.prepare('INSERT INTO order_timeline (order_id, status, note, user_id) VALUES (?, ?, ?, ?)')
        .run(o.id, status, note || null, req.user.id);

      if ((status === 'cancelled' || status === 'returned') && o.status !== 'cancelled' && o.status !== 'returned') {
        const items = await tdb.prepare('SELECT * FROM order_items WHERE order_id = ?').all(o.id);
        for (const item of items) {
          if (item.variant_id) {
            await tdb.prepare('UPDATE product_variants SET stock = stock + ? WHERE id = ?').run(item.qty, item.variant_id);
            await tdb.prepare(`INSERT INTO inventory_log (variant_id, change_qty, reason, note) VALUES (?, ?, 'return', ?)`)
              .run(item.variant_id, item.qty, 'Order ' + o.order_number + ' ' + status);
          }
        }
      }
    });

    logActivity(req, { action: 'order.status_change', entityType: 'order', entityId: o.id, description: `Order ${o.order_number} status changed to "${status}".` });
    if (status === 'cancelled') notify('cancelled_order', 'Order cancelled', `Order ${o.order_number} was cancelled.`, '/orders/' + o.id);

    const updated = await db.prepare('SELECT * FROM orders WHERE id = ?').get(o.id);
    res.json(await serializeOrder(updated));
  } catch (e) { next(e); }
});

router.put('/:id/payment', requireAuth, requirePermission('orders'), async (req, res, next) => {
  try {
    const o = await db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    if (!o) return res.status(404).json({ error: 'Order not found.' });
    const { paymentStatus, paymentReference } = req.body || {};
    if (!['pending', 'paid', 'failed', 'refunded'].includes(paymentStatus)) return res.status(400).json({ error: 'Invalid payment status.' });

    await db.prepare(`
      UPDATE orders SET payment_status = ?, payment_reference = COALESCE(?, payment_reference), updated_at = NOW() WHERE id = ?
    `).run(paymentStatus, paymentReference || null, o.id);

    logActivity(req, { action: 'order.payment_update', entityType: 'order', entityId: o.id, description: `Order ${o.order_number} payment marked "${paymentStatus}".` });
    if (paymentStatus === 'paid') notify('payment_received', 'Payment received', `Payment received for order ${o.order_number}.`, '/orders/' + o.id);

    const updated = await db.prepare('SELECT * FROM orders WHERE id = ?').get(o.id);
    res.json(await serializeOrder(updated));
  } catch (e) { next(e); }
});

router.put('/:id/notes', requireAuth, requirePermission('orders'), async (req, res, next) => {
  try {
    const o = await db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    if (!o) return res.status(404).json({ error: 'Order not found.' });
    const { adminNotes } = req.body || {};
    await db.prepare('UPDATE orders SET admin_notes = ?, updated_at = NOW() WHERE id = ?').run(adminNotes || null, o.id);
    logActivity(req, { action: 'order.note', entityType: 'order', entityId: o.id, description: `Added a note to order ${o.order_number}.` });
    const updated = await db.prepare('SELECT * FROM orders WHERE id = ?').get(o.id);
    res.json(await serializeOrder(updated));
  } catch (e) { next(e); }
});

router.post('/bulk', requireAuth, requirePermission('orders'), async (req, res, next) => {
  try {
    const { ids, action, value } = req.body || {};
    if (!Array.isArray(ids) || !ids.length) return res.status(400).json({ error: 'No orders selected.' });
    if (action === 'status') {
      if (!ALL_STATUSES.includes(value)) return res.status(400).json({ error: 'Invalid status.' });
      await withTransaction(async (tdb) => {
        for (const id of ids) {
          await tdb.prepare('UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?').run(value, id);
          await tdb.prepare('INSERT INTO order_timeline (order_id, status, user_id) VALUES (?, ?, ?)').run(id, value, req.user.id);
        }
      });
    } else {
      return res.status(400).json({ error: 'Unknown bulk action.' });
    }
    logActivity(req, { action: 'order.bulk_status', entityType: 'order', entityId: ids.join(','), description: `Bulk status "${value}" applied to ${ids.length} order(s).` });
    res.json({ ok: true, affected: ids.length });
  } catch (e) { next(e); }
});

module.exports = router;
