const express = require('express');
const { db } = require('../db');
const { requireAuth, requirePermission, logActivity } = require('../middleware/auth');

const router = express.Router();

function slugify(s) {
  return String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function withProductCount(c) {
  const count = db.prepare(`
    SELECT COUNT(*) n FROM product_categories pc
    JOIN products p ON p.id = pc.product_id
    WHERE pc.category_id = ? AND p.status != 'archived'
  `).get(c.id).n;
  return {
    id: c.id, slug: c.slug, name: c.name, description: c.description,
    image: c.image, heroImage: c.hero_image, banner: c.banner,
    seoTitle: c.seo_title, seoDesc: c.seo_desc,
    isActive: !!c.is_active, sortOrder: c.sort_order, productCount: count,
    createdAt: c.created_at, updatedAt: c.updated_at
  };
}

router.get('/', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM categories ORDER BY sort_order, id').all();
  res.json(rows.map(withProductCount));
});

router.post('/', requireAuth, requirePermission('products'), (req, res) => {
  const b = req.body || {};
  if (!b.name || !b.name.trim()) return res.status(400).json({ error: 'Category name is required.' });
  let slug = slugify(b.slug || b.name);
  if (db.prepare('SELECT id FROM categories WHERE slug = ?').get(slug)) {
    return res.status(400).json({ error: 'A category with this slug already exists.' });
  }
  const maxOrder = db.prepare('SELECT COALESCE(MAX(sort_order),-1) m FROM categories').get().m;
  const result = db.prepare(`
    INSERT INTO categories (slug, name, description, image, hero_image, banner, seo_title, seo_desc, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(slug, b.name.trim(), b.description || null, b.image || null, b.heroImage || null,
         b.banner || null, b.seoTitle || null, b.seoDesc || null, maxOrder + 1);
  logActivity(req, { action: 'category.create', entityType: 'category', entityId: result.lastInsertRowid, description: `Created category "${b.name}".` });
  res.status(201).json(withProductCount(db.prepare('SELECT * FROM categories WHERE id = ?').get(result.lastInsertRowid)));
});

router.put('/:id', requireAuth, requirePermission('products'), (req, res) => {
  const existing = db.prepare('SELECT * FROM categories WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Category not found.' });
  const b = req.body || {};
  db.prepare(`
    UPDATE categories SET
      name=@name, description=@description, image=@image, hero_image=@hero_image, banner=@banner,
      seo_title=@seo_title, seo_desc=@seo_desc, is_active=@is_active, updated_at=datetime('now')
    WHERE id=@id
  `).run({
    id: existing.id,
    name: b.name != null ? b.name.trim() : existing.name,
    description: b.description != null ? b.description : existing.description,
    image: b.image != null ? b.image : existing.image,
    hero_image: b.heroImage != null ? b.heroImage : existing.hero_image,
    banner: b.banner != null ? b.banner : existing.banner,
    seo_title: b.seoTitle != null ? b.seoTitle : existing.seo_title,
    seo_desc: b.seoDesc != null ? b.seoDesc : existing.seo_desc,
    is_active: b.isActive != null ? (b.isActive ? 1 : 0) : existing.is_active
  });
  logActivity(req, { action: 'category.update', entityType: 'category', entityId: existing.id, description: `Updated category "${existing.name}".` });
  res.json(withProductCount(db.prepare('SELECT * FROM categories WHERE id = ?').get(existing.id)));
});

router.post('/reorder', requireAuth, requirePermission('products'), (req, res) => {
  const { orderedIds } = req.body || {};
  if (!Array.isArray(orderedIds)) return res.status(400).json({ error: 'orderedIds must be an array.' });
  const stmt = db.prepare('UPDATE categories SET sort_order = ? WHERE id = ?');
  orderedIds.forEach((id, i) => stmt.run(i, id));
  logActivity(req, { action: 'category.reorder', entityType: 'category', description: 'Reordered categories.' });
  res.json({ ok: true });
});

router.delete('/:id', requireAuth, requirePermission('products'), (req, res) => {
  const existing = db.prepare('SELECT * FROM categories WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Category not found.' });
  const inUse = db.prepare('SELECT COUNT(*) c FROM product_categories WHERE category_id = ?').get(existing.id).c;
  if (inUse > 0) {
    db.prepare('UPDATE categories SET is_active = 0, updated_at = datetime(\'now\') WHERE id = ?').run(existing.id);
    return res.json({ disabled: true, reason: 'Category has products — disabled instead of deleted.' });
  }
  db.prepare('DELETE FROM categories WHERE id = ?').run(existing.id);
  logActivity(req, { action: 'category.delete', entityType: 'category', entityId: existing.id, description: `Deleted category "${existing.name}".` });
  res.json({ deleted: true });
});

module.exports = router;
