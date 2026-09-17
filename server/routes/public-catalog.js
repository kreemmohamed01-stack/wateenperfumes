const express = require('express');
const { db } = require('../db');

const router = express.Router();

async function settingsMap() {
  const rows = await db.prepare('SELECT key, value FROM settings').all();
  const obj = {};
  rows.forEach(r => { obj[r.key] = r.value; });
  return obj;
}

// mirrors the shape the frontend catalog.js array used, so hero.js/checkout.js
// keep working unmodified, but now every number is live from the database.
function toLegacyShape(p, settings) {
  const globalSaleOn = settings.global_sale_enabled === 'true';
  const globalSalePct = Number(settings.global_sale_percent || 0);

  const variants = p.variants.map(v => {
    let price = v.price;
    let compareAt = v.compareAtPrice || null;
    const pctOff = p.discountActive ? p.discountPercent : (globalSaleOn ? globalSalePct : 0);
    if (pctOff > 0) {
      compareAt = compareAt || v.price;
      price = Math.round(v.price * (1 - pctOff / 100));
    }
    return { size: v.size, price, compareAtPrice: compareAt, stock: v.available };
  });

  const defaultVariant = variants.find((v, i) => p.variants[i].isDefault) || variants[0];
  const primaryCat = p.categories.find(c => c.is_primary) || p.categories[0];
  const extraCats = p.categories.filter(c => c !== primaryCat).map(c => c.slug);

  const stock = p.variants.reduce((sum, v) => sum + Math.max(v.available, 0), 0);
  const lowStockThreshold = p.lowStockThreshold != null ? p.lowStockThreshold : 5;

  return {
    id: p.slug, dbId: p.id,
    brand: p.brand ? p.brand.name : '', brandId: p.brand ? p.brand.id : null,
    brandAr: p.brand ? p.brand.name_ar : '',
    name: p.name, nameAr: p.nameAr, type: p.type,
    size: defaultVariant ? defaultVariant.size : '', sizes: variants.map(v => v.size),
    variants,
    price: defaultVariant ? defaultVariant.price : 0,
    compareAtPrice: defaultVariant ? defaultVariant.compareAtPrice : null,
    rating: '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating)),
    reviews: p.reviewsCount,
    cat: primaryCat ? primaryCat.slug : null,
    extraCats,
    img: p.images[0] ? p.images[0].url : '',
    img2: p.images[1] ? p.images[1].url : (p.images[0] ? p.images[0].url : ''),
    images: p.images.map(i => i.url),
    desc: p.description, descAr: p.descriptionAr,
    catAr: primaryCat ? primaryCat.name_ar : null,
    notes: p.notes, family: p.family, year: p.year, origin: p.origin,
    sku: p.sku, gender: p.gender, tag: p.tagHtml,
    bestSeller: p.bestSeller, featured: p.featured, newArrival: p.newArrival,
    onSale: (p.discountActive && p.discountPercent > 0) || globalSaleOn,
    stock, lowStockThreshold,
    isLowStock: stock > 0 && stock <= lowStockThreshold
  };
}

// same serializer used in products.js, duplicated minimally here to avoid a
// circular require between the admin and public route modules
function assembleProduct(row, variantsByProduct, imagesByProduct, categoriesByProduct, brandsById) {
  const brand = row.brand_id ? (brandsById.get(row.brand_id) || null) : null;
  const variants = variantsByProduct.get(row.id) || [];
  const images = imagesByProduct.get(row.id) || [];
  const categories = categoriesByProduct.get(row.id) || [];

  return {
    id: row.id, slug: row.slug, name: row.name, nameAr: row.name_ar, brand, type: row.type, sku: row.sku,
    description: row.description, descriptionAr: row.description_ar,
    gender: row.gender, family: row.family, origin: row.origin, year: row.year,
    notes: { top: row.notes_top, heart: row.notes_heart, base: row.notes_base }, tagHtml: row.tag_html,
    rating: row.rating, reviewsCount: row.reviews_count, bestSeller: !!row.best_seller,
    featured: !!row.featured, newArrival: !!row.new_arrival, discountPercent: row.discount_percent,
    discountActive: !!row.discount_active, lowStockThreshold: row.low_stock_threshold,
    categories,
    variants: variants.map(v => ({
      isDefault: !!v.is_default, size: v.size, price: v.price, compareAtPrice: v.compare_at_price,
      available: v.stock - v.reserved
    })),
    images
  };
}

// loads every product's variants/images/categories/brand in 4 bulk queries
// total instead of 4 per product — the previous per-product approach meant
// a 356-product catalog issued 1,400+ individual database round trips for
// a single page load, which is what made every storefront page feel slow.
async function loadAllProductRelations(productIds) {
  if (!productIds.length) {
    return { variantsByProduct: new Map(), imagesByProduct: new Map(), categoriesByProduct: new Map(), brandsById: new Map() };
  }
  const placeholders = productIds.map(() => '?').join(',');

  const [variants, images, categoryLinks, brands] = await Promise.all([
    db.prepare(`SELECT * FROM product_variants WHERE product_id IN (${placeholders}) ORDER BY sort_order, id`).all(...productIds),
    db.prepare(`SELECT * FROM product_images WHERE product_id IN (${placeholders}) ORDER BY sort_order, id`).all(...productIds),
    db.prepare(`
      SELECT pc.product_id, c.id, c.slug, c.name, c.name_ar, pc.is_primary FROM product_categories pc
      JOIN categories c ON c.id = pc.category_id WHERE pc.product_id IN (${placeholders}) ORDER BY pc.is_primary DESC
    `).all(...productIds),
    db.prepare('SELECT id, name, name_ar FROM brands').all()
  ]);

  const variantsByProduct = new Map();
  variants.forEach(v => {
    if (!variantsByProduct.has(v.product_id)) variantsByProduct.set(v.product_id, []);
    variantsByProduct.get(v.product_id).push(v);
  });

  const imagesByProduct = new Map();
  images.forEach(i => {
    if (!imagesByProduct.has(i.product_id)) imagesByProduct.set(i.product_id, []);
    imagesByProduct.get(i.product_id).push(i);
  });

  const categoriesByProduct = new Map();
  categoryLinks.forEach(c => {
    if (!categoriesByProduct.has(c.product_id)) categoriesByProduct.set(c.product_id, []);
    categoriesByProduct.get(c.product_id).push(c);
  });

  const brandsById = new Map(brands.map(b => [b.id, b]));

  return { variantsByProduct, imagesByProduct, categoriesByProduct, brandsById };
}

router.get('/catalog', async (req, res, next) => {
  try {
    const settings = await settingsMap();
    const rows = await db.prepare(`SELECT * FROM products WHERE status = 'published'`).all();
    const relations = await loadAllProductRelations(rows.map(r => r.id));
    const fullProducts = rows.map(row => assembleProduct(
      row, relations.variantsByProduct, relations.imagesByProduct, relations.categoriesByProduct, relations.brandsById
    ));
    res.json(fullProducts.map(p => toLegacyShape(p, settings)));
  } catch (e) { next(e); }
});

router.get('/catalog/:slug', async (req, res, next) => {
  try {
    const row = await db.prepare(`SELECT * FROM products WHERE slug = ? AND status = 'published'`).get(req.params.slug);
    if (!row) return res.status(404).json({ error: 'Product not found.' });
    const relations = await loadAllProductRelations([row.id]);
    const full = assembleProduct(row, relations.variantsByProduct, relations.imagesByProduct, relations.categoriesByProduct, relations.brandsById);
    res.json(toLegacyShape(full, await settingsMap()));
  } catch (e) { next(e); }
});

router.get('/categories', async (req, res, next) => {
  try {
    const rows = await db.prepare('SELECT * FROM categories WHERE is_active = TRUE ORDER BY sort_order').all();
    res.json(rows.map(c => ({
      slug: c.slug, name: c.name, description: c.description,
      image: c.image, heroImage: c.hero_image, banner: c.banner
    })));
  } catch (e) { next(e); }
});

router.get('/brands', async (req, res, next) => {
  try {
    const rows = await db.prepare('SELECT * FROM brands WHERE is_active = TRUE ORDER BY sort_order, name').all();
    res.json(rows.map(b => ({
      slug: b.slug, name: b.name, nameAr: b.name_ar, logo: b.logo, banner: b.banner,
      description: b.description, featured: !!b.featured
    })));
  } catch (e) { next(e); }
});

module.exports = router;
