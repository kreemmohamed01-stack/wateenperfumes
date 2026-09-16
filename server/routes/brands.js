const express = require('express');
const { db } = require('../db');
const { requireAuth, requirePermission, logActivity } = require('../middleware/auth');

const router = express.Router();

function slugify(s) {
  return String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

async function withStats(b) {
  const productCountRow = await db.prepare(`SELECT COUNT(*) n FROM products WHERE brand_id = ? AND status != 'archived'`).get(b.id);
  const sales = await db.prepare(`
    SELECT COALESCE(SUM(oi.qty),0) units, COALESCE(SUM(oi.qty * oi.unit_price),0) revenue
    FROM order_items oi
    JOIN products p ON p.id = oi.product_id
    JOIN orders o ON o.id = oi.order_id AND o.status NOT IN ('cancelled','returned','refunded')
    WHERE p.brand_id = ?
  `).get(b.id);
  const bestSeller = await db.prepare(`
    SELECT p.name, COALESCE(SUM(oi.qty),0) units
    FROM products p
    LEFT JOIN order_items oi ON oi.product_id = p.id
    WHERE p.brand_id = ?
    GROUP BY p.id ORDER BY units DESC LIMIT 1
  `).get(b.id);

  return {
    id: b.id, slug: b.slug, name: b.name, nameAr: b.name_ar, logo: b.logo, banner: b.banner,
    description: b.description, website: b.website, country: b.country,
    featured: !!b.featured, isActive: !!b.is_active, seoTitle: b.seo_title, seoDesc: b.seo_desc,
    sortOrder: b.sort_order, createdAt: b.created_at, updatedAt: b.updated_at,
    productCount: Number(productCountRow.n), totalUnitsSold: Number(sales.units), totalRevenue: Number(sales.revenue),
    bestSellingProduct: bestSeller ? bestSeller.name : null
  };
}

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const rows = await db.prepare('SELECT * FROM brands ORDER BY sort_order, name').all();
    res.json(await Promise.all(rows.map(withStats)));
  } catch (e) { next(e); }
});

router.post('/', requireAuth, requirePermission('products'), async (req, res, next) => {
  try {
    const b = req.body || {};
    if (!b.name || !b.name.trim()) return res.status(400).json({ error: 'Brand name is required.' });
    let slug = slugify(b.slug || b.name);
    if (await db.prepare('SELECT id FROM brands WHERE slug = ?').get(slug)) {
      return res.status(400).json({ error: 'A brand with this slug already exists.' });
    }
    const result = await db.prepare(`
      INSERT INTO brands (slug, name, name_ar, logo, banner, description, website, country, featured, seo_title, seo_desc)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(slug, b.name.trim(), b.nameAr || null, b.logo || null, b.banner || null, b.description || null,
           b.website || null, b.country || null, !!b.featured, b.seoTitle || null, b.seoDesc || null);
    logActivity(req, { action: 'brand.create', entityType: 'brand', entityId: result.lastInsertRowid, description: `Created brand "${b.name}".` });
    const created = await db.prepare('SELECT * FROM brands WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(await withStats(created));
  } catch (e) { next(e); }
});

router.put('/:id', requireAuth, requirePermission('products'), async (req, res, next) => {
  try {
    const existing = await db.prepare('SELECT * FROM brands WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Brand not found.' });
    const b = req.body || {};
    await db.prepare(`
      UPDATE brands SET
        name=@name, name_ar=@name_ar, logo=@logo, banner=@banner, description=@description,
        website=@website, country=@country, featured=@featured, is_active=@is_active,
        seo_title=@seo_title, seo_desc=@seo_desc, updated_at=NOW()
      WHERE id=@id
    `).run({
      id: existing.id,
      name: b.name != null ? b.name.trim() : existing.name,
      name_ar: b.nameAr != null ? b.nameAr : existing.name_ar,
      logo: b.logo != null ? b.logo : existing.logo,
      banner: b.banner != null ? b.banner : existing.banner,
      description: b.description != null ? b.description : existing.description,
      website: b.website != null ? b.website : existing.website,
      country: b.country != null ? b.country : existing.country,
      featured: b.featured != null ? !!b.featured : existing.featured,
      is_active: b.isActive != null ? !!b.isActive : existing.is_active,
      seo_title: b.seoTitle != null ? b.seoTitle : existing.seo_title,
      seo_desc: b.seoDesc != null ? b.seoDesc : existing.seo_desc
    });
    logActivity(req, { action: 'brand.update', entityType: 'brand', entityId: existing.id, description: `Updated brand "${existing.name}".` });
    const updated = await db.prepare('SELECT * FROM brands WHERE id = ?').get(existing.id);
    res.json(await withStats(updated));
  } catch (e) { next(e); }
});

router.delete('/:id', requireAuth, requirePermission('products'), async (req, res, next) => {
  try {
    const existing = await db.prepare('SELECT * FROM brands WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Brand not found.' });
    const inUseRow = await db.prepare('SELECT COUNT(*) c FROM products WHERE brand_id = ?').get(existing.id);
    if (Number(inUseRow.c) > 0) {
      await db.prepare('UPDATE brands SET is_active = FALSE, updated_at = NOW() WHERE id = ?').run(existing.id);
      return res.json({ disabled: true, reason: 'Brand has products — disabled instead of deleted.' });
    }
    await db.prepare('DELETE FROM brands WHERE id = ?').run(existing.id);
    logActivity(req, { action: 'brand.delete', entityType: 'brand', entityId: existing.id, description: `Deleted brand "${existing.name}".` });
    res.json({ deleted: true });
  } catch (e) { next(e); }
});

module.exports = router;
