const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { db, withTransaction } = require('../db');
const { requireAuth, requirePermission, logActivity } = require('../middleware/auth');

const router = express.Router();

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, crypto.randomBytes(16).toString('hex') + ext);
  }
});
const ALLOWED_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);
const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED_EXT.has(ext)) return cb(new Error('Unsupported image type.'));
    cb(null, true);
  }
});

function slugify(s) {
  return String(s).toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function uniqueSlug(base, ignoreId) {
  let slug = slugify(base) || 'product';
  let n = 1;
  while (true) {
    const row = await db.prepare('SELECT id FROM products WHERE slug = ?').get(slug);
    if (!row || row.id === ignoreId) return slug;
    n += 1;
    slug = slugify(base) + '-' + n;
  }
}

async function serializeProduct(p) {
  const variants = await db.prepare(`
    SELECT * FROM product_variants WHERE product_id = ? ORDER BY sort_order, id
  `).all(p.id);
  const images = await db.prepare(`
    SELECT * FROM product_images WHERE product_id = ? ORDER BY sort_order, id
  `).all(p.id);
  const categories = await db.prepare(`
    SELECT c.id, c.slug, c.name, pc.is_primary
    FROM product_categories pc JOIN categories c ON c.id = pc.category_id
    WHERE pc.product_id = ? ORDER BY pc.is_primary DESC
  `).all(p.id);
  const brand = p.brand_id
    ? await db.prepare('SELECT id, name, slug FROM brands WHERE id = ?').get(p.brand_id)
    : null;

  return {
    id: p.id, slug: p.slug, name: p.name, nameAr: p.name_ar,
    brand, type: p.type, sku: p.sku, barcode: p.barcode,
    description: p.description, shortDescription: p.short_description,
    gender: p.gender, family: p.family, origin: p.origin, year: p.year,
    notes: { top: p.notes_top, heart: p.notes_heart, base: p.notes_base },
    tagHtml: p.tag_html, costPrice: p.cost_price, weight: p.weight,
    rating: p.rating, reviewsCount: p.reviews_count,
    status: p.status, featured: !!p.featured, bestSeller: !!p.best_seller,
    newArrival: !!p.new_arrival, onSale: !!p.on_sale,
    discountPercent: p.discount_percent, discountActive: !!p.discount_active,
    lowStockThreshold: p.low_stock_threshold, videoUrl: p.video_url,
    seoTitle: p.seo_title, seoDesc: p.seo_desc,
    createdAt: p.created_at, updatedAt: p.updated_at,
    categories,
    variants: variants.map(v => ({
      id: v.id, size: v.size, sku: v.sku, price: v.price,
      compareAtPrice: v.compare_at_price, stock: v.stock, reserved: v.reserved,
      available: v.stock - v.reserved, isDefault: !!v.is_default, sortOrder: v.sort_order
    })),
    images: images.map(img => ({ id: img.id, url: img.url, sortOrder: img.sort_order, isMain: !!img.is_main }))
  };
}

/* ---------- list (search, filter, sort, pagination) ---------- */

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const {
      q, status, category, brand, bestSeller, onSale, lowStock,
      page = 1, pageSize = 20, sort = 'created_desc'
    } = req.query;

    const where = [];
    const params = {};

    if (q) { where.push('(p.name LIKE @q OR p.sku LIKE @q OR p.slug LIKE @q)'); params.q = '%' + q + '%'; }
    if (status) { where.push('p.status = @status'); params.status = status; }
    if (brand) { where.push('p.brand_id = @brand'); params.brand = brand; }
    if (bestSeller === 'true') where.push('p.best_seller = TRUE');
    if (onSale === 'true') where.push('(p.discount_active = TRUE OR p.on_sale = TRUE)');
    if (category) {
      where.push('EXISTS (SELECT 1 FROM product_categories pc JOIN categories c ON c.id = pc.category_id WHERE pc.product_id = p.id AND c.slug = @category)');
      params.category = category;
    }
    if (lowStock === 'true') {
      where.push('EXISTS (SELECT 1 FROM product_variants v WHERE v.product_id = p.id AND (v.stock - v.reserved) <= p.low_stock_threshold)');
    }

    const whereSql = where.length ? 'WHERE ' + where.join(' AND ') : '';

    const sortMap = {
      created_desc: 'p.created_at DESC',
      created_asc: 'p.created_at ASC',
      name_asc: 'p.name ASC',
      name_desc: 'p.name DESC'
    };
    const orderSql = sortMap[sort] || sortMap.created_desc;

    const total = Number((await db.prepare(`SELECT COUNT(*) c FROM products p ${whereSql}`).get(params)).c);

    const limit = Math.min(100, Math.max(1, Number(pageSize) || 20));
    const offset = (Math.max(1, Number(page) || 1) - 1) * limit;

    const rows = await db.prepare(`
      SELECT p.* FROM products p ${whereSql} ORDER BY ${orderSql} LIMIT @limit OFFSET @offset
    `).all({ ...params, limit, offset });

    const items = await Promise.all(rows.map(serializeProduct));
    res.json({ total, page: Number(page), pageSize: limit, items });
  } catch (e) { next(e); }
});

/* ---------- single ---------- */

router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const p = await db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!p) return res.status(404).json({ error: 'Product not found.' });
    res.json(await serializeProduct(p));
  } catch (e) { next(e); }
});

/* ---------- create ---------- */

router.post('/', requireAuth, requirePermission('products'), async (req, res, next) => {
  try {
    const b = req.body || {};
    if (!b.name || !b.name.trim()) return res.status(400).json({ error: 'Product name is required.' });
    if (!Array.isArray(b.variants) || b.variants.length === 0) {
      return res.status(400).json({ error: 'At least one size/price variant is required.' });
    }
    for (const v of b.variants) {
      if (!v.size || !String(v.size).trim()) return res.status(400).json({ error: 'Every variant needs a size.' });
      if (v.price == null || Number(v.price) <= 0) return res.status(400).json({ error: 'Every variant needs a price greater than 0.' });
    }

    const slug = await uniqueSlug(b.slug || b.name);

    const productId = await withTransaction(async (tdb) => {
      const result = await tdb.prepare(`
        INSERT INTO products (
          slug, name, name_ar, brand_id, type, sku, barcode, description, short_description,
          gender, family, origin, year, notes_top, notes_heart, notes_base, tag_html,
          cost_price, weight, status, featured, best_seller, new_arrival, on_sale,
          discount_percent, discount_active, low_stock_threshold, video_url, seo_title, seo_desc
        ) VALUES (@slug, @name, @name_ar, @brand_id, @type, @sku, @barcode, @description, @short_description,
          @gender, @family, @origin, @year, @notes_top, @notes_heart, @notes_base, @tag_html,
          @cost_price, @weight, @status, @featured, @best_seller, @new_arrival, @on_sale,
          @discount_percent, @discount_active, @low_stock_threshold, @video_url, @seo_title, @seo_desc)
      `).run({
        slug, name: b.name.trim(), name_ar: b.nameAr || null,
        brand_id: b.brandId || null, type: b.type || null, sku: b.sku || null, barcode: b.barcode || null,
        description: b.description || null, short_description: b.shortDescription || null,
        gender: b.gender || null, family: b.family || null, origin: b.origin || null, year: b.year || null,
        notes_top: (b.notes && b.notes.top) || null, notes_heart: (b.notes && b.notes.heart) || null,
        notes_base: (b.notes && b.notes.base) || null, tag_html: b.tagHtml || null,
        cost_price: b.costPrice || null, weight: b.weight || null,
        status: b.status || 'published', featured: !!b.featured, best_seller: !!b.bestSeller,
        new_arrival: !!b.newArrival, on_sale: !!b.onSale,
        discount_percent: b.discountPercent || 0, discount_active: !!b.discountActive,
        low_stock_threshold: b.lowStockThreshold != null ? b.lowStockThreshold : 5,
        video_url: b.videoUrl || null, seo_title: b.seoTitle || null, seo_desc: b.seoDesc || null
      });
      const newProductId = result.lastInsertRowid;

      const catIds = b.categoryIds || [];
      for (let i = 0; i < catIds.length; i++) {
        await tdb.prepare('INSERT INTO product_categories (product_id, category_id, is_primary) VALUES (?, ?, ?)')
          .run(newProductId, catIds[i], i === 0);
      }

      for (let i = 0; i < b.variants.length; i++) {
        const v = b.variants[i];
        await tdb.prepare(`
          INSERT INTO product_variants (product_id, size, sku, price, compare_at_price, stock, is_default, sort_order)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(newProductId, String(v.size).trim(), v.sku || null, Number(v.price), v.compareAtPrice || null,
               Number(v.stock) || 0, v.isDefault ? true : (i === 0), i);
      }

      const images = b.images || [];
      for (let i = 0; i < images.length; i++) {
        await tdb.prepare('INSERT INTO product_images (product_id, url, sort_order, is_main) VALUES (?, ?, ?, ?)')
          .run(newProductId, images[i].url, i, i === 0);
      }

      return newProductId;
    });

    logActivity(req, { action: 'product.create', entityType: 'product', entityId: productId, description: `Created product "${b.name}".` });
    const created = await db.prepare('SELECT * FROM products WHERE id = ?').get(productId);
    res.status(201).json(await serializeProduct(created));
  } catch (e) { next(e); }
});

/* ---------- update ---------- */

router.put('/:id', requireAuth, requirePermission('products'), async (req, res, next) => {
  try {
    const existing = await db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Product not found.' });

    const b = req.body || {};
    if (Array.isArray(b.variants)) {
      for (const v of b.variants) {
        if (!v.size || !String(v.size).trim()) return res.status(400).json({ error: 'Every variant needs a size.' });
        if (v.price == null || Number(v.price) <= 0) return res.status(400).json({ error: 'Every variant needs a price greater than 0.' });
      }
    }

    const slug = (b.name && b.name.trim() !== existing.name) ? await uniqueSlug(b.slug || b.name, existing.id) : existing.slug;

    await withTransaction(async (tdb) => {
      await tdb.prepare(`
        UPDATE products SET
          slug=@slug, name=@name, name_ar=@name_ar, brand_id=@brand_id, type=@type, sku=@sku, barcode=@barcode,
          description=@description, short_description=@short_description, gender=@gender, family=@family,
          origin=@origin, year=@year, notes_top=@notes_top, notes_heart=@notes_heart, notes_base=@notes_base,
          tag_html=@tag_html, cost_price=@cost_price, weight=@weight, status=@status, featured=@featured,
          best_seller=@best_seller, new_arrival=@new_arrival, on_sale=@on_sale, discount_percent=@discount_percent,
          discount_active=@discount_active, low_stock_threshold=@low_stock_threshold, video_url=@video_url,
          seo_title=@seo_title, seo_desc=@seo_desc, updated_at=NOW()
        WHERE id=@id
      `).run({
        id: existing.id, slug,
        name: b.name != null ? b.name.trim() : existing.name,
        name_ar: b.nameAr != null ? b.nameAr : existing.name_ar,
        brand_id: b.brandId != null ? b.brandId : existing.brand_id,
        type: b.type != null ? b.type : existing.type,
        sku: b.sku != null ? b.sku : existing.sku,
        barcode: b.barcode != null ? b.barcode : existing.barcode,
        description: b.description != null ? b.description : existing.description,
        short_description: b.shortDescription != null ? b.shortDescription : existing.short_description,
        gender: b.gender != null ? b.gender : existing.gender,
        family: b.family != null ? b.family : existing.family,
        origin: b.origin != null ? b.origin : existing.origin,
        year: b.year != null ? b.year : existing.year,
        notes_top: b.notes ? b.notes.top : existing.notes_top,
        notes_heart: b.notes ? b.notes.heart : existing.notes_heart,
        notes_base: b.notes ? b.notes.base : existing.notes_base,
        tag_html: b.tagHtml != null ? b.tagHtml : existing.tag_html,
        cost_price: b.costPrice != null ? b.costPrice : existing.cost_price,
        weight: b.weight != null ? b.weight : existing.weight,
        status: b.status != null ? b.status : existing.status,
        featured: b.featured != null ? !!b.featured : existing.featured,
        best_seller: b.bestSeller != null ? !!b.bestSeller : existing.best_seller,
        new_arrival: b.newArrival != null ? !!b.newArrival : existing.new_arrival,
        on_sale: b.onSale != null ? !!b.onSale : existing.on_sale,
        discount_percent: b.discountPercent != null ? b.discountPercent : existing.discount_percent,
        discount_active: b.discountActive != null ? !!b.discountActive : existing.discount_active,
        low_stock_threshold: b.lowStockThreshold != null ? b.lowStockThreshold : existing.low_stock_threshold,
        video_url: b.videoUrl != null ? b.videoUrl : existing.video_url,
        seo_title: b.seoTitle != null ? b.seoTitle : existing.seo_title,
        seo_desc: b.seoDesc != null ? b.seoDesc : existing.seo_desc
      });

      if (Array.isArray(b.categoryIds)) {
        await tdb.prepare('DELETE FROM product_categories WHERE product_id = ?').run(existing.id);
        for (let i = 0; i < b.categoryIds.length; i++) {
          await tdb.prepare('INSERT INTO product_categories (product_id, category_id, is_primary) VALUES (?, ?, ?)')
            .run(existing.id, b.categoryIds[i], i === 0);
        }
      }

      if (Array.isArray(b.variants)) {
        const keepIds = b.variants.filter(v => v.id).map(v => v.id);
        if (keepIds.length) {
          const placeholders = keepIds.map(() => '?').join(',');
          await tdb.prepare(`DELETE FROM product_variants WHERE product_id = ? AND id NOT IN (${placeholders})`).run(existing.id, ...keepIds);
        } else {
          await tdb.prepare('DELETE FROM product_variants WHERE product_id = ?').run(existing.id);
        }
        for (let i = 0; i < b.variants.length; i++) {
          const v = b.variants[i];
          if (v.id) {
            await tdb.prepare(`
              UPDATE product_variants SET size=?, sku=?, price=?, compare_at_price=?, stock=?, is_default=?, sort_order=?, updated_at=NOW()
              WHERE id=? AND product_id=?
            `).run(String(v.size).trim(), v.sku || null, Number(v.price), v.compareAtPrice || null,
                   Number(v.stock) || 0, !!v.isDefault, i, v.id, existing.id);
          } else {
            await tdb.prepare(`
              INSERT INTO product_variants (product_id, size, sku, price, compare_at_price, stock, is_default, sort_order)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `).run(existing.id, String(v.size).trim(), v.sku || null, Number(v.price), v.compareAtPrice || null,
                   Number(v.stock) || 0, !!v.isDefault, i);
          }
        }
      }

      if (Array.isArray(b.images)) {
        await tdb.prepare('DELETE FROM product_images WHERE product_id = ?').run(existing.id);
        for (let i = 0; i < b.images.length; i++) {
          await tdb.prepare('INSERT INTO product_images (product_id, url, sort_order, is_main) VALUES (?, ?, ?, ?)')
            .run(existing.id, b.images[i].url, i, i === 0);
        }
      }
    });

    logActivity(req, { action: 'product.update', entityType: 'product', entityId: existing.id, description: `Updated product "${existing.name}".` });
    const updated = await db.prepare('SELECT * FROM products WHERE id = ?').get(existing.id);
    res.json(await serializeProduct(updated));
  } catch (e) { next(e); }
});

/* ---------- duplicate ---------- */

router.post('/:id/duplicate', requireAuth, requirePermission('products'), async (req, res, next) => {
  try {
    const existing = await db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Product not found.' });

    const newId = await withTransaction(async (tdb) => {
      const slug = await uniqueSlug(existing.name + '-copy');
      const result = await tdb.prepare(`
        INSERT INTO products (slug, name, name_ar, brand_id, type, sku, barcode, description, short_description,
          gender, family, origin, year, notes_top, notes_heart, notes_base, tag_html, cost_price, weight,
          status, featured, best_seller, new_arrival, on_sale, discount_percent, discount_active,
          low_stock_threshold, video_url, seo_title, seo_desc)
        SELECT ?, name || ' (Copy)', name_ar, brand_id, type, sku, barcode, description, short_description,
          gender, family, origin, year, notes_top, notes_heart, notes_base, tag_html, cost_price, weight,
          'draft', FALSE, FALSE, new_arrival, on_sale, discount_percent, discount_active,
          low_stock_threshold, video_url, seo_title, seo_desc
        FROM products WHERE id = ?
      `).run(slug, existing.id);
      const duplicatedId = result.lastInsertRowid;

      await tdb.prepare(`
        INSERT INTO product_categories (product_id, category_id, is_primary)
        SELECT ?, category_id, is_primary FROM product_categories WHERE product_id = ?
      `).run(duplicatedId, existing.id);

      await tdb.prepare(`
        INSERT INTO product_variants (product_id, size, sku, price, compare_at_price, stock, is_default, sort_order)
        SELECT ?, size, sku, price, compare_at_price, 0, is_default, sort_order FROM product_variants WHERE product_id = ?
      `).run(duplicatedId, existing.id);

      await tdb.prepare(`
        INSERT INTO product_images (product_id, url, sort_order, is_main)
        SELECT ?, url, sort_order, is_main FROM product_images WHERE product_id = ?
      `).run(duplicatedId, existing.id);

      return duplicatedId;
    });

    logActivity(req, { action: 'product.duplicate', entityType: 'product', entityId: newId, description: `Duplicated product "${existing.name}".` });
    const created = await db.prepare('SELECT * FROM products WHERE id = ?').get(newId);
    res.status(201).json(await serializeProduct(created));
  } catch (e) { next(e); }
});

/* ---------- delete / archive ---------- */

router.delete('/:id', requireAuth, requirePermission('products'), async (req, res, next) => {
  try {
    const existing = await db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Product not found.' });

    const usedInOrders = Number((await db.prepare('SELECT COUNT(*) c FROM order_items WHERE product_id = ?').get(existing.id)).c);
    if (usedInOrders > 0) {
      await db.prepare('UPDATE products SET status = ?, updated_at = NOW() WHERE id = ?').run('archived', existing.id);
      logActivity(req, { action: 'product.archive', entityType: 'product', entityId: existing.id, description: `Archived product "${existing.name}" (has existing orders).` });
      return res.json({ archived: true });
    }

    await db.prepare('DELETE FROM products WHERE id = ?').run(existing.id);
    logActivity(req, { action: 'product.delete', entityType: 'product', entityId: existing.id, description: `Deleted product "${existing.name}".` });
    res.json({ deleted: true });
  } catch (e) { next(e); }
});

/* ---------- bulk actions ---------- */

router.post('/bulk', requireAuth, requirePermission('products'), async (req, res, next) => {
  try {
    const { ids, action, value } = req.body || {};
    if (!Array.isArray(ids) || !ids.length) return res.status(400).json({ error: 'No products selected.' });
    const placeholders = ids.map(() => '?').join(',');

    const actions = {
      delete: () => db.prepare(`DELETE FROM products WHERE id IN (${placeholders})`).run(...ids),
      archive: () => db.prepare(`UPDATE products SET status='archived', updated_at=NOW() WHERE id IN (${placeholders})`).run(...ids),
      publish: () => db.prepare(`UPDATE products SET status='published', updated_at=NOW() WHERE id IN (${placeholders})`).run(...ids),
      unpublish: () => db.prepare(`UPDATE products SET status='draft', updated_at=NOW() WHERE id IN (${placeholders})`).run(...ids),
      set_brand: () => db.prepare(`UPDATE products SET brand_id=?, updated_at=NOW() WHERE id IN (${placeholders})`).run(value, ...ids),
      set_category: () => withTransaction(async (tdb) => {
        await tdb.prepare(`DELETE FROM product_categories WHERE product_id IN (${placeholders})`).run(...ids);
        for (const id of ids) {
          await tdb.prepare('INSERT INTO product_categories (product_id, category_id, is_primary) VALUES (?, ?, TRUE)').run(id, value);
        }
      }),
      set_price: () => db.prepare(`UPDATE product_variants SET price=?, updated_at=NOW() WHERE product_id IN (${placeholders})`).run(value, ...ids),
      adjust_stock: () => db.prepare(`UPDATE product_variants SET stock = GREATEST(0, stock + ?), updated_at=NOW() WHERE product_id IN (${placeholders})`).run(value, ...ids),
      set_best_seller: () => db.prepare(`UPDATE products SET best_seller=?, updated_at=NOW() WHERE id IN (${placeholders})`).run(!!value, ...ids)
    };

    if (!actions[action]) return res.status(400).json({ error: 'Unknown bulk action.' });
    await actions[action]();

    logActivity(req, { action: 'product.bulk_' + action, entityType: 'product', entityId: ids.join(','), description: `Bulk action "${action}" applied to ${ids.length} product(s).` });
    res.json({ ok: true, affected: ids.length });
  } catch (e) { next(e); }
});

/* ---------- image upload ---------- */

router.post('/upload-image', requireAuth, requirePermission('products'), (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No image uploaded.' });
    res.json({ url: 'uploads/' + req.file.filename });
  });
});

module.exports = router;
