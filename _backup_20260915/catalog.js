/* ════════════════════════════════════════════════
   WATEEN PERFUMES — SHARED PRODUCT CATALOG
   Single source of truth for cart, search, and the
   dynamic product page. Loaded before hero.js.
   ════════════════════════════════════════════════ */

var CATALOG = [
  {
    id: 'shuhrah', brand: 'RASASI', name: 'Shuhrah', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '200 ML'],
    price: 2450, rating: '★★★★☆', reviews: 120, cat: 'men',
    img: 'assets/products/shuhrah.png', img2: 'assets/products/shuhrah.png',
    desc: 'A rare and captivating fragrance that blends warm spices, precious woods, and a touch of sensuality. Bold, refined, and made to be remembered.',
    notes: { top: 'Rosewood, Cardamom, Sichuan Pepper', heart: 'Oud, Sandalwood, Vetiver', base: 'Tonka Bean, Amber, Vanilla' },
    family: 'Woody Oriental', year: '2021', origin: 'UAE', sku: 'RS-SH-100', gender: 'Men',
    tag: 'BOLD<br>REFINED<br>TIMELESS'
  },
  {
    id: 'mahd-al-dhahab', brand: 'ARABIYAT PRESTIGE', name: 'Mahd Al Dhahab', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 3150, rating: '★★★★★', reviews: 98, cat: 'men',
    img: 'assets/products/mahd-al-dhahab.png', img2: 'assets/products/mahd-al-dhahab.png',
    desc: 'A golden, opulent composition built around rich amber and precious oud — a fragrance made for those who command a room without saying a word.',
    notes: { top: 'Saffron, Bergamot, Pink Pepper', heart: 'Oud, Rose, Amber', base: 'Musk, Sandalwood, Vanilla' },
    family: 'Amber Oriental', year: '2022', origin: 'UAE', sku: 'AP-MAD-100', gender: 'Men',
    tag: 'OPULENT<br>GOLDEN<br>TIMELESS'
  },
  {
    id: 'musk-07', brand: 'SWISS ARABIAN', name: 'Musk 07', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 2890, rating: '★★★★☆', reviews: 210, cat: 'women',
    img: 'assets/products/musk-07.png', img2: 'assets/products/musk-07.png',
    desc: 'A soft, radiant musk that wraps the skin in warmth — delicate, clean, and effortlessly elegant for every day.',
    notes: { top: 'Bergamot, Pear, Pink Peppercorn', heart: 'White Musk, Jasmine, Iris', base: 'Sandalwood, Amber, Cedarwood' },
    family: 'Musky Floral', year: '2020', origin: 'UAE', sku: 'SA-M07-100', gender: 'Women',
    tag: 'SOFT<br>RADIANT<br>TIMELESS'
  },
  {
    id: 'shaghaf-oud-tonka', brand: 'SWISS ARABIAN', name: 'Shaghaf Oud Tonka', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['75 ML', '100 ML'],
    price: 3650, rating: '★★★★★', reviews: 176, cat: 'unisex',
    img: 'assets/products/shaghaf-oud-tonka.png', img2: 'assets/products/shaghaf-oud-tonka.png',
    desc: 'A sweet, smoky embrace of oud and tonka bean — passionate and addictive, for every side of you.',
    notes: { top: 'Bergamot, Cardamom', heart: 'Oud, Tonka Bean, Rose', base: 'Vanilla, Amber, Musk' },
    family: 'Woody Sweet', year: '2021', origin: 'UAE', sku: 'SA-SOT-100', gender: 'Unisex',
    tag: 'PASSIONATE<br>SMOKY<br>TIMELESS'
  },
  {
    id: 'shaghaf-oud-azraq', brand: 'SWISS ARABIAN', name: 'Shaghaf Oud Azraq', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['75 ML', '100 ML'],
    price: 3950, rating: '★★★★☆', reviews: 90, cat: 'unisex',
    img: 'assets/products/shaghaf-oud-azraq.png', img2: 'assets/products/shaghaf-oud-azraq.png',
    desc: 'A cool, aquatic take on oud — fresh and mysterious, blurring the line between marine and oriental.',
    notes: { top: 'Marine Notes, Bergamot', heart: 'Oud, Lavender, Geranium', base: 'Musk, Ambergris, Cedarwood' },
    family: 'Woody Aquatic', year: '2022', origin: 'UAE', sku: 'SA-SOA-100', gender: 'Unisex',
    tag: 'COOL<br>MYSTERIOUS<br>TIMELESS'
  },
  {
    id: 'shaghaf-oud-ahmar', brand: 'SWISS ARABIAN', name: 'Shaghaf Oud Ahmar', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['75 ML', '100 ML'],
    price: 4250, rating: '★★★★★', reviews: 134, cat: 'women',
    img: 'assets/products/shaghaf-oud-ahmar.png', img2: 'assets/products/shaghaf-oud-ahmar.png',
    desc: 'A bold red fruit and oud accord — vibrant, warm, and unapologetically confident.',
    notes: { top: 'Red Berries, Saffron', heart: 'Oud, Rose, Cinnamon', base: 'Amber, Musk, Patchouli' },
    family: 'Fruity Oriental', year: '2023', origin: 'UAE', sku: 'SA-SOAh-100', gender: 'Women',
    tag: 'BOLD<br>VIBRANT<br>TIMELESS'
  },
  {
    id: 'casablanca', brand: 'SWISS ARABIAN', name: 'Casablanca', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML', '150 ML'],
    price: 2750, rating: '★★★★☆', reviews: 68, cat: 'unisex',
    img: 'assets/products/casablanca.png', img2: 'assets/products/casablanca.png',
    desc: 'An ode to the exotic markets of Morocco — spiced, warm, and effortlessly wearable from day to night.',
    notes: { top: 'Orange Blossom, Cardamom', heart: 'Rose, Saffron, Amberwood', base: 'Musk, Vanilla, Sandalwood' },
    family: 'Spicy Amber', year: '2019', origin: 'UAE', sku: 'SA-CB-100', gender: 'Unisex',
    tag: 'EXOTIC<br>SPICED<br>TIMELESS'
  },
  {
    id: 'al-wisam', brand: 'RASASI', name: 'Al Wisam', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML', '150 ML'],
    price: 3350, rating: '★★★★★', reviews: 102, cat: 'men',
    img: 'assets/products/al-wisam.png', img2: 'assets/products/al-wisam.png',
    desc: 'Born to Win — a commanding, victorious scent built for the man who leads from the front.',
    notes: { top: 'Bergamot, Grapefruit, Pepper', heart: 'Lavender, Geranium, Cinnamon', base: 'Oud, Leather, Amber' },
    family: 'Woody Spicy', year: '2018', origin: 'UAE', sku: 'RS-AW-100', gender: 'Men',
    tag: 'VICTORIOUS<br>COMMANDING<br>TIMELESS'
  },

  /* ---- WATCHES ---- */
  {
    id: 'mini-focus-emerald-chrono', brand: 'MINI FOCUS', name: 'Emerald Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2200, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-emerald-chrono.png', img2: 'assets/watches/mf-emerald-chrono.png',
    desc: 'Mini Focus Emerald Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-emerald-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibso-aurora', brand: 'IBSO', name: 'Aurora', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1450, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Women',
    img: 'assets/watches/ibso-aurora.png', img2: 'assets/watches/ibso-aurora.png',
    desc: 'IBSO Aurora — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibso-aurora', watchCat: 'women',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-onyx-chrono', brand: 'MINI FOCUS', name: 'Onyx Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2350, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-onyx-chrono.png', img2: 'assets/watches/mf-onyx-chrono.png',
    desc: 'Mini Focus Onyx Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-onyx-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-azure-chrono', brand: 'MINI FOCUS', name: 'Azure Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2300, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-azure-chrono.png', img2: 'assets/watches/mf-azure-chrono.png',
    desc: 'Mini Focus Azure Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-azure-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-jade-chrono', brand: 'MINI FOCUS', name: 'Jade Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2250, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-jade-chrono.png', img2: 'assets/watches/mf-jade-chrono.png',
    desc: 'Mini Focus Jade Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-jade-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-noir-rose', brand: 'MINI FOCUS', name: 'Noir Rosé', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2400, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-noir-rose.png', img2: 'assets/watches/mf-noir-rose.png',
    desc: 'Mini Focus Noir Rosé — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-noir-rose', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibso-noir', brand: 'IBSO', name: 'Noir', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1500, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Women',
    img: 'assets/watches/ibso-noir.png', img2: 'assets/watches/ibso-noir.png',
    desc: 'IBSO Noir — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibso-noir', watchCat: 'women',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-tachy-racer', brand: 'MINI FOCUS', name: 'Tachy Racer', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2600, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-tachy-racer.png', img2: 'assets/watches/mf-tachy-racer.png',
    desc: 'Mini Focus Tachy Racer — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-tachy-racer', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-navy-classic', brand: 'MINI FOCUS', name: 'Navy Classic', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2100, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-navy-classic.png', img2: 'assets/watches/mf-navy-classic.png',
    desc: 'Mini Focus Navy Classic — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-navy-classic', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-scarlet-sport', brand: 'MINI FOCUS', name: 'Scarlet Sport', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2350, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-scarlet-sport.png', img2: 'assets/watches/mf-scarlet-sport.png',
    desc: 'Mini Focus Scarlet Sport — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-scarlet-sport', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibso-ember', brand: 'IBSO', name: 'Ember', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1400, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Women',
    img: 'assets/watches/ibso-ember.png', img2: 'assets/watches/ibso-ember.png',
    desc: 'IBSO Ember — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibso-ember', watchCat: 'women',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-slate', brand: 'MINI FOCUS', name: 'Slate', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1950, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-slate.png', img2: 'assets/watches/mf-slate.png',
    desc: 'Mini Focus Slate — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-slate', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibso-champagne', brand: 'IBSO', name: 'Champagne', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1550, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Women',
    img: 'assets/watches/ibso-champagne.png', img2: 'assets/watches/ibso-champagne.png',
    desc: 'IBSO Champagne — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibso-champagne', watchCat: 'women',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-voyager', brand: 'MINI FOCUS', name: 'Voyager', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2500, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-voyager.png', img2: 'assets/watches/mf-voyager.png',
    desc: 'Mini Focus Voyager — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-voyager', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-ice-chrono', brand: 'MINI FOCUS', name: 'Ice Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2300, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-ice-chrono.png', img2: 'assets/watches/mf-ice-chrono.png',
    desc: 'Mini Focus Ice Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-ice-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-desert-chrono', brand: 'MINI FOCUS', name: 'Desert Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2400, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-desert-chrono.png', img2: 'assets/watches/mf-desert-chrono.png',
    desc: 'Mini Focus Desert Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-desert-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibso-blossom', brand: 'IBSO', name: 'Blossom', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1450, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Women',
    img: 'assets/watches/ibso-blossom.png', img2: 'assets/watches/ibso-blossom.png',
    desc: 'IBSO Blossom — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibso-blossom', watchCat: 'women',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-gold-edition', brand: 'MINI FOCUS', name: 'Gold Edition', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2650, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-gold-edition.png', img2: 'assets/watches/mf-gold-edition.png',
    desc: 'Mini Focus Gold Edition — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-gold-edition', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-rosewood-tachy', brand: 'MINI FOCUS', name: 'Rosewood Tachy', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2700, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-rosewood-tachy.png', img2: 'assets/watches/mf-rosewood-tachy.png',
    desc: 'Mini Focus Rosewood Tachy — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-rosewood-tachy', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-graphite', brand: 'MINI FOCUS', name: 'Graphite', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1950, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-graphite.png', img2: 'assets/watches/mf-graphite.png',
    desc: 'Mini Focus Graphite — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-graphite', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-blue-classic', brand: 'MINI FOCUS', name: 'Blue Classic', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1850, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-blue-classic.png', img2: 'assets/watches/mf-blue-classic.png',
    desc: 'Mini Focus Blue Classic — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-blue-classic', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibso-lagoon', brand: 'IBSO', name: 'Lagoon', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1500, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Women',
    img: 'assets/watches/ibso-lagoon.png', img2: 'assets/watches/ibso-lagoon.png',
    desc: 'IBSO Lagoon — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibso-lagoon', watchCat: 'women',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-steel-chrono', brand: 'MINI FOCUS', name: 'Steel Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2200, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-steel-chrono.png', img2: 'assets/watches/mf-steel-chrono.png',
    desc: 'Mini Focus Steel Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-steel-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-silver-classic', brand: 'MINI FOCUS', name: 'Silver Classic', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1900, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-silver-classic.png', img2: 'assets/watches/mf-silver-classic.png',
    desc: 'Mini Focus Silver Classic — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-silver-classic', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibso-turquoise', brand: 'IBSO', name: 'Turquoise', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1500, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Women',
    img: 'assets/watches/ibso-turquoise.png', img2: 'assets/watches/ibso-turquoise.png',
    desc: 'IBSO Turquoise — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibso-turquoise', watchCat: 'women',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibso-ebony', brand: 'IBSO', name: 'Ebony', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1500, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Women',
    img: 'assets/watches/ibso-ebony.png', img2: 'assets/watches/ibso-ebony.png',
    desc: 'IBSO Ebony — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibso-ebony', watchCat: 'women',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-cobalt-chrono', brand: 'MINI FOCUS', name: 'Cobalt Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2300, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-cobalt-chrono.png', img2: 'assets/watches/mf-cobalt-chrono.png',
    desc: 'Mini Focus Cobalt Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-cobalt-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibso-emerald-square', brand: 'IBSO', name: 'Emerald Square', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1600, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Women',
    img: 'assets/watches/ibso-emerald-square.png', img2: 'assets/watches/ibso-emerald-square.png',
    desc: 'IBSO Emerald Square — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibso-emerald-square', watchCat: 'women',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-forest-chrono', brand: 'MINI FOCUS', name: 'Forest Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2350, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-forest-chrono.png', img2: 'assets/watches/mf-forest-chrono.png',
    desc: 'Mini Focus Forest Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-forest-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-sport-black', brand: 'MINI FOCUS', name: 'Sport Black', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2100, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-sport-black.png', img2: 'assets/watches/mf-sport-black.png',
    desc: 'Mini Focus Sport Black — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-sport-black', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-carbon-chrono', brand: 'MINI FOCUS', name: 'Carbon Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2300, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-carbon-chrono.png', img2: 'assets/watches/mf-carbon-chrono.png',
    desc: 'Mini Focus Carbon Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-carbon-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-midnight-chrono', brand: 'MINI FOCUS', name: 'Midnight Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2150, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-midnight-chrono.png', img2: 'assets/watches/mf-midnight-chrono.png',
    desc: 'Mini Focus Midnight Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-midnight-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-speedster', brand: 'MINI FOCUS', name: 'Speedster', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2600, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-speedster.png', img2: 'assets/watches/mf-speedster.png',
    desc: 'Mini Focus Speedster — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-speedster', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibso-jade-square', brand: 'IBSO', name: 'Jade Square', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1600, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Women',
    img: 'assets/watches/ibso-jade-square.png', img2: 'assets/watches/ibso-jade-square.png',
    desc: 'IBSO Jade Square — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibso-jade-square', watchCat: 'women',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-platinum-chrono', brand: 'MINI FOCUS', name: 'Platinum Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2400, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-platinum-chrono.png', img2: 'assets/watches/mf-platinum-chrono.png',
    desc: 'Mini Focus Platinum Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-platinum-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-amber-sport', brand: 'MINI FOCUS', name: 'Amber Sport', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2250, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-amber-sport.png', img2: 'assets/watches/mf-amber-sport.png',
    desc: 'Mini Focus Amber Sport — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-amber-sport', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibio-classic-black', brand: 'IBIO', name: 'Classic Black', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1800, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Unisex',
    img: 'assets/watches/ibio-classic-black.png', img2: 'assets/watches/ibio-classic-black.png',
    desc: 'IBIO Classic Black — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibio-classic-black', watchCat: 'unisex',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibio-textura', brand: 'IBIO', name: 'Textura', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1850, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Unisex',
    img: 'assets/watches/ibio-textura.png', img2: 'assets/watches/ibio-textura.png',
    desc: 'IBIO Textura — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibio-textura', watchCat: 'unisex',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibio-onyx', brand: 'IBIO', name: 'Onyx', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1750, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Unisex',
    img: 'assets/watches/ibio-onyx.png', img2: 'assets/watches/ibio-onyx.png',
    desc: 'IBIO Onyx — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibio-onyx', watchCat: 'unisex',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'split-piece-shadow', brand: 'SPLIT PIECE', name: 'Shadow', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 3200, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/splitpiece-shadow.png', img2: 'assets/watches/splitpiece-shadow.png',
    desc: 'Split Piece Shadow — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'split-piece-shadow', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'split-piece-crimson', brand: 'SPLIT PIECE', name: 'Crimson', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 3300, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/splitpiece-crimson.png', img2: 'assets/watches/splitpiece-crimson.png',
    desc: 'Split Piece Crimson — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'split-piece-crimson', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-black-tachy', brand: 'MINI FOCUS', name: 'Black Tachy', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2400, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-black-tachy.png', img2: 'assets/watches/mf-black-tachy.png',
    desc: 'Mini Focus Black Tachy — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-black-tachy', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-pearl-chrono', brand: 'MINI FOCUS', name: 'Pearl Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2200, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-pearl-chrono.png', img2: 'assets/watches/mf-pearl-chrono.png',
    desc: 'Mini Focus Pearl Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-pearl-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibio-steel', brand: 'IBIO', name: 'Steel', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1800, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Unisex',
    img: 'assets/watches/ibio-steel.png', img2: 'assets/watches/ibio-steel.png',
    desc: 'IBIO Steel — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibio-steel', watchCat: 'unisex',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibio-midnight-blue', brand: 'IBIO', name: 'Midnight Blue', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1850, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Unisex',
    img: 'assets/watches/ibio-midnight-blue.png', img2: 'assets/watches/ibio-midnight-blue.png',
    desc: 'IBIO Midnight Blue — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibio-midnight-blue', watchCat: 'unisex',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibio-navy-grid', brand: 'IBIO', name: 'Navy Grid', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1900, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Unisex',
    img: 'assets/watches/ibio-navy-grid.png', img2: 'assets/watches/ibio-navy-grid.png',
    desc: 'IBIO Navy Grid — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibio-navy-grid', watchCat: 'unisex',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibio-gold-square', brand: 'IBIO', name: 'Gold Square', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2000, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Unisex',
    img: 'assets/watches/ibio-gold-square.png', img2: 'assets/watches/ibio-gold-square.png',
    desc: 'IBIO Gold Square — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibio-gold-square', watchCat: 'unisex',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibio-pearl', brand: 'IBIO', name: 'Pearl', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1850, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Unisex',
    img: 'assets/watches/ibio-pearl.png', img2: 'assets/watches/ibio-pearl.png',
    desc: 'IBIO Pearl — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibio-pearl', watchCat: 'unisex',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-rose-sport', brand: 'MINI FOCUS', name: 'Rose Sport', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2300, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-rose-sport.png', img2: 'assets/watches/mf-rose-sport.png',
    desc: 'Mini Focus Rose Sport — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-rose-sport', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  }
];
