/* ════════════════════════════════════════════════
   ONE-OFF: move products to their real fragrance house
   Many products were saved with the perfume's own name as
   its brand (brand "ANGHAAM", "DUKHAN", "RAINDROPS", ...),
   so the real houses — Dkhoni, Ajmal, Maison Alhambra,
   Zimaya — looked empty or nearly empty on the site.
   Each move below was checked against the brand printed on
   the bottle/box in the product's own photo.

   Usage:
     node server/db/fix-brands.js           preview only
     node server/db/fix-brands.js --apply   write the changes

   Safe to run more than once. All changes happen in one
   transaction — any mismatch rolls everything back.
   Brands left with no products are hidden (is_active =
   false), not deleted, so they drop out of the sitemap but
   can be switched back on from the dashboard.
   ════════════════════════════════════════════════ */
require('dotenv').config({ quiet: true });
const { Pool } = require('pg');

const APPLY = process.argv.includes('--apply');

// two existing per-perfume brands become the real houses they belong to
const RENAME = [
  { fromSlug: 'dukhan',    slug: 'dkhoni', name: 'DKHONI', nameAr: 'دخون الإماراتية' },
  { fromSlug: 'raindrops', slug: 'ajmal',  name: 'AJMAL',  nameAr: 'أجمل' }
];

// target brand slug -> product slugs that belong to it
const MOVES = {
  'lattafa': ['anghaam', 'anghaam-second-song', 'dalal', 'dynasty', 'eclair', 'habik', 'hair-confection',
    'hayati-florence', 'mohrah', 'myar-pink', 'nebras', 'raed-lux', 'raed-silver', 'theriac-intense',
    'tiryaq', 'tiryaq-intense-women', 'sheikh-al-shuyukh-green'],
  'arabiyat-prestige': ['al-faris-unisex', 'al-faris-arabe', 'al-faris-kenz', 'bahia-garnet', 'bahia-ruby',
    'extradoz-femme', 'habiba', 'lamsat-hareer', 'marwa', 'nayel-her-majesty', 'nayel-king', 'nayel-oud',
    'nayel-queen', 'neila-sharbat', 'safa', 'swar-venin', 'uhud', 'yemen-unisex'],
  'zimaya': ['bahjah', 'farah', 'fatima', 'seyada-nova', 'seyada-regal', 'tiramisu', 'zaher', 'sharaf-the-club'],
  'maison-alhambra': ['kamel', 'pink-eclipse', 'winsome'],
  'rasasi': ['emotion-women', 'romance-women', 'yemen-women'],
  'azha': ['estrodom'],
  'dkhoni': ['kaheylan', 'signature-rose', 'signature-rose-gold'],
  'ajmal': ['magnolia-dreams', 'sacrifice-for-her'],
  'asdaaf': ['andaleeb'],
  'absolut-london': ['noire-absolu']
};

(async () => {
  const cs = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!cs) throw new Error('DATABASE_URL is not set.');
  const pool = new Pool({ connectionString: cs, ssl: { rejectUnauthorized: false } });
  const c = await pool.connect();
  try {
    await c.query('BEGIN');

    for (const r of RENAME) {
      const res = await c.query(
        `UPDATE brands SET slug=$1, name=$2, name_ar=$3, is_active=TRUE, updated_at=NOW() WHERE slug=$4`,
        [r.slug, r.name, r.nameAr, r.fromSlug]);
      console.log(res.rowCount ? `renamed ${r.fromSlug} -> ${r.slug}` : `(${r.fromSlug} already renamed)`);
    }

    let moved = 0;
    for (const [brandSlug, productSlugs] of Object.entries(MOVES)) {
      const b = await c.query('SELECT id, name FROM brands WHERE slug=$1', [brandSlug]);
      if (!b.rows.length) throw new Error(`brand "${brandSlug}" not found`);
      const found = await c.query('SELECT slug FROM products WHERE slug = ANY($1::text[])', [productSlugs]);
      const missing = productSlugs.filter(s => !found.rows.some(r => r.slug === s));
      if (missing.length) throw new Error(`products not found: ${missing.join(', ')}`);
      const res = await c.query(
        'UPDATE products SET brand_id=$1 WHERE slug = ANY($2::text[]) AND brand_id IS DISTINCT FROM $1',
        [b.rows[0].id, productSlugs]);
      moved += res.rowCount;
      console.log(`${b.rows[0].name}: ${res.rowCount} moved (${productSlugs.length} listed)`);
    }

    const hidden = await c.query(`UPDATE brands SET is_active=FALSE, updated_at=NOW()
      WHERE is_active AND NOT EXISTS (SELECT 1 FROM products p WHERE p.brand_id = brands.id) RETURNING name`);
    console.log(`hidden empty brands (${hidden.rowCount}): ${hidden.rows.map(r => r.name).join(', ') || '-'}`);

    if (APPLY) {
      await c.query('COMMIT');
      console.log(`\nDONE — ${moved} products moved. The site picks this up within 30 seconds.`);
    } else {
      await c.query('ROLLBACK');
      console.log('\nPreview only, nothing was saved. Run again with --apply to save.');
    }
  } catch (e) {
    await c.query('ROLLBACK').catch(() => {});
    console.error('ROLLED BACK — nothing changed:', e.message);
    process.exitCode = 1;
  } finally {
    c.release();
    await pool.end();
  }
})();
