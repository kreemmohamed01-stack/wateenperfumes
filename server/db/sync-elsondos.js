/* ════════════════════════════════════════════════
   ONE-OFF: bring the catalog in line with elsondosperfumes.com
   The two stores sell the same stock. Every product here was
   matched to its Elsondos listing (by name, then checked photo
   against photo), and this applies what differed:
     - photos that were wrong (another product's photo) or broken
       (background removal had eaten the box) → the Elsondos photo,
       processed the same way as the rest of assets/products/
     - brand, where Elsondos files the product under another house
     - price, where it differs and the Elsondos item is in stock
     - 5 perfumes Elsondos sells that this store didn't have yet
   Out-of-stock / unpriced Elsondos items, bundles, body sprays
   and air fresheners were deliberately left out.

   Usage:
     node server/db/sync-elsondos.js           preview only
     node server/db/sync-elsondos.js --apply   write the changes

   Safe to run more than once; one transaction, so any mismatch
   rolls everything back. Brands left empty are hidden, not deleted.
   ════════════════════════════════════════════════ */
require('dotenv').config({ quiet: true });
const { Pool } = require('pg');

const APPLY = process.argv.includes('--apply');

const IMAGES = {
  'sheikh-al-shuyukh-green': 'assets/products/sheikh-al-shuyukh-green-v2.webp',
  'entebaa-women': 'assets/products/entebaa-women-v2.webp',
  'valencia': 'assets/products/valencia-v2.webp',          // was Musk 07's photo
  'noof': 'assets/products/noof-v2.webp',                  // was Shaghaf Oud Ahmar's photo
  'marwa': 'assets/products/marwa-v2.webp',
  'musamam-white-intense': 'assets/products/musamam-white-intense-v2.webp',
  'oud-07': 'assets/products/oud-07-v2.webp'
};

const BRANDS = {
  'lattafa': ['majd-al-sultan-black-intense', 'andaleeb', 'ameerat-al-arab', 'ameerat-al-arab-pink', 'pink-dagger',
    'opulent-dubai', 'opulent-oud', 'khales-oudi', 'khales-musk', 'khanjar'],
  'arabiyat-prestige': ['latifah-light-in-the-heart', 'latifah-first-love', 'exciting-women', 'exciting-elixir',
    'lattafa-beyond-forever', 'lattafa-seventh-heaven', 'mouda-high-end', 'noire-absolu', 'noire-absolut-london', 'el-saled'],
  'rasasi': ['abreez', 'aneen', 'dirham', 'oud-al-abyad', 'oud-al-mobakhar', 'oud-al-musk', 'mukhallat-oud-al-mobakhar'],
  'swiss-arabian': ['rashiqah', 'valencia', 'noof'],
  'ajmal': ['wassal'],
  'zimaya': ['mizaj']
};

// default-variant price, from Elsondos
const PRICES = { 'al-wisam': 1950, 'khamra': 1700, 'khamra-coffee': 1700, 'asad': 1250, 'asad-bourbon': 1250 };

const NEW_PRODUCTS = [
  {
    slug: 'ambition', name: 'Ambition', nameAr: 'امبيشن', brand: 'rasasi', cat: 'men', gender: 'Men', price: 1600,
    sku: 'RS-AMB-70', family: 'Aromatic Woody',
    top: 'Sage, Orange, Bergamot', heart: 'Floral Notes, Spices, Woods', base: 'Musk, Amber',
    desc: 'A confident aromatic signature — bright citrus and sage settling into warm spice, woods and amber.',
    descAr: 'توقيع عطري واثق — حمضيات منعشة ومريمية تستقر على توابل دافئة وأخشاب وعنبر.',
    tag: 'CONFIDENT<br>AROMATIC<br>WARM', img: 'assets/products/ambition.webp'
  },
  {
    slug: 'oud-mood-silver', name: 'Oud Mood Silver', nameAr: 'عود مود سيلفر', brand: 'lattafa', cat: 'men', gender: 'Men', price: 900,
    sku: 'LT-OMS-100', family: 'Fruity Chypre',
    top: 'Bergamot, Apple, Pineapple', heart: 'Rose, Birch, Patchouli, Moroccan Jasmine', base: 'Musk, Oakmoss, Vanilla, Ambergris',
    desc: 'Juicy pineapple and apple over smoky birch and oakmoss — a fresh, polished take on the Oud Mood line.',
    descAr: 'أناناس وتفاح منعشان فوق خشب البتولا المدخّن وطحلب البلوط — لمسة منعشة وأنيقة من مجموعة عود مود.',
    tag: 'FRESH<br>SMOKY<br>POLISHED', img: 'assets/products/oud-mood-silver.webp'
  },
  {
    slug: 'al-hobb-hayat', name: 'Al Hobb Hayat', nameAr: 'الحب حياة', brand: 'rasasi', cat: 'women', gender: 'Women', price: 1450,
    sku: 'RS-AHH-100', family: 'Fruity Floral',
    top: 'Mango, Grapefruit, Tangerine', heart: 'Sugared Almond, Plum, Lily of the Valley', base: 'Vanilla, Musk, Cedarwood',
    desc: 'Sunny mango and citrus melting into sugared almond and plum — sweet, joyful and made for her.',
    descAr: 'مانجو وحمضيات مشرقة تذوب في حلوى اللوز والبرقوق — عطر حلو ومبهج صُنع لها.',
    tag: 'SWEET<br>JOYFUL<br>RADIANT', img: 'assets/products/al-hobb-hayat.webp'
  },
  {
    slug: 'myar-natural-intense', name: 'Myar Natural Intense', nameAr: 'ميار ناتشورال انتنس', brand: 'lattafa', cat: 'women', gender: 'Women', price: 1350,
    sku: 'LT-MNI-100', family: 'Aquatic Floral',
    top: 'Fig, Coconut Water, Green Mandarin, Watermelon', heart: 'Water Lily, Lotus, Jasmine', base: 'Vanilla, Sandalwood, Ambroxan, Musk',
    desc: 'Cool fig, coconut water and watermelon over water lily and lotus — fresh, airy and softly creamy.',
    descAr: 'تين وماء جوز الهند وبطيخ فوق زنبق الماء واللوتس — عطر منعش وخفيف بلمسة كريمية ناعمة.',
    tag: 'FRESH<br>AIRY<br>CREAMY', img: 'assets/products/myar-natural-intense.webp'
  },
  {
    slug: 'qaaed', name: "Qaa'ed", nameAr: 'قائد', brand: 'lattafa', cat: 'men', gender: 'Men', price: 1100,
    sku: 'LT-QAD-100', family: 'Woody Oriental',
    top: 'Saffron, Nutmeg', heart: 'Sandalwood, Agarwood (Oud)', base: 'Vanilla, Amber, Leather',
    desc: 'Saffron and nutmeg over sandalwood and oud, finished with vanilla, amber and leather — a commanding oriental.',
    descAr: 'زعفران وجوزة الطيب فوق الصندل والعود، مع ختام من الفانيليا والعنبر والجلد — عطر شرقي قيادي.',
    tag: 'COMMANDING<br>WARM<br>ORIENTAL', img: 'assets/products/qaaed.webp'
  }
];

(async () => {
  const cs = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!cs) throw new Error('DATABASE_URL is not set.');
  const pool = new Pool({ connectionString: cs, ssl: { rejectUnauthorized: false } });
  const c = await pool.connect();
  const productId = async (slug) => {
    const r = await c.query('SELECT id FROM products WHERE slug=$1', [slug]);
    if (!r.rows.length) throw new Error(`product "${slug}" not found`);
    return r.rows[0].id;
  };
  const brandId = async (slug) => {
    const r = await c.query('SELECT id FROM brands WHERE slug=$1', [slug]);
    if (!r.rows.length) throw new Error(`brand "${slug}" not found`);
    return r.rows[0].id;
  };
  try {
    await c.query('BEGIN');

    for (const [slug, url] of Object.entries(IMAGES)) {
      const id = await productId(slug);
      await c.query('DELETE FROM product_images WHERE product_id=$1', [id]);
      await c.query('INSERT INTO product_images (product_id, url, sort_order, is_main) VALUES ($1, $2, 0, TRUE)', [id, url]);
    }
    console.log(`photos replaced: ${Object.keys(IMAGES).length}`);

    let brandMoves = 0;
    for (const [bslug, slugs] of Object.entries(BRANDS)) {
      const bid = await brandId(bslug);
      for (const s of slugs) {
        const r = await c.query('UPDATE products SET brand_id=$1, updated_at=NOW() WHERE id=$2 AND brand_id IS DISTINCT FROM $1', [bid, await productId(s)]);
        brandMoves += r.rowCount;
      }
    }
    await c.query(`UPDATE brands SET is_active=TRUE WHERE slug = ANY($1)`, [Object.keys(BRANDS)]);
    console.log(`brands changed: ${brandMoves}`);

    let priced = 0;
    for (const [slug, price] of Object.entries(PRICES)) {
      const r = await c.query(`UPDATE product_variants SET price=$1, updated_at=NOW()
        WHERE product_id=$2 AND is_default AND price <> $1`, [price, await productId(slug)]);
      priced += r.rowCount;
    }
    console.log(`prices changed: ${priced}`);

    let added = 0;
    for (const p of NEW_PRODUCTS) {
      const exists = await c.query('SELECT id FROM products WHERE slug=$1', [p.slug]);
      if (exists.rows.length) { console.log(`(${p.slug} already exists)`); continue; }
      const cat = await c.query('SELECT id FROM categories WHERE slug=$1', [p.cat]);
      if (!cat.rows.length) throw new Error(`category "${p.cat}" not found`);
      const ins = await c.query(`INSERT INTO products (slug, name, name_ar, brand_id, type, sku, description, description_ar,
          gender, family, origin, notes_top, notes_heart, notes_base, tag_html, rating, reviews_count, status,
          new_arrival, low_stock_threshold)
        VALUES ($1,$2,$3,$4,'Eau de Parfum',$5,$6,$7,$8,$9,'UAE',$10,$11,$12,$13,0,0,'published',TRUE,3) RETURNING id`,
        [p.slug, p.name, p.nameAr, await brandId(p.brand), p.sku, p.desc, p.descAr, p.gender, p.family,
         p.top, p.heart, p.base, p.tag]);
      const id = ins.rows[0].id;
      await c.query('INSERT INTO product_categories (product_id, category_id, is_primary) VALUES ($1,$2,TRUE)', [id, cat.rows[0].id]);
      await c.query(`INSERT INTO product_variants (product_id, size, sku, price, stock, is_default, sort_order)
        VALUES ($1,'One Size',$2,$3,5,TRUE,0)`, [id, p.sku, p.price]);
      await c.query('INSERT INTO product_images (product_id, url, sort_order, is_main) VALUES ($1,$2,0,TRUE)', [id, p.img]);
      added++;
    }
    console.log(`new products: ${added}`);

    const hidden = await c.query(`UPDATE brands SET is_active=FALSE, updated_at=NOW()
      WHERE is_active AND NOT EXISTS (SELECT 1 FROM products p WHERE p.brand_id = brands.id) RETURNING name`);
    console.log(`hidden empty brands (${hidden.rowCount}): ${hidden.rows.map(r => r.name).join(', ') || '-'}`);

    if (APPLY) {
      await c.query('COMMIT');
      console.log('\nDONE. The site picks this up within 30 seconds (new photos need the deploy).');
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
