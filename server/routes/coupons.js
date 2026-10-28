const express = require('express');
const { db, withTransaction } = require('../db');
const { requireAuth, requirePermission, logActivity } = require('../middleware/auth');

const router = express.Router();

async function serialize(c) {
  const redeemed = Number((await db.prepare('SELECT COUNT(*) n FROM coupon_redemptions WHERE coupon_id = ?').get(c.id)).n);
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

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const rows = await db.prepare('SELECT * FROM coupons ORDER BY created_at DESC').all();
    res.json(await Promise.all(rows.map(serialize)));
  } catch (e) { next(e); }
});

router.post('/', requireAuth, requirePermission('discounts'), async (req, res, next) => {
  try {
    const b = req.body || {};
    if (!b.code || !b.code.trim()) return res.status(400).json({ error: 'Coupon code is required.' });
    const code = b.code.trim().toUpperCase();
    if (await db.prepare('SELECT id FROM coupons WHERE code = ?').get(code)) {
      return res.status(400).json({ error: 'A coupon with this code already exists.' });
    }
    if (!['percent', 'fixed', 'free_shipping', 'bogo', 'first_order'].includes(b.type)) {
      return res.status(400).json({ error: 'Invalid coupon type.' });
    }

    const id = await withTransaction(async (tdb) => {
      if (b.isFeatured) await tdb.prepare('UPDATE coupons SET is_featured = FALSE').run();
      const result = await tdb.prepare(`
        INSERT INTO coupons (code, type, amount, min_order, max_discount, usage_limit, per_customer_limit,
          starts_at, expires_at, applicable_products, applicable_categories, applicable_brands, is_active, is_featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(code, b.type, b.amount || 0, b.minOrder || 0, b.maxDiscount || null, b.usageLimit || null,
             b.perCustomerLimit || null, b.startsAt || null, b.expiresAt || null,
             JSON.stringify(b.applicableProducts || []), JSON.stringify(b.applicableCategories || []),
             JSON.stringify(b.applicableBrands || []), b.isActive !== false, !!b.isFeatured);
      return result.lastInsertRowid;
    });

    logActivity(req, { action: 'coupon.create', entityType: 'coupon', entityId: id, description: `Created coupon "${code}".` });
    const created = await db.prepare('SELECT * FROM coupons WHERE id = ?').get(id);
    res.status(201).json(await serialize(created));
  } catch (e) { next(e); }
});

router.put('/:id', requireAuth, requirePermission('discounts'), async (req, res, next) => {
  try {
    const existing = await db.prepare('SELECT * FROM coupons WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Coupon not found.' });
    const b = req.body || {};

    await withTransaction(async (tdb) => {
      if (b.isFeatured) await tdb.prepare('UPDATE coupons SET is_featured = FALSE WHERE id != ?').run(existing.id);
      await tdb.prepare(`
        UPDATE coupons SET
          type=@type, amount=@amount, min_order=@min_order, max_discount=@max_discount,
          usage_limit=@usage_limit, per_customer_limit=@per_customer_limit, starts_at=@starts_at,
          expires_at=@expires_at, applicable_products=@applicable_products, applicable_categories=@applicable_categories,
          applicable_brands=@applicable_brands, is_active=@is_active, is_featured=@is_featured, updated_at=NOW()
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
        is_active: b.isActive != null ? !!b.isActive : existing.is_active,
        is_featured: b.isFeatured != null ? !!b.isFeatured : existing.is_featured
      });
    });

    logActivity(req, { action: 'coupon.update', entityType: 'coupon', entityId: existing.id, description: `Updated coupon "${existing.code}".` });
    const updated = await db.prepare('SELECT * FROM coupons WHERE id = ?').get(existing.id);
    res.json(await serialize(updated));
  } catch (e) { next(e); }
});

router.delete('/:id', requireAuth, requirePermission('discounts'), async (req, res, next) => {
  try {
    const existing = await db.prepare('SELECT * FROM coupons WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Coupon not found.' });
    await db.prepare('DELETE FROM coupons WHERE id = ?').run(existing.id);
    logActivity(req, { action: 'coupon.delete', entityType: 'coupon', entityId: existing.id, description: `Deleted coupon "${existing.code}".` });
    res.json({ deleted: true });
  } catch (e) { next(e); }
});

/* ---------- public: validate + compute discount for the checkout ---------- */
// checks a code against a cart and works out its discount — shared by the
// checkout's "apply" button and order placement, so an order can never carry
// a discount the code doesn't actually give. Returns { error, status } or
// { coupon, discount, freeShipping, label }.
async function evaluateCoupon(code, subtotal, productIds = [], categoryIds = [], brandIds = []) {
  if (!code) return { status: 400, error: 'Enter a code.' };

  const coupon = await db.prepare('SELECT * FROM coupons WHERE code = ?').get(String(code).trim().toUpperCase());
  if (!coupon || !coupon.is_active) return { status: 404, error: 'That code is not valid.' };

  const now = new Date();
  if (coupon.starts_at && new Date(coupon.starts_at) > now) return { status: 400, error: 'This code is not active yet.' };
  if (coupon.expires_at && new Date(coupon.expires_at) < now) return { status: 400, error: 'This code has expired.' };
  if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) return { status: 400, error: 'This code has reached its usage limit.' };
  if (subtotal < coupon.min_order) return { status: 400, error: `Minimum order of ${coupon.min_order} EGP required.` };

  const applicableProducts = JSON.parse(coupon.applicable_products || '[]');
  const applicableCategories = JSON.parse(coupon.applicable_categories || '[]');
  const applicableBrands = JSON.parse(coupon.applicable_brands || '[]');

  const scoped = applicableProducts.length || applicableCategories.length || applicableBrands.length;
  if (scoped) {
    const matches = productIds.some(id => applicableProducts.includes(id))
      || categoryIds.some(id => applicableCategories.includes(id))
      || brandIds.some(id => applicableBrands.includes(id));
    if (!matches) return { status: 400, error: 'This code does not apply to the items in your cart.' };
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

  return {
    coupon, discount: Math.round(discount), freeShipping,
    label: coupon.type === 'percent' ? `${coupon.amount}% off` : coupon.type === 'fixed' ? `${coupon.amount} EGP off` : 'Free shipping'
  };
}

router.validatePublic = async (req, res, next) => {
  try {
    const { code, subtotal, productIds = [], categoryIds = [], brandIds = [] } = req.body || {};
    const r = await evaluateCoupon(code, subtotal, productIds, categoryIds, brandIds);
    if (r.error) return res.status(r.status).json({ error: r.error });
    res.json({ code: r.coupon.code, type: r.coupon.type, discount: r.discount, freeShipping: r.freeShipping, label: r.label });
  } catch (e) { next(e); }
};

/* ---------- public: the one coupon currently promoted site-wide ---------- */
router.featuredPublic = async (req, res, next) => {
  try {
    const coupon = await db.prepare(`
      SELECT * FROM coupons WHERE is_featured = TRUE AND is_active = TRUE
      AND (starts_at IS NULL OR starts_at <= NOW())
      AND (expires_at IS NULL OR expires_at >= NOW())
      LIMIT 1
    `).get();
    if (!coupon) return res.json(null);
    res.json({
      code: coupon.code, type: coupon.type, amount: coupon.amount,
      label: coupon.type === 'percent' ? `${coupon.amount}% OFF` : coupon.type === 'fixed' ? `${coupon.amount} EGP OFF` : 'FREE SHIPPING'
    });
  } catch (e) { next(e); }
};

module.exports = router;
module.exports.evaluateCoupon = evaluateCoupon;
