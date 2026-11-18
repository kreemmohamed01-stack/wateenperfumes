/* ════════════════════════════════════════════════
   SERVER-RENDERED PRODUCT PAGE  (/product.html?id=<slug>)
   The product page used to ship one identical HTML shell for every
   product ("Shuhrah — RASASI", empty <h1>, no schema) and fill it in
   with JavaScript, so search engines saw 400+ duplicate pages.
   This route reads the same template and writes the real product's
   title, description, canonical, Open Graph/Twitter tags, <h1> and
   Product + Breadcrumb JSON-LD into the HTML before it is sent.
   The page's own script still runs exactly as before on top of it.
   ════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');
const { loadProductBySlug } = require('./public-catalog');

const SITE = 'https://www.wateenperfumeseg.com';
const TEMPLATE_PATH = path.join(__dirname, '..', 'views', 'product.html');
let template = null;
function getTemplate() {
  if (!template) template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  return template;
}

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = u => !u ? SITE + '/assets/logo-512.png' : /^https?:\/\//.test(u) ? u : SITE + '/' + String(u).replace(/^\//, '');
// JSON inside <script> must not be able to close the tag
const ldJson = o => JSON.stringify(o).replace(/</g, '\\u003c');

const CAT = {
  men: ['Men', 'men.html'], women: ['Women', 'women.html'], unisex: ['Unisex', 'unisex.html'],
  watches: ['Watches', 'watches.html'], accessories: ['Accessories', 'accessories.html']
};

function setAttr(html, id, attr, value) {
  const re = new RegExp('(<[^>]*\\bid="' + id + '"[^>]*\\b' + attr + '=")[^"]*(")');
  return html.replace(re, (m, a, b) => a + esc(value) + b);
}

function render(p) {
  let html = getTemplate();
  const url = SITE + '/product.html?id=' + encodeURIComponent(p.id);
  const title = p.name + ' — ' + p.brand + ' | Wateen Perfumes';
  const raw = (p.desc && String(p.desc).trim()) ||
    (p.brand + ' ' + p.name + (p.type ? ' ' + p.type : '') + ' — 100% authentic, delivered across Egypt by Wateen Perfumes.');
  const desc = raw.length > 160 ? raw.slice(0, 157).trim() + '…' : raw;
  const img = abs(p.img);
  const images = (p.images && p.images.length ? p.images : [p.img]).filter(Boolean).map(abs);

  html = html.replace(/<title>[^<]*<\/title>/, '<title>' + esc(title) + '</title>');
  html = setAttr(html, 'metaDesc', 'content', desc);
  html = setAttr(html, 'metaCanonical', 'href', url);
  html = setAttr(html, 'metaOgTitle', 'content', title);
  html = setAttr(html, 'metaOgDesc', 'content', desc);
  html = setAttr(html, 'metaOgUrl', 'content', url);
  html = setAttr(html, 'metaOgImage', 'content', img);
  html = setAttr(html, 'metaTwTitle', 'content', title);
  html = setAttr(html, 'metaTwDesc', 'content', desc);
  html = setAttr(html, 'metaTwImage', 'content', img);
  html = html.replace(/(<h1 class="pd__name" id="pdName">)(<\/h1>)/, '$1' + esc(p.name) + '$2');
  html = html.replace(/(<p class="pd__brand" id="pdBrand">)(<\/p>)/, '$1' + esc(p.brand) + '$2');
  if (p.cat === 'watches') html = html.replace('<span id="pdShipPerk"><b>Fast Delivery</b><i>Across Egypt</i></span>',
    '<span id="pdShipPerk"><b>Free Shipping</b><i>Free on all watches</i></span>');
  // the real price in the HTML itself — never a placeholder 0
  html = html.replace('<span class="roll" id="pdPrice" data-value="0">0</span>',
    '<span class="roll" id="pdPrice" data-value="' + Number(p.price) + '">' + Number(p.price).toLocaleString('en-US') + '</span>');

  const inStock = p.stock === undefined || p.stock === null || Number(p.stock) > 0;
  const product = {
    '@context': 'https://schema.org', '@type': 'Product',
    name: p.name, image: images, description: raw,
    sku: p.sku || p.id, brand: { '@type': 'Brand', name: p.brand },
    offers: {
      '@type': 'Offer', url, priceCurrency: 'EGP', price: Number(p.price),
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: 'Wateen Perfumes' }
    }
  };
  html = html.replace(/<script type="application\/ld\+json" id="productJsonLd">[\s\S]*?<\/script>/,
    '<script type="application/ld+json" id="productJsonLd">' + ldJson(product) + '</script>');

  const crumbs = [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' }];
  if (CAT[p.cat]) crumbs.push({ '@type': 'ListItem', position: 2, name: CAT[p.cat][0], item: SITE + '/' + CAT[p.cat][1] });
  crumbs.push({ '@type': 'ListItem', position: crumbs.length + 1, name: p.name, item: url });
  html = html.replace('</head>', '<script type="application/ld+json" id="breadcrumbJsonLd">' +
    ldJson({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs }) + '</script>\n</head>');
  return html;
}

async function productPageHandler(req, res, next) {
  try {
    const slug = String(req.query.id || '').trim();
    let html;
    let status = 200;
    if (slug) {
      const p = await loadProductBySlug(slug);
      if (p) html = render(p);
      else { status = 404; html = getTemplate().replace('content="index, follow"', 'content="noindex, follow"'); }
    } else {
      html = getTemplate().replace('content="index, follow"', 'content="noindex, follow"');
    }
    res.status(status).type('html');
    res.set('Cache-Control', 'public, max-age=0, must-revalidate');
    res.set('Vercel-CDN-Cache-Control', 'max-age=300, stale-while-revalidate=86400');
    res.send(html);
  } catch (e) { next(e); }
}

module.exports = { productPageHandler, render };
