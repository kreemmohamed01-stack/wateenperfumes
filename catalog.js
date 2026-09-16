/* ════════════════════════════════════════════════
   WATEEN PERFUMES — SHARED PRODUCT CATALOG
   Single source of truth for cart, search, and the
   dynamic product page. Loaded before hero.js.
   ════════════════════════════════════════════════ */

var CATALOG = [
  {
    id: 'shuhrah', brand: 'RASASI', brandAr: 'رصاصي', name: 'Shuhrah', nameAr: 'شهرة', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '200 ML'],
    price: 1375, rating: '★★★★☆', reviews: 120, cat: 'men',
    img: 'assets/products/shuhrah.png', img2: 'assets/products/shuhrah.png',
    desc: 'A rare and captivating fragrance that blends warm spices, precious woods, and a touch of sensuality. Bold, refined, and made to be remembered.',
    notes: { top: 'Rosewood, Cardamom, Sichuan Pepper', heart: 'Oud, Sandalwood, Vetiver', base: 'Tonka Bean, Amber, Vanilla' },
    family: 'Woody Oriental', year: '2021', origin: 'UAE', sku: 'RS-SH-100', gender: 'Men',
    tag: 'BOLD<br>REFINED<br>TIMELESS'
  },
  {
    id: 'mahd-al-dhahab', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Mahd Al Dhahab', nameAr: 'مهد الذهب', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1600, rating: '★★★★★', reviews: 98, cat: 'men', extraCats: ['unisex'],
    img: 'assets/products/mahd-al-dhahab.png', img2: 'assets/products/mahd-al-dhahab.png',
    desc: 'A golden, opulent composition built around rich amber and precious oud — a fragrance made for those who command a room without saying a word.',
    notes: { top: 'Saffron, Bergamot, Pink Pepper', heart: 'Oud, Rose, Amber', base: 'Musk, Sandalwood, Vanilla' },
    family: 'Amber Oriental', year: '2022', origin: 'UAE', sku: 'AP-MAD-100', gender: 'Men',
    tag: 'OPULENT<br>GOLDEN<br>TIMELESS'
  },
  {
    id: 'musk-07', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Musk 07', nameAr: 'مسك 07', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 2950, rating: '★★★★☆', reviews: 210, cat: 'unisex',
    img: 'assets/products/musk-07.png', img2: 'assets/products/musk-07.png',
    desc: 'A soft, radiant musk that wraps the skin in warmth — delicate, clean, and effortlessly elegant for every day.',
    notes: { top: 'Bergamot, Pear, Pink Peppercorn', heart: 'White Musk, Jasmine, Iris', base: 'Sandalwood, Amber, Cedarwood' },
    family: 'Musky Floral', year: '2020', origin: 'UAE', sku: 'SA-M07-100', gender: 'Women',
    tag: 'SOFT<br>RADIANT<br>TIMELESS'
  },
  {
    id: 'shaghaf-oud-tonka', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Shaghaf Oud Tonka', nameAr: 'شغف عود تونكا', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['75 ML', '100 ML'],
    price: 2600, rating: '★★★★★', reviews: 176, cat: 'unisex', extraCats: ['men'],
    img: 'assets/products/shaghaf-oud-tonka.png', img2: 'assets/products/shaghaf-oud-tonka.png',
    desc: 'A sweet, smoky embrace of oud and tonka bean — passionate and addictive, for every side of you.',
    notes: { top: 'Bergamot, Cardamom', heart: 'Oud, Tonka Bean, Rose', base: 'Vanilla, Amber, Musk' },
    family: 'Woody Sweet', year: '2021', origin: 'UAE', sku: 'SA-SOT-100', gender: 'Unisex',
    tag: 'PASSIONATE<br>SMOKY<br>TIMELESS'
  },
  {
    id: 'shaghaf-oud-azraq', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Shaghaf Oud Azraq', nameAr: 'شغف عود أزرق', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['75 ML', '100 ML'],
    price: 2600, rating: '★★★★☆', reviews: 90, cat: 'unisex', extraCats: ['men'],
    img: 'assets/products/shaghaf-oud-azraq.png', img2: 'assets/products/shaghaf-oud-azraq.png',
    desc: 'A cool, aquatic take on oud — fresh and mysterious, blurring the line between marine and oriental.',
    notes: { top: 'Marine Notes, Bergamot', heart: 'Oud, Lavender, Geranium', base: 'Musk, Ambergris, Cedarwood' },
    family: 'Woody Aquatic', year: '2022', origin: 'UAE', sku: 'SA-SOA-100', gender: 'Unisex',
    tag: 'COOL<br>MYSTERIOUS<br>TIMELESS'
  },
  {
    id: 'shaghaf-oud-ahmar', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Shaghaf Oud Ahmar', nameAr: 'شغف عود أحمر', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['75 ML', '100 ML'],
    price: 2600, rating: '★★★★★', reviews: 134, cat: 'unisex', extraCats: ['men'],
    img: 'assets/products/shaghaf-oud-ahmar.png', img2: 'assets/products/shaghaf-oud-ahmar.png',
    desc: 'A bold red fruit and oud accord — vibrant, warm, and unapologetically confident.',
    notes: { top: 'Red Berries, Saffron', heart: 'Oud, Rose, Cinnamon', base: 'Amber, Musk, Patchouli' },
    family: 'Fruity Oriental', year: '2023', origin: 'UAE', sku: 'SA-SOAh-100', gender: 'Unisex',
    tag: 'BOLD<br>VIBRANT<br>TIMELESS'
  },
  {
    id: 'casablanca', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Casablanca', nameAr: 'الدار البيضاء', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML', '150 ML'],
    price: 2200, rating: '★★★★☆', reviews: 68, cat: 'unisex', extraCats: ['men', 'women'],
    img: 'assets/products/casablanca.png', img2: 'assets/products/casablanca.png',
    desc: 'An ode to the exotic markets of Morocco — spiced, warm, and effortlessly wearable from day to night.',
    notes: { top: 'Orange Blossom, Cardamom', heart: 'Rose, Saffron, Amberwood', base: 'Musk, Vanilla, Sandalwood' },
    family: 'Spicy Amber', year: '2019', origin: 'UAE', sku: 'SA-CB-100', gender: 'Unisex',
    tag: 'EXOTIC<br>SPICED<br>TIMELESS'
  },
  {
    id: 'al-wisam', brand: 'RASASI', brandAr: 'رصاصي', name: 'Al Wisam', nameAr: 'الوسام', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML', '150 ML'],
    price: 1850, rating: '★★★★★', reviews: 102, cat: 'men',
    img: 'assets/products/al-wisam.png', img2: 'assets/products/al-wisam.png',
    desc: 'Born to Win — a commanding, victorious scent built for the man who leads from the front.',
    notes: { top: 'Bergamot, Grapefruit, Pepper', heart: 'Lavender, Geranium, Cinnamon', base: 'Oud, Leather, Amber' },
    family: 'Woody Spicy', year: '2018', origin: 'UAE', sku: 'RS-AW-100', gender: 'Men',
    tag: 'VICTORIOUS<br>COMMANDING<br>TIMELESS'
  },

  {
    id: 'taj-al-oud', brand: 'AZHA', brandAr: 'أزها', name: 'Taj Al Oud', nameAr: 'تاج العود', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 750, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/taj-al-oud.png', img2: 'assets/products/taj-al-oud.png',
    desc: 'A regal oud composition from the Emerald Nebula Collection — deep, resinous, and crowned with warm spice for a presence that commands the room.',
    notes: { top: 'Saffron, Bergamot', heart: 'Oud, Rose', base: 'Amber, Musk, Sandalwood' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'AZ-TAO-100', gender: 'Men',
    tag: 'REGAL<br>RESINOUS<br>BOLD'
  },
  {
    id: 'ishq', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Ishq', nameAr: 'عشق', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 1525, rating: '★★★★★', reviews: 22, cat: 'men', extraCats: ['women'],
    img: 'assets/products/ishq.png', img2: 'assets/products/ishq.png',
    desc: 'An intoxicating amber-gourmand blend named for passion itself — golden, rich, and lingering long after the last note fades.',
    notes: { top: 'Saffron, Cardamom', heart: 'Rose, Amber', base: 'Vanilla, Sandalwood, Musk' },
    family: 'Amber Oriental', year: '2023', origin: 'UAE', sku: 'SA-ISHQ-100', gender: 'Men',
    tag: 'PASSIONATE<br>GOLDEN<br>TIMELESS'
  },
  {
    id: 'khamrah-dukhan', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Khamrah Dukhan', nameAr: 'خمرة دخان', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1700, rating: '★★★★☆', reviews: 34, cat: 'men',
    img: 'assets/products/khamrah-dukhan.png', img2: 'assets/products/khamrah-dukhan.png',
    desc: 'A smoky, spiced twist on the beloved Khamrah line — dark woods and warm spice wrapped in a hazy, incense-like veil.',
    notes: { top: 'Cinnamon, Nutmeg', heart: 'Dates, Tobacco', base: 'Oud, Smoked Woods, Amber' },
    family: 'Woody Spicy', year: '2023', origin: 'UAE', sku: 'LT-KHD-100', gender: 'Men',
    tag: 'SMOKY<br>SPICED<br>DEEP'
  },
  {
    id: 'alpine-homme-sport', brand: 'MAISON ALHAMBRA', brandAr: 'ميزون الحمرا', name: 'Alpine Homme Sport', nameAr: 'ألباين هوم سبورت', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 900, rating: '★★★★☆', reviews: 14, cat: 'men',
    img: 'assets/products/alpine-homme-sport.png', img2: 'assets/products/alpine-homme-sport.png',
    desc: 'A crisp, energetic fragrance built for movement — cool aromatic freshness with a clean woody finish for the active man.',
    notes: { top: 'Bergamot, Green Apple', heart: 'Lavender, Geranium', base: 'Cedarwood, Musk' },
    family: 'Aromatic Fresh', year: '2023', origin: 'UAE', sku: 'MA-AHS-100', gender: 'Men',
    tag: 'CRISP<br>ENERGETIC<br>FRESH'
  },
  {
    id: 'intense-pride', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Intense Pride', nameAr: 'إنتنس برايد', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1500, rating: '★★★★☆', reviews: 19, cat: 'men',
    img: 'assets/products/intense-pride.png', img2: 'assets/products/intense-pride.png',
    desc: 'A confident, full-bodied fragrance that lives up to its name — bold spice and rich woods for a man who leads with presence.',
    notes: { top: 'Pink Pepper, Bergamot', heart: 'Spices, Rose', base: 'Woods, Amber, Musk' },
    family: 'Woody Spicy', year: '2022', origin: 'UAE', sku: 'SA-IP-100', gender: 'Men',
    tag: 'CONFIDENT<br>BOLD<br>RICH'
  },
  {
    id: 'el-saled', brand: 'EXTRADOR', brandAr: 'إكسترادور', name: 'El Saled', nameAr: 'الصالد', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1700, rating: '★★★★☆', reviews: 5, cat: 'men',
    img: 'assets/products/el-saled.png', img2: 'assets/products/el-saled.png',
    desc: 'Presented in a striking trophy-shaped flacon, El Saled is a victorious, richly layered scent for the man who plays to win.',
    notes: { top: 'Bergamot, Pepper', heart: 'Spices, Leather', base: 'Oud, Amber, Musk' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'EX-ELS-100', gender: 'Men',
    tag: 'VICTORIOUS<br>BOLD<br>RARE'
  },
  {
    id: 'hawas-black', brand: 'RASASI', brandAr: 'رصاصي', name: 'Hawas Black For Him', nameAr: 'هوس بلاك للرجال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1850, rating: '★★★★★', reviews: 41, cat: 'men',
    img: 'assets/products/hawas-black.png', img2: 'assets/products/hawas-black.png',
    desc: 'A darker, more intense take on the iconic Hawas — magnetic and daring, built for the night and the man who owns it.',
    notes: { top: 'Bergamot, Black Pepper', heart: 'Lavender, Spices', base: 'Woods, Amber, Musk' },
    family: 'Woody Aromatic', year: '2021', origin: 'UAE', sku: 'RS-HWB-100', gender: 'Men',
    tag: 'MAGNETIC<br>DARING<br>BOLD'
  },
  {
    id: 'qaed-al-fursan', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Qaed Al Fursan', nameAr: 'قائد الفرسان', type: 'Eau de Parfum',
    size: '90 ML', sizes: ['90 ML'],
    price: 900, rating: '★★★★☆', reviews: 12, cat: 'men',
    img: 'assets/products/qaed-al-fursan.png', img2: 'assets/products/qaed-al-fursan.png',
    desc: 'The Commander of Knights — a bold, galloping composition of spice and oud that rides in strong and lingers even stronger.',
    notes: { top: 'Saffron, Cardamom', heart: 'Rose, Oud', base: 'Amber, Musk, Woods' },
    family: 'Woody Oriental', year: '2023', origin: 'UAE', sku: 'QAF-90', gender: 'Men',
    tag: 'BOLD<br>COMMANDING<br>RARE'
  },
  {
    id: 'ejaazi', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Ejaazi For Him', nameAr: 'إعجازي للرجال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 850, rating: '★★★★☆', reviews: 27, cat: 'men',
    img: 'assets/products/ejaazi.png', img2: 'assets/products/ejaazi.png',
    desc: 'A dazzling, crowd-pleasing scent that lives up to its name — "my miracle" — with sweet resins and warm amber wrapped in dark elegance.',
    notes: { top: 'Bergamot, Pear', heart: 'Amber, Spices', base: 'Vanilla, Musk, Woods' },
    family: 'Amber Sweet', year: '2022', origin: 'UAE', sku: 'LT-EJZ-100', gender: 'Men',
    tag: 'DAZZLING<br>SWEET<br>ELEGANT'
  },
  {
    id: 'igraa', brand: 'RASASI', brandAr: 'رصاصي', name: 'Igraa For Men', nameAr: 'إغراء للرجال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1050, rating: '★★★★☆', reviews: 18, cat: 'men',
    img: 'assets/products/igraa.png', img2: 'assets/products/igraa.png',
    desc: 'Temptation, bottled — a seductive blend of spice and woods designed to draw people in and keep them close.',
    notes: { top: 'Citrus, Spices', heart: 'Rose, Geranium', base: 'Woods, Amber, Musk' },
    family: 'Woody Spicy', year: '2020', origin: 'UAE', sku: 'RS-IGR-100', gender: 'Men',
    tag: 'SEDUCTIVE<br>WARM<br>TIMELESS'
  },
  {
    id: 'al-bahr', brand: 'AZHA', brandAr: 'أزها', name: 'Al Bahr For Him', nameAr: 'البحر للرجال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 975, rating: '★★★★☆', reviews: 9, cat: 'men',
    img: 'assets/products/al-bahr.png', img2: 'assets/products/al-bahr.png',
    desc: 'From the Sun Collection — a fresh, marine-inspired fragrance that captures the breeze and light of the open sea.',
    notes: { top: 'Marine Notes, Bergamot', heart: 'Sea Salt, Geranium', base: 'Musk, Driftwood, Amber' },
    family: 'Aromatic Aquatic', year: '2024', origin: 'UAE', sku: 'AZ-ALB-100', gender: 'Men',
    tag: 'FRESH<br>OPEN<br>BRIGHT'
  },
  {
    id: 'asad-zanzibar', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Asad Zanzibar', nameAr: 'أسد زنجبار', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1250, rating: '★★★★☆', reviews: 16, cat: 'men',
    img: 'assets/products/asad-zanzibar.png', img2: 'assets/products/asad-zanzibar.png',
    desc: 'The Lion of Zanzibar — a spiced, exotic edition of the Asad line with a warm island-spice heart and a commanding roar of a dry-down.',
    notes: { top: 'Spices, Citrus', heart: 'Cinnamon, Clove', base: 'Woods, Amber, Musk' },
    family: 'Spicy Woody', year: '2023', origin: 'UAE', sku: 'LT-ASZ-100', gender: 'Men',
    tag: 'EXOTIC<br>SPICED<br>BOLD'
  },
  {
    id: 'sotoor-taa', brand: 'RASASI', brandAr: 'رصاصي', name: "Sotoor Taa'", nameAr: 'سطور طاء', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1750, rating: '★★★★☆', reviews: 8, cat: 'men',
    img: 'assets/products/sotoor-taa.png', img2: 'assets/products/sotoor-taa.png',
    desc: 'Part of the Sotoor (Lines) series — a refined, amber-woody composition marked by the letter Taa, quietly confident and long-lasting.',
    notes: { top: 'Bergamot, Cardamom', heart: 'Amber, Rose', base: 'Sandalwood, Musk' },
    family: 'Amber Woody', year: '2022', origin: 'UAE', sku: 'RS-SOT-100', gender: 'Men',
    tag: 'REFINED<br>QUIET<br>CONFIDENT'
  },
  {
    id: 'edge', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Edge', nameAr: 'إيدج', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1600, rating: '★★★★☆', reviews: 21, cat: 'men',
    img: 'assets/products/edge.png', img2: 'assets/products/edge.png',
    desc: 'Sharp, modern, and a little dangerous — Edge is built for the man who likes to stand right at the line and lean over it.',
    notes: { top: 'Bergamot, Pepper', heart: 'Spices, Lavender', base: 'Woods, Leather, Musk' },
    family: 'Woody Aromatic', year: '2021', origin: 'UAE', sku: 'SA-EDG-100', gender: 'Men',
    tag: 'SHARP<br>MODERN<br>BOLD'
  },
  {
    id: 'khaltat-al-khasa', brand: 'RASASI', brandAr: 'رصاصي', name: 'Khaltat Al Khasa Ma Dhan Al Oud', nameAr: 'خلطة الخاصة مع دهن العود', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1300, rating: '★★★★★', reviews: 15, cat: 'men',
    img: 'assets/products/khaltat-al-khasa.png', img2: 'assets/products/khaltat-al-khasa.png',
    desc: 'A private blend enriched with precious oud oil — deep, resinous, and unmistakably rich from the very first spray.',
    notes: { top: 'Saffron, Spices', heart: 'Oud, Rose', base: 'Dhan Al Oud, Amber, Musk' },
    family: 'Oud Oriental', year: '2022', origin: 'UAE', sku: 'RS-KAK-100', gender: 'Men',
    tag: 'PRIVATE<br>RESINOUS<br>RARE'
  },
  {
    id: 'opulence-of-dubai', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Opulence of Dubai', nameAr: 'أوبلانس أوف دبي', type: 'Extrait de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 3700, rating: '★★★★★', reviews: 11, cat: 'men', extraCats: ['unisex'],
    img: 'assets/products/opulence-of-dubai.png', img2: 'assets/products/opulence-of-dubai.png',
    desc: 'An extrait de parfum tribute to the city’s skyline — luminous, golden, and lavish, capturing the glamour of Dubai in a single bottle.',
    notes: { top: 'Saffron, Bergamot', heart: 'Rose, Oud', base: 'Amber, Vanilla, Musk' },
    family: 'Amber Oriental', year: '2023', origin: 'UAE', sku: 'SA-OOD-100', gender: 'Men',
    tag: 'LAVISH<br>GOLDEN<br>ICONIC'
  },
  {
    id: 'raees', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Raees', nameAr: 'رئيس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1150, rating: '★★★★☆', reviews: 13, cat: 'men',
    img: 'assets/products/raees.png', img2: 'assets/products/raees.png',
    desc: 'Raees means "leader" — a poised, aromatic-woody fragrance for a man who sets the pace rather than follows it.',
    notes: { top: 'Bergamot, Marine Notes', heart: 'Geranium, Spices', base: 'Woods, Musk, Amber' },
    family: 'Woody Aromatic', year: '2023', origin: 'UAE', sku: 'AP-RAE-100', gender: 'Men',
    tag: 'POISED<br>SHARP<br>LEADING'
  },
  {
    id: 'asad-elixir', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Asad Elixir', nameAr: 'أسد إيليكسير', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1250, rating: '★★★★☆', reviews: 10, cat: 'men',
    img: 'assets/products/asad-elixir.png', img2: 'assets/products/asad-elixir.png',
    desc: 'A darker, more concentrated elixir from the Asad line — intense woods and smoky amber built for maximum longevity.',
    notes: { top: 'Spices, Bergamot', heart: 'Incense, Rose', base: 'Woods, Amber, Musk' },
    family: 'Woody Amber', year: '2023', origin: 'UAE', sku: 'LT-ASE-100', gender: 'Men',
    tag: 'INTENSE<br>SMOKY<br>DEEP'
  },
  {
    id: 'musamam-black-intense', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Musamam Black Intense', nameAr: 'مسمم بلاك إنتنس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1925, rating: '★★★★☆', reviews: 17, cat: 'men', extraCats: ['unisex'],
    img: 'assets/products/musamam-black-intense.png', img2: 'assets/products/musamam-black-intense.png',
    desc: 'Wrapped in a serpent-coiled flacon, Musamam Black Intense is a venomous, alluring scent of dark woods and smoldering spice.',
    notes: { top: 'Black Pepper, Bergamot', heart: 'Spices, Leather', base: 'Dark Woods, Amber, Musk' },
    family: 'Woody Spicy', year: '2023', origin: 'UAE', sku: 'LT-MBI-100', gender: 'Men',
    tag: 'DARK<br>ALLURING<br>INTENSE'
  },
  {
    id: 'ameer-al-oudh', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Ameer Al Oudh Intense Oud', nameAr: 'أمير العود إنتنس عود', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 950, rating: '★★★★★', reviews: 29, cat: 'men',
    img: 'assets/products/ameer-al-oudh.png', img2: 'assets/products/ameer-al-oudh.png',
    desc: 'Prince of Oud — an intense oud-forward composition that pairs smoky woods with warm amber for an unmistakably regal signature.',
    notes: { top: 'Saffron, Spices', heart: 'Oud, Rose', base: 'Amber, Musk, Sandalwood' },
    family: 'Oud Oriental', year: '2022', origin: 'UAE', sku: 'LT-AAO-100', gender: 'Men',
    tag: 'REGAL<br>SMOKY<br>INTENSE'
  },
  {
    id: 'la-di-da', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'La-Di-Da For Him', nameAr: 'لا-دي-دا للرجال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1700, rating: '★★★★☆', reviews: 7, cat: 'men',
    img: 'assets/products/la-di-da.png', img2: 'assets/products/la-di-da.png',
    desc: 'A sculpted, gunmetal flacon houses a sleek aromatic-woody scent — effortless and self-assured, made for easy everyday confidence.',
    notes: { top: 'Bergamot, Pepper', heart: 'Lavender, Spices', base: 'Woods, Musk' },
    family: 'Woody Aromatic', year: '2023', origin: 'UAE', sku: 'AP-LDD-100', gender: 'Men',
    tag: 'SLEEK<br>EASY<br>CONFIDENT'
  },
  {
    id: 'walaa', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Walaa', nameAr: 'ولاء', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 1525, rating: '★★★★☆', reviews: 12, cat: 'men', extraCats: ['women'],
    img: 'assets/products/walaa.png', img2: 'assets/products/walaa.png',
    desc: 'Loyalty, bottled — a warm, golden fragrance built on soft musk and amber that stays close and steady, just like its name promises.',
    notes: { top: 'Citrus, Pear', heart: 'Amber, Floral Notes', base: 'Musk, Sandalwood, Vanilla' },
    family: 'Amber Musky', year: '2022', origin: 'UAE', sku: 'SA-WAL-100', gender: 'Men',
    tag: 'LOYAL<br>WARM<br>STEADY'
  },
  {
    id: 'private-musk', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Private Musk', nameAr: 'برايفت مسك', type: 'Concentrated Perfume Oil',
    size: '12 ML', sizes: ['12 ML'],
    price: 1000, rating: '★★★★☆', reviews: 9, cat: 'men',
    img: 'assets/products/private-musk.png', img2: 'assets/products/private-musk.png',
    desc: 'A concentrated perfume oil built on pure, radiant musk — intimate and long-wearing, made for a scent that feels like second skin.',
    notes: { top: 'White Musk', heart: 'Soft Florals', base: 'Musk, Amber' },
    family: 'Musky', year: '2021', origin: 'UAE', sku: 'SA-PM-12', gender: 'Men',
    tag: 'INTIMATE<br>PURE<br>LASTING'
  },
  {
    id: 'rakaan', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Rakaan', nameAr: 'ركان', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1250, rating: '★★★★☆', reviews: 14, cat: 'men', extraCats: ['women'],
    img: 'assets/products/rakaan.png', img2: 'assets/products/rakaan.png',
    desc: 'A sturdy, green-accented fragrance in a striking crystal-capped flacon — fresh, aromatic, and quietly powerful.',
    notes: { top: 'Green Notes, Bergamot', heart: 'Geranium, Spices', base: 'Woods, Musk, Amber' },
    family: 'Aromatic Woody', year: '2023', origin: 'UAE', sku: 'SA-RKN-100', gender: 'Men',
    tag: 'STURDY<br>FRESH<br>QUIET'
  },
  {
    id: 'shahs-oud', brand: 'AZHA', brandAr: 'أزها', name: "Shah's Oud", nameAr: 'عود الشاه', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1300, rating: '★★★★★', reviews: 8, cat: 'men',
    img: 'assets/products/shahs-oud.png', img2: 'assets/products/shahs-oud.png',
    desc: 'A regal oud fragrance dressed in matte black and copper — deep, dark, and dignified, fit for royalty.',
    notes: { top: 'Spices, Bergamot', heart: 'Oud, Leather', base: 'Amber, Musk, Woods' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'AZ-SHO-100', gender: 'Men',
    tag: 'REGAL<br>DARK<br>DIGNIFIED'
  },
  {
    id: 'attar-al-ghutra', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Attar Al Ghutra', nameAr: 'عطر الغترة', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 2350, rating: '★★★★☆', reviews: 16, cat: 'men', extraCats: ['women'],
    img: 'assets/products/attar-al-ghutra.png', img2: 'assets/products/attar-al-ghutra.png',
    desc: 'Named for the traditional headscarf, Attar Al Ghutra is a heritage-inspired blend of warm spice and clean musk in a bold red and white flacon.',
    notes: { top: 'Cardamom, Bergamot', heart: 'Spices, Rose', base: 'Musk, Sandalwood, Amber' },
    family: 'Spicy Musky', year: '2022', origin: 'UAE', sku: 'SA-AAG-100', gender: 'Men',
    tag: 'HERITAGE<br>WARM<br>CLEAN'
  },
  {
    id: 'oud-layl', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Oud Llayl', nameAr: 'عود الليل', type: 'Parfum d’Eau',
    size: '100 ML', sizes: ['100 ML'],
    price: 2650, rating: '★★★★☆', reviews: 11, cat: 'men',
    img: 'assets/products/oud-layl.png', img2: 'assets/products/oud-layl.png',
    desc: 'Oud of the Night, from the Arabiyat Pot Care line — smoky and enveloping, a scent made to linger long after dark.',
    notes: { top: 'Spices, Saffron', heart: 'Oud, Amber', base: 'Woods, Musk, Vanilla' },
    family: 'Oud Oriental', year: '2023', origin: 'UAE', sku: 'LT-OUL-100', gender: 'Men',
    tag: 'NOCTURNAL<br>SMOKY<br>DEEP'
  },
  {
    id: 'royale-blue', brand: 'RASASI', brandAr: 'رصاصي', name: 'Royale Blue', nameAr: 'رويال بلو', type: 'Eau de Parfum',
    size: '75 ML', sizes: ['75 ML'],
    price: 950, rating: '★★★★☆', reviews: 23, cat: 'men',
    img: 'assets/products/royale-blue.png', img2: 'assets/products/royale-blue.png',
    desc: 'Cool, clean, and effortlessly wearable — Royale Blue is a fresh aromatic fragrance for every day, from morning to night.',
    notes: { top: 'Citrus, Marine Notes', heart: 'Lavender, Geranium', base: 'Musk, Woods, Amber' },
    family: 'Aromatic Fresh', year: '2020', origin: 'UAE', sku: 'RS-RYB-75', gender: 'Men',
    tag: 'FRESH<br>CLEAN<br>EVERYDAY'
  },
  {
    id: 'majd-al-sultan-black-intense', brand: 'ASDAAF', brandAr: 'أصداف', name: 'Majd Al Sultan Black Intense', nameAr: 'مجد السلطان بلاك إنتنس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 850, rating: '★★★★☆', reviews: 19, cat: 'men',
    img: 'assets/products/majd-al-sultan-black-intense.png', img2: 'assets/products/majd-al-sultan-black-intense.png',
    desc: 'Glory of the Sultan, Black Intense — a dark, ornate fragrance of deep woods and smoky amber housed in a striking engraved flacon.',
    notes: { top: 'Spices, Bergamot', heart: 'Oud, Leather', base: 'Amber, Musk, Dark Woods' },
    family: 'Woody Oriental', year: '2023', origin: 'UAE', sku: 'AD-MSB-100', gender: 'Men',
    tag: 'ORNATE<br>DARK<br>INTENSE'
  },
  {
    id: 'chevalier-noir', brand: 'AZHA', brandAr: 'أزها', name: 'Chevalier Noir For Him', nameAr: 'شوفالييه نوار للرجال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 750, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/chevalier-noir.png', img2: 'assets/products/chevalier-noir.png',
    desc: 'Black Knight, from the Butterfly Nebula Collection — a suave, amber-woody fragrance with quiet strength and dark elegance.',
    notes: { top: 'Bergamot, Spices', heart: 'Amber, Leather', base: 'Woods, Musk, Vanilla' },
    family: 'Amber Woody', year: '2024', origin: 'UAE', sku: 'AZ-CHN-100', gender: 'Men',
    tag: 'SUAVE<br>DARK<br>ELEGANT'
  },
  {
    id: 'royal-mystery', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Royal Mystery', nameAr: 'رويال ميستري', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1500, rating: '★★★★★', reviews: 20, cat: 'men', extraCats: ['women'],
    img: 'assets/products/royal-mystery.png', img2: 'assets/products/royal-mystery.png',
    desc: 'Wrapped in deep violet glass, Royal Mystery is an enigmatic, richly layered fragrance that reveals something new with every wear.',
    notes: { top: 'Saffron, Bergamot', heart: 'Rose, Spices', base: 'Amber, Oud, Musk' },
    family: 'Amber Oriental', year: '2023', origin: 'UAE', sku: 'SA-RMY-100', gender: 'Men',
    tag: 'ENIGMATIC<br>RICH<br>LAYERED'
  },
  {
    id: 'lubab', brand: 'AZHA', brandAr: 'أزها', name: 'Lubab For Him', nameAr: 'لباب للرجال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 750, rating: '★★★★☆', reviews: 5, cat: 'men',
    img: 'assets/products/lubab.png', img2: 'assets/products/lubab.png',
    desc: 'The Essence, from the Emerald Nebula Collection — a light, clean composition of soft musk and citrus for effortless daily wear.',
    notes: { top: 'Citrus, Bergamot', heart: 'Light Florals', base: 'Musk, Amber' },
    family: 'Fresh Musky', year: '2024', origin: 'UAE', sku: 'AZ-LUB-100', gender: 'Men',
    tag: 'LIGHT<br>CLEAN<br>EFFORTLESS'
  },
  {
    id: 'ashes-of-the-moon', brand: 'AZHA', brandAr: 'أزها', name: 'Ashes of the Moon For Him', nameAr: 'آشيز أوف ذا مون للرجال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 750, rating: '★★★★☆', reviews: 7, cat: 'men',
    img: 'assets/products/ashes-of-the-moon.png', img2: 'assets/products/ashes-of-the-moon.png',
    desc: 'From the Butterfly Nebula Collection — a smoky, mysterious amber-woody scent evoking moonlit nights and quiet embers.',
    notes: { top: 'Bergamot, Spices', heart: 'Incense, Amber', base: 'Woods, Musk, Vanilla' },
    family: 'Amber Woody', year: '2024', origin: 'UAE', sku: 'AZ-AOM-100', gender: 'Men',
    tag: 'SMOKY<br>MYSTERIOUS<br>NOCTURNAL'
  },
  {
    id: 'dehn-el-oud-malaki', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Dehn El Oud Malaki', nameAr: 'دهن العود ملكي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1600, rating: '★★★★★', reviews: 25, cat: 'men',
    img: 'assets/products/dehn-el-oud-malaki.png', img2: 'assets/products/dehn-el-oud-malaki.png',
    desc: 'Royal Oud Oil — a heritage classic housed in an ornate metal-wrapped flacon, rich with deep oud and warm amber resin.',
    notes: { top: 'Saffron, Spices', heart: 'Oud, Rose', base: 'Amber, Musk, Sandalwood' },
    family: 'Oud Oriental', year: '2019', origin: 'UAE', sku: 'SA-DEM-100', gender: 'Men',
    tag: 'ROYAL<br>RICH<br>HERITAGE'
  },
  {
    id: 'daarej', brand: 'RASASI', brandAr: 'رصاصي', name: 'Daarej Pour Homme', nameAr: 'دارج للرجال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1075, rating: '★★★★☆', reviews: 13, cat: 'men',
    img: 'assets/products/daarej.png', img2: 'assets/products/daarej.png',
    desc: 'A smooth, violet-hued fragrance that blends fresh aromatics with a soft woody base — approachable and easy to wear all day.',
    notes: { top: 'Bergamot, Lavender', heart: 'Geranium, Spices', base: 'Woods, Musk' },
    family: 'Aromatic Woody', year: '2021', origin: 'UAE', sku: 'RS-DRJ-100', gender: 'Men',
    tag: 'SMOOTH<br>EASY<br>DAILY'
  },
  {
    id: 'asad', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Asad', nameAr: 'أسد', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 2450, rating: '★★★★☆', reviews: 24, cat: 'men',
    img: 'assets/products/asad.png', img2: 'assets/products/asad.png',
    desc: 'The Lion — the original in the Asad line, a bold and roaring composition of spice and wood built to command attention.',
    notes: { top: 'Spices, Bergamot', heart: 'Amber, Leather', base: 'Woods, Musk' },
    family: 'Spicy Woody', year: '2022', origin: 'UAE', sku: 'LT-ASD-100', gender: 'Men',
    tag: 'BOLD<br>ROARING<br>CLASSIC'
  },
  {
    id: 'asad-bourbon', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Asad Bourbon', nameAr: 'أسد بوربون', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 2650, rating: '★★★★☆', reviews: 15, cat: 'men',
    img: 'assets/products/asad-bourbon.png', img2: 'assets/products/asad-bourbon.png',
    desc: 'A boozy, warm edition of the Asad line — bourbon-inflected spice and rich woods for a scent with real depth and character.',
    notes: { top: 'Bourbon Accord, Spices', heart: 'Amber, Tobacco', base: 'Woods, Musk, Vanilla' },
    family: 'Woody Boozy', year: '2023', origin: 'UAE', sku: 'LT-ASB-100', gender: 'Men',
    tag: 'BOOZY<br>WARM<br>RICH'
  },
  {
    id: 'sheikh-rashid', brand: 'AZHA', brandAr: 'أزها', name: 'Sheikh Rashid', nameAr: 'شيخ راشد', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 2050, rating: '★★★★★', reviews: 10, cat: 'men',
    img: 'assets/products/sheikh-rashid.png', img2: 'assets/products/sheikh-rashid.png',
    desc: 'From the Oud Collection — a distinguished, amber-oud fragrance named for leadership and legacy, rich from the very first breath.',
    notes: { top: 'Saffron, Spices', heart: 'Oud, Rose', base: 'Amber, Musk, Sandalwood' },
    family: 'Oud Oriental', year: '2024', origin: 'UAE', sku: 'AZ-SHR-100', gender: 'Men',
    tag: 'DISTINGUISHED<br>RICH<br>LEGACY'
  },
  {
    id: 'qasamat-bareeq', brand: 'RASASI', brandAr: 'رصاصي', name: 'Qasamat Bareeq', nameAr: 'قسمات بريق', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1550, rating: '★★★★★', reviews: 12, cat: 'men',
    img: 'assets/products/qasamat-bareeq.png', img2: 'assets/products/qasamat-bareeq.png',
    desc: 'Glimmer of Features — an opulent gold-and-amber fragrance in an ornate tasseled flacon, radiant and richly resinous.',
    notes: { top: 'Saffron, Bergamot', heart: 'Amber, Rose', base: 'Oud, Musk, Vanilla' },
    family: 'Amber Oriental', year: '2023', origin: 'UAE', sku: 'RS-QSB-100', gender: 'Men',
    tag: 'OPULENT<br>RADIANT<br>RESINOUS'
  },
  {
    id: 'amber-malaky', brand: 'AZHA', brandAr: 'أزها', name: 'Amber Malaky For Him', nameAr: 'العنبر الملكي للرجال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 700, rating: '★★★★☆', reviews: 8, cat: 'men',
    img: 'assets/products/amber-malaky.png', img2: 'assets/products/amber-malaky.png',
    desc: 'Royal Amber, from the Emerald Nebula Collection — a deep garnet-hued fragrance of warm amber and spice fit for a king.',
    notes: { top: 'Spices, Bergamot', heart: 'Amber, Rose', base: 'Musk, Woods, Vanilla' },
    family: 'Amber Oriental', year: '2024', origin: 'UAE', sku: 'AZ-AMM-100', gender: 'Men',
    tag: 'ROYAL<br>WARM<br>DEEP'
  },
  {
    id: 'entebaa', brand: 'RASASI', brandAr: 'رصاصي', name: 'Entebaa Pour Homme', nameAr: 'انتباه للرجال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1375, rating: '★★★★☆', reviews: 17, cat: 'men',
    img: 'assets/products/entebaa.png', img2: 'assets/products/entebaa.png',
    desc: '"First Impression Lasts Forever" — a sleek, confident fragrance designed to make an unforgettable entrance every time.',
    notes: { top: 'Bergamot, Citrus', heart: 'Spices, Lavender', base: 'Woods, Musk, Amber' },
    family: 'Woody Aromatic', year: '2022', origin: 'UAE', sku: 'RS-ENT-100', gender: 'Men',
    tag: 'CONFIDENT<br>SLEEK<br>MEMORABLE'
  },
  {
    id: 'bamboo-reflection', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Bamboo Reflection', nameAr: 'بامبو ريفليكشن', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1750, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/bamboo-reflection.png', img2: 'assets/products/bamboo-reflection.png',
    desc: 'A cool, green-tinted fragrance in a sculpted crystal flacon — light, aromatic, and refreshing like a walk through a bamboo grove.',
    notes: { top: 'Green Notes, Bergamot', heart: 'Bamboo Accord, Geranium', base: 'Musk, Light Woods' },
    family: 'Green Aromatic', year: '2024', origin: 'UAE', sku: 'AP-BAR-100', gender: 'Men',
    tag: 'COOL<br>GREEN<br>REFRESHING'
  },
  {
    id: 'sotoor-waaw', brand: 'RASASI', brandAr: 'رصاصي', name: 'Sotoor Waaw', nameAr: 'سطور واو', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1750, rating: '★★★★☆', reviews: 9, cat: 'men',
    img: 'assets/products/sotoor-waaw.png', img2: 'assets/products/sotoor-waaw.png',
    desc: 'Another chapter in the Sotoor (Lines) series — marked by the letter Waaw, a golden amber-woody scent with quiet, lasting warmth.',
    notes: { top: 'Bergamot, Spices', heart: 'Amber, Rose', base: 'Sandalwood, Musk' },
    family: 'Amber Woody', year: '2022', origin: 'UAE', sku: 'RS-SOW-100', gender: 'Men',
    tag: 'WARM<br>GOLDEN<br>QUIET'
  },
  {
    id: 'kashkha', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Kashkha', nameAr: 'كشخة', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1450, rating: '★★★★☆', reviews: 14, cat: 'men', extraCats: ['unisex', 'women'],
    img: 'assets/products/kashkha.png', img2: 'assets/products/kashkha.png',
    desc: 'Presented in an ornate mosaic-covered flacon, Kashkha means "sharp dressed" — a lavish, spiced fragrance built to impress.',
    notes: { top: 'Saffron, Spices', heart: 'Rose, Amber', base: 'Oud, Musk, Vanilla' },
    family: 'Amber Oriental', year: '2021', origin: 'UAE', sku: 'SA-KSH-100', gender: 'Men',
    tag: 'LAVISH<br>SHARP<br>IMPRESSIVE'
  },
  {
    id: 'maahir-legacy', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Maahir Legacy', nameAr: 'ماهر ليجاسي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1400, rating: '★★★★☆', reviews: 20, cat: 'men',
    img: 'assets/products/maahir-legacy.png', img2: 'assets/products/maahir-legacy.png',
    desc: 'A silver, horse-crested flacon houses a clean, confident fragrance built on fresh woods and soft musk — a legacy worth carrying.',
    notes: { top: 'Bergamot, Citrus', heart: 'Geranium, Spices', base: 'Woods, Musk, Amber' },
    family: 'Woody Aromatic', year: '2023', origin: 'UAE', sku: 'LT-MHL-100', gender: 'Men',
    tag: 'CLEAN<br>CONFIDENT<br>LASTING'
  },
  {
    id: 'nafaeis-al-shaghaf', brand: 'RASASI', brandAr: 'رصاصي', name: 'Nafaeis Al Shaghaf Pour Homme', nameAr: 'نفائس الشغف للرجال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1530, rating: '★★★★☆', reviews: 11, cat: 'men',
    img: 'assets/products/nafaeis-al-shaghaf.png', img2: 'assets/products/nafaeis-al-shaghaf.png',
    desc: 'Treasures of Passion — a clean, aromatic-fresh fragrance with a subtle blue-tinted heart, versatile enough for any occasion.',
    notes: { top: 'Citrus, Marine Notes', heart: 'Lavender, Geranium', base: 'Musk, Woods' },
    family: 'Aromatic Fresh', year: '2022', origin: 'UAE', sku: 'RS-NAS-100', gender: 'Men',
    tag: 'CLEAN<br>VERSATILE<br>FRESH'
  },
  {
    id: 'taraf', brand: 'AZHA', brandAr: 'أزها', name: 'Taraf For Him', nameAr: 'ترف للرجال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 975, rating: '★★★★☆', reviews: 5, cat: 'men',
    img: 'assets/products/taraf.png', img2: 'assets/products/taraf.png',
    desc: 'From the Sun Collection — Taraf means "luxury," a light golden fragrance of citrus and soft musk for effortless refinement.',
    notes: { top: 'Citrus, Bergamot', heart: 'Light Florals, Amber', base: 'Musk, Woods' },
    family: 'Fresh Musky', year: '2024', origin: 'UAE', sku: 'AZ-TRF-100', gender: 'Men',
    tag: 'LUXURIOUS<br>LIGHT<br>REFINED'
  },
  {
    id: 'cartago', brand: 'AZHA', brandAr: 'أزها', name: 'Cartago For Him', nameAr: 'قرطاجة للرجال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 750, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/cartago.png', img2: 'assets/products/cartago.png',
    desc: 'From the Butterfly Nebula Collection — a clean, green-accented aromatic fragrance named for the ancient city, structured and confident.',
    notes: { top: 'Green Notes, Bergamot', heart: 'Geranium, Spices', base: 'Musk, Light Woods' },
    family: 'Green Aromatic', year: '2024', origin: 'UAE', sku: 'AZ-CRT-100', gender: 'Men',
    tag: 'CLEAN<br>STRUCTURED<br>CONFIDENT'
  },
  {
    id: 'raghba-for-man', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Raghba For Man', nameAr: 'رغبة للرجال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 800, rating: '★★★★☆', reviews: 14, cat: 'men',
    img: 'assets/products/raghba-for-man.png', img2: 'assets/products/raghba-for-man.png',
    desc: 'Desire, for men — a bold, dark fragrance of rich spice and amber housed in a striking angular black-and-gold flacon.',
    notes: { top: 'Spices, Bergamot', heart: 'Amber, Rose', base: 'Woods, Musk, Vanilla' },
    family: 'Amber Spicy', year: '2022', origin: 'UAE', sku: 'LT-RFM-100', gender: 'Men',
    tag: 'BOLD<br>DARK<br>DESIRABLE'
  },
  {
    id: 'noire-absolu', brand: 'NOIRÉ', brandAr: 'نوار', name: 'Noiré Absolu', nameAr: 'نوار أبسولو', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1550, rating: '★★★★☆', reviews: 4, cat: 'men',
    img: 'assets/products/noire-absolu.png', img2: 'assets/products/noire-absolu.png',
    desc: 'A textured black flacon holds a dark, absolute fragrance of smoky woods and warm musk — understated and confidently mysterious.',
    notes: { top: 'Bergamot, Spices', heart: 'Incense, Amber', base: 'Woods, Musk' },
    family: 'Woody Amber', year: '2023', origin: 'UAE', sku: 'NR-NAB-100', gender: 'Men',
    tag: 'DARK<br>MYSTERIOUS<br>UNDERSTATED'
  },
  {
    id: 'noire-absolut-london', brand: 'ABSOLUT LONDON', brandAr: 'أبسولوت لندن', name: 'Noiré', nameAr: 'نوار', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1550, rating: '★★★★☆', reviews: 3, cat: 'men',
    img: 'assets/products/noire-absolut-london.png', img2: 'assets/products/noire-absolut-london.png',
    desc: 'A textured charcoal flacon fading to silver — a refined, smoky-woody fragrance from the London house, dark and quietly confident.',
    notes: { top: 'Bergamot, Pepper', heart: 'Spices, Woods', base: 'Amber, Musk' },
    family: 'Woody Amber', year: '2023', origin: 'UK', sku: 'AL-NR-100', gender: 'Men',
    tag: 'REFINED<br>SMOKY<br>CONFIDENT'
  },
  {
    id: 'pure-instinct', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Pure Instinct', nameAr: 'بيور إنستينكت', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1500, rating: '★★★★★', reviews: 18, cat: 'men',
    img: 'assets/products/pure-instinct.png', img2: 'assets/products/pure-instinct.png',
    desc: 'A deep midnight-blue flacon crowned with a lion emblem — instinctive, magnetic, and built on rich amber and warm woods.',
    notes: { top: 'Bergamot, Spices', heart: 'Amber, Leather', base: 'Woods, Musk, Vanilla' },
    family: 'Amber Woody', year: '2023', origin: 'UAE', sku: 'SA-PIN-100', gender: 'Men',
    tag: 'INSTINCTIVE<br>MAGNETIC<br>RICH'
  },
  {
    id: 'khateer', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Khateer', nameAr: 'خطير', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 800, rating: '★★★★☆', reviews: 22, cat: 'men',
    img: 'assets/products/khateer.png', img2: 'assets/products/khateer.png',
    desc: 'Dangerous — a bold, amber-spiced classic in a sunny yellow flacon, warm and instantly recognizable.',
    notes: { top: 'Citrus, Spices', heart: 'Amber, Rose', base: 'Musk, Sandalwood, Vanilla' },
    family: 'Amber Spicy', year: '2018', origin: 'UAE', sku: 'SA-KHT-100', gender: 'Men',
    tag: 'BOLD<br>WARM<br>CLASSIC'
  },
  {
    id: 'amber-01', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Amber 01', nameAr: 'عنبر 01', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 2350, rating: '★★★★★', reviews: 15, cat: 'men', extraCats: ['women'],
    img: 'assets/products/amber-01.png', img2: 'assets/products/amber-01.png',
    desc: 'A study in pure amber — warm, radiant, and beautifully layered, housed in a sculptural copper-capped flacon.',
    notes: { top: 'Bergamot, Spices', heart: 'Amber, Labdanum', base: 'Vanilla, Musk, Woods' },
    family: 'Amber Oriental', year: '2023', origin: 'UAE', sku: 'SA-AM01-100', gender: 'Men',
    tag: 'WARM<br>RADIANT<br>LAYERED'
  },
  {
    id: 'maahir-black-edition', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Maahir Black Edition', nameAr: 'ماهر بلاك إديشن', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1250, rating: '★★★★★', reviews: 21, cat: 'men',
    img: 'assets/products/maahir-black-edition.png', img2: 'assets/products/maahir-black-edition.png',
    desc: 'A striking black horse-head flacon holds a darker, more intense edition of Maahir — deep woods and smoky amber for the night.',
    notes: { top: 'Spices, Bergamot', heart: 'Incense, Leather', base: 'Dark Woods, Amber, Musk' },
    family: 'Woody Amber', year: '2023', origin: 'UAE', sku: 'LT-MBE-100', gender: 'Men',
    tag: 'DARK<br>INTENSE<br>NOCTURNAL'
  },
  {
    id: 'khafaya', brand: 'ZIMAYA', brandAr: 'زيمايا', name: 'Khafaya', nameAr: 'خفايا', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1250, rating: '★★★★☆', reviews: 7, cat: 'men',
    img: 'assets/products/khafaya.png', img2: 'assets/products/khafaya.png',
    desc: 'Secrets — a vivid blue, faceted flacon holding a cool, aromatic fragrance that keeps something in reserve with every wear.',
    notes: { top: 'Bergamot, Marine Notes', heart: 'Lavender, Geranium', base: 'Musk, Woods, Amber' },
    family: 'Aromatic Fresh', year: '2023', origin: 'UAE', sku: 'ZM-KHF-100', gender: 'Men',
    tag: 'COOL<br>MYSTERIOUS<br>FRESH'
  },
  {
    id: 'daiman', brand: 'ZIMAYA', brandAr: 'زيمايا', name: 'Daiman', nameAr: 'دايمان', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1500, rating: '★★★★☆', reviews: 3, cat: 'men',
    img: 'assets/products/daiman.png', img2: 'assets/products/daiman.png',
    desc: 'Forever — a sleek gunmetal fragrance built on smoky woods and soft amber, designed for a scent that truly lasts.',
    notes: { top: 'Bergamot, Spices', heart: 'Amber, Leather', base: 'Woods, Musk' },
    family: 'Woody Amber', year: '2023', origin: 'UAE', sku: 'ZM-DAI-100', gender: 'Men',
    tag: 'LASTING<br>SMOKY<br>SLEEK'
  },
  {
    id: 'ana-al-abyad-leather', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Ana Al Abyad Leather', nameAr: 'أنا الأبيض ليذر', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 900, rating: '★★★★☆', reviews: 2, cat: 'men',
    img: 'assets/products/ana-al-abyad-leather.png', img2: 'assets/products/ana-al-abyad-leather.png',
    desc: 'I Am the White, on Leather — a bold contrast of clean florals and rich leather for a presence that stands apart.',
    notes: { top: 'Bergamot, White Florals', heart: 'Leather, Spices', base: 'Musk, Woods' },
    family: 'Leather Floral', year: '2024', origin: 'UAE', sku: 'LT-AAWL-100', gender: 'Men',
    tag: 'BOLD<br>DISTINCT<br>RARE'
  },
  {
    id: 'la-yuqawam', brand: 'RASASI', brandAr: 'رصاصي', name: 'La Yuqawam', nameAr: 'لا يقاوم', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 3000, rating: '★★★★☆', reviews: 9, cat: 'men',
    img: 'assets/products/la-yuqawam.png', img2: 'assets/products/la-yuqawam.png',
    desc: 'Irresistible — a matte black flacon holding a magnetic blend of maple and warm woods that lingers long after you leave.',
    notes: { top: 'Maple, Bergamot', heart: 'Spices, Woods', base: 'Amber, Musk' },
    family: 'Woody Spicy', year: '2022', origin: 'UAE', sku: 'RS-LYQ-100', gender: 'Men',
    tag: 'IRRESISTIBLE<br>MAGNETIC<br>BOLD'
  },
  {
    id: 'blue-for-men', brand: 'RASASI', brandAr: 'رصاصي', name: 'Blue For Men', nameAr: 'بلو فور مين', type: 'Eau de Toilette',
    size: '100 ML', sizes: ['100 ML'],
    price: 975, rating: '★★★★☆', reviews: 21, cat: 'men',
    img: 'assets/products/blue-for-men.png', img2: 'assets/products/blue-for-men.png',
    desc: 'A classic, everyday-fresh blue fragrance — clean and versatile, easy to wear from morning to night.',
    notes: { top: 'Citrus, Aquatic Notes', heart: 'Lavender, Geranium', base: 'Musk, Woods' },
    family: 'Aromatic Fresh', year: '2019', origin: 'UAE', sku: 'RS-BFM-100', gender: 'Men',
    tag: 'CLASSIC<br>FRESH<br>VERSATILE'
  },
  {
    id: 'velvet-oud', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Velvet Oud', nameAr: 'فلفت عود', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1150, rating: '★★★★☆', reviews: 7, cat: 'men',
    img: 'assets/products/velvet-oud.png', img2: 'assets/products/velvet-oud.png',
    desc: 'A rich, velvety oud wrapped in gold — warm, smooth, and deeply comforting from the very first spray.',
    notes: { top: 'Saffron, Cardamom', heart: 'Oud, Rose', base: 'Amber, Vanilla, Musk' },
    family: 'Oud Oriental', year: '2023', origin: 'UAE', sku: 'LT-VLO-100', gender: 'Men',
    tag: 'VELVETY<br>WARM<br>COMFORTING'
  },
  {
    id: 'his-confession', brand: 'LATTAFA', brandAr: 'لطافة', name: 'His Confession', nameAr: 'هيز كونفيشن', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1950, rating: '★★★★★', reviews: 15, cat: 'men',
    img: 'assets/products/his-confession.png', img2: 'assets/products/his-confession.png',
    desc: 'A striking gold-and-black flacon crowned with a sculpted bust — a confident, statement-making fragrance for a bold man.',
    notes: { top: 'Bergamot, Pepper', heart: 'Spices, Leather', base: 'Amber, Oud, Musk' },
    family: 'Woody Oriental', year: '2023', origin: 'UAE', sku: 'LT-HCN-100', gender: 'Men',
    tag: 'CONFIDENT<br>BOLD<br>STRIKING'
  },
  {
    id: 'oud-maal', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Oud Maal', nameAr: 'عود مال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 900, rating: '★★★★☆', reviews: 5, cat: 'men',
    img: 'assets/products/oud-maal.png', img2: 'assets/products/oud-maal.png',
    desc: 'A frosted silver flacon veiled in lace holds a rich, resinous oud — opulent and quietly luxurious.',
    notes: { top: 'Saffron, Rose', heart: 'Oud, Amber', base: 'Musk, Sandalwood' },
    family: 'Oud Oriental', year: '2023', origin: 'UAE', sku: 'LT-OMA-100', gender: 'Men',
    tag: 'OPULENT<br>RESINOUS<br>LUXURIOUS'
  },
  {
    id: 'hayaam', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Hayaam', nameAr: 'هيام', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1525, rating: '★★★★★', reviews: 10, cat: 'men', extraCats: ['women'],
    img: 'assets/products/hayaam.png', img2: 'assets/products/hayaam.png',
    desc: 'A radiant golden fragrance in a sculpted flacon — warm, magnetic, and built to be remembered.',
    notes: { top: 'Bergamot, Saffron', heart: 'Rose, Amber', base: 'Musk, Sandalwood, Vanilla' },
    family: 'Amber Floral', year: '2023', origin: 'UAE', sku: 'SA-HYM-100', gender: 'Men',
    tag: 'RADIANT<br>WARM<br>MAGNETIC'
  },
  {
    id: 'shaghaf-for-men', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Shaghaf For Men', nameAr: 'شغف فور مين', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1200, rating: '★★★★☆', reviews: 13, cat: 'men',
    img: 'assets/products/shaghaf-for-men.png', img2: 'assets/products/shaghaf-for-men.png',
    desc: 'A cool aquatic-woody blend in a quilted silver flacon — crisp, refined, and effortlessly modern.',
    notes: { top: 'Marine Notes, Bergamot', heart: 'Lavender, Geranium', base: 'Musk, Woods' },
    family: 'Aromatic Aquatic', year: '2022', origin: 'UAE', sku: 'SA-SFM-100', gender: 'Men',
    tag: 'COOL<br>CRISP<br>REFINED'
  },
  {
    id: 'hawas-viper', brand: 'RASASI', brandAr: 'رصاصي', name: 'Hawas Viper For Him', nameAr: 'هوس فايبر', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 3050, rating: '★★★★★', reviews: 8, cat: 'men',
    img: 'assets/products/hawas-viper.png', img2: 'assets/products/hawas-viper.png',
    desc: 'A textured cream flacon with a coiled serpent accent — sleek, daring, and quietly venomous in the best way.',
    notes: { top: 'Bergamot, Pepper', heart: 'Spices, Leather', base: 'Amber, Musk, Woods' },
    family: 'Woody Spicy', year: '2024', origin: 'UAE', sku: 'RS-HWV-100', gender: 'Men',
    tag: 'DARING<br>SLEEK<br>BOLD'
  },
  {
    id: 'shafaq', brand: 'AZHA', brandAr: 'أزها', name: 'Shafaq For Him', nameAr: 'شفق', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 975, rating: '★★★★☆', reviews: 3, cat: 'men',
    img: 'assets/products/shafaq.png', img2: 'assets/products/shafaq.png',
    desc: 'Twilight — a serene teal-toned fragrance capturing the calm, glowing moments between day and night.',
    notes: { top: 'Citrus, Bergamot', heart: 'Aromatic Herbs, Amber', base: 'Musk, Woods' },
    family: 'Aromatic Fresh', year: '2024', origin: 'UAE', sku: 'AZ-SFQ-100', gender: 'Men',
    tag: 'SERENE<br>GLOWING<br>CALM'
  },
  {
    id: 'hawas-kobra', brand: 'RASASI', brandAr: 'رصاصي', name: 'Hawas Kobra For Men', nameAr: 'هوس كوبرا', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1900, rating: '★★★★★', reviews: 11, cat: 'men',
    img: 'assets/products/hawas-kobra.png', img2: 'assets/products/hawas-kobra.png',
    desc: 'A sleek matte-black flacon — dark, commanding, and unmistakably confident.',
    notes: { top: 'Bergamot, Black Pepper', heart: 'Spices, Leather', base: 'Oud, Amber, Musk' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'RS-HWK-100', gender: 'Men',
    tag: 'DARK<br>COMMANDING<br>CONFIDENT'
  },
  {
    id: 'hawas-ice', brand: 'RASASI', brandAr: 'رصاصي', name: 'Hawas Ice For Him', nameAr: 'هوس آيس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 2100, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/hawas-ice.png', img2: 'assets/products/hawas-ice.png',
    desc: 'A frosted blue take on the Hawas line — cool, crisp, and refreshingly bold.',
    notes: { top: 'Mint, Bergamot', heart: 'Marine Notes, Lavender', base: 'Musk, Woods' },
    family: 'Aromatic Aquatic', year: '2024', origin: 'UAE', sku: 'RS-HWI-100', gender: 'Men',
    tag: 'COOL<br>CRISP<br>REFRESHING'
  },
  {
    id: 'soroh', brand: 'AZHA', brandAr: 'أزها', name: 'Soroh For Him', nameAr: 'صروح', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 975, rating: '★★★★☆', reviews: 2, cat: 'men',
    img: 'assets/products/soroh.png', img2: 'assets/products/soroh.png',
    desc: 'From the Sun Collection — a crystal-clear fragrance of quiet strength, clean and confidently understated.',
    notes: { top: 'Citrus, Aromatic Herbs', heart: 'Musk, Amber', base: 'Woods, Vanilla' },
    family: 'Fresh Musky', year: '2024', origin: 'UAE', sku: 'AZ-SRH-100', gender: 'Men',
    tag: 'CLEAN<br>QUIET<br>CONFIDENT'
  },
  {
    id: 'hawas', brand: 'RASASI', brandAr: 'رصاصي', name: 'Hawas For Him', nameAr: 'هوس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1850, rating: '★★★★★', reviews: 34, cat: 'men',
    img: 'assets/products/hawas.png', img2: 'assets/products/hawas.png',
    desc: 'The original Hawas — a magnetic violet-hued fragrance of passion and desire, the house’s signature bestseller.',
    notes: { top: 'Bergamot, Pink Pepper', heart: 'Lavender, Spices', base: 'Amber, Musk, Woods' },
    family: 'Aromatic Spicy', year: '2018', origin: 'UAE', sku: 'RS-HWS-100', gender: 'Men',
    tag: 'PASSIONATE<br>MAGNETIC<br>ICONIC'
  },
  {
    id: 'hatem', brand: 'RASASI', brandAr: 'رصاصي', name: 'Hatem', nameAr: 'حاتم', type: 'Eau de Parfum',
    size: '75 ML', sizes: ['75 ML'],
    price: 950, rating: '★★★★☆', reviews: 9, cat: 'men', extraCats: ['unisex'],
    img: 'assets/products/hatem.png', img2: 'assets/products/hatem.png',
    desc: 'A soft, silvery-blue fragrance named for generosity — clean, approachable, and easy to wear daily.',
    notes: { top: 'Citrus, Aquatic Notes', heart: 'Lavender, Geranium', base: 'Musk, Woods' },
    family: 'Aromatic Fresh', year: '2020', origin: 'UAE', sku: 'RS-HTM-75', gender: 'Men',
    tag: 'CLEAN<br>APPROACHABLE<br>DAILY'
  },
  {
    id: 'sehr-al-sheila', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Sehr Al Sheila', nameAr: 'سحر الشيلة', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 2350, rating: '★★★★★', reviews: 7, cat: 'men', extraCats: ['women'],
    img: 'assets/products/sehr-al-sheila.png', img2: 'assets/products/sehr-al-sheila.png',
    desc: 'A regal black-and-gold flacon with a jeweled crown cap — an enchanting blend of florals and warm spice.',
    notes: { top: 'Saffron, Rose', heart: 'Florals, Amber', base: 'Musk, Sandalwood, Vanilla' },
    family: 'Amber Floral', year: '2023', origin: 'UAE', sku: 'SA-SAS-100', gender: 'Men',
    tag: 'REGAL<br>ENCHANTING<br>WARM'
  },
  {
    id: 'gharaam', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Gharaam', nameAr: 'غرام', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1525, rating: '★★★★☆', reviews: 5, cat: 'men', extraCats: ['women'],
    img: 'assets/products/gharaam.png', img2: 'assets/products/gharaam.png',
    desc: 'Passion — a golden fragrance in a sculpted flacon, warm and alluring from the very first note.',
    notes: { top: 'Bergamot, Saffron', heart: 'Rose, Amber', base: 'Musk, Sandalwood' },
    family: 'Amber Floral', year: '2023', origin: 'UAE', sku: 'SA-GHR-100', gender: 'Men',
    tag: 'PASSIONATE<br>WARM<br>ALLURING'
  },
  {
    id: 'yaqut-intense', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Yaqut Intense', nameAr: 'ياقوت إنتنس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 2850, rating: '★★★★★', reviews: 14, cat: 'men',
    img: 'assets/products/yaqut-intense.png', img2: 'assets/products/yaqut-intense.png',
    desc: 'Ruby, Intense — a striking gold-and-black flacon crowned with a serpent, holding a rich and daring composition.',
    notes: { top: 'Saffron, Spices', heart: 'Oud, Rose', base: 'Amber, Musk, Woods' },
    family: 'Woody Oriental', year: '2023', origin: 'UAE', sku: 'LT-YQI-100', gender: 'Men',
    tag: 'STRIKING<br>RICH<br>DARING'
  },
  {
    id: 'faqat-lel-rijal', brand: 'RASASI', brandAr: 'رصاصي', name: 'Faqat Lel Rijal', nameAr: 'فقط للرجال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1365, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/faqat-lel-rijal.png', img2: 'assets/products/faqat-lel-rijal.png',
    desc: 'Only for Men — a clean, monochrome fragrance built for confident everyday wear.',
    notes: { top: 'Citrus, Bergamot', heart: 'Aromatic Herbs, Spices', base: 'Musk, Woods' },
    family: 'Aromatic Woody', year: '2021', origin: 'UAE', sku: 'RS-FLR-100', gender: 'Men',
    tag: 'CLEAN<br>CONFIDENT<br>DAILY'
  },
  {
    id: 'pride-of-lattafa', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Pride of Lattafa', nameAr: 'فخر لطافة', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1200, rating: '★★★★★', reviews: 16, cat: 'men',
    img: 'assets/products/pride-of-lattafa.png', img2: 'assets/products/pride-of-lattafa.png',
    desc: 'A round, silver-and-black flacon with a faceted crystal medallion — a proud, richly layered signature scent.',
    notes: { top: 'Saffron, Bergamot', heart: 'Oud, Rose', base: 'Amber, Musk, Sandalwood' },
    family: 'Woody Oriental', year: '2023', origin: 'UAE', sku: 'LT-POL-100', gender: 'Men',
    tag: 'PROUD<br>RICH<br>SIGNATURE'
  },
  {
    id: 'shuhrah-elixir', brand: 'RASASI', brandAr: 'رصاصي', name: 'Shuhrah Elixir Pour Homme', nameAr: 'شهرة إليكسير', type: 'Eau de Parfum',
    size: '90 ML', sizes: ['90 ML'],
    price: 1525, rating: '★★★★★', reviews: 10, cat: 'men',
    img: 'assets/products/shuhrah-elixir.png', img2: 'assets/products/shuhrah-elixir.png',
    desc: 'A vivid blue elixir edition of Shuhrah — bold, radiant, and unmistakably confident.',
    notes: { top: 'Rosewood, Cardamom', heart: 'Oud, Sandalwood', base: 'Tonka Bean, Amber, Vanilla' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'RS-SHE-90', gender: 'Men',
    tag: 'BOLD<br>RADIANT<br>CONFIDENT'
  },
  {
    id: 'enteash', brand: 'RASASI', brandAr: 'رصاصي', name: 'Enteash', nameAr: 'انتعاش', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1050, rating: '★★★★☆', reviews: 5, cat: 'men',
    img: 'assets/products/enteash.png', img2: 'assets/products/enteash.png',
    desc: 'Refreshment — a vivid royal-blue fragrance with a damask motif, crisp and invigorating.',
    notes: { top: 'Citrus, Mint', heart: 'Aromatic Herbs, Florals', base: 'Musk, Woods' },
    family: 'Aromatic Fresh', year: '2022', origin: 'UAE', sku: 'RS-ENT-100', gender: 'Men',
    tag: 'REFRESHING<br>CRISP<br>VIVID'
  },
  {
    id: 'mountaineer', brand: 'AZHA', brandAr: 'أزها', name: 'Mountaineer For Him', nameAr: 'ماونتينير', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 750, rating: '★★★★☆', reviews: 4, cat: 'men',
    img: 'assets/products/mountaineer.png', img2: 'assets/products/mountaineer.png',
    desc: 'From the Butterfly Nebula Collection — a cool, sage-toned fragrance inspired by high-altitude air and quiet strength.',
    notes: { top: 'Bergamot, Green Notes', heart: 'Aromatic Herbs, Lavender', base: 'Musk, Woods' },
    family: 'Aromatic Fresh', year: '2024', origin: 'UAE', sku: 'AZ-MTN-100', gender: 'Men',
    tag: 'COOL<br>STRONG<br>QUIET'
  },
  {
    id: 'al-dar-al-maknoun-black', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Al Dar Al Maknoun Black', nameAr: 'الدار المكنون اسود', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 750, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/al-dar-al-maknoun-black.png', img2: 'assets/products/al-dar-al-maknoun-black.png',
    desc: 'A dark, resinous house of oud - deep and enveloping, built for cool evenings and quiet confidence.',
    notes: { top: 'Saffron, Bergamot', heart: 'Oud, Rose', base: 'Amber, Musk, Sandalwood' },
    family: 'Woody Oriental', year: '2023', origin: 'UAE', sku: 'AL-DMB-100', gender: 'Men',
    tag: 'DARK<br>RESINOUS<br>ENVELOPING'
  },
  {
    id: 'al-dahr', brand: 'AZHA', brandAr: 'أزها', name: 'Al Dahr', nameAr: 'الدهر', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 975, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/al-dahr.png', img2: 'assets/products/al-dahr.png',
    desc: 'Timeless and unhurried - a smoky oud composition that speaks softly and lingers long.',
    notes: { top: 'Spices, Cardamom', heart: 'Oud, Leather', base: 'Amber, Musk, Woods' },
    family: 'Woody Oriental', year: '2023', origin: 'UAE', sku: 'DHR-100', gender: 'Men',
    tag: 'TIMELESS<br>SMOKY<br>LINGERING'
  },
  {
    id: 'al-oud-al-aswad', brand: 'AZHA', brandAr: 'أزها', name: 'Al Oud Al Aswad', nameAr: 'العود الاسود', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 750, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/al-oud-al-aswad.png', img2: 'assets/products/al-oud-al-aswad.png',
    desc: 'The Black Oud - a dense, smouldering composition of resin and dark wood for those who favour intensity.',
    notes: { top: 'Black Pepper, Saffron', heart: 'Oud, Patchouli', base: 'Amber, Musk, Sandalwood' },
    family: 'Woody Oriental', year: '2023', origin: 'UAE', sku: 'OAS-100', gender: 'Men',
    tag: 'DENSE<br>SMOULDERING<br>INTENSE'
  },
  {
    id: 'al-faris-arabe', brand: 'AL FARIS', brandAr: 'الفارس', name: 'Al Faris Arabe', nameAr: 'الفارس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 750, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/al-faris-arabe.png', img2: 'assets/products/al-faris-arabe.png',
    desc: 'The Knight - a spiced, amber-rich fragrance with the poise and warmth of traditional Arabian perfumery.',
    notes: { top: 'Cardamom, Bergamot', heart: 'Amber, Rose', base: 'Oud, Musk, Vanilla' },
    family: 'Amber Oriental', year: '2023', origin: 'UAE', sku: 'FAR-A-100', gender: 'Men',
    tag: 'NOBLE<br>SPICED<br>WARM'
  },
  {
    id: 'al-faris-kenz', brand: 'AL FARIS', brandAr: 'الفارس', name: 'Al Faris Kenz', nameAr: 'الفارس أزرق', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 750, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/al-faris-kenz.png', img2: 'assets/products/al-faris-kenz.png',
    desc: 'A cooler, brighter take on the Al Faris line - fresh aromatic notes over a warm amber base.',
    notes: { top: 'Bergamot, Marine Notes', heart: 'Lavender, Geranium', base: 'Amber, Musk, Woods' },
    family: 'Aromatic Fresh', year: '2023', origin: 'UAE', sku: 'FAR-K-100', gender: 'Men',
    tag: 'FRESH<br>BRIGHT<br>NOBLE'
  },
  {
    id: 'al-nujoom', brand: 'AZHA', brandAr: 'أزها', name: 'Al Nujoom', nameAr: 'النجوم', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 975, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/al-nujoom.png', img2: 'assets/products/al-nujoom.png',
    desc: 'The Stars - a luminous oriental blend of oud and sweet resin, radiant enough to fill a room.',
    notes: { top: 'Saffron, Pink Pepper', heart: 'Oud, Rose, Amber', base: 'Vanilla, Musk, Sandalwood' },
    family: 'Amber Oriental', year: '2023', origin: 'UAE', sku: 'NJM-100', gender: 'Men',
    tag: 'LUMINOUS<br>RADIANT<br>SWEET'
  },
  {
    id: 'theriac-intense', brand: 'THERIAC', brandAr: 'ترياق', name: 'Theriac Intense', nameAr: 'ترياق انتنس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1600, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/theriac-intense.png', img2: 'assets/products/theriac-intense.png',
    desc: 'A concentrated, dark-woods composition - heady and long-lasting, made for those who want to be remembered.',
    notes: { top: 'Spices, Bergamot', heart: 'Oud, Leather', base: 'Amber, Patchouli, Musk' },
    family: 'Woody Intense', year: '2023', origin: 'UAE', sku: 'THR-I-100', gender: 'Men',
    tag: 'INTENSE<br>DARK<br>UNFORGETTABLE'
  },
  {
    id: 'raed-silver', brand: 'RAED', brandAr: 'رائد', name: 'Raed Silver', nameAr: 'رائد سيلفر', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1200, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/raed-silver.png', img2: 'assets/products/raed-silver.png',
    desc: 'A cool, metallic-fresh fragrance with a clean aromatic heart - sharp, modern, and easy to wear.',
    notes: { top: 'Bergamot, Grapefruit', heart: 'Lavender, Geranium', base: 'Musk, Woods, Amber' },
    family: 'Aromatic Fresh', year: '2023', origin: 'UAE', sku: 'RAD-S-100', gender: 'Men',
    tag: 'COOL<br>CLEAN<br>MODERN'
  },
  {
    id: 'ramz-al-rasasi-zebra', brand: 'RASASI', brandAr: 'رصاصي', name: 'Ramz Al Rasasi Zebra 9325', nameAr: 'رمز الرصاصى زيبرا 9325 رجالى', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1400, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/ramz-al-rasasi-zebra.png', img2: 'assets/products/ramz-al-rasasi-zebra.png',
    desc: 'A bold aromatic signature from Rasasi - crisp top notes over a confident woody-musk base.',
    notes: { top: 'Citrus, Aromatic Herbs', heart: 'Lavender, Spices', base: 'Musk, Woods, Amber' },
    family: 'Aromatic Woody', year: '2023', origin: 'UAE', sku: 'RS-ZB9325-100', gender: 'Men',
    tag: 'BOLD<br>CRISP<br>CONFIDENT'
  },
  {
    id: 'sharaf-the-club', brand: 'SHARAF', brandAr: 'شرف', name: 'Sharaf The Club', nameAr: 'شرف ذا كلوب', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1600, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/sharaf-the-club.png', img2: 'assets/products/sharaf-the-club.png',
    desc: 'Honour, refined - a sophisticated woody-amber fragrance built for evenings that matter.',
    notes: { top: 'Saffron, Bergamot', heart: 'Oud, Amber', base: 'Musk, Sandalwood, Vanilla' },
    family: 'Woody Oriental', year: '2023', origin: 'UAE', sku: 'SHR-CLB-100', gender: 'Men',
    tag: 'REFINED<br>SOPHISTICATED<br>MEMORABLE'
  },
  {
    id: 'sheikh-al-shuyukh-green', brand: 'SHEIKH AL SHUYUKH', brandAr: 'شيخ الشيوخ', name: 'Sheikh Al Shuyukh Green', nameAr: 'شيخ الشيوخ اخضر', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 800, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/sheikh-al-shuyukh-green.png', img2: 'assets/products/sheikh-al-shuyukh-green.png',
    desc: 'A fresh, green-toned aromatic fragrance carrying quiet authority - crisp herbs over a warm woody base.',
    notes: { top: 'Green Notes, Bergamot', heart: 'Aromatic Herbs, Lavender', base: 'Musk, Woods, Amber' },
    family: 'Aromatic Fresh', year: '2023', origin: 'UAE', sku: 'AZ-SSG-100', gender: 'Men',
    tag: 'FRESH<br>GREEN<br>AUTHORITATIVE'
  },
  {
    id: 'fattan-men', brand: 'RASASI', brandAr: 'رصاصي', name: 'Fattan Men', nameAr: 'فتان رجالى', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1050, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/fattan-men.png', img2: 'assets/products/fattan-men.png',
    desc: 'Captivating and spiced - a warm woody fragrance designed to draw people in.',
    notes: { top: 'Cardamom, Pink Pepper', heart: 'Rose, Amber', base: 'Sandalwood, Musk, Vanilla' },
    family: 'Spicy Woody', year: '2023', origin: 'UAE', sku: 'FTN-100', gender: 'Men',
    tag: 'CAPTIVATING<br>SPICED<br>WARM'
  },
  {
    id: 'qamar', brand: 'AZHA', brandAr: 'أزها', name: 'Qamar', nameAr: 'قمر', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 975, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/qamar.png', img2: 'assets/products/qamar.png',
    desc: 'Moonlight - a soft, luminous oriental composition of amber and musk, gentle yet unforgettable.',
    notes: { top: 'Bergamot, Saffron', heart: 'Rose, Amber', base: 'Musk, Sandalwood, Vanilla' },
    family: 'Amber Oriental', year: '2023', origin: 'UAE', sku: 'QMR-100', gender: 'Men',
    tag: 'LUMINOUS<br>SOFT<br>UNFORGETTABLE'
  },
  {
    id: 'kashkha-oil', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Kashkha Oil', nameAr: 'كشخه زيت', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1200, rating: '★★★★☆', reviews: 6, cat: 'men', extraCats: ['unisex', 'women'],
    img: 'assets/products/kashkha-oil.png', img2: 'assets/products/kashkha-oil.png',
    desc: 'The concentrated oil edition of Kashkha - rich, long-lasting, and skin-close.',
    notes: { top: 'Spices, Saffron', heart: 'Oud, Rose', base: 'Amber, Musk, Sandalwood' },
    family: 'Woody Oriental', year: '2023', origin: 'UAE', sku: 'SA-KSK-OIL', gender: 'Men',
    tag: 'RICH<br>CONCENTRATED<br>LASTING'
  },
  {
    id: 'latifah-light-in-the-heart', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Latifah Light in the Heart', nameAr: 'لطفه لايت إن ذا هارت', type: 'Parfum d’Eau',
    size: '100 ML', sizes: ['100 ML'],
    price: 1250, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/latifah-light-in-the-heart.png', img2: 'assets/products/latifah-light-in-the-heart.png',
    desc: 'A tender floral-woody fragrance with a soft glow at its centre - graceful and quietly romantic.',
    notes: { top: 'Bergamot, Pink Pepper', heart: 'Rose, Jasmine', base: 'Musk, Sandalwood, Amber' },
    family: 'Floral Woody', year: '2023', origin: 'UAE', sku: 'LTF-LH-100', gender: 'Men',
    tag: 'TENDER<br>GRACEFUL<br>ROMANTIC'
  },
  {
    id: 'mizaj', brand: 'MAZAAJ', brandAr: 'مزاج', name: 'Mazaaj Rhythm', nameAr: 'مزاج ريذم', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1650, rating: '★★★★☆', reviews: 6, cat: 'men',
    img: 'assets/products/mizaj.png', img2: 'assets/products/mizaj.png',
    desc: 'Mood - an expressive oriental fragrance that shifts from spice to sweetness, restless and alive.',
    notes: { top: 'Cardamom, Pink Pepper', heart: 'Rose, Oud', base: 'Vanilla, Amber, Musk' },
    family: 'Woody Oriental', year: '2023', origin: 'UAE', sku: 'MZJ-100', gender: 'Men',
    tag: 'EXPRESSIVE<br>RESTLESS<br>ALIVE'
  },
  {
    id: 'wajd', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Wajd', nameAr: 'وجد', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 1525, rating: '★★★★☆', reviews: 6, cat: 'men', extraCats: ['women'],
    img: 'assets/products/wajd.png', img2: 'assets/products/wajd.png',
    desc: 'Ecstasy - a deep, resinous oriental fragrance built for those who wear their passion openly.',
    notes: { top: 'Saffron, Bergamot', heart: 'Oud, Rose', base: 'Amber, Musk, Sandalwood' },
    family: 'Woody Oriental', year: '2023', origin: 'UAE', sku: 'WJD-100', gender: 'Men',
    tag: 'DEEP<br>PASSIONATE<br>RESINOUS'
  },
  {
    id: 'andaleeb', brand: 'ANDALEEB', brandAr: 'عندليب', name: 'Andaleeb', nameAr: 'عندليب', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['100 ML'],
    price: 850, rating: '★★★★☆', reviews: 6, cat: 'men', extraCats: ['unisex', 'women'],
    img: 'assets/products/andaleeb.png', img2: 'assets/products/andaleeb.png',
    desc: 'The Nightingale - a fresh floral-woody fragrance with a bright, gilded warmth beneath its clean top notes.',
    notes: { top: 'Bergamot, Green Notes', heart: 'Floral Accord, Jasmine', base: 'Musk, Sandalwood, Amber' },
    family: 'Floral Woody', year: '2023', origin: 'UAE', sku: 'AND-100', gender: 'Men',
    tag: 'FRESH<br>BRIGHT<br>WARM'
  },

  /* ---- WATCHES ---- */
  {
    id: 'mini-focus-emerald-chrono', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Emerald Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2200, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-emerald-chrono.png', img2: 'assets/watches/mf-emerald-chrono.png',
    desc: 'Mini Focus Emerald Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-emerald-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibso-aurora', brand: 'IBSO', brandAr: 'آيبسو', name: 'Aurora', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1450, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Women',
    img: 'assets/watches/ibso-aurora.png', img2: 'assets/watches/ibso-aurora.png',
    desc: 'IBSO Aurora — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibso-aurora', watchCat: 'women',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-onyx-chrono', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Onyx Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2350, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-onyx-chrono.png', img2: 'assets/watches/mf-onyx-chrono.png',
    desc: 'Mini Focus Onyx Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-onyx-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-azure-chrono', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Azure Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2300, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-azure-chrono.png', img2: 'assets/watches/mf-azure-chrono.png',
    desc: 'Mini Focus Azure Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-azure-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-jade-chrono', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Jade Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2250, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-jade-chrono.png', img2: 'assets/watches/mf-jade-chrono.png',
    desc: 'Mini Focus Jade Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-jade-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-noir-rose', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Noir Rosé', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2400, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-noir-rose.png', img2: 'assets/watches/mf-noir-rose.png',
    desc: 'Mini Focus Noir Rosé — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-noir-rose', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibso-noir', brand: 'IBSO', brandAr: 'آيبسو', name: 'Noir', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1500, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Women',
    img: 'assets/watches/ibso-noir.png', img2: 'assets/watches/ibso-noir.png',
    desc: 'IBSO Noir — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibso-noir', watchCat: 'women',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-tachy-racer', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Tachy Racer', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2600, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-tachy-racer.png', img2: 'assets/watches/mf-tachy-racer.png',
    desc: 'Mini Focus Tachy Racer — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-tachy-racer', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-navy-classic', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Navy Classic', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2100, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-navy-classic.png', img2: 'assets/watches/mf-navy-classic.png',
    desc: 'Mini Focus Navy Classic — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-navy-classic', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-scarlet-sport', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Scarlet Sport', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2350, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-scarlet-sport.png', img2: 'assets/watches/mf-scarlet-sport.png',
    desc: 'Mini Focus Scarlet Sport — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-scarlet-sport', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibso-ember', brand: 'IBSO', brandAr: 'آيبسو', name: 'Ember', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1400, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Women',
    img: 'assets/watches/ibso-ember.png', img2: 'assets/watches/ibso-ember.png',
    desc: 'IBSO Ember — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibso-ember', watchCat: 'women',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-slate', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Slate', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1950, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-slate.png', img2: 'assets/watches/mf-slate.png',
    desc: 'Mini Focus Slate — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-slate', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibso-champagne', brand: 'IBSO', brandAr: 'آيبسو', name: 'Champagne', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1550, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Women',
    img: 'assets/watches/ibso-champagne.png', img2: 'assets/watches/ibso-champagne.png',
    desc: 'IBSO Champagne — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibso-champagne', watchCat: 'women',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-voyager', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Voyager', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2500, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-voyager.png', img2: 'assets/watches/mf-voyager.png',
    desc: 'Mini Focus Voyager — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-voyager', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-ice-chrono', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Ice Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2300, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-ice-chrono.png', img2: 'assets/watches/mf-ice-chrono.png',
    desc: 'Mini Focus Ice Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-ice-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-desert-chrono', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Desert Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2400, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-desert-chrono.png', img2: 'assets/watches/mf-desert-chrono.png',
    desc: 'Mini Focus Desert Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-desert-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibso-blossom', brand: 'IBSO', brandAr: 'آيبسو', name: 'Blossom', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1450, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Women',
    img: 'assets/watches/ibso-blossom.png', img2: 'assets/watches/ibso-blossom.png',
    desc: 'IBSO Blossom — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibso-blossom', watchCat: 'women',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-gold-edition', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Gold Edition', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2650, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-gold-edition.png', img2: 'assets/watches/mf-gold-edition.png',
    desc: 'Mini Focus Gold Edition — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-gold-edition', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-rosewood-tachy', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Rosewood Tachy', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2700, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-rosewood-tachy.png', img2: 'assets/watches/mf-rosewood-tachy.png',
    desc: 'Mini Focus Rosewood Tachy — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-rosewood-tachy', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-graphite', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Graphite', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1950, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-graphite.png', img2: 'assets/watches/mf-graphite.png',
    desc: 'Mini Focus Graphite — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-graphite', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-blue-classic', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Blue Classic', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1850, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-blue-classic.png', img2: 'assets/watches/mf-blue-classic.png',
    desc: 'Mini Focus Blue Classic — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-blue-classic', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibso-lagoon', brand: 'IBSO', brandAr: 'آيبسو', name: 'Lagoon', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1500, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Women',
    img: 'assets/watches/ibso-lagoon.png', img2: 'assets/watches/ibso-lagoon.png',
    desc: 'IBSO Lagoon — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibso-lagoon', watchCat: 'women',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-steel-chrono', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Steel Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2200, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-steel-chrono.png', img2: 'assets/watches/mf-steel-chrono.png',
    desc: 'Mini Focus Steel Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-steel-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-silver-classic', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Silver Classic', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1900, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-silver-classic.png', img2: 'assets/watches/mf-silver-classic.png',
    desc: 'Mini Focus Silver Classic — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-silver-classic', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibso-turquoise', brand: 'IBSO', brandAr: 'آيبسو', name: 'Turquoise', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1500, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Women',
    img: 'assets/watches/ibso-turquoise.png', img2: 'assets/watches/ibso-turquoise.png',
    desc: 'IBSO Turquoise — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibso-turquoise', watchCat: 'women',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibso-ebony', brand: 'IBSO', brandAr: 'آيبسو', name: 'Ebony', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1500, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Women',
    img: 'assets/watches/ibso-ebony.png', img2: 'assets/watches/ibso-ebony.png',
    desc: 'IBSO Ebony — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibso-ebony', watchCat: 'women',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-cobalt-chrono', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Cobalt Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2300, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-cobalt-chrono.png', img2: 'assets/watches/mf-cobalt-chrono.png',
    desc: 'Mini Focus Cobalt Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-cobalt-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibso-emerald-square', brand: 'IBSO', brandAr: 'آيبسو', name: 'Emerald Square', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1600, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Women',
    img: 'assets/watches/ibso-emerald-square.png', img2: 'assets/watches/ibso-emerald-square.png',
    desc: 'IBSO Emerald Square — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibso-emerald-square', watchCat: 'women',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-forest-chrono', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Forest Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2350, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-forest-chrono.png', img2: 'assets/watches/mf-forest-chrono.png',
    desc: 'Mini Focus Forest Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-forest-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-sport-black', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Sport Black', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2100, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-sport-black.png', img2: 'assets/watches/mf-sport-black.png',
    desc: 'Mini Focus Sport Black — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-sport-black', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-carbon-chrono', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Carbon Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2300, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-carbon-chrono.png', img2: 'assets/watches/mf-carbon-chrono.png',
    desc: 'Mini Focus Carbon Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-carbon-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-midnight-chrono', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Midnight Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2150, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-midnight-chrono.png', img2: 'assets/watches/mf-midnight-chrono.png',
    desc: 'Mini Focus Midnight Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-midnight-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-speedster', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Speedster', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2600, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-speedster.png', img2: 'assets/watches/mf-speedster.png',
    desc: 'Mini Focus Speedster — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-speedster', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibso-jade-square', brand: 'IBSO', brandAr: 'آيبسو', name: 'Jade Square', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1600, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Women',
    img: 'assets/watches/ibso-jade-square.png', img2: 'assets/watches/ibso-jade-square.png',
    desc: 'IBSO Jade Square — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibso-jade-square', watchCat: 'women',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-platinum-chrono', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Platinum Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2400, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-platinum-chrono.png', img2: 'assets/watches/mf-platinum-chrono.png',
    desc: 'Mini Focus Platinum Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-platinum-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-amber-sport', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Amber Sport', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2250, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-amber-sport.png', img2: 'assets/watches/mf-amber-sport.png',
    desc: 'Mini Focus Amber Sport — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-amber-sport', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibio-classic-black', brand: 'IBIO', brandAr: 'آيبيو', name: 'Classic Black', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1800, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Unisex',
    img: 'assets/watches/ibio-classic-black.png', img2: 'assets/watches/ibio-classic-black.png',
    desc: 'IBIO Classic Black — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibio-classic-black', watchCat: 'unisex',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibio-textura', brand: 'IBIO', brandAr: 'آيبيو', name: 'Textura', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1850, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Unisex',
    img: 'assets/watches/ibio-textura.png', img2: 'assets/watches/ibio-textura.png',
    desc: 'IBIO Textura — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibio-textura', watchCat: 'unisex',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibio-onyx', brand: 'IBIO', brandAr: 'آيبيو', name: 'Onyx', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1750, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Unisex',
    img: 'assets/watches/ibio-onyx.png', img2: 'assets/watches/ibio-onyx.png',
    desc: 'IBIO Onyx — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibio-onyx', watchCat: 'unisex',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'split-piece-shadow', brand: 'SPLIT PIECE', brandAr: 'سبليت بيس', name: 'Shadow', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 3200, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/splitpiece-shadow.png', img2: 'assets/watches/splitpiece-shadow.png',
    desc: 'Split Piece Shadow — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'split-piece-shadow', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'split-piece-crimson', brand: 'SPLIT PIECE', brandAr: 'سبليت بيس', name: 'Crimson', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 3300, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/splitpiece-crimson.png', img2: 'assets/watches/splitpiece-crimson.png',
    desc: 'Split Piece Crimson — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'split-piece-crimson', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-black-tachy', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Black Tachy', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2400, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-black-tachy.png', img2: 'assets/watches/mf-black-tachy.png',
    desc: 'Mini Focus Black Tachy — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-black-tachy', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-pearl-chrono', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Pearl Chrono', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2200, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-pearl-chrono.png', img2: 'assets/watches/mf-pearl-chrono.png',
    desc: 'Mini Focus Pearl Chrono — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-pearl-chrono', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibio-steel', brand: 'IBIO', brandAr: 'آيبيو', name: 'Steel', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1800, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Unisex',
    img: 'assets/watches/ibio-steel.png', img2: 'assets/watches/ibio-steel.png',
    desc: 'IBIO Steel — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibio-steel', watchCat: 'unisex',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibio-midnight-blue', brand: 'IBIO', brandAr: 'آيبيو', name: 'Midnight Blue', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1850, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Unisex',
    img: 'assets/watches/ibio-midnight-blue.png', img2: 'assets/watches/ibio-midnight-blue.png',
    desc: 'IBIO Midnight Blue — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibio-midnight-blue', watchCat: 'unisex',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibio-navy-grid', brand: 'IBIO', brandAr: 'آيبيو', name: 'Navy Grid', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1900, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Unisex',
    img: 'assets/watches/ibio-navy-grid.png', img2: 'assets/watches/ibio-navy-grid.png',
    desc: 'IBIO Navy Grid — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibio-navy-grid', watchCat: 'unisex',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibio-gold-square', brand: 'IBIO', brandAr: 'آيبيو', name: 'Gold Square', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2000, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Unisex',
    img: 'assets/watches/ibio-gold-square.png', img2: 'assets/watches/ibio-gold-square.png',
    desc: 'IBIO Gold Square — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibio-gold-square', watchCat: 'unisex',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'ibio-pearl', brand: 'IBIO', brandAr: 'آيبيو', name: 'Pearl', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 1850, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Unisex',
    img: 'assets/watches/ibio-pearl.png', img2: 'assets/watches/ibio-pearl.png',
    desc: 'IBIO Pearl — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'ibio-pearl', watchCat: 'unisex',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },
  {
    id: 'mini-focus-rose-sport', brand: 'MINI FOCUS', brandAr: 'ميني فوكس', name: 'Rose Sport', type: 'Watch',
    size: 'One Size', sizes: ['One Size'],
    price: 2300, rating: '★★★★☆', reviews: 0, cat: 'watches', gender: 'Men',
    img: 'assets/watches/mf-rose-sport.png', img2: 'assets/watches/mf-rose-sport.png',
    desc: 'Mini Focus Rose Sport — a refined timepiece for everyday elegance.',
    notes: { top: '', heart: '', base: '' },
    family: 'Watch', year: '2026', origin: 'UAE', sku: 'mini-focus-rose-sport', watchCat: 'men',
    tag: 'CLASSIC<br>PRECISE<br>TIMELESS'
  },

  /* ════════════════════════════════════════════════
     WOMEN'S & UNISEX CATALOG
     Matched to reference distributor listings.
     ════════════════════════════════════════════════ */
  {
    id: 'sugar-berries-cream-macaron', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Berries Cream Macaron', nameAr: 'بيريز كريم ماكارون', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 950, rating: '★★★★★', reviews: 46, cat: 'women',
    img: 'assets/products/sugar-berries-cream-macaron.png', img2: 'assets/products/sugar-berries-cream-macaron.png',
    desc: 'A playful berry macaron accord whipped with vanilla cream — sweet, soft, and irresistibly cheerful.',
    notes: { top: 'Red Berries, Raspberry', heart: 'Almond Macaron, Vanilla Cream', base: 'Musk, Sugar, Tonka Bean' },
    family: 'Fruity Gourmand', year: '2024', origin: 'UAE', sku: 'AP-BCM-100', gender: 'Women',
    tag: 'SWEET<br>PLAYFUL<br>CREAMY'
  },
  {
    id: 'sugar-cookie-dough', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Cookie Dough', nameAr: 'كوكي دوه', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 950, rating: '★★★★☆', reviews: 63, cat: 'women',
    img: 'assets/products/sugar-cookie-dough.png', img2: 'assets/products/sugar-cookie-dough.png',
    desc: 'Warm butter and brown sugar folded into soft vanilla dough — a comforting gourmand you will want to wear all day.',
    notes: { top: 'Brown Sugar, Butter', heart: 'Cookie Dough, Vanilla', base: 'Tonka Bean, Musk, Caramel' },
    family: 'Gourmand', year: '2024', origin: 'UAE', sku: 'AP-CD-100', gender: 'Women',
    tag: 'WARM<br>COMFORTING<br>SWEET'
  },
  {
    id: 'sugar-cotton-blush', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Cotton Blush', nameAr: 'كوتون بلاش', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 950, rating: '★★★★☆', reviews: 80, cat: 'women',
    img: 'assets/products/sugar-cotton-blush.png', img2: 'assets/products/sugar-cotton-blush.png',
    desc: 'Spun cotton candy over clean white musk — feather-light, rosy, and quietly addictive.',
    notes: { top: 'Cotton Candy, Pear', heart: 'Peony, Marshmallow', base: 'White Musk, Vanilla' },
    family: 'Musky Gourmand', year: '2024', origin: 'UAE', sku: 'AP-CB-100', gender: 'Women',
    tag: 'SOFT<br>ROSY<br>LIGHT'
  },
  {
    id: 'sugar-matcha-latte', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Matcha Latte', nameAr: 'ماتشا لاتيه', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 950, rating: '★★★★★', reviews: 97, cat: 'women',
    img: 'assets/products/sugar-matcha-latte.png', img2: 'assets/products/sugar-matcha-latte.png',
    desc: 'Stone-ground matcha steamed into warm milk — green, creamy, and calm from first spray to last.',
    notes: { top: 'Green Tea, Bergamot', heart: 'Matcha, Steamed Milk', base: 'Vanilla, White Musk, Cedarwood' },
    family: 'Green Gourmand', year: '2024', origin: 'UAE', sku: 'AP-ML-100', gender: 'Women',
    tag: 'GREEN<br>CREAMY<br>CALM'
  },
  {
    id: 'sugar-strawberry-tres-leches', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Strawberry Tres Leches', nameAr: 'ستروبيري تريس ليتشيز', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 950, rating: '★★★★☆', reviews: 22, cat: 'women',
    img: 'assets/products/sugar-strawberry-tres-leches.png', img2: 'assets/products/sugar-strawberry-tres-leches.png',
    desc: 'Ripe strawberries soaked into milk-drenched cake — lush, dessert-sweet, and unmistakably joyful.',
    notes: { top: 'Strawberry, Cream', heart: 'Sponge Cake, Condensed Milk', base: 'Vanilla, Musk, Caramel' },
    family: 'Fruity Gourmand', year: '2024', origin: 'UAE', sku: 'AP-STL-100', gender: 'Women',
    tag: 'LUSH<br>SWEET<br>JOYFUL'
  },
  {
    id: 'ameerat-al-arab', brand: 'ASDAAF', brandAr: 'أصداف', name: 'Ameerat Al Arab', nameAr: 'أميرة العرب', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 1000, rating: '★★★★☆', reviews: 41, cat: 'women',
    img: 'assets/products/ameerat-al-arab.png', img2: 'assets/products/ameerat-al-arab.png',
    desc: 'A regal floral oriental fit for an Arabian princess — rose and saffron laid over warm golden amber.',
    notes: { top: 'Saffron, Bergamot', heart: 'Rose, Jasmine, Orange Blossom', base: 'Amber, Vanilla, Musk' },
    family: 'Floral Oriental', year: '2024', origin: 'UAE', sku: 'AS-AAA-100', gender: 'Women',
    tag: 'REGAL<br>FLORAL<br>GOLDEN'
  },
  {
    id: 'ameerat-al-arab-pink', brand: 'ASDAAF', brandAr: 'أصداف', name: 'Ameerat Al Arab Pink', nameAr: 'أميرة العرب بينك', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 1000, rating: '★★★★★', reviews: 58, cat: 'women',
    img: 'assets/products/ameerat-al-arab-pink.png', img2: 'assets/products/ameerat-al-arab-pink.png',
    desc: 'The softer, rosier side of the Ameerat Al Arab line — bright pink fruits over powdery florals.',
    notes: { top: 'Litchi, Pink Pepper', heart: 'Peony, Rose, Freesia', base: 'Musk, Vanilla, Amberwood' },
    family: 'Fruity Floral', year: '2024', origin: 'UAE', sku: 'AS-AAAP-100', gender: 'Women',
    tag: 'BRIGHT<br>ROSY<br>FEMININE'
  },
  {
    id: 'extradoz-femme', brand: 'EXTRADOZ', brandAr: 'إكستردوز', name: 'Extradoz Femme', nameAr: 'إكستردوز فيم', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1700, rating: '★★★★☆', reviews: 11, cat: 'women',
    img: 'assets/products/extradoz-femme.png', img2: 'assets/products/extradoz-femme.png',
    desc: 'An intense feminine amber-floral — generous, radiant, and built to last through the evening.',
    notes: { top: 'Pear, Pink Pepper', heart: 'Rose, Orange Blossom', base: 'Amber, Vanilla, Patchouli' },
    family: 'Amber Floral', year: '2024', origin: 'UAE', sku: 'E-EF-100', gender: 'Women',
    tag: 'INTENSE<br>RADIANT<br>LASTING'
  },
  {
    id: 'eclair', brand: 'ECLAIR', brandAr: 'إكلير', name: 'Eclair', nameAr: 'إكلير', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1500, rating: '★★★★☆', reviews: 20, cat: 'women',
    img: 'assets/products/eclair.png', img2: 'assets/products/eclair.png',
    desc: 'A patisserie in a bottle — chocolate, caramel and cream layered like a freshly glazed eclair.',
    notes: { top: 'Caramel, Coffee', heart: 'Chocolate, Vanilla Cream', base: 'Tonka Bean, Musk, Praline' },
    family: 'Gourmand', year: '2024', origin: 'UAE', sku: 'E-E-100', gender: 'Women',
    tag: 'DECADENT<br>SWEET<br>RICH'
  },
  {
    id: 'edge-women-984', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Edge For Women 984', nameAr: 'إيدج للنساء 984', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1600, rating: '★★★★★', reviews: 41, cat: 'women',
    img: 'assets/products/edge-women-984.png', img2: 'assets/products/edge-women-984.png',
    desc: 'The feminine edge of the Edge line — sharp florals softened by warm woods and vanilla.',
    notes: { top: 'Blackcurrant, Bergamot', heart: 'Rose, Jasmine, Iris', base: 'Patchouli, Vanilla, Musk' },
    family: 'Floral Woody', year: '2024', origin: 'UAE', sku: 'SA-EFW9-100', gender: 'Women',
    tag: 'SHARP<br>MODERN<br>WARM'
  },
  {
    id: 'abreez', brand: 'AZHA', brandAr: 'أزها', name: 'Abreez', nameAr: 'ابريز', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 950, rating: '★★★★☆', reviews: 32, cat: 'women',
    img: 'assets/products/abreez.png', img2: 'assets/products/abreez.png',
    desc: 'A polished floral oriental with a golden heart — graceful, warm, and easy to love.',
    notes: { top: 'Bergamot, Saffron', heart: 'Rose, Jasmine', base: 'Amber, Musk, Sandalwood' },
    family: 'Floral Oriental', year: '2024', origin: 'UAE', sku: 'AZ-A-100', gender: 'Women',
    tag: 'GRACEFUL<br>WARM<br>GOLDEN'
  },
  {
    id: 'eternal-night', brand: 'AZHA', brandAr: 'أزها', name: 'Eternal Night', nameAr: 'اترنال نايت', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 750, rating: '★★★★☆', reviews: 41, cat: 'women',
    img: 'assets/products/eternal-night.png', img2: 'assets/products/eternal-night.png',
    desc: 'Dark plum and rose folded into velvet amber — an evening scent that never quite ends.',
    notes: { top: 'Plum, Pink Pepper', heart: 'Rose, Violet', base: 'Amber, Vanilla, Musk' },
    family: 'Amber Floral', year: '2024', origin: 'UAE', sku: 'AZ-EN-100', gender: 'Women',
    tag: 'DARK<br>VELVET<br>EVENING'
  },
  {
    id: 'arabian-lady', brand: 'AZHA', brandAr: 'أزها', name: 'Arabian Lady', nameAr: 'اربيان ليدي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 700, rating: '★★★★★', reviews: 56, cat: 'women',
    img: 'assets/products/arabian-lady.png', img2: 'assets/products/arabian-lady.png',
    desc: 'An elegant everyday floral musk — clean, feminine, and effortlessly refined.',
    notes: { top: 'Peach, Bergamot', heart: 'Rose, Jasmine, Lily', base: 'White Musk, Amber, Cedarwood' },
    family: 'Floral Musk', year: '2024', origin: 'UAE', sku: 'AZ-AL-100', gender: 'Women',
    tag: 'ELEGANT<br>CLEAN<br>FEMININE'
  },
  {
    id: 'azhar', brand: 'AZHA', brandAr: 'أزها', name: 'Azhar', nameAr: 'ازهر', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 975, rating: '★★★★☆', reviews: 84, cat: 'women',
    img: 'assets/products/azhar.png', img2: 'assets/products/azhar.png',
    desc: 'A full white-floral bouquet in bloom — lush, luminous, and unmistakably feminine.',
    notes: { top: 'Bergamot, Green Notes', heart: 'Tuberose, Jasmine, Gardenia', base: 'Musk, Sandalwood, Vanilla' },
    family: 'White Floral', year: '2024', origin: 'UAE', sku: 'AZ-A-100', gender: 'Women',
    tag: 'LUSH<br>FLORAL<br>LUMINOUS'
  },
  {
    id: 'estrodom', brand: 'ESTRODOM', brandAr: 'استرودوم', name: 'Estrodom', nameAr: 'استرودوم', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 750, rating: '★★★★☆', reviews: 92, cat: 'women',
    img: 'assets/products/estrodom.png', img2: 'assets/products/estrodom.png',
    desc: 'A confident oriental floral with an amber glow — quietly striking, never loud.',
    notes: { top: 'Citrus, Pink Pepper', heart: 'Rose, Orange Blossom', base: 'Amber, Musk, Vanilla' },
    family: 'Oriental Floral', year: '2024', origin: 'UAE', sku: 'E-E-100', gender: 'Women',
    tag: 'CONFIDENT<br>AMBER<br>STRIKING'
  },
  {
    id: 'igraa-women', brand: 'RASASI', brandAr: 'رصاصي', name: 'Igraa For Women', nameAr: 'إغراء حريمى', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 1050, rating: '★★★★★', reviews: 29, cat: 'women',
    img: 'assets/products/igraa-women.png', img2: 'assets/products/igraa-women.png',
    desc: 'Temptation bottled — juicy fruits and soft florals over a warm vanilla base.',
    notes: { top: 'Peach, Blackcurrant', heart: 'Rose, Jasmine, Ylang-Ylang', base: 'Vanilla, Musk, Sandalwood' },
    family: 'Fruity Floral', year: '2024', origin: 'UAE', sku: 'RS-IFW-100', gender: 'Women',
    tag: 'TEMPTING<br>JUICY<br>WARM'
  },
  {
    id: 'al-nayyir', brand: 'AZHA', brandAr: 'أزها', name: 'Al Nayyir', nameAr: 'النير', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 975, rating: '★★★★☆', reviews: 43, cat: 'women',
    img: 'assets/products/al-nayyir.png', img2: 'assets/products/al-nayyir.png',
    desc: 'Radiant by name and by nature — luminous florals over a soft oriental base.',
    notes: { top: 'Saffron, Bergamot', heart: 'Rose, Jasmine', base: 'Oud, Amber, Musk' },
    family: 'Floral Oriental', year: '2024', origin: 'UAE', sku: 'AZ-AN-100', gender: 'Women',
    tag: 'RADIANT<br>LUMINOUS<br>SOFT'
  },
  {
    id: 'amira', brand: 'AZHA', brandAr: 'أزها', name: 'Amira', nameAr: 'اميره', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 975, rating: '★★★★★', reviews: 77, cat: 'women',
    img: 'assets/products/amira.png', img2: 'assets/products/amira.png',
    desc: 'A princess of a fragrance — bright fruit, soft petals, and a warm musky finish.',
    notes: { top: 'Litchi, Bergamot', heart: 'Rose, Peony', base: 'Musk, Amber, Vanilla' },
    family: 'Floral Fruity', year: '2024', origin: 'UAE', sku: 'AZ-A-100', gender: 'Women',
    tag: 'BRIGHT<br>SOFT<br>MUSKY'
  },
  {
    id: 'intisar', brand: 'AZHA', brandAr: 'أزها', name: 'Intisar', nameAr: 'انتصار', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 975, rating: '★★★★☆', reviews: 94, cat: 'women',
    img: 'assets/products/intisar.png', img2: 'assets/products/intisar.png',
    desc: 'Victory worn on the skin — bold florals with an assured oriental trail.',
    notes: { top: 'Pink Pepper, Bergamot', heart: 'Rose, Jasmine, Saffron', base: 'Amber, Patchouli, Musk' },
    family: 'Floral Oriental', year: '2024', origin: 'UAE', sku: 'AZ-I-100', gender: 'Women',
    tag: 'BOLD<br>ASSURED<br>ORIENTAL'
  },
  {
    id: 'entebaa-women', brand: 'RASASI', brandAr: 'رصاصي', name: 'Entebaa For Women', nameAr: 'انطباع حريمي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1375, rating: '★★★★☆', reviews: 35, cat: 'women',
    img: 'assets/products/entebaa-women.png', img2: 'assets/products/entebaa-women.png',
    desc: 'An impression that lingers — classic florals grounded in elegant patchouli.',
    notes: { top: 'Bergamot, Blackcurrant', heart: 'Rose, Jasmine, Iris', base: 'Patchouli, Musk, Vanilla' },
    family: 'Floral Chypre', year: '2024', origin: 'UAE', sku: 'RS-EFW-100', gender: 'Women',
    tag: 'CLASSIC<br>ELEGANT<br>LINGERING'
  },
  {
    id: 'anghaam-second-song', brand: 'ANGHAAM', brandAr: 'انغام', name: 'Anghaam Second Song', nameAr: 'انغام سكند سونج', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1400, rating: '★★★★★', reviews: 53, cat: 'women',
    img: 'assets/products/anghaam-second-song.png', img2: 'assets/products/anghaam-second-song.png',
    desc: 'A second verse to a favourite melody — sweeter, rounder, and just as memorable.',
    notes: { top: 'Pear, Pink Pepper', heart: 'Rose, Praline', base: 'Vanilla, Musk, Amberwood' },
    family: 'Floral Gourmand', year: '2024', origin: 'UAE', sku: 'AN-ASS-100', gender: 'Women',
    tag: 'SWEET<br>ROUND<br>MEMORABLE'
  },
  {
    id: 'aneen', brand: 'AZHA', brandAr: 'أزها', name: 'Aneen', nameAr: 'انين', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 750, rating: '★★★★☆', reviews: 44, cat: 'women',
    img: 'assets/products/aneen.png', img2: 'assets/products/aneen.png',
    desc: 'A tender, whispered floral — light on the skin and quietly persistent.',
    notes: { top: 'Bergamot, Apple', heart: 'Rose, Violet', base: 'Musk, Amber, Cedarwood' },
    family: 'Floral Musk', year: '2024', origin: 'UAE', sku: 'AZ-A-100', gender: 'Women',
    tag: 'TENDER<br>LIGHT<br>QUIET'
  },
  {
    id: 'edge-intense-women', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Edge Intense For Women', nameAr: 'ايدج انتنس حريمي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 1100, rating: '★★★★☆', reviews: 75, cat: 'women',
    img: 'assets/products/edge-intense-women.png', img2: 'assets/products/edge-intense-women.png',
    desc: 'A deeper, denser Edge — the same modern florals turned up in intensity.',
    notes: { top: 'Blackcurrant, Pink Pepper', heart: 'Rose, Jasmine', base: 'Patchouli, Amber, Vanilla' },
    family: 'Floral Woody', year: '2024', origin: 'UAE', sku: 'SA-EIFW-100', gender: 'Women',
    tag: 'DEEP<br>DENSE<br>MODERN'
  },
  {
    id: 'emotion-women', brand: 'EMOTION', brandAr: 'ايموشن', name: 'Emotion For Women', nameAr: 'ايموشن حريمى', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 850, rating: '★★★★★', reviews: 82, cat: 'women',
    img: 'assets/products/emotion-women.png', img2: 'assets/products/emotion-women.png',
    desc: 'Soft fruit and fresh petals — an easy, warm-hearted everyday floral.',
    notes: { top: 'Peach, Bergamot', heart: 'Rose, Freesia', base: 'Musk, Vanilla, Amber' },
    family: 'Fruity Floral', year: '2024', origin: 'UAE', sku: 'E-EFW-100', gender: 'Women',
    tag: 'SOFT<br>FRESH<br>EVERYDAY'
  },
  {
    id: 'bahia-garnet', brand: 'BAHIA', brandAr: 'باهيه', name: 'Bahia Garnet', nameAr: 'باهيه جارنيت', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1400, rating: '★★★★☆', reviews: 29, cat: 'women',
    img: 'assets/products/bahia-garnet.png', img2: 'assets/products/bahia-garnet.png',
    desc: 'Deep garnet fruits set in warm amber — jewel-toned and richly feminine.',
    notes: { top: 'Pomegranate, Red Berries', heart: 'Rose, Saffron', base: 'Amber, Patchouli, Vanilla' },
    family: 'Fruity Oriental', year: '2024', origin: 'UAE', sku: 'BH-BG-100', gender: 'Women',
    tag: 'RICH<br>JEWEL<br>WARM'
  },
  {
    id: 'bahia-ruby', brand: 'BAHIA', brandAr: 'باهيه', name: 'Bahia Ruby', nameAr: 'باهيه روبي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1400, rating: '★★★★☆', reviews: 46, cat: 'women',
    img: 'assets/products/bahia-ruby.png', img2: 'assets/products/bahia-ruby.png',
    desc: 'Bright ruby-red fruit over blooming rose — vivid, glossy, and full of life.',
    notes: { top: 'Raspberry, Pink Pepper', heart: 'Rose, Peony', base: 'Musk, Vanilla, Amberwood' },
    family: 'Fruity Floral', year: '2024', origin: 'UAE', sku: 'BH-BR-100', gender: 'Women',
    tag: 'VIVID<br>GLOSSY<br>ALIVE'
  },
  {
    id: 'badia-al-oud-noble-blush', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Badia Al Oud Noble Blush', nameAr: 'بديع العود نوبل بلاش', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1350, rating: '★★★★★', reviews: 61, cat: 'women',
    img: 'assets/products/badia-al-oud-noble-blush.png', img2: 'assets/products/badia-al-oud-noble-blush.png',
    desc: 'A blushing rose laid over noble oud — feminine warmth with a woody backbone.',
    notes: { top: 'Pink Pepper, Bergamot', heart: 'Rose, Oud', base: 'Amber, Musk, Sandalwood' },
    family: 'Woody Floral', year: '2024', origin: 'UAE', sku: 'LT-BAONB-100', gender: 'Women',
    tag: 'NOBLE<br>ROSY<br>WOODY'
  },
  {
    id: 'private-musk-oil-women', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Private Musk Oil', nameAr: 'برايفيت مسك زيت', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 1000, rating: '★★★★☆', reviews: 64, cat: 'women',
    img: 'assets/products/private-musk-oil-women.png', img2: 'assets/products/private-musk-oil-women.png',
    desc: 'A concentrated musk oil that sits close to the skin — intimate, clean, and long-lasting.',
    notes: { top: 'White Musk', heart: 'Rose, Jasmine', base: 'Amber, Sandalwood, Vanilla' },
    family: 'Musk Oil', year: '2024', origin: 'UAE', sku: 'SA-PMO-100', gender: 'Women',
    tag: 'INTIMATE<br>CLEAN<br>OIL'
  },
  {
    id: 'pink-eclipse', brand: 'PINK ECLIPSE', brandAr: 'بينك اكلبس', name: 'Pink Eclipse', nameAr: 'بينك اكلبس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 1050, rating: '★★★★☆', reviews: 83, cat: 'women',
    img: 'assets/products/pink-eclipse.png', img2: 'assets/products/pink-eclipse.png',
    desc: 'A pink-lit floral with a soft shadow — sweet on top, smooth and musky beneath.',
    notes: { top: 'Litchi, Raspberry', heart: 'Peony, Rose', base: 'Musk, Vanilla, Cedarwood' },
    family: 'Fruity Floral', year: '2024', origin: 'UAE', sku: 'PE-PE-100', gender: 'Women',
    tag: 'PINK<br>SWEET<br>SMOOTH'
  },
  {
    id: 'tiryaq', brand: 'THERIAC', brandAr: 'ترياق', name: 'Tiryaq', nameAr: 'ترياق', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1600, rating: '★★★★★', reviews: 30, cat: 'women',
    img: 'assets/products/tiryaq.png', img2: 'assets/products/tiryaq.png',
    desc: 'An antidote of spice and amber — warm, medicinal-sweet, and quietly hypnotic.',
    notes: { top: 'Saffron, Cinnamon', heart: 'Rose, Oud', base: 'Amber, Vanilla, Musk' },
    family: 'Amber Spicy', year: '2024', origin: 'UAE', sku: 'TH-T-100', gender: 'Women',
    tag: 'SPICED<br>WARM<br>HYPNOTIC'
  },
  {
    id: 'tiryaq-intense-women', brand: 'THERIAC', brandAr: 'ترياق', name: 'Tiryaq Intense', nameAr: 'ترياق انتنس حريمي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1600, rating: '★★★★☆', reviews: 47, cat: 'women',
    img: 'assets/products/tiryaq-intense-women.png', img2: 'assets/products/tiryaq-intense-women.png',
    desc: 'The Tiryaq accord concentrated — denser spice, deeper amber, longer trail.',
    notes: { top: 'Saffron, Pink Pepper', heart: 'Rose, Oud, Cinnamon', base: 'Amber, Vanilla, Patchouli' },
    family: 'Amber Spicy', year: '2024', origin: 'UAE', sku: 'TH-TI-100', gender: 'Women',
    tag: 'DENSE<br>SPICED<br>DEEP'
  },
  {
    id: 'habik', brand: 'HABIK', brandAr: 'حابك', name: 'Habik', nameAr: 'حابك', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 1150, rating: '★★★★☆', reviews: 46, cat: 'women',
    img: 'assets/products/habik.png', img2: 'assets/products/habik.png',
    desc: 'A love-letter of a fragrance — soft petals wrapped in warm vanilla and musk.',
    notes: { top: 'Bergamot, Pear', heart: 'Rose, Vanilla Orchid', base: 'Musk, Tonka Bean, Amber' },
    family: 'Floral Gourmand', year: '2024', origin: 'UAE', sku: 'H-H-100', gender: 'Women',
    tag: 'SOFT<br>WARM<br>ROMANTIC'
  },
  {
    id: 'habiba', brand: 'HABIBA', brandAr: 'حبيبه', name: 'Habiba', nameAr: 'حبيبه', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1450, rating: '★★★★★', reviews: 75, cat: 'women',
    img: 'assets/products/habiba.png', img2: 'assets/products/habiba.png',
    desc: 'Beloved by name — a generous floral oriental with a golden, enveloping finish.',
    notes: { top: 'Saffron, Bergamot', heart: 'Rose, Jasmine', base: 'Amber, Vanilla, Sandalwood' },
    family: 'Floral Oriental', year: '2024', origin: 'UAE', sku: 'H-H-100', gender: 'Women',
    tag: 'GENEROUS<br>GOLDEN<br>FLORAL'
  },
  {
    id: 'hayati-florence', brand: 'HAYATI', brandAr: 'حياتي', name: 'Hayati Florence', nameAr: 'حياتي فلورينس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 900, rating: '★★★★☆', reviews: 70, cat: 'women',
    img: 'assets/products/hayati-florence.png', img2: 'assets/products/hayati-florence.png',
    desc: 'A Florentine bouquet — powdery iris and rose with quiet woody elegance.',
    notes: { top: 'Bergamot, Green Notes', heart: 'Iris, Rose, Violet', base: 'Musk, Cedarwood, Vanilla' },
    family: 'Floral', year: '2024', origin: 'UAE', sku: 'H-HF-100', gender: 'Women',
    tag: 'POWDERY<br>ELEGANT<br>QUIET'
  },
  {
    id: 'pink-dagger', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Pink Dagger', nameAr: 'خنجر وردي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 850, rating: '★★★★☆', reviews: 85, cat: 'women',
    img: 'assets/products/pink-dagger.png', img2: 'assets/products/pink-dagger.png',
    desc: 'Sharp pink fruit with a velvet edge — playful on top, poised underneath.',
    notes: { top: 'Raspberry, Pink Pepper', heart: 'Rose, Peony', base: 'Musk, Amber, Vanilla' },
    family: 'Fruity Floral', year: '2024', origin: 'UAE', sku: 'AP-PD-100', gender: 'Women',
    tag: 'SHARP<br>PLAYFUL<br>POISED'
  },
  {
    id: 'daiman-eden', brand: 'ZIMAYA', brandAr: 'زيمايا', name: 'Daiman Eden', nameAr: 'دائماً إيدن', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1500, rating: '★★★★★', reviews: 36, cat: 'women',
    img: 'assets/products/daiman-eden.png', img2: 'assets/products/daiman-eden.png',
    desc: 'A garden always in bloom — fresh greens and florals over calm, clean woods.',
    notes: { top: 'Bergamot, Apple', heart: 'Jasmine, Rose, Green Notes', base: 'Musk, Cedarwood, Amber' },
    family: 'Floral Woody', year: '2024', origin: 'UAE', sku: 'ZM-DE-100', gender: 'Women',
    tag: 'FRESH<br>GREEN<br>CALM'
  },
  {
    id: 'daarej-women', brand: 'RASASI', brandAr: 'رصاصي', name: 'Daarej For Women', nameAr: 'دارج حريمي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 1075, rating: '★★★★☆', reviews: 36, cat: 'women',
    img: 'assets/products/daarej-women.png', img2: 'assets/products/daarej-women.png',
    desc: 'The feminine counterpart to the Daarej line — fruity, floral, and easy to wear.',
    notes: { top: 'Peach, Bergamot', heart: 'Rose, Jasmine, Ylang-Ylang', base: 'Musk, Vanilla, Sandalwood' },
    family: 'Floral Fruity', year: '2024', origin: 'UAE', sku: 'RS-DFW-100', gender: 'Women',
    tag: 'FRUITY<br>FLORAL<br>EASY'
  },
  {
    id: 'dalal', brand: 'DALAL', brandAr: 'دلال', name: 'Dalal', nameAr: 'دلال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1600, rating: '★★★★☆', reviews: 74, cat: 'women',
    img: 'assets/products/dalal.png', img2: 'assets/products/dalal.png',
    desc: 'Pampered luxury in a bottle — opulent florals resting on precious woods.',
    notes: { top: 'Saffron, Pink Pepper', heart: 'Rose, Orange Blossom', base: 'Amber, Oud, Musk' },
    family: 'Floral Oriental', year: '2024', origin: 'UAE', sku: 'D-D-100', gender: 'Women',
    tag: 'OPULENT<br>LUXE<br>FLORAL'
  },
  /* TEMP: reusing brand sibling image until real product photo is provided */
  {
    id: 'rashiqah', brand: 'RASHIQAH', brandAr: 'رشيقه', name: 'Rashiqah', nameAr: 'رشيقه', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 800, rating: '★★★★★', reviews: 59, cat: 'women',
    img: 'assets/products/musk-07.png', img2: 'assets/products/musk-07.png',
    desc: 'Slender and graceful — a light floral musk that never overwhelms.',
    notes: { top: 'Bergamot, Pear', heart: 'Rose, Freesia', base: 'White Musk, Amber, Cedarwood' },
    family: 'Floral Musk', year: '2024', origin: 'UAE', sku: 'R-R-100', gender: 'Women',
    tag: 'LIGHT<br>GRACEFUL<br>MUSKY'
  },
  {
    id: 'raghd', brand: 'AZHA', brandAr: 'أزها', name: 'Raghd', nameAr: 'رغد', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 750, rating: '★★★★☆', reviews: 74, cat: 'women',
    img: 'assets/products/raghd.png', img2: 'assets/products/raghd.png',
    desc: 'Comfort and ease made scent — soft florals over a gently warm base.',
    notes: { top: 'Bergamot, Peach', heart: 'Rose, Jasmine', base: 'Amber, Musk, Vanilla' },
    family: 'Floral Oriental', year: '2024', origin: 'UAE', sku: 'AZ-R-100', gender: 'Women',
    tag: 'SOFT<br>EASY<br>WARM'
  },
  {
    id: 'ramz-al-rasasi-zebra-women', brand: 'RASASI', brandAr: 'رصاصي', name: 'Ramz Al Rasasi Zebra 9325 For Women', nameAr: 'رمز الرصاصى زيبرا 9325 حريمى', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1500, rating: '★★★★☆', reviews: 29, cat: 'women',
    img: 'assets/products/ramz-al-rasasi-zebra-women.png', img2: 'assets/products/ramz-al-rasasi-zebra-women.png',
    desc: 'The women\'s Zebra edition — striped contrast of bright florals and deep woods.',
    notes: { top: 'Bergamot, Blackcurrant', heart: 'Rose, Jasmine, Iris', base: 'Patchouli, Musk, Vanilla' },
    family: 'Floral Woody', year: '2024', origin: 'UAE', sku: 'RS-RARZ9-100', gender: 'Women',
    tag: 'CONTRAST<br>BRIGHT<br>WOODY'
  },
  {
    id: 'romance-women', brand: 'ROMANCE', brandAr: 'رومانس', name: 'Romance For Women', nameAr: 'رومانس حريمي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 850, rating: '★★★★★', reviews: 20, cat: 'women',
    img: 'assets/products/romance-women.png', img2: 'assets/products/romance-women.png',
    desc: 'An unabashedly romantic bouquet — tender, rosy, and warmly musky.',
    notes: { top: 'Bergamot, Litchi', heart: 'Rose, Peony, Jasmine', base: 'Musk, Vanilla, Amber' },
    family: 'Floral', year: '2024', origin: 'UAE', sku: 'R-RFW-100', gender: 'Women',
    tag: 'ROMANTIC<br>TENDER<br>ROSY'
  },
  {
    id: 'raindrops', brand: 'RAINDROPS', brandAr: 'رين دروبس', name: 'Raindrops', nameAr: 'رين دروبس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 700, rating: '★★★★☆', reviews: 31, cat: 'women',
    img: 'assets/products/raindrops.png', img2: 'assets/products/raindrops.png',
    desc: 'Petals after rain — fresh, dewy florals with a clean musky finish.',
    notes: { top: 'Water Notes, Bergamot', heart: 'Freesia, Rose, Lily', base: 'White Musk, Cedarwood, Amber' },
    family: 'Floral Aquatic', year: '2024', origin: 'UAE', sku: 'RN-R-100', gender: 'Women',
    tag: 'FRESH<br>DEWY<br>CLEAN'
  },
  {
    id: 'raindrops-love-addict', brand: 'RAINDROPS', brandAr: 'رين دروبس', name: 'Raindrops Love Addict', nameAr: 'رين دروبس لاف أديكت', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1250, rating: '★★★★☆', reviews: 70, cat: 'women',
    img: 'assets/products/raindrops-love-addict.png', img2: 'assets/products/raindrops-love-addict.png',
    desc: 'An addictive twist on Raindrops — sweeter fruit, deeper rose, warmer trail.',
    notes: { top: 'Raspberry, Pink Pepper', heart: 'Rose, Peony, Jasmine', base: 'Vanilla, Musk, Patchouli' },
    family: 'Fruity Floral', year: '2024', origin: 'UAE', sku: 'RN-RLA-100', gender: 'Women',
    tag: 'ADDICTIVE<br>SWEET<br>WARM'
  },
  {
    id: 'raindrops-fleur-intense', brand: 'RAINDROPS', brandAr: 'رين دروبس', name: 'Raindrops Fleur Intense', nameAr: 'ريندروبس فلور إنتنس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1250, rating: '★★★★★', reviews: 87, cat: 'women',
    img: 'assets/products/raindrops-fleur-intense.png', img2: 'assets/products/raindrops-fleur-intense.png',
    desc: 'Raindrops at full bloom — an intensified white-floral heart with lasting softness.',
    notes: { top: 'Bergamot, Green Notes', heart: 'Tuberose, Jasmine, Rose', base: 'Musk, Sandalwood, Vanilla' },
    family: 'Floral', year: '2024', origin: 'UAE', sku: 'RN-RFI-100', gender: 'Women',
    tag: 'BLOOM<br>INTENSE<br>SOFT'
  },
  {
    id: 'sacrifice-for-her', brand: 'SACRIFICE', brandAr: 'ساكريفيس', name: 'Sacrifice For Her', nameAr: 'ساكريفيس للنساء', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 950, rating: '★★★★☆', reviews: 92, cat: 'women',
    img: 'assets/products/sacrifice-for-her.png', img2: 'assets/products/sacrifice-for-her.png',
    desc: 'Devotion rendered in amber and rose — warm, serious, and beautifully composed.',
    notes: { top: 'Pink Pepper, Bergamot', heart: 'Rose, Jasmine, Saffron', base: 'Amber, Vanilla, Musk' },
    family: 'Amber Floral', year: '2024', origin: 'UAE', sku: 'S-SFH-100', gender: 'Women',
    tag: 'DEVOTED<br>AMBER<br>WARM'
  },
  {
    id: 'sotoor-raa', brand: 'RASASI', brandAr: 'رصاصي', name: 'Sotoor Raa\'', nameAr: 'سطور ر', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1650, rating: '★★★★☆', reviews: 45, cat: 'women',
    img: 'assets/products/sotoor-raa.png', img2: 'assets/products/sotoor-raa.png',
    desc: 'A written line from the Sotoor collection — calligraphic florals over refined woods.',
    notes: { top: 'Bergamot, Saffron', heart: 'Rose, Jasmine, Iris', base: 'Amber, Sandalwood, Musk' },
    family: 'Floral Woody', year: '2024', origin: 'UAE', sku: 'RS-SR-100', gender: 'Women',
    tag: 'REFINED<br>FLORAL<br>WOODY'
  },
  {
    id: 'sotoor-seen', brand: 'RASASI', brandAr: 'رصاصي', name: 'Sotoor Seen', nameAr: 'سطور س', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1750, rating: '★★★★★', reviews: 66, cat: 'women',
    img: 'assets/products/sotoor-seen.png', img2: 'assets/products/sotoor-seen.png',
    desc: 'Another verse in the Sotoor series — richer amber, deeper florals, lasting poise.',
    notes: { top: 'Saffron, Pink Pepper', heart: 'Rose, Orange Blossom', base: 'Amber, Oud, Vanilla' },
    family: 'Amber Floral', year: '2024', origin: 'UAE', sku: 'RS-SS-100', gender: 'Women',
    tag: 'RICH<br>AMBER<br>POISED'
  },
  {
    id: 'swar-venin', brand: 'SWAR', brandAr: 'سوار', name: 'Swar Venin', nameAr: 'سوار فنين', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1400, rating: '★★★★☆', reviews: 69, cat: 'women',
    img: 'assets/products/swar-venin.png', img2: 'assets/products/swar-venin.png',
    desc: 'A bracelet of dark fruit and rose — alluring, glossy, and a little dangerous.',
    notes: { top: 'Blackcurrant, Pink Pepper', heart: 'Rose, Jasmine', base: 'Patchouli, Vanilla, Amber' },
    family: 'Fruity Oriental', year: '2024', origin: 'UAE', sku: 'S-SV-100', gender: 'Women',
    tag: 'ALLURING<br>DARK<br>GLOSSY'
  },
  {
    id: 'shaghaf-women', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Shaghaf For Women', nameAr: 'شغف حريمي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1200, rating: '★★★★☆', reviews: 78, cat: 'women',
    img: 'assets/products/shaghaf-women.png', img2: 'assets/products/shaghaf-women.png',
    desc: 'Passion in its feminine form — ripe fruit, soft petals, and a creamy vanilla close.',
    notes: { top: 'Peach, Bergamot', heart: 'Rose, Jasmine, Orange Blossom', base: 'Vanilla, Musk, Amber' },
    family: 'Fruity Floral', year: '2024', origin: 'UAE', sku: 'SA-SFW-100', gender: 'Women',
    tag: 'PASSIONATE<br>FRUITY<br>CREAMY'
  },
  {
    id: 'shuhrah-women', brand: 'RASASI', brandAr: 'رصاصي', name: 'Shuhrah For Women', nameAr: 'شهرة حريمي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1375, rating: '★★★★★', reviews: 10, cat: 'women',
    img: 'assets/products/shuhrah-women.png', img2: 'assets/products/shuhrah-women.png',
    desc: 'Fame in a feminine key — luminous florals with a warm oriental signature.',
    notes: { top: 'Bergamot, Pink Pepper', heart: 'Rose, Jasmine, Saffron', base: 'Amber, Musk, Sandalwood' },
    family: 'Floral Oriental', year: '2024', origin: 'UAE', sku: 'RS-SFW-100', gender: 'Women',
    tag: 'LUMINOUS<br>FAMOUS<br>WARM'
  },
  {
    id: 'shuhrah-women-senshuwar', brand: 'RASASI', brandAr: 'رصاصي', name: 'Shuhrah For Women Sensuous', nameAr: 'شهرة حريمي سنشوار', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1525, rating: '★★★★☆', reviews: 33, cat: 'women',
    img: 'assets/products/shuhrah-women-senshuwar.png', img2: 'assets/products/shuhrah-women-senshuwar.png',
    desc: 'The sensuous edition of Shuhrah — plusher florals over a deeper amber heart.',
    notes: { top: 'Saffron, Bergamot', heart: 'Rose, Jasmine, Ylang-Ylang', base: 'Amber, Vanilla, Musk' },
    family: 'Amber Floral', year: '2024', origin: 'UAE', sku: 'RS-SFWS-100', gender: 'Women',
    tag: 'SENSUOUS<br>PLUSH<br>DEEP'
  },
  {
    id: 'ishq-azhi', brand: 'AZHA', brandAr: 'أزها', name: 'Ishq Azhi', nameAr: 'عشق ازهي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 975, rating: '★★★★☆', reviews: 28, cat: 'women',
    img: 'assets/products/ishq-azhi.png', img2: 'assets/products/ishq-azhi.png',
    desc: 'A brighter reading of passion — golden amber lifted by luminous rose.',
    notes: { top: 'Saffron, Cardamom', heart: 'Rose, Amber', base: 'Vanilla, Sandalwood, Musk' },
    family: 'Amber Floral', year: '2024', origin: 'UAE', sku: 'AZ-IA-100', gender: 'Women',
    tag: 'GOLDEN<br>BRIGHT<br>PASSIONATE'
  },
  {
    id: 'fatima', brand: 'FATIMA', brandAr: 'فاطمة', name: 'Fatima', nameAr: 'فاطمة', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1300, rating: '★★★★★', reviews: 58, cat: 'women',
    img: 'assets/products/fatima.png', img2: 'assets/products/fatima.png',
    desc: 'A timeless feminine oriental — rose and amber in classic, graceful balance.',
    notes: { top: 'Bergamot, Saffron', heart: 'Rose, Jasmine, Orange Blossom', base: 'Amber, Musk, Sandalwood' },
    family: 'Floral Oriental', year: '2024', origin: 'UAE', sku: 'F-F-100', gender: 'Women',
    tag: 'TIMELESS<br>GRACEFUL<br>CLASSIC'
  },
  /* TEMP: reusing brand sibling image until real product photo is provided */
  {
    id: 'valencia', brand: 'VALENCIA', brandAr: 'فالنسيا', name: 'Valencia', nameAr: 'فالنسيا', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1200, rating: '★★★★☆', reviews: 71, cat: 'women',
    img: 'assets/products/musk-07.png', img2: 'assets/products/musk-07.png',
    desc: 'Mediterranean sunlight in a bottle — bright citrus over warm white florals.',
    notes: { top: 'Orange, Bergamot, Mandarin', heart: 'Orange Blossom, Jasmine', base: 'Musk, Amber, Cedarwood' },
    family: 'Citrus Floral', year: '2024', origin: 'UAE', sku: 'V-V-100', gender: 'Women',
    tag: 'BRIGHT<br>CITRUS<br>SUNLIT'
  },
  {
    id: 'fattan-women', brand: 'RASASI', brandAr: 'رصاصي', name: 'Fattan For Women', nameAr: 'فتان حريمي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 1000, rating: '★★★★☆', reviews: 80, cat: 'women',
    img: 'assets/products/fattan-women.png', img2: 'assets/products/fattan-women.png',
    desc: 'Charming and fruity — the feminine side of the Fattan pairing.',
    notes: { top: 'Peach, Blackcurrant', heart: 'Rose, Jasmine', base: 'Musk, Vanilla, Amber' },
    family: 'Fruity Floral', year: '2024', origin: 'UAE', sku: 'RS-FFW-100', gender: 'Women',
    tag: 'CHARMING<br>FRUITY<br>SOFT'
  },
  {
    id: 'pride-of-lattafa-white', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Pride of Lattafa White', nameAr: 'فخر لطافه ابيض', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1200, rating: '★★★★★', reviews: 13, cat: 'women',
    img: 'assets/products/pride-of-lattafa-white.png', img2: 'assets/products/pride-of-lattafa-white.png',
    desc: 'The white edition of Lattafa\'s pride — clean white florals over soft creamy musk.',
    notes: { top: 'Bergamot, Pear', heart: 'Jasmine, Tuberose, Rose', base: 'White Musk, Vanilla, Sandalwood' },
    family: 'White Floral', year: '2024', origin: 'UAE', sku: 'LT-POLW-100', gender: 'Women',
    tag: 'CLEAN<br>WHITE<br>CREAMY'
  },
  {
    id: 'farah', brand: 'FARAH', brandAr: 'فرح', name: 'Farah', nameAr: 'فرح', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1350, rating: '★★★★☆', reviews: 36, cat: 'women',
    img: 'assets/products/farah.png', img2: 'assets/products/farah.png',
    desc: 'Joy made wearable — bright, celebratory florals with a warm sweet finish.',
    notes: { top: 'Litchi, Bergamot', heart: 'Rose, Peony, Jasmine', base: 'Musk, Vanilla, Amber' },
    family: 'Floral Fruity', year: '2024', origin: 'UAE', sku: 'F-F-100', gender: 'Women',
    tag: 'JOYFUL<br>BRIGHT<br>SWEET'
  },
  {
    id: 'faqat-lel-nesaa', brand: 'RASASI', brandAr: 'رصاصي', name: 'Faqat Lel Nesaa', nameAr: 'فقط للنساء', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1450, rating: '★★★★☆', reviews: 57, cat: 'women',
    img: 'assets/products/faqat-lel-nesaa.png', img2: 'assets/products/faqat-lel-nesaa.png',
    desc: 'For Women Only — an assured floral oriental made with a woman\'s signature in mind.',
    notes: { top: 'Bergamot, Saffron', heart: 'Rose, Jasmine, Iris', base: 'Amber, Musk, Patchouli' },
    family: 'Floral Oriental', year: '2024', origin: 'UAE', sku: 'RS-FLN-100', gender: 'Women',
    tag: 'ASSURED<br>FLORAL<br>SIGNATURE'
  },
  {
    id: 'qasamat-ibhar', brand: 'RASASI', brandAr: 'رصاصي', name: 'Qasamat Ibhar', nameAr: 'قسمات ابهار', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1550, rating: '★★★★★', reviews: 78, cat: 'women',
    img: 'assets/products/qasamat-ibhar.png', img2: 'assets/products/qasamat-ibhar.png',
    desc: 'A dazzling chapter of the Qasamat line — striking florals over polished woods.',
    notes: { top: 'Pink Pepper, Bergamot', heart: 'Rose, Jasmine, Violet', base: 'Patchouli, Amber, Musk' },
    family: 'Floral Woody', year: '2024', origin: 'UAE', sku: 'RS-QI-100', gender: 'Women',
    tag: 'DAZZLING<br>STRIKING<br>POLISHED'
  },
  {
    id: 'qalb', brand: 'AZHA', brandAr: 'أزها', name: 'Qalb', nameAr: 'قلب', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 975, rating: '★★★★☆', reviews: 72, cat: 'women',
    img: 'assets/products/qalb.png', img2: 'assets/products/qalb.png',
    desc: 'Worn close to the heart — warm florals with an honest, comforting amber base.',
    notes: { top: 'Bergamot, Peach', heart: 'Rose, Jasmine', base: 'Amber, Vanilla, Musk' },
    family: 'Floral Oriental', year: '2024', origin: 'UAE', sku: 'AZ-Q-100', gender: 'Women',
    tag: 'WARM<br>HONEST<br>COMFORTING'
  },
  {
    id: 'carambola', brand: 'AZHA', brandAr: 'أزها', name: 'Carambola', nameAr: 'كارمبولا', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 750, rating: '★★★★☆', reviews: 80, cat: 'women',
    img: 'assets/products/carambola.png', img2: 'assets/products/carambola.png',
    desc: 'Exotic starfruit and citrus — tangy, refreshing, and full of summer energy.',
    notes: { top: 'Starfruit, Citrus, Pear', heart: 'Freesia, Rose', base: 'Musk, Amber, Cedarwood' },
    family: 'Fruity Floral', year: '2024', origin: 'UAE', sku: 'AZ-C-100', gender: 'Women',
    tag: 'TANGY<br>FRESH<br>SUMMER'
  },
  {
    id: 'kamel', brand: 'KAMEL', brandAr: 'كاميل', name: 'Kamel', nameAr: 'كاميل', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 1050, rating: '★★★★★', reviews: 17, cat: 'women',
    img: 'assets/products/kamel.png', img2: 'assets/products/kamel.png',
    desc: 'Complete and composed — balanced florals resting on smooth sandalwood.',
    notes: { top: 'Bergamot, Pink Pepper', heart: 'Rose, Iris, Jasmine', base: 'Sandalwood, Musk, Amber' },
    family: 'Floral Woody', year: '2024', origin: 'UAE', sku: 'K-K-100', gender: 'Women',
    tag: 'BALANCED<br>SMOOTH<br>COMPOSED'
  },
  {
    id: 'la-yuqawam-jasmine-wisp', brand: 'RASASI', brandAr: 'رصاصي', name: 'La Yuqawam Jasmine Wisp', nameAr: 'لا يقاوم جاسمين', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['75 ML', '100 ML'],
    price: 3000, rating: '★★★★★', reviews: 64, cat: 'women',
    img: 'assets/products/la-yuqawam-jasmine-wisp.png', img2: 'assets/products/la-yuqawam-jasmine-wisp.png',
    desc: 'A luminous jasmine reverie wrapped in sunlit citrus and creamy tropical fruit. Bright, sensual and unmistakably feminine — the irresistible signature of Rasasi in its softest form.',
    notes: { top: 'Mandarin, Grapefruit, Lemon', heart: 'Passion Fruit, White Flowers, Pear, Peach, Coconut', base: 'Vanilla, Tonka Bean, Amber' },
    family: 'Floral Fruity', year: '2023', origin: 'UAE', sku: 'RS-LYJ-100', gender: 'Women',
    tag: 'LUMINOUS<br>JASMINE<br>IRRESISTIBLE'
  },
  {
    id: 'la-yuqawam-pour-femme', brand: 'RASASI', brandAr: 'رصاصي', name: 'La Yuqawam Pour Femme', nameAr: 'لا يقاوم للنساء', type: 'Eau de Parfum',
    size: '75 ML', sizes: ['75 ML', '100 ML'],
    price: 3000, rating: '★★★★★', reviews: 71, cat: 'women',
    img: 'assets/products/la-yuqawam-pour-femme.png', img2: 'assets/products/la-yuqawam-pour-femme.png',
    desc: 'Saffron and red berries open onto a spiced floral heart, settling into sandalwood, amber and black truffle. An opulent, commanding oriental for the woman who is simply irresistible.',
    notes: { top: 'Iranian Saffron, Red Berries, Egyptian Thyme', heart: 'Cinnamon, Ylang-Ylang, Brazilian Pink Pepper', base: 'Indian Sandalwood, Amber, French Black Truffle, Patchouli' },
    family: 'Spicy Oriental', year: '2023', origin: 'UAE', sku: 'RS-LYF-075', gender: 'Women',
    tag: 'OPULENT<br>SPICED<br>IRRESISTIBLE'
  },
  {
    id: 'latifah-first-love', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Latifah First Love', nameAr: 'لطفه فيرست لاف', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1250, rating: '★★★★☆', reviews: 42, cat: 'women',
    img: 'assets/products/latifah-first-love.png', img2: 'assets/products/latifah-first-love.png',
    desc: 'The rush of a first love — sweet, dizzy florals with a soft vanilla afterglow.',
    notes: { top: 'Pear, Bergamot', heart: 'Rose, Peony, Praline', base: 'Vanilla, Musk, Amberwood' },
    family: 'Floral Gourmand', year: '2024', origin: 'UAE', sku: 'LT-LFL-100', gender: 'Women',
    tag: 'SWEET<br>DIZZY<br>SOFT'
  },
  {
    id: 'silky-touch', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Silky Touch', nameAr: 'لمسة حرير', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 750, rating: '★★★★☆', reviews: 39, cat: 'women',
    img: 'assets/products/silky-touch.png', img2: 'assets/products/silky-touch.png',
    desc: 'Like silk against the skin — smooth, powdery musk with a gentle floral heart.',
    notes: { top: 'Bergamot, Pear', heart: 'Rose, Iris, Peony', base: 'White Musk, Vanilla, Sandalwood' },
    family: 'Musky Floral', year: '2024', origin: 'UAE', sku: 'AP-ST-100', gender: 'Women',
    tag: 'SILKY<br>POWDERY<br>GENTLE'
  },
  {
    id: 'lamsat-hareer', brand: 'LAMSAT HAREER', brandAr: 'لمسة حرير', name: 'Lamsat Hareer', nameAr: 'لمسة حرير', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 750, rating: '★★★★★', reviews: 56, cat: 'women',
    img: 'assets/products/lamsat-hareer.png', img2: 'assets/products/lamsat-hareer.png',
    desc: 'A silken floral musk — understated, clean, and comfortable from morning to night.',
    notes: { top: 'Citrus, Green Notes', heart: 'Rose, Jasmine', base: 'Musk, Amber, Cedarwood' },
    family: 'Floral Musk', year: '2024', origin: 'UAE', sku: 'LH-LH-100', gender: 'Women',
    tag: 'CLEAN<br>SILKEN<br>EASY'
  },
  {
    id: 'magnolia-dreams', brand: 'MAGNOLIA', brandAr: 'ماغنوليا', name: 'Magnolia Dreams', nameAr: 'ماغنوليا دريمز', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1250, rating: '★★★★☆', reviews: 93, cat: 'women',
    img: 'assets/products/magnolia-dreams.png', img2: 'assets/products/magnolia-dreams.png',
    desc: 'Magnolia in full bloom — creamy white petals over soft, luminous woods.',
    notes: { top: 'Bergamot, Green Notes', heart: 'Magnolia, Jasmine, Rose', base: 'Musk, Sandalwood, Vanilla' },
    family: 'White Floral', year: '2024', origin: 'UAE', sku: 'M-MD-100', gender: 'Women',
    tag: 'CREAMY<br>BLOOM<br>LUMINOUS'
  },
  {
    id: 'exciting-women', brand: 'RASASI', brandAr: 'رصاصي', name: 'Exciting', nameAr: 'مثير', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1700, rating: '★★★★☆', reviews: 36, cat: 'women',
    img: 'assets/products/exciting-women.png', img2: 'assets/products/exciting-women.png',
    desc: 'Exactly what it says — vivid fruit and florals with an electric, modern trail.',
    notes: { top: 'Blackcurrant, Pink Pepper', heart: 'Rose, Jasmine, Peony', base: 'Patchouli, Vanilla, Musk' },
    family: 'Fruity Floral', year: '2024', origin: 'UAE', sku: 'RS-E-100', gender: 'Women',
    tag: 'VIVID<br>ELECTRIC<br>MODERN'
  },
  {
    id: 'exciting-elixir', brand: 'RASASI', brandAr: 'رصاصي', name: 'Exciting Elixir', nameAr: 'مثير إليكسير', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1700, rating: '★★★★★', reviews: 53, cat: 'women',
    img: 'assets/products/exciting-elixir.png', img2: 'assets/products/exciting-elixir.png',
    desc: 'The elixir concentration — denser fruit, richer amber, and a far longer stay.',
    notes: { top: 'Raspberry, Saffron', heart: 'Rose, Jasmine', base: 'Amber, Vanilla, Patchouli' },
    family: 'Amber Fruity', year: '2024', origin: 'UAE', sku: 'RS-EE-100', gender: 'Women',
    tag: 'DENSE<br>RICH<br>LASTING'
  },
  {
    id: 'bridal-blend', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Bridal Blend', nameAr: 'مخلط العرائس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 825, rating: '★★★★☆', reviews: 35, cat: 'women',
    img: 'assets/products/bridal-blend.png', img2: 'assets/products/bridal-blend.png',
    desc: 'A traditional bridal mukhallat — celebratory, rich, and layered with rose and oud.',
    notes: { top: 'Saffron, Rose', heart: 'Oud, Jasmine, Amber', base: 'Musk, Sandalwood, Vanilla' },
    family: 'Oriental Floral', year: '2024', origin: 'UAE', sku: 'SA-BB-100', gender: 'Women',
    tag: 'BRIDAL<br>RICH<br>TRADITIONAL'
  },
  {
    id: 'musamam-black-intense-women', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Musamam Black Intense For Women', nameAr: 'مسمم بلاك انتنس حريمي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1925, rating: '★★★★☆', reviews: 96, cat: 'women',
    img: 'assets/products/musamam-black-intense-women.png', img2: 'assets/products/musamam-black-intense-women.png',
    desc: 'Black intensity in a feminine register — dark rose and oud over enveloping amber.',
    notes: { top: 'Saffron, Pink Pepper', heart: 'Rose, Oud, Jasmine', base: 'Amber, Vanilla, Patchouli' },
    family: 'Amber Woody', year: '2024', origin: 'UAE', sku: 'LT-MBIFW-100', gender: 'Women',
    tag: 'DARK<br>INTENSE<br>ENVELOPING'
  },
  {
    id: 'mohrah', brand: 'MOHRAH', brandAr: 'مهره', name: 'Mohrah', nameAr: 'مهره', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 1150, rating: '★★★★★', reviews: 82, cat: 'women',
    img: 'assets/products/mohrah.png', img2: 'assets/products/mohrah.png',
    desc: 'Spirited and elegant — a warm floral oriental with quiet strength.',
    notes: { top: 'Bergamot, Saffron', heart: 'Rose, Jasmine', base: 'Amber, Musk, Sandalwood' },
    family: 'Floral Oriental', year: '2024', origin: 'UAE', sku: 'M-M-100', gender: 'Women',
    tag: 'SPIRITED<br>ELEGANT<br>WARM'
  },
  {
    id: 'myar-pink', brand: 'MYAR', brandAr: 'ميار', name: 'Myar Pink', nameAr: 'ميار بينك', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1350, rating: '★★★★☆', reviews: 15, cat: 'women',
    img: 'assets/products/myar-pink.png', img2: 'assets/products/myar-pink.png',
    desc: 'Pink from first spray to last — juicy berries over a plush rose-musk base.',
    notes: { top: 'Raspberry, Litchi', heart: 'Rose, Peony', base: 'Musk, Vanilla, Amberwood' },
    family: 'Fruity Floral', year: '2024', origin: 'UAE', sku: 'M-MP-100', gender: 'Women',
    tag: 'PINK<br>JUICY<br>PLUSH'
  },
  {
    id: 'miss-edge', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Miss Edge', nameAr: 'ميس ايدج', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 1100, rating: '★★★★☆', reviews: 22, cat: 'women',
    img: 'assets/products/miss-edge.png', img2: 'assets/products/miss-edge.png',
    desc: 'Edge for her — crisp florals with a confident woody-musk signature.',
    notes: { top: 'Blackcurrant, Bergamot', heart: 'Rose, Jasmine, Iris', base: 'Patchouli, Musk, Vanilla' },
    family: 'Floral Woody', year: '2024', origin: 'UAE', sku: 'SA-ME-100', gender: 'Women',
    tag: 'CRISP<br>CONFIDENT<br>MODERN'
  },
  {
    id: 'nayel-her-majesty', brand: 'NAYEL', brandAr: 'نائل', name: 'Nayel Her Majesty', nameAr: 'نائل هير ماجيستى', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1400, rating: '★★★★★', reviews: 51, cat: 'women',
    img: 'assets/products/nayel-her-majesty.png', img2: 'assets/products/nayel-her-majesty.png',
    desc: 'Regal by design — commanding florals crowned with amber and precious oud.',
    notes: { top: 'Saffron, Bergamot', heart: 'Rose, Jasmine, Orange Blossom', base: 'Amber, Oud, Musk' },
    family: 'Floral Oriental', year: '2024', origin: 'UAE', sku: 'NY-NHM-100', gender: 'Women',
    tag: 'REGAL<br>COMMANDING<br>AMBER'
  },
  {
    id: 'nafaeis-al-shaghaf-women', brand: 'RASASI', brandAr: 'رصاصي', name: 'Nafaeis Al Shaghaf Pour Femme', nameAr: 'نفائس الشغف حريمي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1530, rating: '★★★★☆', reviews: 73, cat: 'women',
    img: 'assets/products/nafaeis-al-shaghaf-women.png', img2: 'assets/products/nafaeis-al-shaghaf-women.png',
    desc: 'The treasures of passion in feminine form — lush florals over a golden amber base.',
    notes: { top: 'Peach, Pink Pepper', heart: 'Rose, Jasmine, Ylang-Ylang', base: 'Amber, Vanilla, Musk' },
    family: 'Floral Amber', year: '2024', origin: 'UAE', sku: 'RS-NASPF-100', gender: 'Women',
    tag: 'LUSH<br>GOLDEN<br>PRECIOUS'
  },
  /* TEMP: reusing brand sibling image until real product photo is provided */
  {
    id: 'noof', brand: 'NOOF', brandAr: 'نوف', name: 'Noof', nameAr: 'نوف', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1500, rating: '★★★★☆', reviews: 89, cat: 'women',
    img: 'assets/products/shaghaf-oud-ahmar.png', img2: 'assets/products/shaghaf-oud-ahmar.png',
    desc: 'Elevated and serene — florals lifted high over a warm oriental foundation.',
    notes: { top: 'Bergamot, Saffron', heart: 'Rose, Jasmine', base: 'Amber, Oud, Musk' },
    family: 'Floral Oriental', year: '2024', origin: 'UAE', sku: 'N-N-100', gender: 'Women',
    tag: 'ELEVATED<br>SERENE<br>WARM'
  },
  {
    id: 'noof-azhi', brand: 'AZHA', brandAr: 'أزها', name: 'Noof Azhi', nameAr: 'نوف ازهي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 975, rating: '★★★★★', reviews: 85, cat: 'women',
    img: 'assets/products/noof-azhi.png', img2: 'assets/products/noof-azhi.png',
    desc: 'A luminous take on Noof — brighter florals with the same warm amber heart.',
    notes: { top: 'Peach, Bergamot', heart: 'Rose, Jasmine', base: 'Amber, Musk, Vanilla' },
    family: 'Floral Oriental', year: '2024', origin: 'UAE', sku: 'AZ-NA-100', gender: 'Women',
    tag: 'LUMINOUS<br>BRIGHT<br>WARM'
  },
  {
    id: 'neila-sharbat', brand: 'NEILA', brandAr: 'نيلا', name: 'Neila Sharbat', nameAr: 'نيلا شربات', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1250, rating: '★★★★☆', reviews: 21, cat: 'women',
    img: 'assets/products/neila-sharbat.png', img2: 'assets/products/neila-sharbat.png',
    desc: 'A glass of rose sharbat — syrupy fruit, cool florals, and a sweet lingering finish.',
    notes: { top: 'Mixed Berries, Citrus', heart: 'Rose, Sugar Syrup', base: 'Vanilla, Musk, Amber' },
    family: 'Fruity Gourmand', year: '2024', origin: 'UAE', sku: 'N-NS-100', gender: 'Women',
    tag: 'SYRUPY<br>FRUITY<br>SWEET'
  },
  {
    id: 'hawas-pink', brand: 'RASASI', brandAr: 'رصاصي', name: 'Hawas Pink', nameAr: 'هوس بينك', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 2450, rating: '★★★★☆', reviews: 86, cat: 'women',
    img: 'assets/products/hawas-pink.png', img2: 'assets/products/hawas-pink.png',
    desc: 'The pink chapter of Hawas — vivid berries and rose with the line\'s signature radiance.',
    notes: { top: 'Raspberry, Bergamot, Pink Pepper', heart: 'Rose, Jasmine, Peony', base: 'Musk, Amberwood, Vanilla' },
    family: 'Fruity Floral', year: '2024', origin: 'UAE', sku: 'RS-HP-100', gender: 'Women',
    tag: 'VIVID<br>RADIANT<br>PINK'
  },
  {
    id: 'hawas-women', brand: 'RASASI', brandAr: 'رصاصي', name: 'Hawas For Her', nameAr: 'هوس حريمى', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 2350, rating: '★★★★★', reviews: 99, cat: 'women',
    img: 'assets/products/hawas-women.png', img2: 'assets/products/hawas-women.png',
    desc: 'Hawas in her key — fresh marine brightness folded into warm feminine florals.',
    notes: { top: 'Apple, Bergamot, Sea Notes', heart: 'Rose, Jasmine, Peach', base: 'Musk, Amber, Sandalwood' },
    family: 'Fruity Floral', year: '2024', origin: 'UAE', sku: 'RS-HFH-100', gender: 'Women',
    tag: 'FRESH<br>MARINE<br>FEMININE'
  },
  {
    id: 'hawas-diva', brand: 'RASASI', brandAr: 'رصاصي', name: 'Hawas Diva', nameAr: 'هوس ديفا', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1850, rating: '★★★★☆', reviews: 96, cat: 'women',
    img: 'assets/products/hawas-diva.png', img2: 'assets/products/hawas-diva.png',
    desc: 'Made for centre stage — dramatic florals with a glowing amber spotlight.',
    notes: { top: 'Pink Pepper, Bergamot', heart: 'Rose, Jasmine, Orange Blossom', base: 'Amber, Vanilla, Musk' },
    family: 'Floral Amber', year: '2024', origin: 'UAE', sku: 'RS-HD-100', gender: 'Women',
    tag: 'DRAMATIC<br>GLOWING<br>BOLD'
  },
  {
    id: 'hair-confection', brand: 'HAIR CONFECTION', brandAr: 'هير كونفيشن', name: 'Hair Confection', nameAr: 'هير كونفيشن', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1950, rating: '★★★★☆', reviews: 25, cat: 'women',
    img: 'assets/products/hair-confection.png', img2: 'assets/products/hair-confection.png',
    desc: 'A hair mist as sweet as a confection — light, sugary florals that trail with every movement.',
    notes: { top: 'Pear, Bergamot', heart: 'Rose, Praline, Vanilla Orchid', base: 'Musk, Tonka Bean, Sandalwood' },
    family: 'Gourmand Floral', year: '2024', origin: 'UAE', sku: 'HC-HC-100', gender: 'Women',
    tag: 'SWEET<br>LIGHT<br>TRAILING'
  },
  {
    id: 'wassal', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Wassal', nameAr: 'وصال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1500, rating: '★★★★★', reviews: 24, cat: 'women',
    img: 'assets/products/wassal.png', img2: 'assets/products/wassal.png',
    desc: 'Union rendered in scent — florals and amber woven together without a seam.',
    notes: { top: 'Saffron, Bergamot', heart: 'Rose, Jasmine', base: 'Amber, Vanilla, Musk' },
    family: 'Amber Floral', year: '2024', origin: 'UAE', sku: 'SA-W-100', gender: 'Women',
    tag: 'UNITED<br>AMBER<br>SEAMLESS'
  },
  {
    id: 'wafa', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Wafa', nameAr: 'وفاء', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1600, rating: '★★★★☆', reviews: 45, cat: 'women',
    img: 'assets/products/wafa.png', img2: 'assets/products/wafa.png',
    desc: 'Loyalty in a bottle — a faithful, classic floral oriental that never wavers.',
    notes: { top: 'Bergamot, Saffron', heart: 'Rose, Jasmine, Iris', base: 'Amber, Sandalwood, Musk' },
    family: 'Floral Oriental', year: '2024', origin: 'UAE', sku: 'SA-W-100', gender: 'Women',
    tag: 'FAITHFUL<br>CLASSIC<br>WARM'
  },
  {
    id: 'yara-moi', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Yara Moi', nameAr: 'يارا أبيض', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 1150, rating: '★★★★☆', reviews: 44, cat: 'women',
    img: 'assets/products/yara-moi.png', img2: 'assets/products/yara-moi.png',
    desc: 'The white Yara — creamy vanilla and orange blossom in the line\'s signature softness.',
    notes: { top: 'Orange Blossom, Tangerine', heart: 'Heliotrope, Jasmine, Vanilla Orchid', base: 'Vanilla, Sandalwood, Musk' },
    family: 'Gourmand Floral', year: '2024', origin: 'UAE', sku: 'LT-YM-100', gender: 'Women',
    tag: 'CREAMY<br>SOFT<br>VANILLA'
  },
  {
    id: 'yara-elixir', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Yara Elixir', nameAr: 'يارا الكسير', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1250, rating: '★★★★★', reviews: 65, cat: 'women',
    img: 'assets/products/yara-elixir.png', img2: 'assets/products/yara-elixir.png',
    desc: 'Yara concentrated into elixir form — denser vanilla, warmer amber, longer wear.',
    notes: { top: 'Tangerine, Pink Pepper', heart: 'Heliotrope, Jasmine, Praline', base: 'Vanilla, Amber, Sandalwood' },
    family: 'Amber Gourmand', year: '2024', origin: 'UAE', sku: 'LT-YE-100', gender: 'Women',
    tag: 'DENSE<br>WARM<br>ELIXIR'
  },
  {
    id: 'yara-pink', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Yara Pink', nameAr: 'يارا بينك', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 1150, rating: '★★★★☆', reviews: 78, cat: 'women',
    img: 'assets/products/yara-pink.png', img2: 'assets/products/yara-pink.png',
    desc: 'The pink Yara — fruitier and brighter, with the same creamy vanilla heart.',
    notes: { top: 'Litchi, Tangerine', heart: 'Heliotrope, Jasmine, Rose', base: 'Vanilla, Musk, Sandalwood' },
    family: 'Fruity Gourmand', year: '2024', origin: 'UAE', sku: 'LT-YP-100', gender: 'Women',
    tag: 'FRUITY<br>BRIGHT<br>CREAMY'
  },
  {
    id: 'yara-toos', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Yara Toos', nameAr: 'يارا توس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1200, rating: '★★★★☆', reviews: 97, cat: 'women',
    img: 'assets/products/yara-toos.png', img2: 'assets/products/yara-toos.png',
    desc: 'A smooth, powdery Yara variation — gentle florals over soft gourmand warmth.',
    notes: { top: 'Orange Blossom, Pear', heart: 'Heliotrope, Vanilla Orchid, Jasmine', base: 'Vanilla, Musk, Amberwood' },
    family: 'Gourmand Floral', year: '2024', origin: 'UAE', sku: 'LT-YT-100', gender: 'Women',
    tag: 'POWDERY<br>GENTLE<br>SMOOTH'
  },
  {
    id: 'yara-candy', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Yara Candy', nameAr: 'يارا كاندي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1200, rating: '★★★★★', reviews: 22, cat: 'women',
    img: 'assets/products/yara-candy.png', img2: 'assets/products/yara-candy.png',
    desc: 'The sweetest Yara of them all — candied fruit and caramel over creamy vanilla.',
    notes: { top: 'Candied Fruit, Tangerine', heart: 'Heliotrope, Praline, Jasmine', base: 'Vanilla, Caramel, Musk' },
    family: 'Gourmand', year: '2024', origin: 'UAE', sku: 'LT-YC-100', gender: 'Women',
    tag: 'CANDIED<br>SWEET<br>CREAMY'
  },
  {
    id: 'yemen-women', brand: 'YEMEN', brandAr: 'يمن', name: 'Yemen For Women', nameAr: 'يمن حريمى', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 925, rating: '★★★★☆', reviews: 28, cat: 'women',
    img: 'assets/products/yemen-women.png', img2: 'assets/products/yemen-women.png',
    desc: 'A heritage oriental in feminine dress — rose and oud with a soft amber close.',
    notes: { top: 'Saffron, Bergamot', heart: 'Rose, Oud, Jasmine', base: 'Amber, Musk, Sandalwood' },
    family: 'Oriental Floral', year: '2024', origin: 'UAE', sku: 'YM-YFW-100', gender: 'Women',
    tag: 'HERITAGE<br>ORIENTAL<br>SOFT'
  },
  {
    id: 'sugar-caramel-chocolate-macaron', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Caramel Chocolate Macaron', nameAr: 'كراميل شوكولاتة ماكارون', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 950, rating: '★★★★☆', reviews: 46, cat: 'unisex',
    img: 'assets/products/sugar-caramel-chocolate-macaron.png', img2: 'assets/products/sugar-caramel-chocolate-macaron.png',
    desc: 'Caramel and dark chocolate pressed between almond shells — a gourmand for anyone.',
    notes: { top: 'Caramel, Almond', heart: 'Chocolate, Macaron Shell', base: 'Vanilla, Tonka Bean, Musk' },
    family: 'Gourmand', year: '2024', origin: 'UAE', sku: 'AP-CCM-100', gender: 'Unisex',
    tag: 'CARAMEL<br>RICH<br>GOURMAND'
  },
  {
    id: 'sugar-chocolate-ganache', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Chocolate Ganache', nameAr: 'شوكولاتة جاناش', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 950, rating: '★★★★★', reviews: 63, cat: 'unisex',
    img: 'assets/products/sugar-chocolate-ganache.png', img2: 'assets/products/sugar-chocolate-ganache.png',
    desc: 'Glossy dark ganache folded with cream — deep, cocoa-rich, and quietly luxurious.',
    notes: { top: 'Cocoa, Coffee', heart: 'Dark Chocolate, Cream', base: 'Vanilla, Tonka Bean, Amber' },
    family: 'Gourmand', year: '2024', origin: 'UAE', sku: 'AP-CG-100', gender: 'Unisex',
    tag: 'COCOA<br>DEEP<br>LUXE'
  },
  {
    id: 'sugar-coconut-chiffon', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Coconut Chiffon', nameAr: 'كوكونت شيفون', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 950, rating: '★★★★☆', reviews: 80, cat: 'unisex',
    img: 'assets/products/sugar-coconut-chiffon.png', img2: 'assets/products/sugar-coconut-chiffon.png',
    desc: 'Airy coconut cake and warm milk — light, tropical, and softly sweet.',
    notes: { top: 'Coconut, Citrus', heart: 'Chiffon Cake, Coconut Milk', base: 'Vanilla, White Musk, Sandalwood' },
    family: 'Gourmand', year: '2024', origin: 'UAE', sku: 'AP-CC-100', gender: 'Unisex',
    tag: 'AIRY<br>TROPICAL<br>SOFT'
  },
  {
    id: 'sugar-dulce-de-leche', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Dulce de Leche', nameAr: 'دولسي دي ليتشي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 950, rating: '★★★★☆', reviews: 97, cat: 'unisex',
    img: 'assets/products/sugar-dulce-de-leche.png', img2: 'assets/products/sugar-dulce-de-leche.png',
    desc: 'Slow-cooked caramelised milk — buttery, golden, and deeply comforting.',
    notes: { top: 'Caramelized Milk, Brown Sugar', heart: 'Toffee, Vanilla', base: 'Tonka Bean, Musk, Amber' },
    family: 'Gourmand', year: '2024', origin: 'UAE', sku: 'AP-DDL-100', gender: 'Unisex',
    tag: 'BUTTERY<br>GOLDEN<br>SWEET'
  },
  {
    id: 'sugar-french-vanilla-latte', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'French Vanilla Latte', nameAr: 'فرنش فانيلا لاتيه', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 950, rating: '★★★★★', reviews: 22, cat: 'unisex',
    img: 'assets/products/sugar-french-vanilla-latte.png', img2: 'assets/products/sugar-french-vanilla-latte.png',
    desc: 'Espresso poured over vanilla-sweetened milk — warm, roasted, and easy to wear daily.',
    notes: { top: 'Espresso, Bergamot', heart: 'Steamed Milk, French Vanilla', base: 'Tonka Bean, Musk, Caramel' },
    family: 'Gourmand', year: '2024', origin: 'UAE', sku: 'AP-FVL-100', gender: 'Unisex',
    tag: 'COFFEE<br>WARM<br>DAILY'
  },
  {
    id: 'sugar-lemon-sorbet', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Lemon Sorbet', nameAr: 'ليمون سوربيه', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 950, rating: '★★★★☆', reviews: 39, cat: 'unisex',
    img: 'assets/products/sugar-lemon-sorbet.png', img2: 'assets/products/sugar-lemon-sorbet.png',
    desc: 'Ice-cold lemon sorbet — sharp, sparkling citrus melting into soft sweetness.',
    notes: { top: 'Lemon, Bergamot, Mint', heart: 'Sorbet Accord, Sugar', base: 'White Musk, Vanilla, Cedarwood' },
    family: 'Citrus Gourmand', year: '2024', origin: 'UAE', sku: 'AP-LS-100', gender: 'Unisex',
    tag: 'COLD<br>CITRUS<br>SPARKLING'
  },
  {
    id: 'sugar-mango-affogato', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Mango Affogato', nameAr: 'مانجو أفوجاتو', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 950, rating: '★★★★☆', reviews: 56, cat: 'unisex',
    img: 'assets/products/sugar-mango-affogato.png', img2: 'assets/products/sugar-mango-affogato.png',
    desc: 'Ripe mango poured over hot espresso — an unexpected pairing that simply works.',
    notes: { top: 'Mango, Tangerine', heart: 'Espresso, Cream', base: 'Vanilla, Musk, Tonka Bean' },
    family: 'Fruity Gourmand', year: '2024', origin: 'UAE', sku: 'AP-MA-100', gender: 'Unisex',
    tag: 'MANGO<br>COFFEE<br>UNEXPECTED'
  },
  {
    id: 'sugar-pecan-butter-cookie', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Pecan Butter Cookie', nameAr: 'بيكان بتر كوكي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 950, rating: '★★★★★', reviews: 73, cat: 'unisex',
    img: 'assets/products/sugar-pecan-butter-cookie.png', img2: 'assets/products/sugar-pecan-butter-cookie.png',
    desc: 'Toasted pecans baked into buttery shortbread — nutty, warm, and homely.',
    notes: { top: 'Pecan, Brown Butter', heart: 'Shortbread, Vanilla', base: 'Tonka Bean, Caramel, Musk' },
    family: 'Gourmand', year: '2024', origin: 'UAE', sku: 'AP-PBC-100', gender: 'Unisex',
    tag: 'NUTTY<br>BUTTERY<br>WARM'
  },
  {
    id: 'sugar-toffee-ganache', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Toffee Ganache', nameAr: 'توفي جاناش', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 950, rating: '★★★★☆', reviews: 90, cat: 'unisex',
    img: 'assets/products/sugar-toffee-ganache.png', img2: 'assets/products/sugar-toffee-ganache.png',
    desc: 'Chewy toffee stirred into chocolate ganache — dense, sticky-sweet, and moreish.',
    notes: { top: 'Toffee, Brown Sugar', heart: 'Chocolate Ganache, Cream', base: 'Vanilla, Tonka Bean, Amber' },
    family: 'Gourmand', year: '2024', origin: 'UAE', sku: 'AP-TG-100', gender: 'Unisex',
    tag: 'TOFFEE<br>DENSE<br>SWEET'
  },
  {
    id: 'sugar-vanilla-cream-macaron', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Vanilla Cream Macaron', nameAr: 'فانيلا كريم ماكارون', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 950, rating: '★★★★☆', reviews: 15, cat: 'unisex',
    img: 'assets/products/sugar-vanilla-cream-macaron.png', img2: 'assets/products/sugar-vanilla-cream-macaron.png',
    desc: 'Classic vanilla cream between delicate almond shells — simple, soft, and elegant.',
    notes: { top: 'Almond, Bergamot', heart: 'Vanilla Cream, Macaron Shell', base: 'Tonka Bean, Musk, Sandalwood' },
    family: 'Gourmand', year: '2024', origin: 'UAE', sku: 'AP-VCM-100', gender: 'Unisex',
    tag: 'VANILLA<br>SOFT<br>ELEGANT'
  },
  {
    id: 'ajwad-pink', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Ajwad Pink', nameAr: 'أجواد بينك', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1400, rating: '★★★★★', reviews: 50, cat: 'unisex',
    img: 'assets/products/ajwad-pink.png', img2: 'assets/products/ajwad-pink.png',
    desc: 'The pink Ajwad — bright berries and rose over the line\'s smooth musky base.',
    notes: { top: 'Raspberry, Pink Pepper', heart: 'Rose, Jasmine, Peony', base: 'Musk, Vanilla, Amberwood' },
    family: 'Fruity Floral', year: '2024', origin: 'UAE', sku: 'LT-AP-100', gender: 'Unisex',
    tag: 'BRIGHT<br>ROSY<br>SMOOTH'
  },
  {
    id: 'uhud', brand: 'UHUD', brandAr: 'أُحد', name: 'Uhud', nameAr: 'أُحد', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1600, rating: '★★★★☆', reviews: 75, cat: 'unisex',
    img: 'assets/products/uhud.png', img2: 'assets/products/uhud.png',
    desc: 'Named for the mountain — solid, grounded oud with a warm amber summit.',
    notes: { top: 'Saffron, Cardamom', heart: 'Oud, Rose, Amber', base: 'Sandalwood, Musk, Vanilla' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'U-U-100', gender: 'Unisex',
    tag: 'GROUNDED<br>OUD<br>WARM'
  },
  {
    id: 'ana-al-abyad-scarlet', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Ana Al Abyad Scarlet', nameAr: 'أنا الأبيض سكارليت', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 900, rating: '★★★★☆', reviews: 64, cat: 'unisex',
    img: 'assets/products/ana-al-abyad-scarlet.png', img2: 'assets/products/ana-al-abyad-scarlet.png',
    desc: 'The scarlet edition — red fruit and rose sharpened over the line\'s clean woods.',
    notes: { top: 'Red Berries, Pink Pepper', heart: 'Rose, Saffron', base: 'Amberwood, Musk, Vanilla' },
    family: 'Fruity Woody', year: '2024', origin: 'UAE', sku: 'LT-AAAS-100', gender: 'Unisex',
    tag: 'SCARLET<br>FRUITY<br>CLEAN'
  },
  {
    id: 'enigma-al-taif', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Enigma Al Taif', nameAr: 'إنجما الطائف', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 3700, rating: '★★★★☆', reviews: 26, cat: 'unisex',
    img: 'assets/products/enigma-al-taif.png', img2: 'assets/products/enigma-al-taif.png',
    desc: 'Built around the famed Taif rose — mysterious, opulent, and utterly distinctive.',
    notes: { top: 'Saffron, Pink Pepper', heart: 'Taif Rose, Jasmine', base: 'Oud, Amber, Musk' },
    family: 'Floral Oriental', year: '2024', origin: 'UAE', sku: 'SA-EAT-100', gender: 'Unisex',
    tag: 'ROSE<br>MYSTERIOUS<br>OPULENT'
  },
  {
    id: 'incense-01', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Incense 01', nameAr: 'إنسينس 01', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 2950, rating: '★★★★☆', reviews: 13, cat: 'unisex',
    img: 'assets/products/incense-01.png', img2: 'assets/products/incense-01.png',
    desc: 'Pure incense smoke over dry woods — meditative, resinous, and unmistakably serious.',
    notes: { top: 'Frankincense, Bergamot', heart: 'Myrrh, Cedarwood', base: 'Amber, Sandalwood, Musk' },
    family: 'Incense Woody', year: '2024', origin: 'UAE', sku: 'SA-I0-100', gender: 'Unisex',
    tag: 'INCENSE<br>SMOKY<br>SERIOUS'
  },
  {
    id: 'explosion', brand: 'AZHA', brandAr: 'أزها', name: 'Explosion', nameAr: 'اكسبلوجن', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 975, rating: '★★★★★', reviews: 43, cat: 'unisex',
    img: 'assets/products/explosion.png', img2: 'assets/products/explosion.png',
    desc: 'A burst of fresh aromatics over warm woods — energetic and immediately likeable.',
    notes: { top: 'Bergamot, Pink Pepper', heart: 'Lavender, Geranium', base: 'Amberwood, Musk, Vanilla' },
    family: 'Woody Aromatic', year: '2024', origin: 'UAE', sku: 'AZ-E-100', gender: 'Unisex',
    tag: 'ENERGETIC<br>FRESH<br>WOODY'
  },
  {
    id: 'al-dar-al-maknoun-gold', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Al Dar Al Maknoun Gold', nameAr: 'الدار المكنون جولد', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 750, rating: '★★★★☆', reviews: 51, cat: 'unisex',
    img: 'assets/products/al-dar-al-maknoun-gold.png', img2: 'assets/products/al-dar-al-maknoun-gold.png',
    desc: 'The gold edition of the hidden house — warmer, sweeter, and richly ambered.',
    notes: { top: 'Saffron, Bergamot', heart: 'Rose, Amber, Oud', base: 'Vanilla, Musk, Sandalwood' },
    family: 'Amber Woody', year: '2024', origin: 'UAE', sku: 'LT-ADAMG-100', gender: 'Unisex',
    tag: 'GOLD<br>WARM<br>AMBER'
  },
  {
    id: 'al-faris-unisex', brand: 'AL FARIS', brandAr: 'الفارس', name: 'Al Faris', nameAr: 'الفارس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 750, rating: '★★★★☆', reviews: 68, cat: 'unisex',
    img: 'assets/products/al-faris-unisex.png', img2: 'assets/products/al-faris-unisex.png',
    desc: 'The knight\'s fragrance — spiced woods with a confident, upright character.',
    notes: { top: 'Bergamot, Cardamom', heart: 'Rose, Oud, Spices', base: 'Amber, Musk, Sandalwood' },
    family: 'Woody Spicy', year: '2024', origin: 'UAE', sku: 'AF-AF-100', gender: 'Unisex',
    tag: 'SPICED<br>CONFIDENT<br>WOODY'
  },
  {
    id: 'elixir-oud', brand: 'AZHA', brandAr: 'أزها', name: 'Elixir Oud', nameAr: 'الكسير عود', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1300, rating: '★★★★★', reviews: 15, cat: 'unisex',
    img: 'assets/products/elixir-oud.png', img2: 'assets/products/elixir-oud.png',
    desc: 'Oud concentrated to elixir strength — dense, resinous, and long-wearing.',
    notes: { top: 'Saffron, Bergamot', heart: 'Oud, Rose', base: 'Amber, Sandalwood, Musk' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'AZ-EO-100', gender: 'Unisex',
    tag: 'DENSE<br>OUD<br>LASTING'
  },
  {
    id: 'ana-al-abyad-red', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Ana Al Abyad Red', nameAr: 'انا الابيض احمر', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 900, rating: '★★★★☆', reviews: 16, cat: 'unisex',
    img: 'assets/products/ana-al-abyad-red.png', img2: 'assets/products/ana-al-abyad-red.png',
    desc: 'The red edition — juicier and warmer than the original, with the same clean finish.',
    notes: { top: 'Red Fruits, Pink Pepper', heart: 'Rose, Saffron', base: 'Amberwood, Musk, Vanilla' },
    family: 'Fruity Woody', year: '2024', origin: 'UAE', sku: 'LT-AAAR-100', gender: 'Unisex',
    tag: 'RED<br>JUICY<br>WARM'
  },
  {
    id: 'ana-al-abyad-black', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Ana Al Abyad Black', nameAr: 'انا الابيض اسود', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 900, rating: '★★★★☆', reviews: 33, cat: 'unisex',
    img: 'assets/products/ana-al-abyad-black.png', img2: 'assets/products/ana-al-abyad-black.png',
    desc: 'The darkest of the line — smoky leather and oud over deep, resinous amber.',
    notes: { top: 'Bergamot, Black Pepper', heart: 'Oud, Leather, Rose', base: 'Amber, Musk, Patchouli' },
    family: 'Woody Amber', year: '2024', origin: 'UAE', sku: 'LT-AAAB-100', gender: 'Unisex',
    tag: 'BLACK<br>SMOKY<br>DEEP'
  },
  {
    id: 'anghaam', brand: 'ANGHAAM', brandAr: 'انغام', name: 'Anghaam', nameAr: 'انغام', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1400, rating: '★★★★★', reviews: 70, cat: 'unisex',
    img: 'assets/products/anghaam.png', img2: 'assets/products/anghaam.png',
    desc: 'Melodies made scent — soft florals and vanilla moving in easy harmony.',
    notes: { top: 'Pear, Bergamot', heart: 'Rose, Vanilla Orchid', base: 'Musk, Amberwood, Tonka Bean' },
    family: 'Floral Gourmand', year: '2024', origin: 'UAE', sku: 'AN-A-100', gender: 'Unisex',
    tag: 'HARMONIOUS<br>SOFT<br>VANILLA'
  },
  {
    id: 'opulent-dubai', brand: 'AZHA', brandAr: 'أزها', name: 'Opulent Dubai', nameAr: 'اوبلنت دبي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 850, rating: '★★★★☆', reviews: 65, cat: 'unisex',
    img: 'assets/products/opulent-dubai.png', img2: 'assets/products/opulent-dubai.png',
    desc: 'An accessible take on Dubai luxury — golden amber with a warm oud heart.',
    notes: { top: 'Saffron, Bergamot', heart: 'Rose, Amber, Oud', base: 'Musk, Sandalwood, Vanilla' },
    family: 'Amber Oriental', year: '2024', origin: 'UAE', sku: 'AZ-OD-100', gender: 'Unisex',
    tag: 'GOLDEN<br>LUXE<br>WARM'
  },
  {
    id: 'opulent-oud', brand: 'AZHA', brandAr: 'أزها', name: 'Opulent Oud', nameAr: 'اوبلنت عود', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 800, rating: '★★★★☆', reviews: 80, cat: 'unisex',
    img: 'assets/products/opulent-oud.png', img2: 'assets/products/opulent-oud.png',
    desc: 'Straightforward, satisfying oud — resinous and warm without excess.',
    notes: { top: 'Bergamot, Cardamom', heart: 'Oud, Rose', base: 'Amber, Musk, Sandalwood' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'AZ-OO-100', gender: 'Unisex',
    tag: 'OUD<br>RESINOUS<br>WARM'
  },
  {
    id: 'awraq-al-oud', brand: 'AZHA', brandAr: 'أزها', name: 'Awraq Al Oud', nameAr: 'اوراق العود', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 700, rating: '★★★★★', reviews: 93, cat: 'unisex',
    img: 'assets/products/awraq-al-oud.png', img2: 'assets/products/awraq-al-oud.png',
    desc: 'Leaves of oud — a drier, greener reading of the wood, light and wearable.',
    notes: { top: 'Green Notes, Bergamot', heart: 'Oud, Patchouli', base: 'Sandalwood, Amber, Musk' },
    family: 'Woody', year: '2024', origin: 'UAE', sku: 'AZ-AAO-100', gender: 'Unisex',
    tag: 'DRY<br>GREEN<br>WEARABLE'
  },
  {
    id: 'ombre-oriental', brand: 'AZHA', brandAr: 'أزها', name: 'Ombre Oriental', nameAr: 'اومبير اورينتال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1200, rating: '★★★★☆', reviews: 38, cat: 'unisex',
    img: 'assets/products/ombre-oriental.png', img2: 'assets/products/ombre-oriental.png',
    desc: 'Shadowed amber — resinous, smooth, and gently gradient from bright to deep.',
    notes: { top: 'Bergamot, Pink Pepper', heart: 'Amber, Rose, Labdanum', base: 'Vanilla, Benzoin, Musk' },
    family: 'Amber Oriental', year: '2024', origin: 'UAE', sku: 'AZ-OO-100', gender: 'Unisex',
    tag: 'AMBER<br>SMOOTH<br>DEEP'
  },
  {
    id: 'bukhoor-al-arais', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Bukhoor Al Arais', nameAr: 'بخور العرايس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 825, rating: '★★★★☆', reviews: 40, cat: 'unisex',
    img: 'assets/products/bukhoor-al-arais.png', img2: 'assets/products/bukhoor-al-arais.png',
    desc: 'A bridal bukhoor rendered as fragrance — smoky, ceremonial, and richly traditional.',
    notes: { top: 'Saffron, Rose', heart: 'Bukhoor Accord, Oud', base: 'Amber, Musk, Sandalwood' },
    family: 'Incense Oriental', year: '2024', origin: 'UAE', sku: 'SA-BAA-100', gender: 'Unisex',
    tag: 'BUKHOOR<br>SMOKY<br>CEREMONIAL'
  },
  {
    id: 'badia-al-oud-red', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Badia Al Oud Red', nameAr: 'بديع العود احمر', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1350, rating: '★★★★★', reviews: 78, cat: 'unisex',
    img: 'assets/products/badia-al-oud-red.png', img2: 'assets/products/badia-al-oud-red.png',
    desc: 'Red fruit laid over exquisite oud — bold, glossy, and warmly spiced.',
    notes: { top: 'Red Berries, Saffron', heart: 'Oud, Rose', base: 'Amber, Musk, Patchouli' },
    family: 'Woody Fruity', year: '2024', origin: 'UAE', sku: 'LT-BAOR-100', gender: 'Unisex',
    tag: 'BOLD<br>RED<br>SPICED'
  },
  {
    id: 'badia-al-oud-black', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Badia Al Oud Black', nameAr: 'بديع العود اسود', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1350, rating: '★★★★☆', reviews: 95, cat: 'unisex',
    img: 'assets/products/badia-al-oud-black.png', img2: 'assets/products/badia-al-oud-black.png',
    desc: 'The darkest Badia Al Oud — smoked leather and oud with real presence.',
    notes: { top: 'Black Pepper, Bergamot', heart: 'Oud, Leather, Rose', base: 'Amber, Patchouli, Musk' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'LT-BAOB-100', gender: 'Unisex',
    tag: 'DARK<br>LEATHER<br>OUD'
  },
  {
    id: 'badia-al-oud-white-sublime', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Badia Al Oud White Sublime', nameAr: 'بديع العود الأبيض سابليم', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1350, rating: '★★★★☆', reviews: 20, cat: 'unisex',
    img: 'assets/products/badia-al-oud-white-sublime.png', img2: 'assets/products/badia-al-oud-white-sublime.png',
    desc: 'Oud in its cleanest form — pale, airy woods wrapped in soft white musk.',
    notes: { top: 'Bergamot, Pear', heart: 'White Oud, Jasmine', base: 'White Musk, Sandalwood, Vanilla' },
    family: 'Woody Musk', year: '2024', origin: 'UAE', sku: 'LT-BAOWS-100', gender: 'Unisex',
    tag: 'WHITE<br>CLEAN<br>AIRY'
  },
  {
    id: 'badia-al-oud-violet', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Badia Al Oud Violet', nameAr: 'بديع العود بنفسج', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1350, rating: '★★★★★', reviews: 37, cat: 'unisex',
    img: 'assets/products/badia-al-oud-violet.png', img2: 'assets/products/badia-al-oud-violet.png',
    desc: 'Powdery violet against deep oud — an unusual, quietly captivating contrast.',
    notes: { top: 'Violet Leaf, Pink Pepper', heart: 'Violet, Oud, Rose', base: 'Amber, Musk, Patchouli' },
    family: 'Woody Floral', year: '2024', origin: 'UAE', sku: 'LT-BAOV-100', gender: 'Unisex',
    tag: 'VIOLET<br>POWDERY<br>UNUSUAL'
  },
  {
    id: 'black-ruby', brand: 'AZHA', brandAr: 'أزها', name: 'Black Ruby', nameAr: 'بلاك روبي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1300, rating: '★★★★☆', reviews: 52, cat: 'unisex',
    img: 'assets/products/black-ruby.png', img2: 'assets/products/black-ruby.png',
    desc: 'Dark jewelled fruit over warm resin — glossy, rich, and evening-ready.',
    notes: { top: 'Blackcurrant, Pink Pepper', heart: 'Rose, Saffron', base: 'Amber, Patchouli, Vanilla' },
    family: 'Fruity Oriental', year: '2024', origin: 'UAE', sku: 'AZ-BR-100', gender: 'Unisex',
    tag: 'JEWELLED<br>RICH<br>EVENING'
  },
  {
    id: 'blueberry-musk', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Blueberry Musk', nameAr: 'بلو بيري مسك', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 975, rating: '★★★★☆', reviews: 56, cat: 'unisex',
    img: 'assets/products/blueberry-musk.png', img2: 'assets/products/blueberry-musk.png',
    desc: 'Cool blueberry folded into clean musk — fresh, soft, and effortless to wear.',
    notes: { top: 'Blueberry, Bergamot', heart: 'Violet, White Musk', base: 'Vanilla, Cedarwood, Amber' },
    family: 'Fruity Musk', year: '2024', origin: 'UAE', sku: 'AP-BM-100', gender: 'Unisex',
    tag: 'FRESH<br>FRUITY<br>CLEAN'
  },
  {
    id: 'bahjah', brand: 'BAHJAH', brandAr: 'بهجة', name: 'Bahjah', nameAr: 'بهجة', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1350, rating: '★★★★★', reviews: 88, cat: 'unisex',
    img: 'assets/products/bahjah.png', img2: 'assets/products/bahjah.png',
    desc: 'Delight, bottled — bright florals over an amber base that stays warm all day.',
    notes: { top: 'Bergamot, Saffron', heart: 'Rose, Jasmine, Amber', base: 'Vanilla, Musk, Sandalwood' },
    family: 'Amber Floral', year: '2024', origin: 'UAE', sku: 'B-B-100', gender: 'Unisex',
    tag: 'DELIGHT<br>BRIGHT<br>WARM'
  },
  {
    id: 'tobacco-01', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Tobacco 01', nameAr: 'توباكو 01', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 2950, rating: '★★★★☆', reviews: 77, cat: 'unisex',
    img: 'assets/products/tobacco-01.png', img2: 'assets/products/tobacco-01.png',
    desc: 'Cured tobacco leaf sweetened with honey and vanilla — rich, dry, and enveloping.',
    notes: { top: 'Bergamot, Spices', heart: 'Tobacco Leaf, Honey', base: 'Vanilla, Tonka Bean, Amber' },
    family: 'Tobacco Woody', year: '2024', origin: 'UAE', sku: 'SA-T0-100', gender: 'Unisex',
    tag: 'TOBACCO<br>RICH<br>DRY'
  },
  {
    id: 'tiramisu', brand: 'TIRAMISU', brandAr: 'تيراميسو', name: 'Tiramisu', nameAr: 'تيراميسو', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1750, rating: '★★★★☆', reviews: 46, cat: 'unisex',
    img: 'assets/products/tiramisu.png', img2: 'assets/products/tiramisu.png',
    desc: 'Coffee-soaked sponge and mascarpone cream — the dessert, faithfully rendered.',
    notes: { top: 'Espresso, Cocoa', heart: 'Mascarpone, Ladyfinger, Vanilla', base: 'Tonka Bean, Musk, Amber' },
    family: 'Gourmand', year: '2024', origin: 'UAE', sku: 'T-T-100', gender: 'Unisex',
    tag: 'COFFEE<br>CREAMY<br>DESSERT'
  },
  {
    id: 'khales-oudi', brand: 'AZHA', brandAr: 'أزها', name: 'Khales Oudi', nameAr: 'خالص عودي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 750, rating: '★★★★★', reviews: 23, cat: 'unisex',
    img: 'assets/products/khales-oudi.png', img2: 'assets/products/khales-oudi.png',
    desc: 'Pure oud, plainly stated — honest wood with nothing to hide behind.',
    notes: { top: 'Bergamot, Saffron', heart: 'Oud, Rose', base: 'Sandalwood, Amber, Musk' },
    family: 'Woody', year: '2024', origin: 'UAE', sku: 'AZ-KO-100', gender: 'Unisex',
    tag: 'PURE<br>OUD<br>HONEST'
  },
  {
    id: 'khales-musk', brand: 'AZHA', brandAr: 'أزها', name: 'Khales Musk', nameAr: 'خالص مسك', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 750, rating: '★★★★☆', reviews: 40, cat: 'unisex',
    img: 'assets/products/khales-musk.png', img2: 'assets/products/khales-musk.png',
    desc: 'Pure musk — clean, skin-close, and soft enough for every single day.',
    notes: { top: 'White Musk, Bergamot', heart: 'Rose, Jasmine', base: 'Sandalwood, Amber, Vanilla' },
    family: 'Musk', year: '2024', origin: 'UAE', sku: 'AZ-KM-100', gender: 'Unisex',
    tag: 'PURE<br>MUSK<br>CLEAN'
  },
  {
    id: 'khamra', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Khamrah', nameAr: 'خمرة', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1650, rating: '★★★★☆', reviews: 93, cat: 'unisex',
    img: 'assets/products/khamra.png', img2: 'assets/products/khamra.png',
    desc: 'The one that started the line — spiced dates and vanilla in a warm, festive haze.',
    notes: { top: 'Cinnamon, Nutmeg, Bergamot', heart: 'Dates, Praline, Mahonial', base: 'Vanilla, Tonka Bean, Benzoin' },
    family: 'Woody Spicy', year: '2024', origin: 'UAE', sku: 'LT-K-100', gender: 'Unisex',
    tag: 'SPICED<br>DATES<br>FESTIVE'
  },
  {
    id: 'khamra-coffee', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Khamrah Qahwa', nameAr: 'خمرة قهوة', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1650, rating: '★★★★★', reviews: 18, cat: 'unisex',
    img: 'assets/products/khamra-coffee.png', img2: 'assets/products/khamra-coffee.png',
    desc: 'Khamrah poured over Arabic coffee — spiced, roasted, and deeply hospitable.',
    notes: { top: 'Cardamom, Coffee, Cinnamon', heart: 'Dates, Praline', base: 'Vanilla, Tonka Bean, Amber' },
    family: 'Gourmand Spicy', year: '2024', origin: 'UAE', sku: 'LT-KQ-100', gender: 'Unisex',
    tag: 'COFFEE<br>SPICED<br>WARM'
  },
  {
    id: 'khanjar', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Khanjar', nameAr: 'خنجر', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 850, rating: '★★★★☆', reviews: 95, cat: 'unisex',
    img: 'assets/products/khanjar.png', img2: 'assets/products/khanjar.png',
    desc: 'Sharp as its namesake — peppered woods with a clean, cutting edge.',
    notes: { top: 'Black Pepper, Bergamot', heart: 'Oud, Leather, Spices', base: 'Amber, Musk, Patchouli' },
    family: 'Woody Spicy', year: '2024', origin: 'UAE', sku: 'AP-K-100', gender: 'Unisex',
    tag: 'SHARP<br>PEPPERED<br>WOODY'
  },
  {
    id: 'dukhan-desert', brand: 'DUKHAN', brandAr: 'دخون', name: 'Dukhan Desert', nameAr: 'دخون ديزرت', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 2000, rating: '★★★★☆', reviews: 66, cat: 'unisex',
    img: 'assets/products/dukhan-desert.png', img2: 'assets/products/dukhan-desert.png',
    desc: 'Smoke rising over open desert — dry, resinous incense with real depth.',
    notes: { top: 'Saffron, Dry Spices', heart: 'Incense, Oud, Cedarwood', base: 'Amber, Musk, Sandalwood' },
    family: 'Incense Woody', year: '2024', origin: 'UAE', sku: 'DK-DD-100', gender: 'Unisex',
    tag: 'SMOKE<br>DRY<br>DEEP'
  },
  {
    id: 'dukhan-rose', brand: 'DUKHAN', brandAr: 'دخون', name: 'Dukhan Rose', nameAr: 'دخون روز', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1800, rating: '★★★★★', reviews: 75, cat: 'unisex',
    img: 'assets/products/dukhan-rose.png', img2: 'assets/products/dukhan-rose.png',
    desc: 'Rose seen through incense smoke — romantic and smoky in equal measure.',
    notes: { top: 'Saffron, Pink Pepper', heart: 'Rose, Incense, Oud', base: 'Amber, Musk, Patchouli' },
    family: 'Floral Incense', year: '2024', origin: 'UAE', sku: 'DK-DR-100', gender: 'Unisex',
    tag: 'ROSE<br>SMOKY<br>ROMANTIC'
  },
  {
    id: 'dukhan-amber', brand: 'DUKHAN', brandAr: 'دخون', name: 'Dukhan Amber', nameAr: 'دخون عنبر', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 2000, rating: '★★★★☆', reviews: 8, cat: 'unisex',
    img: 'assets/products/dukhan-amber.png', img2: 'assets/products/dukhan-amber.png',
    desc: 'Amber burned like bukhoor — golden, resinous, and slow to fade.',
    notes: { top: 'Bergamot, Saffron', heart: 'Amber, Labdanum, Incense', base: 'Vanilla, Benzoin, Musk' },
    family: 'Amber Incense', year: '2024', origin: 'UAE', sku: 'DK-DA-100', gender: 'Unisex',
    tag: 'AMBER<br>RESINOUS<br>SLOW'
  },
  {
    id: 'dukhan-couture', brand: 'DUKHAN', brandAr: 'دخون', name: 'Dukhan Couture', nameAr: 'دخون كوتور', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1800, rating: '★★★★☆', reviews: 17, cat: 'unisex',
    img: 'assets/products/dukhan-couture.png', img2: 'assets/products/dukhan-couture.png',
    desc: 'Tailored smoke — the Dukhan signature refined into something sleek and dressed-up.',
    notes: { top: 'Pink Pepper, Bergamot', heart: 'Incense, Oud, Rose', base: 'Amber, Sandalwood, Musk' },
    family: 'Woody Incense', year: '2024', origin: 'UAE', sku: 'DK-DC-100', gender: 'Unisex',
    tag: 'TAILORED<br>SLEEK<br>SMOKY'
  },
  {
    id: 'dirham', brand: 'AZHA', brandAr: 'أزها', name: 'Dirham', nameAr: 'درهم', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 700, rating: '★★★★★', reviews: 82, cat: 'unisex',
    img: 'assets/products/dirham.png', img2: 'assets/products/dirham.png',
    desc: 'Everyday value done right — fresh aromatics over dependable warm woods.',
    notes: { top: 'Bergamot, Lemon', heart: 'Lavender, Geranium, Oud', base: 'Amber, Musk, Cedarwood' },
    family: 'Woody Aromatic', year: '2024', origin: 'UAE', sku: 'AZ-D-100', gender: 'Unisex',
    tag: 'FRESH<br>EVERYDAY<br>WOODY'
  },
  {
    id: 'dynasty', brand: 'DYNASTY', brandAr: 'دينستي', name: 'Dynasty', nameAr: 'دينستي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1450, rating: '★★★★☆', reviews: 37, cat: 'unisex',
    img: 'assets/products/dynasty.png', img2: 'assets/products/dynasty.png',
    desc: 'Built to endure — stately amber and oud with a long, composed trail.',
    notes: { top: 'Saffron, Bergamot', heart: 'Oud, Rose, Amber', base: 'Sandalwood, Musk, Vanilla' },
    family: 'Amber Woody', year: '2024', origin: 'UAE', sku: 'D-D-100', gender: 'Unisex',
    tag: 'STATELY<br>ENDURING<br>AMBER'
  },
  {
    id: 'raed-lux', brand: 'RAED', brandAr: 'رائد', name: 'Raed Lux', nameAr: 'رائد لوكس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1200, rating: '★★★★☆', reviews: 44, cat: 'unisex',
    img: 'assets/products/raed-lux.png', img2: 'assets/products/raed-lux.png',
    desc: 'The luxe edition of Raed — smoother aromatics over a polished woody-amber base.',
    notes: { top: 'Bergamot, Pink Pepper', heart: 'Lavender, Geranium, Iris', base: 'Amberwood, Musk, Vanilla' },
    family: 'Woody Aromatic', year: '2024', origin: 'UAE', sku: 'RD-RL-100', gender: 'Unisex',
    tag: 'LUXE<br>SMOOTH<br>POLISHED'
  },
  {
    id: 'ramz-lattafa-gold', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Ramz Lattafa Gold', nameAr: 'رمز لطافة جولد', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 900, rating: '★★★★★', reviews: 49, cat: 'unisex',
    img: 'assets/products/ramz-lattafa-gold.png', img2: 'assets/products/ramz-lattafa-gold.png',
    desc: 'Lattafa\'s golden emblem — warm amber and oud at an approachable price.',
    notes: { top: 'Bergamot, Saffron', heart: 'Rose, Amber, Oud', base: 'Vanilla, Musk, Sandalwood' },
    family: 'Amber Woody', year: '2024', origin: 'UAE', sku: 'LT-RLG-100', gender: 'Unisex',
    tag: 'GOLD<br>AMBER<br>WARM'
  },
  {
    id: 'ramz-lattafa-silver', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Ramz Lattafa Silver', nameAr: 'رمز لطافه سيلفر', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 900, rating: '★★★★☆', reviews: 66, cat: 'unisex',
    img: 'assets/products/ramz-lattafa-silver.png', img2: 'assets/products/ramz-lattafa-silver.png',
    desc: 'The silver counterpart — cooler, fresher, and cleanly aromatic.',
    notes: { top: 'Bergamot, Mint', heart: 'Lavender, Geranium', base: 'Amberwood, Musk, Cedarwood' },
    family: 'Woody Aromatic', year: '2024', origin: 'UAE', sku: 'LT-RLS-100', gender: 'Unisex',
    tag: 'SILVER<br>COOL<br>FRESH'
  },
  {
    id: 'rose-01', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Rose 01', nameAr: 'روز 01', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 2950, rating: '★★★★☆', reviews: 73, cat: 'unisex',
    img: 'assets/products/rose-01.png', img2: 'assets/products/rose-01.png',
    desc: 'Rose in its purest concentration — velvety, true, and beautifully unadorned.',
    notes: { top: 'Pink Pepper, Bergamot', heart: 'Damask Rose, Geranium', base: 'Amber, Musk, Sandalwood' },
    family: 'Floral', year: '2024', origin: 'UAE', sku: 'SA-R0-100', gender: 'Unisex',
    tag: 'ROSE<br>PURE<br>VELVETY'
  },
  {
    id: 'zaher', brand: 'ZAHER', brandAr: 'زاهر', name: 'Zaher', nameAr: 'زاهر', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1250, rating: '★★★★★', reviews: 22, cat: 'unisex',
    img: 'assets/products/zaher.png', img2: 'assets/products/zaher.png',
    desc: 'Blossoming and bright — florals in full flower over clean supporting woods.',
    notes: { top: 'Bergamot, Green Notes', heart: 'Rose, Jasmine, Orange Blossom', base: 'Musk, Cedarwood, Amber' },
    family: 'Floral Woody', year: '2024', origin: 'UAE', sku: 'Z-Z-100', gender: 'Unisex',
    tag: 'BLOOM<br>BRIGHT<br>CLEAN'
  },
  {
    id: 'sihr-lattafa', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Sihr Lattafa', nameAr: 'سحر لطافة', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1750, rating: '★★★★☆', reviews: 59, cat: 'unisex',
    img: 'assets/products/sihr-lattafa.png', img2: 'assets/products/sihr-lattafa.png',
    desc: 'Lattafa\'s magic in a bottle — enchanting amber with a rose-and-oud heart.',
    notes: { top: 'Saffron, Cardamom', heart: 'Rose, Oud, Amber', base: 'Vanilla, Musk, Benzoin' },
    family: 'Amber Oriental', year: '2024', origin: 'UAE', sku: 'LT-SL-100', gender: 'Unisex',
    tag: 'MAGIC<br>AMBER<br>ENCHANTING'
  },
  {
    id: 'seyada-regal', brand: 'SEYADA', brandAr: 'سيادة', name: 'Seyada Regal', nameAr: 'سيادة ريغال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1900, rating: '★★★★☆', reviews: 82, cat: 'unisex',
    img: 'assets/products/seyada-regal.png', img2: 'assets/products/seyada-regal.png',
    desc: 'Sovereignty in scent — noble oud and leather with an unhurried, regal trail.',
    notes: { top: 'Saffron, Bergamot', heart: 'Oud, Rose, Leather', base: 'Amber, Sandalwood, Musk' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'SY-SR-100', gender: 'Unisex',
    tag: 'NOBLE<br>REGAL<br>OUD'
  },
  {
    id: 'seyada-nova', brand: 'SEYADA', brandAr: 'سيادة', name: 'Seyada Nova', nameAr: 'سيادة نوفا', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1900, rating: '★★★★★', reviews: 99, cat: 'unisex',
    img: 'assets/products/seyada-nova.png', img2: 'assets/products/seyada-nova.png',
    desc: 'The modern face of Seyada — brighter amber with a contemporary woody finish.',
    notes: { top: 'Pink Pepper, Bergamot', heart: 'Amber, Rose, Oud', base: 'Vanilla, Musk, Cedarwood' },
    family: 'Amber Woody', year: '2024', origin: 'UAE', sku: 'SY-SN-100', gender: 'Unisex',
    tag: 'MODERN<br>AMBER<br>BRIGHT'
  },
  {
    id: 'sigar-oud', brand: 'AZHA', brandAr: 'أزها', name: 'Sigar Oud', nameAr: 'سيجار عود', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 975, rating: '★★★★☆', reviews: 79, cat: 'unisex',
    img: 'assets/products/sigar-oud.png', img2: 'assets/products/sigar-oud.png',
    desc: 'Cigar smoke and aged oud — warm, leathery, and unmistakably grown-up.',
    notes: { top: 'Black Pepper, Bergamot', heart: 'Tobacco, Oud, Leather', base: 'Amber, Vanilla, Patchouli' },
    family: 'Tobacco Woody', year: '2024', origin: 'UAE', sku: 'AZ-SO-100', gender: 'Unisex',
    tag: 'CIGAR<br>LEATHER<br>WARM'
  },
  {
    id: 'signature-rose', brand: 'SIGNATURE', brandAr: 'سيجنتشر', name: 'Signature Rose', nameAr: 'سيجنتشر روز', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1900, rating: '★★★★☆', reviews: 41, cat: 'unisex',
    img: 'assets/products/signature-rose.png', img2: 'assets/products/signature-rose.png',
    desc: 'A signature rose — full, confident, and grounded in warm woods.',
    notes: { top: 'Pink Pepper, Bergamot', heart: 'Rose, Geranium, Saffron', base: 'Amber, Musk, Patchouli' },
    family: 'Floral Woody', year: '2024', origin: 'UAE', sku: 'SG-SR-100', gender: 'Unisex',
    tag: 'ROSE<br>FULL<br>CONFIDENT'
  },
  {
    id: 'signature-rose-gold', brand: 'SIGNATURE', brandAr: 'سيجنتشر', name: 'Signature Rose Gold', nameAr: 'سيجنتشر روز جولد', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1900, rating: '★★★★★', reviews: 58, cat: 'unisex',
    img: 'assets/products/signature-rose-gold.png', img2: 'assets/products/signature-rose-gold.png',
    desc: 'Rose gilded in amber — warmer and rounder than the original signature.',
    notes: { top: 'Saffron, Bergamot', heart: 'Rose, Jasmine, Amber', base: 'Vanilla, Musk, Sandalwood' },
    family: 'Floral Amber', year: '2024', origin: 'UAE', sku: 'SG-SRG-100', gender: 'Unisex',
    tag: 'GILDED<br>WARM<br>ROSE'
  },
  {
    id: 'celestial-oud', brand: 'AZHA', brandAr: 'أزها', name: 'Celestial Oud', nameAr: 'سيلستال عود', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1550, rating: '★★★★☆', reviews: 61, cat: 'unisex',
    img: 'assets/products/celestial-oud.png', img2: 'assets/products/celestial-oud.png',
    desc: 'Oud with its eyes on the sky — airy, incense-lifted, and quietly transcendent.',
    notes: { top: 'Saffron, Bergamot', heart: 'Oud, Rose, Incense', base: 'Amber, Sandalwood, Musk' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'AZ-CO-100', gender: 'Unisex',
    tag: 'AIRY<br>INCENSE<br>OUD'
  },
  {
    id: 'shaghaf-amber-infusion', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Shaghaf Amber Infusion', nameAr: 'شغف أمبر إنفيوجن', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 2600, rating: '★★★★☆', reviews: 28, cat: 'unisex',
    img: 'assets/products/shaghaf-amber-infusion.png', img2: 'assets/products/shaghaf-amber-infusion.png',
    desc: 'The Shaghaf passion infused with pure amber — golden, resinous, and generous.',
    notes: { top: 'Bergamot, Cardamom', heart: 'Amber, Rose, Labdanum', base: 'Vanilla, Benzoin, Musk' },
    family: 'Amber Oriental', year: '2024', origin: 'UAE', sku: 'SA-SAI-100', gender: 'Unisex',
    tag: 'AMBER<br>GOLDEN<br>GENEROUS'
  },
  {
    id: 'shaghaf-dahabi', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Shaghaf Dahabi', nameAr: 'شغف دهبى', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1800, rating: '★★★★★', reviews: 13, cat: 'unisex',
    img: 'assets/products/shaghaf-dahabi.png', img2: 'assets/products/shaghaf-dahabi.png',
    desc: 'The golden Shaghaf — warm, luminous, and dressed for occasions.',
    notes: { top: 'Saffron, Bergamot', heart: 'Oud, Rose, Amber', base: 'Vanilla, Sandalwood, Musk' },
    family: 'Amber Woody', year: '2024', origin: 'UAE', sku: 'SA-SD-100', gender: 'Unisex',
    tag: 'GOLDEN<br>LUMINOUS<br>WARM'
  },
  {
    id: 'shaghaf-oud-abyad', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Shaghaf Oud Abyad', nameAr: 'شغف عود ابيض', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1700, rating: '★★★★☆', reviews: 26, cat: 'unisex',
    img: 'assets/products/shaghaf-oud-abyad.png', img2: 'assets/products/shaghaf-oud-abyad.png',
    desc: 'The white Shaghaf — pale, clean oud softened with luminous musk.',
    notes: { top: 'Bergamot, Pear', heart: 'White Oud, Jasmine', base: 'White Musk, Sandalwood, Vanilla' },
    family: 'Woody Musk', year: '2024', origin: 'UAE', sku: 'SA-SOA-100', gender: 'Unisex',
    tag: 'WHITE<br>CLEAN<br>LUMINOUS'
  },
  {
    id: 'shaghaf-oud-aswad', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Shaghaf Oud Aswad', nameAr: 'شغف عود اسود', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1700, rating: '★★★★☆', reviews: 43, cat: 'unisex',
    img: 'assets/products/shaghaf-oud-aswad.png', img2: 'assets/products/shaghaf-oud-aswad.png',
    desc: 'The black Shaghaf — the darkest, smokiest reading of the line\'s oud.',
    notes: { top: 'Black Pepper, Bergamot', heart: 'Oud, Leather, Rose', base: 'Amber, Patchouli, Musk' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'SA-SOA-100', gender: 'Unisex',
    tag: 'BLACK<br>SMOKY<br>DARK'
  },
  {
    id: 'shaghaf-oud-royal', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Shaghaf Oud Royal', nameAr: 'شغف عود رويال', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 2600, rating: '★★★★★', reviews: 96, cat: 'unisex',
    img: 'assets/products/shaghaf-oud-royal.png', img2: 'assets/products/shaghaf-oud-royal.png',
    desc: 'The royal edition — the Shaghaf oud at its richest and most ceremonial.',
    notes: { top: 'Saffron, Cardamom', heart: 'Oud, Rose, Amber', base: 'Sandalwood, Musk, Vanilla' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'SA-SOR-100', gender: 'Unisex',
    tag: 'ROYAL<br>RICH<br>OUD'
  },
  {
    id: 'shaghaf-vanilla-toffee', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Shaghaf Vanilla Toffee', nameAr: 'شغف فانيلا توفي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 2600, rating: '★★★★☆', reviews: 21, cat: 'unisex',
    img: 'assets/products/shaghaf-vanilla-toffee.png', img2: 'assets/products/shaghaf-vanilla-toffee.png',
    desc: 'Shaghaf turned dessert — buttery toffee and vanilla over the line\'s signature oud.',
    notes: { top: 'Caramel, Bergamot', heart: 'Toffee, Vanilla, Oud', base: 'Tonka Bean, Amber, Musk' },
    family: 'Gourmand Woody', year: '2024', origin: 'UAE', sku: 'SA-SVT-100', gender: 'Unisex',
    tag: 'TOFFEE<br>VANILLA<br>SWEET'
  },
  {
    id: 'shumookh-al-ghutra', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Shumookh Al Ghutra', nameAr: 'شموخ الغترة', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 2350, rating: '★★★★☆', reviews: 28, cat: 'unisex',
    img: 'assets/products/shumookh-al-ghutra.png', img2: 'assets/products/shumookh-al-ghutra.png',
    desc: 'Pride worn openly — a stately oud composition with real dignity and reach.',
    notes: { top: 'Saffron, Bergamot', heart: 'Oud, Rose, Spices', base: 'Amber, Sandalwood, Musk' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'SA-SAG-100', gender: 'Unisex',
    tag: 'STATELY<br>PROUD<br>OUD'
  },
  {
    id: 'sugarcane-vanilla', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Sugarcane Vanilla', nameAr: 'شوجركان فانيلا', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1500, rating: '★★★★★', reviews: 11, cat: 'unisex',
    img: 'assets/products/sugarcane-vanilla.png', img2: 'assets/products/sugarcane-vanilla.png',
    desc: 'Raw sugarcane pressed into creamy vanilla — sweet without ever turning cloying.',
    notes: { top: 'Sugarcane, Bergamot', heart: 'Vanilla Orchid, Coconut', base: 'Tonka Bean, Musk, Sandalwood' },
    family: 'Gourmand', year: '2024', origin: 'UAE', sku: 'AP-SV-100', gender: 'Unisex',
    tag: 'SUGARCANE<br>CREAMY<br>SWEET'
  },
  {
    id: 'safa', brand: 'SAFA', brandAr: 'صفا', name: 'Safa', nameAr: 'صفا', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1600, rating: '★★★★☆', reviews: 32, cat: 'unisex',
    img: 'assets/products/safa.png', img2: 'assets/products/safa.png',
    desc: 'Purity as a fragrance — clean musk and soft woods with nothing out of place.',
    notes: { top: 'Bergamot, Green Notes', heart: 'White Musk, Rose, Jasmine', base: 'Sandalwood, Amber, Vanilla' },
    family: 'Musky Woody', year: '2024', origin: 'UAE', sku: 'S-S-100', gender: 'Unisex',
    tag: 'PURE<br>CLEAN<br>SOFT'
  },
  {
    id: 'sandal-rose', brand: 'AZHA', brandAr: 'أزها', name: 'Sandal Rose', nameAr: 'صندل روز', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1550, rating: '★★★★☆', reviews: 47, cat: 'unisex',
    img: 'assets/products/sandal-rose.png', img2: 'assets/products/sandal-rose.png',
    desc: 'Creamy sandalwood married to full rose — a timeless, balanced pairing.',
    notes: { top: 'Pink Pepper, Bergamot', heart: 'Rose, Sandalwood', base: 'Amber, Musk, Vanilla' },
    family: 'Woody Floral', year: '2024', origin: 'UAE', sku: 'AZ-SR-100', gender: 'Unisex',
    tag: 'SANDALWOOD<br>ROSE<br>BALANCED'
  },
  {
    id: 'oud-07', brand: 'SWISS ARABIAN', brandAr: 'سويس أرابيان', name: 'Oud 07', nameAr: 'عود 07', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 2950, rating: '★★★★★', reviews: 28, cat: 'unisex',
    img: 'assets/products/oud-07.png', img2: 'assets/products/oud-07.png',
    desc: 'Oud in its most concentrated form — dense, resinous, and built for the long haul.',
    notes: { top: 'Saffron, Bergamot', heart: 'Oud, Rose, Incense', base: 'Amber, Sandalwood, Musk' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'SA-O0-100', gender: 'Unisex',
    tag: 'OUD<br>DENSE<br>LASTING'
  },
  {
    id: 'oud-al-abyad', brand: 'AZHA', brandAr: 'أزها', name: 'Oud Al Abyad', nameAr: 'عود الابيض', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 935, rating: '★★★★☆', reviews: 56, cat: 'unisex',
    img: 'assets/products/oud-al-abyad.png', img2: 'assets/products/oud-al-abyad.png',
    desc: 'White oud done simply — light, clean wood with a soft musky finish.',
    notes: { top: 'Bergamot, Pear', heart: 'White Oud, Jasmine', base: 'White Musk, Sandalwood, Amber' },
    family: 'Woody Musk', year: '2024', origin: 'UAE', sku: 'AZ-OAA-100', gender: 'Unisex',
    tag: 'WHITE<br>LIGHT<br>CLEAN'
  },
  {
    id: 'oud-al-abyad-azhi', brand: 'AZHA', brandAr: 'أزها', name: 'Oud Al Abyad Azhi', nameAr: 'عود الابيض ازهي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 2050, rating: '★★★★☆', reviews: 26, cat: 'unisex',
    img: 'assets/products/oud-al-abyad-azhi.png', img2: 'assets/products/oud-al-abyad-azhi.png',
    desc: 'An elevated white oud — richer, rounder, and considerably more persistent.',
    notes: { top: 'Saffron, Bergamot', heart: 'White Oud, Rose, Jasmine', base: 'Amber, Sandalwood, Musk' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'AZ-OAAA-100', gender: 'Unisex',
    tag: 'ELEVATED<br>RICH<br>OUD'
  },
  {
    id: 'oud-al-mobakhar', brand: 'AZHA', brandAr: 'أزها', name: 'Oud Al Mobakhar', nameAr: 'عود المبخر', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 985, rating: '★★★★★', reviews: 92, cat: 'unisex',
    img: 'assets/products/oud-al-mobakhar.png', img2: 'assets/products/oud-al-mobakhar.png',
    desc: 'Oud as it smells on the burner — smoky, dense, and traditionally Arabian.',
    notes: { top: 'Saffron, Spices', heart: 'Oud, Bukhoor Accord', base: 'Amber, Sandalwood, Musk' },
    family: 'Incense Woody', year: '2024', origin: 'UAE', sku: 'AZ-OAM-100', gender: 'Unisex',
    tag: 'BUKHOOR<br>SMOKY<br>DENSE'
  },
  {
    id: 'oud-al-musk', brand: 'AZHA', brandAr: 'أزها', name: 'Oud Al Musk', nameAr: 'عود المسك', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 985, rating: '★★★★☆', reviews: 17, cat: 'unisex',
    img: 'assets/products/oud-al-musk.png', img2: 'assets/products/oud-al-musk.png',
    desc: 'Oud and musk in equal measure — warm wood softened into something wearable.',
    notes: { top: 'Bergamot, Cardamom', heart: 'Oud, White Musk, Rose', base: 'Sandalwood, Amber, Vanilla' },
    family: 'Woody Musk', year: '2024', origin: 'UAE', sku: 'AZ-OAM-100', gender: 'Unisex',
    tag: 'OUD<br>MUSK<br>WEARABLE'
  },
  {
    id: 'oud-kuwairi', brand: 'AZHA', brandAr: 'أزها', name: 'Oud Kuwairi', nameAr: 'عود كوير', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1550, rating: '★★★★☆', reviews: 57, cat: 'unisex',
    img: 'assets/products/oud-kuwairi.png', img2: 'assets/products/oud-kuwairi.png',
    desc: 'A darker, earthier oud — resinous and grounded with a lingering smoky trail.',
    notes: { top: 'Saffron, Bergamot', heart: 'Oud, Rose', base: 'Amber, Sandalwood, Patchouli' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'AZ-OK-100', gender: 'Unisex',
    tag: 'EARTHY<br>RESINOUS<br>SMOKY'
  },
  {
    id: 'oud-mood', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Oud Mood', nameAr: 'عود مود', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 850, rating: '★★★★★', reviews: 46, cat: 'unisex',
    img: 'assets/products/oud-mood.png', img2: 'assets/products/oud-mood.png',
    desc: 'Lattafa\'s crowd-pleasing oud — warm, rounded, and remarkably easy to wear.',
    notes: { top: 'Saffron, Bergamot', heart: 'Oud, Rose, Amber', base: 'Sandalwood, Musk, Vanilla' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'LT-OM-100', gender: 'Unisex',
    tag: 'WARM<br>ROUNDED<br>EASY'
  },
  {
    id: 'oud-mood-elixir', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Oud Mood Elixir', nameAr: 'عود مود الكسير', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 900, rating: '★★★★☆', reviews: 65, cat: 'unisex',
    img: 'assets/products/oud-mood-elixir.png', img2: 'assets/products/oud-mood-elixir.png',
    desc: 'Oud Mood concentrated — sweeter, deeper amber with noticeably longer wear.',
    notes: { top: 'Saffron, Pink Pepper', heart: 'Oud, Rose, Amber', base: 'Vanilla, Sandalwood, Musk' },
    family: 'Woody Amber', year: '2024', origin: 'UAE', sku: 'LT-OME-100', gender: 'Unisex',
    tag: 'ELIXIR<br>DEEP<br>SWEET'
  },
  {
    id: 'fakhr-al-dahabi', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Fakhr Al Dahabi', nameAr: 'فخر الذهبي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1200, rating: '★★★★☆', reviews: 94, cat: 'unisex',
    img: 'assets/products/fakhr-al-dahabi.png', img2: 'assets/products/fakhr-al-dahabi.png',
    desc: 'Golden pride — warm amber and oud with an unmistakably luxurious glow.',
    notes: { top: 'Saffron, Bergamot', heart: 'Rose, Oud, Amber', base: 'Vanilla, Musk, Sandalwood' },
    family: 'Amber Woody', year: '2024', origin: 'UAE', sku: 'LT-FAD-100', gender: 'Unisex',
    tag: 'GOLDEN<br>PROUD<br>LUXE'
  },
  {
    id: 'fuji', brand: 'AZHA', brandAr: 'أزها', name: 'Fuji', nameAr: 'فوجي', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1550, rating: '★★★★★', reviews: 33, cat: 'unisex',
    img: 'assets/products/fuji.png', img2: 'assets/products/fuji.png',
    desc: 'Cool mountain air over fresh woods — crisp, clean, and quietly invigorating.',
    notes: { top: 'Marine Notes, Bergamot, Mint', heart: 'Cedarwood, Geranium', base: 'Amberwood, Musk, Vetiver' },
    family: 'Woody Aquatic', year: '2024', origin: 'UAE', sku: 'AZ-F-100', gender: 'Unisex',
    tag: 'COOL<br>CRISP<br>FRESH'
  },
  {
    id: 'fundo', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Fundo', nameAr: 'فوندو', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1500, rating: '★★★★☆', reviews: 48, cat: 'unisex',
    img: 'assets/products/fundo.png', img2: 'assets/products/fundo.png',
    desc: 'Melted chocolate over warm woods — indulgent without losing its composure.',
    notes: { top: 'Cocoa, Bergamot', heart: 'Chocolate, Vanilla, Hazelnut', base: 'Tonka Bean, Amber, Musk' },
    family: 'Gourmand Woody', year: '2024', origin: 'UAE', sku: 'AP-F-100', gender: 'Unisex',
    tag: 'CHOCOLATE<br>INDULGENT<br>WARM'
  },
  {
    id: 'qassat-najah-nidao', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Qassat Najah Nidao', nameAr: 'قصة نجاح نيداو', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1500, rating: '★★★★☆', reviews: 65, cat: 'unisex',
    img: 'assets/products/qassat-najah-nidao.png', img2: 'assets/products/qassat-najah-nidao.png',
    desc: 'A success story told in amber and wood — polished, assured, and forward-looking.',
    notes: { top: 'Bergamot, Pink Pepper', heart: 'Rose, Amber, Cedarwood', base: 'Musk, Vanilla, Patchouli' },
    family: 'Woody Amber', year: '2024', origin: 'UAE', sku: 'AP-QNN-100', gender: 'Unisex',
    tag: 'POLISHED<br>ASSURED<br>AMBER'
  },
  {
    id: 'kohl-opulence', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Kohl Opulence', nameAr: 'كحل أوبولنس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1450, rating: '★★★★★', reviews: 80, cat: 'unisex',
    img: 'assets/products/kohl-opulence.png', img2: 'assets/products/kohl-opulence.png',
    desc: 'Dark-lined and opulent — amber and oud with real depth behind the glamour.',
    notes: { top: 'Saffron, Bergamot', heart: 'Rose, Oud, Amber', base: 'Vanilla, Musk, Sandalwood' },
    family: 'Amber Oriental', year: '2024', origin: 'UAE', sku: 'AP-KO-100', gender: 'Unisex',
    tag: 'OPULENT<br>DARK<br>AMBER'
  },
  {
    id: 'kohl-luminous', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Kohl Luminous', nameAr: 'كحل لومينوس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1450, rating: '★★★★☆', reviews: 97, cat: 'unisex',
    img: 'assets/products/kohl-luminous.png', img2: 'assets/products/kohl-luminous.png',
    desc: 'The bright counterpart to Kohl Opulence — luminous florals over clean soft musk.',
    notes: { top: 'Bergamot, Pear', heart: 'Jasmine, Rose, White Musk', base: 'Vanilla, Sandalwood, Amber' },
    family: 'Floral Musk', year: '2024', origin: 'UAE', sku: 'AP-KL-100', gender: 'Unisex',
    tag: 'LUMINOUS<br>BRIGHT<br>CLEAN'
  },
  {
    id: 'kaheylan', brand: 'KAHEYLAN', brandAr: 'كحيلان', name: 'Kaheylan', nameAr: 'كحيلان', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1850, rating: '★★★★☆', reviews: 38, cat: 'unisex',
    img: 'assets/products/kaheylan.png', img2: 'assets/products/kaheylan.png',
    desc: 'Named for the purebred Arabian — spirited leather and oud with noble bearing.',
    notes: { top: 'Saffron, Black Pepper', heart: 'Oud, Leather, Rose', base: 'Amber, Sandalwood, Musk' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'K-K-100', gender: 'Unisex',
    tag: 'SPIRITED<br>LEATHER<br>NOBLE'
  },
  {
    id: 'cranberry-musk', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Cranberry Musk', nameAr: 'كران بيري مسك', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 975, rating: '★★★★★', reviews: 20, cat: 'unisex',
    img: 'assets/products/cranberry-musk.png', img2: 'assets/products/cranberry-musk.png',
    desc: 'Tart cranberry softened by clean musk — bright, crisp, and comfortable.',
    notes: { top: 'Cranberry, Bergamot', heart: 'Rose, White Musk', base: 'Vanilla, Cedarwood, Amber' },
    family: 'Fruity Musk', year: '2024', origin: 'UAE', sku: 'AP-CM-100', gender: 'Unisex',
    tag: 'TART<br>CRISP<br>CLEAN'
  },
  {
    id: 'lattafa-beyond-forever', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Lattafa Beyond Forever', nameAr: 'لطفة بيوند فوريفر', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1250, rating: '★★★★☆', reviews: 48, cat: 'unisex',
    img: 'assets/products/lattafa-beyond-forever.png', img2: 'assets/products/lattafa-beyond-forever.png',
    desc: 'Sweet amber built to last — warm, comforting, and quietly persistent.',
    notes: { top: 'Bergamot, Pink Pepper', heart: 'Rose, Praline, Amber', base: 'Vanilla, Tonka Bean, Musk' },
    family: 'Amber Gourmand', year: '2024', origin: 'UAE', sku: 'LT-LBF-100', gender: 'Unisex',
    tag: 'SWEET<br>AMBER<br>LASTING'
  },
  {
    id: 'lattafa-seventh-heaven', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Lattafa The Seventh Heaven', nameAr: 'لطفة ذا سيفينث هيفن', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1250, rating: '★★★★☆', reviews: 65, cat: 'unisex',
    img: 'assets/products/lattafa-seventh-heaven.png', img2: 'assets/products/lattafa-seventh-heaven.png',
    desc: 'Elevated and serene — luminous florals floating over a soft golden amber.',
    notes: { top: 'Saffron, Bergamot', heart: 'Rose, Jasmine, Amber', base: 'Vanilla, Musk, Sandalwood' },
    family: 'Floral Amber', year: '2024', origin: 'UAE', sku: 'LT-LTSH-100', gender: 'Unisex',
    tag: 'SERENE<br>LUMINOUS<br>GOLDEN'
  },
  {
    id: 'litchi-musk', brand: 'ARABIYAT PRESTIGE', brandAr: 'أرابيات بريستيج', name: 'Litchi Musk', nameAr: 'ليتشي مسك', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 975, rating: '★★★★★', reviews: 71, cat: 'unisex',
    img: 'assets/products/litchi-musk.png', img2: 'assets/products/litchi-musk.png',
    desc: 'Juicy litchi over clean white musk — light, sweet, and endlessly wearable.',
    notes: { top: 'Litchi, Bergamot', heart: 'Rose, White Musk', base: 'Vanilla, Cedarwood, Amber' },
    family: 'Fruity Musk', year: '2024', origin: 'UAE', sku: 'AP-LM-100', gender: 'Unisex',
    tag: 'LITCHI<br>LIGHT<br>SWEET'
  },
  {
    id: 'maher-gold', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Maahir Gold', nameAr: 'ماهر جولد', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1350, rating: '★★★★☆', reviews: 11, cat: 'unisex',
    img: 'assets/products/maher-gold.png', img2: 'assets/products/maher-gold.png',
    desc: 'The golden Maahir — warmer and sweeter, with the line\'s polished signature intact.',
    notes: { top: 'Bergamot, Saffron', heart: 'Rose, Amber, Oud', base: 'Vanilla, Musk, Sandalwood' },
    family: 'Amber Woody', year: '2024', origin: 'UAE', sku: 'LT-MG-100', gender: 'Unisex',
    tag: 'GOLD<br>WARM<br>POLISHED'
  },
  {
    id: 'mukhallat-oud', brand: 'AZHA', brandAr: 'أزها', name: 'Mukhallat Oud', nameAr: 'مخلط عود', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 2050, rating: '★★★★☆', reviews: 56, cat: 'unisex',
    img: 'assets/products/mukhallat-oud.png', img2: 'assets/products/mukhallat-oud.png',
    desc: 'A traditional oud mukhallat — layered, dense, and richly Arabian.',
    notes: { top: 'Saffron, Spices', heart: 'Oud, Rose, Amber', base: 'Sandalwood, Musk, Vanilla' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'AZ-MO-100', gender: 'Unisex',
    tag: 'MUKHALLAT<br>DENSE<br>RICH'
  },
  {
    id: 'mukhallat-oud-al-mobakhar', brand: 'AZHA', brandAr: 'أزها', name: 'Mukhallat Oud Al Mobakhar', nameAr: 'مخلط عود المبخر', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 985, rating: '★★★★★', reviews: 30, cat: 'unisex',
    img: 'assets/products/mukhallat-oud-al-mobakhar.png', img2: 'assets/products/mukhallat-oud-al-mobakhar.png',
    desc: 'A burner-style mukhallat — smoky oud layered with warm resins and spice.',
    notes: { top: 'Saffron, Spices', heart: 'Oud, Bukhoor Accord, Rose', base: 'Amber, Sandalwood, Musk' },
    family: 'Incense Woody', year: '2024', origin: 'UAE', sku: 'AZ-MOAM-100', gender: 'Unisex',
    tag: 'SMOKY<br>BUKHOOR<br>SPICED'
  },
  {
    id: 'marwa', brand: 'MARWA', brandAr: 'مروة', name: 'Marwa', nameAr: 'مروة', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1600, rating: '★★★★☆', reviews: 72, cat: 'unisex',
    img: 'assets/products/marwa.png', img2: 'assets/products/marwa.png',
    desc: 'Composed and clear — florals set against clean woods with quiet confidence.',
    notes: { top: 'Bergamot, Green Notes', heart: 'Rose, Jasmine, Sandalwood', base: 'Musk, Amber, Cedarwood' },
    family: 'Floral Woody', year: '2024', origin: 'UAE', sku: 'M-M-100', gender: 'Unisex',
    tag: 'COMPOSED<br>CLEAR<br>CLEAN'
  },
  {
    id: 'musk-mood', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Musk Mood', nameAr: 'مسك مود', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 900, rating: '★★★★☆', reviews: 61, cat: 'unisex',
    img: 'assets/products/musk-mood.png', img2: 'assets/products/musk-mood.png',
    desc: 'Clean musk at its most approachable — soft, fresh, and good for any day.',
    notes: { top: 'Bergamot, Pear', heart: 'White Musk, Rose, Jasmine', base: 'Vanilla, Sandalwood, Amber' },
    family: 'Musk', year: '2024', origin: 'UAE', sku: 'LT-MM-100', gender: 'Unisex',
    tag: 'MUSK<br>SOFT<br>FRESH'
  },
  {
    id: 'musamam', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Musamam', nameAr: 'مسمم', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1850, rating: '★★★★★', reviews: 24, cat: 'unisex',
    img: 'assets/products/musamam.png', img2: 'assets/products/musamam.png',
    desc: 'The original Musamam — warm amber and oud with a smooth, generous trail.',
    notes: { top: 'Saffron, Bergamot', heart: 'Rose, Oud, Amber', base: 'Vanilla, Musk, Patchouli' },
    family: 'Amber Woody', year: '2024', origin: 'UAE', sku: 'LT-M-100', gender: 'Unisex',
    tag: 'AMBER<br>SMOOTH<br>GENEROUS'
  },
  {
    id: 'musamam-white-intense', brand: 'LATTAFA', brandAr: 'لطافة', name: 'Musamam White Intense', nameAr: 'مسمم وايت إنتنس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1900, rating: '★★★★☆', reviews: 43, cat: 'unisex',
    img: 'assets/products/musamam-white-intense.png', img2: 'assets/products/musamam-white-intense.png',
    desc: 'The white intensity — luminous clean woods concentrated for a longer stay.',
    notes: { top: 'Bergamot, Pear', heart: 'White Oud, Jasmine, Rose', base: 'White Musk, Sandalwood, Vanilla' },
    family: 'Woody Musk', year: '2024', origin: 'UAE', sku: 'LT-MWI-100', gender: 'Unisex',
    tag: 'WHITE<br>LUMINOUS<br>INTENSE'
  },
  {
    id: 'mishmish-al-oud', brand: 'AZHA', brandAr: 'أزها', name: 'Mishmish Al Oud', nameAr: 'مشمش العود', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1550, rating: '★★★★☆', reviews: 46, cat: 'unisex',
    img: 'assets/products/mishmish-al-oud.png', img2: 'assets/products/mishmish-al-oud.png',
    desc: 'Sun-warmed apricot against deep oud — sweet fruit with a serious woody core.',
    notes: { top: 'Apricot, Bergamot', heart: 'Oud, Rose, Saffron', base: 'Amber, Sandalwood, Musk' },
    family: 'Fruity Woody', year: '2024', origin: 'UAE', sku: 'AZ-MAO-100', gender: 'Unisex',
    tag: 'APRICOT<br>SWEET<br>WOODY'
  },
  {
    id: 'mouda-high-end', brand: 'MOUDA', brandAr: 'موضة', name: 'Mouda High End', nameAr: 'موضة هاي إند', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1700, rating: '★★★★★', reviews: 69, cat: 'unisex',
    img: 'assets/products/mouda-high-end.png', img2: 'assets/products/mouda-high-end.png',
    desc: 'Dressed for the front row — polished amber and wood with a contemporary finish.',
    notes: { top: 'Bergamot, Pink Pepper', heart: 'Amber, Rose, Oud', base: 'Vanilla, Musk, Sandalwood' },
    family: 'Amber Woody', year: '2024', origin: 'UAE', sku: 'M-MHE-100', gender: 'Unisex',
    tag: 'POLISHED<br>MODERN<br>AMBER'
  },
  {
    id: 'nayel-oud', brand: 'NAYEL', brandAr: 'نائل', name: 'Nayel Oud', nameAr: 'نائل عود', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1400, rating: '★★★★☆', reviews: 74, cat: 'unisex',
    img: 'assets/products/nayel-oud.png', img2: 'assets/products/nayel-oud.png',
    desc: 'Nayel\'s oud chapter — warm, resinous, and balanced for everyday wear.',
    notes: { top: 'Saffron, Bergamot', heart: 'Oud, Rose, Amber', base: 'Sandalwood, Musk, Vanilla' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'NY-NO-100', gender: 'Unisex',
    tag: 'OUD<br>WARM<br>BALANCED'
  },
  {
    id: 'nayel-queen', brand: 'NAYEL', brandAr: 'نائل', name: 'Nayel Queen', nameAr: 'نائل كوين', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1400, rating: '★★★★☆', reviews: 91, cat: 'unisex',
    img: 'assets/products/nayel-queen.png', img2: 'assets/products/nayel-queen.png',
    desc: 'Crowned florals over warm amber — graceful, composed, and quietly commanding.',
    notes: { top: 'Bergamot, Pink Pepper', heart: 'Rose, Jasmine, Amber', base: 'Vanilla, Musk, Sandalwood' },
    family: 'Floral Amber', year: '2024', origin: 'UAE', sku: 'NY-NQ-100', gender: 'Unisex',
    tag: 'CROWNED<br>GRACEFUL<br>AMBER'
  },
  {
    id: 'nayel-king', brand: 'NAYEL', brandAr: 'نائل', name: 'Nayel King', nameAr: 'نائل كينج', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1400, rating: '★★★★★', reviews: 16, cat: 'unisex',
    img: 'assets/products/nayel-king.png', img2: 'assets/products/nayel-king.png',
    desc: 'The king\'s counterpart — spiced leather and oud with an assured, upright trail.',
    notes: { top: 'Black Pepper, Bergamot', heart: 'Oud, Leather, Spices', base: 'Amber, Sandalwood, Musk' },
    family: 'Woody Spicy', year: '2024', origin: 'UAE', sku: 'NY-NK-100', gender: 'Unisex',
    tag: 'ASSURED<br>SPICED<br>LEATHER'
  },
  {
    id: 'nebras', brand: 'NEBRAS', brandAr: 'نبراس', name: 'Nebras', nameAr: 'نبراس', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1500, rating: '★★★★☆', reviews: 37, cat: 'unisex',
    img: 'assets/products/nebras.png', img2: 'assets/products/nebras.png',
    desc: 'A guiding light — warm amber with a clear, steady woody direction.',
    notes: { top: 'Bergamot, Saffron', heart: 'Amber, Rose, Oud', base: 'Vanilla, Musk, Cedarwood' },
    family: 'Amber Woody', year: '2024', origin: 'UAE', sku: 'N-N-100', gender: 'Unisex',
    tag: 'WARM<br>STEADY<br>AMBER'
  },
  {
    id: 'hawas-elixir', brand: 'RASASI', brandAr: 'رصاصي', name: 'Hawas Elixir', nameAr: 'هوس الكسير', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1950, rating: '★★★★☆', reviews: 72, cat: 'unisex',
    img: 'assets/products/hawas-elixir.png', img2: 'assets/products/hawas-elixir.png',
    desc: 'The Hawas signature concentrated — deeper amber, denser fruit, longer wear.',
    notes: { top: 'Apple, Bergamot, Saffron', heart: 'Rose, Jasmine, Amber', base: 'Musk, Sandalwood, Vanilla' },
    family: 'Fruity Amber', year: '2024', origin: 'UAE', sku: 'RS-HE-100', gender: 'Unisex',
    tag: 'ELIXIR<br>DEEP<br>LASTING'
  },
  {
    id: 'hawas-fire', brand: 'RASASI', brandAr: 'رصاصي', name: 'Hawas Fire', nameAr: 'هوس فاير', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 2450, rating: '★★★★★', reviews: 17, cat: 'unisex',
    img: 'assets/products/hawas-fire.png', img2: 'assets/products/hawas-fire.png',
    desc: 'Hawas turned up to a blaze — hot spice over the line\'s signature warm woods.',
    notes: { top: 'Pink Pepper, Bergamot, Cinnamon', heart: 'Rose, Saffron, Cedarwood', base: 'Amber, Musk, Vanilla' },
    family: 'Spicy Woody', year: '2024', origin: 'UAE', sku: 'RS-HF-100', gender: 'Unisex',
    tag: 'FIRE<br>SPICED<br>HOT'
  },
  {
    id: 'hawas-london', brand: 'RASASI', brandAr: 'رصاصي', name: 'Hawas London', nameAr: 'هوس لندن', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 2500, rating: '★★★★☆', reviews: 36, cat: 'unisex',
    img: 'assets/products/hawas-london.png', img2: 'assets/products/hawas-london.png',
    desc: 'Hawas with a London chill — crisp, grey-skied freshness over familiar warm woods.',
    notes: { top: 'Bergamot, Green Apple, Mint', heart: 'Lavender, Geranium, Rose', base: 'Amberwood, Musk, Vetiver' },
    family: 'Woody Aromatic', year: '2024', origin: 'UAE', sku: 'RS-HL-100', gender: 'Unisex',
    tag: 'CRISP<br>COOL<br>FRESH'
  },
  {
    id: 'white-cashmere', brand: 'AZHA', brandAr: 'أزها', name: 'White Cashmere', nameAr: 'وايت كشمير', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1550, rating: '★★★★☆', reviews: 15, cat: 'unisex',
    img: 'assets/products/white-cashmere.png', img2: 'assets/products/white-cashmere.png',
    desc: 'Soft as the fabric it is named for — warm cashmere woods wrapped in clean musk.',
    notes: { top: 'Bergamot, Pear', heart: 'Cashmere Wood, Jasmine, Iris', base: 'White Musk, Sandalwood, Vanilla' },
    family: 'Woody Musk', year: '2024', origin: 'UAE', sku: 'AZ-WC-100', gender: 'Unisex',
    tag: 'SOFT<br>CASHMERE<br>CLEAN'
  },
  {
    id: 'woody-drip', brand: 'AZHA', brandAr: 'أزها', name: 'Woody Drip', nameAr: 'وودي درب', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML'],
    price: 975, rating: '★★★★★', reviews: 9, cat: 'unisex',
    img: 'assets/products/woody-drip.png', img2: 'assets/products/woody-drip.png',
    desc: 'Modern woods with a fresh edge — clean, sharp, and easy to reach for.',
    notes: { top: 'Bergamot, Pink Pepper', heart: 'Cedarwood, Geranium, Lavender', base: 'Amberwood, Musk, Vetiver' },
    family: 'Woody Aromatic', year: '2024', origin: 'UAE', sku: 'AZ-WD-100', gender: 'Unisex',
    tag: 'MODERN<br>FRESH<br>WOODY'
  },
  {
    id: 'winsome', brand: 'WINSOME', brandAr: 'وينسم', name: 'Winsome', nameAr: 'وينسم', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1350, rating: '★★★★☆', reviews: 41, cat: 'unisex',
    img: 'assets/products/winsome.png', img2: 'assets/products/winsome.png',
    desc: 'Charming by design — gentle florals over soft, clean supporting woods.',
    notes: { top: 'Bergamot, Pear', heart: 'Rose, Jasmine, Iris', base: 'Musk, Cedarwood, Amber' },
    family: 'Floral Woody', year: '2024', origin: 'UAE', sku: 'W-W-100', gender: 'Unisex',
    tag: 'CHARMING<br>GENTLE<br>CLEAN'
  },
  {
    id: 'yemen-unisex', brand: 'YEMEN', brandAr: 'يمن', name: 'Yemen', nameAr: 'يمن', type: 'Eau de Parfum',
    size: '100 ML', sizes: ['50 ML', '100 ML', '150 ML'],
    price: 1450, rating: '★★★★☆', reviews: 62, cat: 'unisex',
    img: 'assets/products/yemen-unisex.png', img2: 'assets/products/yemen-unisex.png',
    desc: 'A heritage Arabian oriental — oud, rose and incense in their most classic form.',
    notes: { top: 'Saffron, Bergamot, Spices', heart: 'Oud, Rose, Incense', base: 'Amber, Sandalwood, Musk' },
    family: 'Woody Oriental', year: '2024', origin: 'UAE', sku: 'YM-Y-100', gender: 'Unisex',
    tag: 'HERITAGE<br>OUD<br>CLASSIC'
  }
];
