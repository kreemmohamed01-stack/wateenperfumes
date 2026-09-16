/* ════════════════════════════════════════════════
   ONE-TIME MIGRATION
   Reads the legacy catalog.js array and populates the
   real SQLite database: brands, categories, products,
   variants (per-size price/stock), images, settings,
   and the first admin user. Safe to re-run — it skips
   work if products already exist.
   ════════════════════════════════════════════════ */
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { db } = require('./index');

const ROOT = path.join(__dirname, '..', '..');

function slugify(s) {
  return String(s).toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function loadCatalog() {
  const raw = fs.readFileSync(path.join(ROOT, 'catalog.js'), 'utf8');
  const marker = 'var CATALOG = ';
  const start = raw.indexOf(marker) + marker.length;
  let body = raw.slice(start);
  body = body.replace(/;\s*$/, '');
  // eslint-disable-next-line no-eval
  return eval(body);
}

const CATEGORY_DEFS = [
  { slug: 'men',         name: 'Men' },
  { slug: 'women',       name: 'Women' },
  { slug: 'unisex',      name: 'Oud Collection' },
  { slug: 'accessories', name: 'Accessories' },
  { slug: 'watches',     name: 'Watches' }
];

const DEFAULT_SETTINGS = {
  store_name: 'Wateen Perfumes',
  store_email: 'info@wateenperfumes.com',
  store_phone: '01027380269',
  store_currency: 'EGP',
  free_shipping_threshold: '1000',
  default_shipping_fee: '90',
  global_sale_enabled: 'false',
  global_sale_percent: '20',
  featured_coupon_code: '',
  cod_enabled: 'true',
  instapay_enabled: 'true',
  card_enabled: 'true',
  instapay_number: '01027380269',
  shipping_rates_by_governorate: '{}',
  social_instagram: 'https://www.instagram.com/wateenperfum?stkn=Z2Y5MTVuNnBueWxm',
  social_facebook: 'https://www.facebook.com/share/1KAZzLxbjH/?mibextid=wwXIfr',
  social_whatsapp: 'https://wa.me/201027380269',
  social_tiktok: ''
};

function run() {
  const productCount = db.prepare('SELECT COUNT(*) c FROM products').get().c;

  // settings + admin user always ensured, even on re-run
  const insertSetting = db.prepare(`
    INSERT INTO settings (key, value) VALUES (?, ?)
    ON CONFLICT(key) DO NOTHING
  `);
  Object.entries(DEFAULT_SETTINGS).forEach(([k, v]) => insertSetting.run(k, v));

  const adminEmail = 'admin@wateenperfumes.com';
  const existingAdmin = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail);
  if (!existingAdmin) {
    const hash = bcrypt.hashSync('WateenAdmin@2026', 10);
    db.prepare(`
      INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)
    `).run('Wateen Admin', adminEmail, hash, 'super_admin');
    console.log('Created default admin user:', adminEmail, '/ WateenAdmin@2026 (change after first login)');
  }

  if (productCount > 0) {
    console.log('Products already migrated (' + productCount + ' rows) — skipping catalog import.');
    return;
  }

  const CATALOG = loadCatalog();
  console.log('Migrating', CATALOG.length, 'products from catalog.js...');

  const categoryIdBySlug = {};
  const insertCategory = db.prepare(`
    INSERT INTO categories (slug, name, sort_order) VALUES (?, ?, ?)
    ON CONFLICT(slug) DO NOTHING
  `);
  CATEGORY_DEFS.forEach((c, i) => {
    insertCategory.run(c.slug, c.name, i);
  });
  db.prepare('SELECT id, slug FROM categories').all().forEach(r => { categoryIdBySlug[r.slug] = r.id; });

  const brandIdByName = {};
  const insertBrand = db.prepare(`
    INSERT INTO brands (slug, name, name_ar) VALUES (?, ?, ?)
    ON CONFLICT(slug) DO NOTHING
  `);
  const brandsSeen = new Map();
  CATALOG.forEach(p => { if (!brandsSeen.has(p.brand)) brandsSeen.set(p.brand, p.brandAr || null); });
  brandsSeen.forEach((nameAr, name) => insertBrand.run(slugify(name), name, nameAr));
  db.prepare('SELECT id, name FROM brands').all().forEach(r => { brandIdByName[r.name] = r.id; });

  const insertProduct = db.prepare(`
    INSERT INTO products (
      slug, name, name_ar, brand_id, type, sku, description, gender, family,
      origin, year, notes_top, notes_heart, notes_base, tag_html,
      rating, reviews_count, status, best_seller
    ) VALUES (@slug, @name, @name_ar, @brand_id, @type, @sku, @description, @gender, @family,
      @origin, @year, @notes_top, @notes_heart, @notes_base, @tag_html,
      @rating, @reviews_count, 'published', 0)
  `);

  const insertProductCategory = db.prepare(`
    INSERT OR IGNORE INTO product_categories (product_id, category_id, is_primary) VALUES (?, ?, ?)
  `);

  const insertVariant = db.prepare(`
    INSERT INTO product_variants (product_id, size, sku, price, stock, is_default, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertImage = db.prepare(`
    INSERT INTO product_images (product_id, url, sort_order, is_main) VALUES (?, ?, ?, ?)
  `);

  const ratingToNumber = (stars) => {
    if (!stars) return 0;
    const full = (stars.match(/★/g) || []).length;
    return full;
  };

  const insertAll = db.transaction((rows) => {
    rows.forEach((p, idx) => {
      const brand_id = brandIdByName[p.brand] || null;
      const result = insertProduct.run({
        slug: p.id,
        name: p.name,
        name_ar: p.nameAr || null,
        brand_id,
        type: p.type || null,
        sku: p.sku || null,
        description: p.desc || null,
        gender: p.gender || null,
        family: p.family || null,
        origin: p.origin || null,
        year: p.year || null,
        notes_top: (p.notes && p.notes.top) || null,
        notes_heart: (p.notes && p.notes.heart) || null,
        notes_base: (p.notes && p.notes.base) || null,
        tag_html: p.tag || null,
        rating: ratingToNumber(p.rating),
        reviews_count: p.reviews || 0
      });
      const productId = result.lastInsertRowid;

      // categories: primary cat + any extraCats
      const cats = [p.cat, ...(p.extraCats || [])].filter(Boolean);
      cats.forEach((slug, i) => {
        const catId = categoryIdBySlug[slug];
        if (catId) insertProductCategory.run(productId, catId, i === 0 ? 1 : 0);
      });

      // variants: every declared size gets a real price row.
      // legacy data only had one flat price, so every size starts at that
      // price until the admin sets size-specific pricing in the dashboard.
      const sizes = (p.sizes && p.sizes.length) ? p.sizes : [p.size || 'One Size'];
      sizes.forEach((size, i) => {
        insertVariant.run(
          productId, size, p.sku ? (p.sku + '-' + slugify(size)) : null,
          p.price, 50, size === p.size ? 1 : 0, i
        );
      });
      if (!sizes.includes(p.size)) {
        db.prepare('UPDATE product_variants SET is_default = 1 WHERE product_id = ? AND size = ?')
          .run(productId, sizes[0]);
      }

      // images
      const images = [p.img, p.img2].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i);
      images.forEach((url, i) => insertImage.run(productId, url, i, i === 0 ? 1 : 0));
    });
  });

  insertAll(CATALOG);
  console.log('Migration complete:', CATALOG.length, 'products,', brandsSeen.size, 'brands.');
}

run();
