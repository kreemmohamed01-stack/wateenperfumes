/* ════════════════════════════════════════════════
   ONE-TIME MIGRATION
   Reads the legacy catalog.js array and populates the
   real Postgres database: brands, categories, products,
   variants (per-size price/stock), images, settings,
   and the first admin user. Safe to re-run — it skips
   the catalog import if products already exist.

   Uses batched multi-row INSERTs (not one row per network
   round trip) because a remote Postgres connection (Neon)
   makes per-statement latency the dominant cost at 356
   products × several child rows each.
   ════════════════════════════════════════════════ */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env'), quiet: true });
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { db, pool, initSchema } = require('./index');

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
  store_email: 'info@wateenperfumeseg.com',
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

const ratingToNumber = (stars) => {
  if (!stars) return 0;
  return (stars.match(/★/g) || []).length;
};

// builds a single "INSERT INTO t (cols) VALUES ($1,$2,..),($n+1,..) ..." for a batch of rows
function buildBulkInsert(table, columns, rows, opts) {
  opts = opts || {};
  const values = [];
  const tuples = rows.map((row, ri) => {
    const placeholders = columns.map((col, ci) => {
      values.push(row[ci]);
      return '$' + (ri * columns.length + ci + 1);
    });
    return '(' + placeholders.join(',') + ')';
  });
  let sql = `INSERT INTO ${table} (${columns.join(',')}) VALUES ${tuples.join(',')}`;
  if (opts.onConflict) sql += ' ' + opts.onConflict;
  if (opts.returning) sql += ' RETURNING ' + opts.returning;
  return { text: sql, values };
}

async function run() {
  await initSchema();

  const productCountRow = await db.prepare('SELECT COUNT(*) c FROM products').get();
  const productCount = Number(productCountRow.c);

  for (const [k, v] of Object.entries(DEFAULT_SETTINGS)) {
    await db.prepare(`
      INSERT INTO settings (key, value) VALUES (?, ?)
      ON CONFLICT (key) DO NOTHING
    `).run(k, v);
  }

  const adminEmail = 'admin@wateenperfumeseg.com';
  const existingAdmin = await db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail);
  if (!existingAdmin) {
    // never hardcode the password: take it from ADMIN_PASSWORD, or generate a
    // random one and print it once to the console of whoever runs the seed
    const password = process.env.ADMIN_PASSWORD || require('crypto').randomBytes(12).toString('base64url');
    const hash = bcrypt.hashSync(password, 10);
    await db.prepare(`
      INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)
    `).run('Wateen Admin', adminEmail, hash, 'super_admin');
    console.log('Created default admin user:', adminEmail,
      process.env.ADMIN_PASSWORD ? '(password from ADMIN_PASSWORD)' : '/ ' + password + ' (save it now — it is not stored anywhere)');
  }

  if (productCount > 0) {
    console.log('Products already migrated (' + productCount + ' rows) — skipping catalog import.');
    return;
  }

  const CATALOG = loadCatalog();
  console.log('Migrating', CATALOG.length, 'products from catalog.js...');

  for (let i = 0; i < CATEGORY_DEFS.length; i++) {
    const c = CATEGORY_DEFS[i];
    await db.prepare(`
      INSERT INTO categories (slug, name, sort_order) VALUES (?, ?, ?)
      ON CONFLICT (slug) DO NOTHING
    `).run(c.slug, c.name, i);
  }
  const categoryIdBySlug = {};
  (await db.prepare('SELECT id, slug FROM categories').all()).forEach(r => { categoryIdBySlug[r.slug] = r.id; });

  const brandsSeen = new Map();
  CATALOG.forEach(p => { if (!brandsSeen.has(p.brand)) brandsSeen.set(p.brand, p.brandAr || null); });
  const brandRows = [...brandsSeen.entries()].map(([name, nameAr]) => [slugify(name), name, nameAr]);
  if (brandRows.length) {
    const { text, values } = buildBulkInsert('brands', ['slug', 'name', 'name_ar'], brandRows, { onConflict: 'ON CONFLICT (slug) DO NOTHING' });
    await pool.query(text, values);
  }
  const brandIdByName = {};
  (await db.prepare('SELECT id, name FROM brands').all()).forEach(r => { brandIdByName[r.name] = r.id; });

  const BATCH_SIZE = 25;
  let migrated = 0;

  for (let start = 0; start < CATALOG.length; start += BATCH_SIZE) {
    const batch = CATALOG.slice(start, start + BATCH_SIZE);
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const productRows = batch.map(p => [
        p.id, p.name, p.nameAr || null, brandIdByName[p.brand] || null, p.type || null, p.sku || null,
        p.desc || null, p.gender || null, p.family || null, p.origin || null, p.year || null,
        (p.notes && p.notes.top) || null, (p.notes && p.notes.heart) || null, (p.notes && p.notes.base) || null,
        p.tag || null, ratingToNumber(p.rating), p.reviews || 0, 'published', false
      ]);
      const { text: prodText, values: prodValues } = buildBulkInsert(
        'products',
        ['slug', 'name', 'name_ar', 'brand_id', 'type', 'sku', 'description', 'gender', 'family',
         'origin', 'year', 'notes_top', 'notes_heart', 'notes_base', 'tag_html',
         'rating', 'reviews_count', 'status', 'best_seller'],
        productRows,
        { returning: 'id, slug' }
      );
      const prodResult = await client.query(prodText, prodValues);
      const productIdBySlug = {};
      prodResult.rows.forEach(r => { productIdBySlug[r.slug] = r.id; });

      const categoryRows = [];
      const variantRows = [];
      const imageRows = [];

      for (const p of batch) {
        const productId = productIdBySlug[p.id];

        const cats = [p.cat, ...(p.extraCats || [])].filter(Boolean);
        cats.forEach((slug, i) => {
          const catId = categoryIdBySlug[slug];
          if (catId) categoryRows.push([productId, catId, i === 0]);
        });

        const sizes = (p.sizes && p.sizes.length) ? p.sizes : [p.size || 'One Size'];
        let defaultAssigned = false;
        sizes.forEach((size, i) => {
          const isDefault = size === p.size;
          if (isDefault) defaultAssigned = true;
          variantRows.push([
            productId, size, p.sku ? (p.sku + '-' + slugify(size)) : null, p.price, 50,
            isDefault, i
          ]);
        });
        if (!defaultAssigned && variantRows.length) {
          // mark the first size of this product as default since none matched p.size exactly
          const firstIdx = variantRows.length - sizes.length;
          variantRows[firstIdx][5] = true;
        }

        const images = [p.img, p.img2].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i);
        images.forEach((url, i) => imageRows.push([productId, url, i, i === 0]));
      }

      if (categoryRows.length) {
        const { text, values } = buildBulkInsert(
          'product_categories', ['product_id', 'category_id', 'is_primary'], categoryRows,
          { onConflict: 'ON CONFLICT (product_id, category_id) DO NOTHING' }
        );
        await client.query(text, values);
      }
      if (variantRows.length) {
        const { text, values } = buildBulkInsert(
          'product_variants', ['product_id', 'size', 'sku', 'price', 'stock', 'is_default', 'sort_order'], variantRows
        );
        await client.query(text, values);
      }
      if (imageRows.length) {
        const { text, values } = buildBulkInsert(
          'product_images', ['product_id', 'url', 'sort_order', 'is_main'], imageRows
        );
        await client.query(text, values);
      }

      await client.query('COMMIT');
      migrated += batch.length;
      console.log('migrated', migrated, '/', CATALOG.length);
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }

  console.log('Migration complete:', CATALOG.length, 'products,', brandsSeen.size, 'brands.');
}

run()
  .then(() => process.exit(0))
  .catch((err) => { console.error(err); process.exit(1); });
