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
    return { id: v.id, size: v.size, price, compareAtPrice: compareAt, stock: v.available };
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
      id: v.id, isDefault: !!v.is_default, size: v.size, price: v.price, compareAtPrice: v.compare_at_price,
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

// Fields that ship on a single product (via /catalog/:slug) but are dead
// weight in the full 400+ product list every page downloads before it can
// render. Dropping them here is purely a transfer-size win:
//   variants — no frontend code reads it at all; every product currently
//              has exactly one variant and its price/size/stock are
//              already present as top-level fields.
//   images   — the only reader is product.html's JSON-LD, which is
//              already written to fall back to `img` when it's absent.
//   desc/descAr/notes — long-form copy shown only on the product page.
//              That page now hydrates them for the one product being
//              viewed via /catalog/:slug (see hydrateProductCopy in
//              product.html), so the other ~400 products' worth of prose
//              no longer has to reach every visitor before the site can
//              render. Nothing else reads them: search ranks on
//              name/brand/category/family/type, and the listing pages
//              never touch them.
//   sku      — shown only in the product page's details table, and
//              arrives with the same hydration fetch.
const BULK_OMIT_FIELDS = ['variants', 'images', 'desc', 'descAr', 'notes', 'sku'];

// shared by /catalog and /bootstrap so both return identical shapes
// opts.keepVariants: order pricing (routes/orders.js) needs each product's
// variants with their real prices; the storefront payload drops them to stay small
async function buildCatalog(settings, opts = {}) {
  const rows = await db.prepare(`SELECT * FROM products WHERE status = 'published'`).all();
  const relations = await loadAllProductRelations(rows.map(r => r.id));
  const fullProducts = rows.map(row => assembleProduct(
    row, relations.variantsByProduct, relations.imagesByProduct, relations.categoriesByProduct, relations.brandsById
  ));
  return fullProducts.map(p => {
    const shaped = toLegacyShape(p, settings);
    BULK_OMIT_FIELDS.forEach(f => { if (!(opts.keepVariants && f === 'variants')) delete shaped[f]; });
    return shaped;
  });
}

// mirrors settings.js's publicSettings() response shape exactly, so
// /bootstrap's `settings` field is a drop-in replacement for a separate
// call to /api/public/settings.
function toPublicSettingsShape(s) {
  return {
    storeName: s.store_name, currency: s.store_currency,
    freeShippingThreshold: Number(s.free_shipping_threshold || 1000),
    defaultShippingFee: Number(s.default_shipping_fee || 80),
    globalSaleEnabled: s.global_sale_enabled === 'true',
    globalSalePercent: Number(s.global_sale_percent || 0),
    codEnabled: s.cod_enabled !== 'false',
    instapayEnabled: s.instapay_enabled !== 'false',
    cardEnabled: s.card_enabled !== 'false',
    instapayNumber: s.instapay_number,
    shippingRatesByGovernorate: JSON.parse(s.shipping_rates_by_governorate || '{}'),
    watchesFreeShipping: s.watches_free_shipping !== 'false',
    announcementText: s.announcement_text || '',
    announcementEnabled: s.announcement_enabled !== 'false',
    heroTitle: s.hero_title || '',
    heroSubtitle: s.hero_subtitle || '',
    social: {
      instagram: s.social_instagram, facebook: s.social_facebook,
      whatsapp: s.social_whatsapp, tiktok: s.social_tiktok
    }
  };
}

// mirrors coupons.js's featuredPublic() response shape exactly.
async function loadFeaturedCoupon() {
  const coupon = await db.prepare(`
    SELECT * FROM coupons WHERE is_featured = TRUE AND is_active = TRUE
    AND (starts_at IS NULL OR starts_at <= NOW())
    AND (expires_at IS NULL OR expires_at >= NOW())
    LIMIT 1
  `).get();
  if (!coupon) return null;
  return {
    code: coupon.code, type: coupon.type, amount: coupon.amount,
    label: coupon.type === 'percent' ? `${coupon.amount}% OFF` : coupon.type === 'fixed' ? `${coupon.amount} EGP OFF` : 'FREE SHIPPING'
  };
}

router.get('/catalog', async (req, res, next) => {
  try {
    const settings = await settingsMap();
    res.json(await buildCatalog(settings));
  } catch (e) { next(e); }
});

// ── bootstrap — combines catalog + settings + featured coupon into one
// response. The storefront used to fire these as three separate sequential
// (synchronous XHR) requests on every single page load, which blocked the
// parser for ~1.4s and made every navigation feel slow. Running the same
// three queries in parallel here and returning them together cuts that to
// one round trip. See site-data.js for the frontend side of this.
// ── in-memory cache for the bootstrap payload ──
// Building this response means four cross-table queries over 400+ products
// plus assembly — about a second of server time — and it was being redone
// from scratch on every single page view. The catalog only changes when
// someone edits it in the dashboard, so hold the built JSON briefly and
// serve repeats straight from memory. On Vercel each warm lambda keeps its
// own copy, which is fine: the TTL bounds how stale anything can get.
const storefrontCache = require('../lib/storefront-cache');

router.get('/bootstrap', async (req, res, next) => {
  try {
    res.type('application/json');
    // This response is fetched on EVERY page load, and it's the single
    // biggest thing standing between a visitor and a usable page. Without
    // a cache header the browser re-downloads the whole catalog each time
    // someone moves between pages. 60s of private caching plus a longer
    // stale-while-revalidate window means navigating the site reuses what's
    // already in memory instantly, while a dashboard edit still shows up
    // within about a minute.
    res.set('Cache-Control', 'private, max-age=60, stale-while-revalidate=600');
    // The global CORS middleware reflects the request origin, which adds
    // "Vary: Origin". That made the browser treat the early fetch() fired
    // from <head> and the XHR in site-data.js as two different cache
    // entries, so the catalog was downloaded twice on every page load.
    // This response is public, same-origin data with no per-origin
    // variation, so pin it to "*" and drop the Vary — now the second read
    // is served straight from cache.
    res.set('Access-Control-Allow-Origin', '*');
    res.removeHeader('Vary');

    const cached = storefrontCache.get();
    if (cached) return res.send(cached);

    const settings = await settingsMap();
    const [catalog, featuredCoupon] = await Promise.all([
      buildCatalog(settings),
      loadFeaturedCoupon()
    ]);
    const body = JSON.stringify({
      catalog,
      settings: toPublicSettingsShape(settings),
      featuredCoupon
    });
    storefrontCache.set(body);
    return res.send(body);
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

// ── sitemap.xml — mounted separately at the site root by server.js so the
// URL is /sitemap.xml, not /api/public/sitemap.xml. Lists every static page
// plus every published product and active brand, pulled live from the DB so
// it never goes stale as the catalog changes.
// SITE_URL: swap this to the real domain once it's purchased (kept in sync
// with the same placeholder used in seo-config.js on the frontend).
const SITE_URL = process.env.SITE_URL || 'https://www.wateenperfumeseg.com';

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/shop.html', priority: '0.9', changefreq: 'daily' },
  { path: '/men.html', priority: '0.8', changefreq: 'daily' },
  { path: '/women.html', priority: '0.8', changefreq: 'daily' },
  { path: '/unisex.html', priority: '0.8', changefreq: 'daily' },
  { path: '/watches.html', priority: '0.8', changefreq: 'daily' },
  { path: '/accessories.html', priority: '0.8', changefreq: 'daily' },
  { path: '/all-brands.html', priority: '0.7', changefreq: 'weekly' },
  { path: '/wholesale.html', priority: '0.5', changefreq: 'monthly' },
  { path: '/shipping-policy.html', priority: '0.3', changefreq: 'monthly' },
  { path: '/returns.html', priority: '0.3', changefreq: 'monthly' },
  { path: '/terms.html', priority: '0.3', changefreq: 'monthly' },
  { path: '/privacy-policy.html', priority: '0.3', changefreq: 'monthly' }
];

function xmlEscape(s) {
  return String(s).replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&apos;', '"': '&quot;' }[c]));
}

async function sitemapHandler(req, res, next) {
  try {
    const [products, brands] = await Promise.all([
      db.prepare(`SELECT slug, updated_at FROM products WHERE status = 'published'`).all(),
      db.prepare('SELECT slug, updated_at FROM brands WHERE is_active = TRUE').all()
    ]);

    const urls = [];
    const today = new Date().toISOString().slice(0, 10);

    STATIC_PAGES.forEach(p => urls.push({ loc: SITE_URL + p.path, lastmod: today, changefreq: p.changefreq, priority: p.priority }));
    products.forEach(p => urls.push({
      loc: `${SITE_URL}/product.html?id=${encodeURIComponent(p.slug)}`,
      lastmod: (p.updated_at ? new Date(p.updated_at) : new Date()).toISOString().slice(0, 10),
      changefreq: 'weekly', priority: '0.7'
    }));
    brands.forEach(b => urls.push({
      loc: `${SITE_URL}/brand.html?id=${encodeURIComponent(b.slug)}`,
      lastmod: (b.updated_at ? new Date(b.updated_at) : new Date()).toISOString().slice(0, 10),
      changefreq: 'weekly', priority: '0.6'
    }));

    const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls.map(u =>
        `  <url>\n    <loc>${xmlEscape(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
      ).join('\n') +
      `\n</urlset>\n`;

    res.type('application/xml').send(body);
  } catch (e) { next(e); }
}

module.exports.sitemapHandler = sitemapHandler;
module.exports.buildCatalog = buildCatalog;
module.exports.settingsMap = settingsMap;

// ── Meta (Facebook/Instagram) product catalog feed ──
// Commerce Manager pulls this on a schedule to build the catalog used by
// catalog / Advantage+ shopping ads. g:id is the product's DB id — the same
// value meta-pixel.js and the Conversions API send as content_ids — so the
// pixel's ViewContent/AddToCart/Purchase events match back to these items.
// Product photos are transparent WebP (made for the site's podium cards);
// Meta wants an opaque JPG/PNG, so image links go through Cloudinary's fetch
// API, which converts them to a 1080x1080 white-background JPG on the fly.
function feedImage(url) {
  if (!url) return '';
  const abs = /^https?:\/\//i.test(url) ? url : `${SITE_URL}/${url.replace(/^\/+/, '')}`;
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  return cloud
    ? `https://res.cloudinary.com/${cloud}/image/fetch/f_jpg,b_white,c_pad,w_1080,h_1080,q_85/${abs}`
    : abs;
}

const FEED_CATEGORY = {
  watches: { google: 'Apparel & Accessories > Jewelry > Watches', type: 'Watches' },
  accessories: { google: 'Apparel & Accessories', type: 'Accessories' },
  men: { google: 'Health & Beauty > Personal Care > Cosmetics > Perfume & Cologne', type: 'Perfume > Men' },
  women: { google: 'Health & Beauty > Personal Care > Cosmetics > Perfume & Cologne', type: 'Perfume > Women' },
  unisex: { google: 'Health & Beauty > Personal Care > Cosmetics > Perfume & Cologne', type: 'Perfume > Unisex' }
};
const FEED_GENDER = { Men: 'male', Women: 'female', Unisex: 'unisex' };

function titleCase(s) {
  return String(s || '').toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase());
}

async function metaFeedHandler(req, res, next) {
  try {
    const settings = await settingsMap();
    const rows = await db.prepare(`SELECT * FROM products WHERE status = 'published'`).all();
    const rel = await loadAllProductRelations(rows.map(r => r.id));
    const items = rows.map(row => toLegacyShape(
      assembleProduct(row, rel.variantsByProduct, rel.imagesByProduct, rel.categoriesByProduct, rel.brandsById), settings
    )).filter(p => p.price > 0 && p.img);

    const tag = (name, val) => (val === undefined || val === null || val === '') ? '' : `      <g:${name}>${xmlEscape(val)}</g:${name}>\n`;
    const body = items.map(p => {
      const brand = titleCase(p.brand) || 'Wateen Perfumes';
      const cat = FEED_CATEGORY[p.cat] || FEED_CATEGORY.unisex;
      const onSale = p.compareAtPrice && Number(p.compareAtPrice) > Number(p.price);
      const desc = (p.desc || `${p.name} by ${brand} — authentic ${p.type || 'fragrance'} from Wateen Perfumes.`).replace(/\s+/g, ' ').trim();
      const extra = (p.images || []).slice(1, 10).map(feedImage);
      return '    <item>\n' +
        tag('id', String(p.dbId)) +
        tag('title', `${p.name} - ${brand}`.slice(0, 150)) +
        tag('description', desc.slice(0, 5000)) +
        tag('availability', p.stock > 0 ? 'in stock' : 'out of stock') +
        tag('condition', 'new') +
        tag('price', `${Number(onSale ? p.compareAtPrice : p.price).toFixed(2)} EGP`) +
        (onSale ? tag('sale_price', `${Number(p.price).toFixed(2)} EGP`) : '') +
        tag('link', `${SITE_URL}/product.html?id=${encodeURIComponent(p.id)}`) +
        tag('image_link', feedImage(p.img)) +
        extra.map(u => tag('additional_image_link', u)).join('') +
        tag('brand', brand) +
        tag('google_product_category', cat.google) +
        tag('product_type', cat.type) +
        tag('gender', FEED_GENDER[p.gender]) +
        tag('custom_label_0', p.bestSeller ? 'best seller' : (p.newArrival ? 'new arrival' : '')) +
        '    </item>';
    }).join('\n');

    res.set('Cache-Control', 'public, max-age=900');
    res.type('application/xml').send(
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">\n  <channel>\n` +
      `    <title>Wateen Perfumes</title>\n    <link>${SITE_URL}</link>\n` +
      `    <description>Wateen Perfumes product catalog</description>\n` +
      body + `\n  </channel>\n</rss>\n`
    );
  } catch (e) { next(e); }
}

module.exports.metaFeedHandler = metaFeedHandler;
