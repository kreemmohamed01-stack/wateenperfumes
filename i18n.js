/* ════════════════════════════════════════════════
   WATEEN PERFUMES — LANGUAGE (EN / AR)
   Translates the storefront in place without touching
   layout structure: the same DOM, the same images, the
   same order of everything — only text direction and
   wording change.

   Loads before site-data.js so window.LANG is already set
   when product data is read.
   ════════════════════════════════════════════════ */
(function () {
  'use strict';

  var KEY = 'wateen_lang';

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  var LANG = saved() === 'ar' ? 'ar' : 'en';
  window.LANG = LANG;
  window.isAr = function () { return window.LANG === 'ar'; };

  /* ---------- UI strings ---------- */
  var T = {
    // nav
    'HOME': 'الرئيسية',
    'SHOP': 'المتجر',
    'MEN': 'رجالي',
    'WOMEN': 'حريمي',
    'UNISEX': 'للجنسين',
    'BRANDS': 'الماركات',
    'CONTACT': 'اتصل بنا',
    'ACCESSORIES': 'إكسسوارات',
    'WATCHES': 'ساعات',
    'BEST SELLERS': 'الأكثر مبيعاً',
    'SCENTS': 'عطور',
    'CREATE': 'تصنع',
    'STORIES': 'حكايات',

    // announcement
    'FREE SHIPPING ON WATCHES': 'شحن مجاني على الساعات',
    'AUTHENTIC LUXURY FRAGRANCES': 'عطور فاخرة أصلية',

    // cart / drawer
    'YOUR CART': 'سلة المشتريات',
    'ADD TO CART': 'أضف إلى السلة',
    'CHECKOUT': 'إتمام الطلب',
    'VIEW CART': 'عرض السلة',
    'Your cart is empty': 'سلتك فارغة',
    'Your cart is empty.': 'سلتك فارغة.',
    'Browse the collection': 'تصفّح المجموعة',
    'Subtotal': 'المجموع الفرعي',
    'SUBTOTAL': 'المجموع الفرعي',
    'Continue Shopping': 'مواصلة التسوّق',
    'Scents create stories': 'العطور تصنع الحكايات',

    // search
    'SEARCH': 'بحث',
    'FIND YOUR SIGNATURE SCENT': 'اعثر على عطرك المميّز',
    'Search for perfumes, brands, categories...': 'ابحث عن عطور أو ماركات أو أقسام...',
    'CATEGORIES': 'الأقسام',
    'PRODUCTS': 'منتج',
    'No products found. Try a different search.': 'لا توجد منتجات. جرّب بحثاً آخر.',

    // product / listing
    'SIZE': 'الحجم',
    'One Size': 'عبوة واحدة',
    'Eau de Parfum': 'أو دو بارفان',
    'Eau de Toilette': 'أو دو تواليت',
    'Extrait de Parfum': 'إكستريه دو بارفان',
    'Concentrated Perfume Oil': 'زيت عطري مركّز',
    'Parfum d’Eau': 'بارفان دو',
    'Watch': 'ساعة',
    'LOW STOCK': 'الكمية محدودة',
    'SALE': 'تخفيض',
    'BEST SELLER': 'الأكثر مبيعاً',
    'In Stock': 'متوفّر',
    'Out of Stock': 'غير متوفّر',
    'Low Stock': 'الكمية محدودة',
    'available': 'متوفّرة',
    'Availability': 'التوفّر',
    'Brand': 'الماركة',
    'Product Name': 'اسم المنتج',
    'Type': 'النوع',
    'Gender': 'النوع',
    'Origin': 'بلد المنشأ',
    'SKU': 'رمز المنتج',
    'The Details': 'التفاصيل',
    'reviews': 'تقييم',
    'Free Shipping': 'شحن مجاني',
    'Free on all watches': 'مجاني على كل الساعات',
    'Easy Returns': 'استرجاع سهل',
    'Within 14 days': 'خلال 14 يوم',
    '100% Original': 'أصلي 100%',
    'Authentic products': 'منتجات أصلية',
    'Secure Checkout': 'دفع آمن',
    'Your data is protected': 'بياناتك محمية',
    'Authentic Products': 'منتجات أصلية',
    'Fast Delivery': 'توصيل سريع',
    'Easy Support': 'دعم سهل',
    "We're here for you": 'نحن هنا من أجلك',
    'About': 'عن العطر',
    'Fragrance Notes': 'النفحات العطرية',
    'Top Notes': 'النفحات العليا',
    'Heart Notes': 'نفحات القلب',
    'Base Notes': 'النفحات القاعدية',
    'Family': 'العائلة',
    'Concentration': 'التركيز',
    'Year': 'سنة الإصدار',
    'YOU MAY ALSO LIKE': 'قد يعجبك أيضاً',
    'Size': 'الحجم',
    'Home': 'الرئيسية',
    'BACK': 'رجوع',
    'FILTERS': 'تصفية',
    'PRICE': 'السعر',
    'Sort by:': 'ترتيب حسب:',
    'Featured': 'المميّزة',
    'Search in Men…': 'ابحث في الرجالي…',
    'Search in Women…': 'ابحث في الحريمي…',
    'Search in Unisex…': 'ابحث في للجنسين…',
    'Search in Accessories…': 'ابحث في الإكسسوارات…',
    'Search in Watches…': 'ابحث في الساعات…',
    'Search all products…': 'ابحث في كل المنتجات…',
    'Search this brand…': 'ابحث في هذه الماركة…',

    // category page heroes
    'Men': 'رجالي',
    'Women': 'حريمي',
    'Unisex': 'للجنسين',
    'Accessories': 'إكسسوارات',
    'Watches': 'ساعات',
    'Shop': 'المتجر',
    'Wishlist': 'المفضّلة',
    'CONFIDENCE': 'ثقة',
    'IN EVERY MOMENT': 'في كل لحظة',
    'ELEGANCE': 'أناقة',
    'IN EVERY DETAIL': 'في كل تفصيلة',
    'FOR EVERY': 'لكل',
    'SIDE OF YOU': 'جانب فيك',
    'THE DETAILS': 'التفاصيل',
    'THAT COMPLETE YOU': 'التي تكملك',
    'TIME, WORN': 'الوقت يُرتدى',
    'BEAUTIFULLY': 'بجمال',
    'BOLD': 'جريء',
    'REFINED': 'راقٍ',
    'TIMELESS': 'خالد',
    'Discover a collection of bold, refined scents crafted for the modern man.':
      'اكتشف مجموعة من العطور الجريئة الراقية المصنوعة للرجل العصري.',
    'Discover a collection of graceful, radiant scents crafted for the modern woman.':
      'اكتشفي مجموعة من العطور الرشيقة المشعّة المصنوعة للمرأة العصرية.',
    'Discover a collection of versatile scents that move freely between every mood and moment.':
      'اكتشف مجموعة من العطور المتنوّعة التي تنتقل بحرية بين كل مزاج ولحظة.',
    'Discover a collection of refined accessories that complement your signature scent.':
      'اكتشف مجموعة من الإكسسوارات الراقية التي تكمّل عطرك المميّز.',
    'Discover a collection of fine timepieces crafted to complete every look.':
      'اكتشف مجموعة من الساعات الفاخرة المصنوعة لتكمّل كل إطلالة.',
    'Explore our full collection of luxury fragrances, designed to reflect your personality and leave a lasting impression.':
      'تصفّح مجموعتنا الكاملة من العطور الفاخرة، المصمّمة لتعكس شخصيتك وتترك انطباعاً يدوم.',

    // filters / results
    'BRAND': 'الماركة',
    'SCENT FAMILY': 'العائلة العطرية',
    'No products match these filters': 'لا توجد منتجات تطابق هذه التصفية',
    'Try clearing a filter or two — your next signature scent is close by.':
      'جرّب إزالة تصفية أو اثنتين — عطرك المميّز القادم على بعد خطوة.',

    // checkout
    'DELIVERY INFORMATION': 'بيانات التوصيل',
    'SHIPPING METHOD': 'طريقة الشحن',
    'PAYMENT METHOD': 'طريقة الدفع',
    'BILLING ADDRESS': 'عنوان الفاتورة',
    'ORDER NOTES': 'ملاحظات الطلب',
    'YOUR ORDER': 'طلبك',
    'Enter your delivery details to receive your order.': 'أدخل بيانات التوصيل لاستلام طلبك.',
    'Choose your preferred shipping method.': 'اختر طريقة الشحن المفضّلة لديك.',
    "Choose how you'd like to pay.": 'اختر طريقة الدفع التي تناسبك.',
    'Full Name': 'الاسم بالكامل',
    'Governorate': 'المحافظة',
    'Select governorate': 'اختر المحافظة',
    'City': 'المدينة',
    'Address': 'العنوان',
    'Apartment, Floor, etc.': 'الشقة، الدور، إلخ',
    '(Optional)': '(اختياري)',
    'Phone Number': 'رقم الهاتف',
    'Your InstaPay Number': 'رقم إنستاباي الخاص بك',
    'Card Number': 'رقم البطاقة',
    'Expiry': 'تاريخ الانتهاء',
    'CVC': 'رمز التحقق',
    'Standard Delivery': 'التوصيل العادي',
    'Cash on Delivery': 'الدفع عند الاستلام',
    'Pay with cash when you receive your order.': 'ادفع نقداً عند استلام طلبك.',
    'InstaPay': 'إنستاباي',
    'Pay securely using your InstaPay account.': 'ادفع بأمان عبر حسابك على إنستاباي.',
    'Credit / Debit Card': 'بطاقة ائتمان / خصم',
    'Pay securely with your card.': 'ادفع بأمان باستخدام بطاقتك.',
    'Street, building name, landmark...': 'الشارع، اسم المبنى، علامة مميزة...',
    'Add any special instructions for your order...': 'أضف أي تعليمات خاصة بطلبك...',
    'Enter code': 'أدخل الكود',
    'Have a discount code?': 'لديك كود خصم؟',
    '14 days': '14 يوم',
    '2–5 business days': '2-5 أيام عمل',
    'Estimated delivery 2–5 business days': 'التوصيل المتوقّع خلال 2-5 أيام عمل',
    '(OPTIONAL)': '(اختياري)',
    'Kreem Mohamed': 'كريم محمد',
    'Oud Collection': 'مجموعة العود',
    'Applied to this order.': 'مُطبّق على هذا الطلب.',
    'PERFUME SHIPPING:': 'شحن البرفانات:',
    'Rate for': 'سعر التوصيل لـ',
    'Select your governorate for the exact rate.': 'اختر محافظتك لمعرفة السعر بالضبط.',
    'Enter a code first.': 'أدخل الكود أولاً.',
    'That code is not valid.': 'هذا الكود غير صالح.',
    'applied —': 'تم تطبيق',
    'Could not check that code — try again.': 'تعذّر التحقق من الكود — حاول مرة أخرى.',
    'This field is required.': 'هذا الحقل مطلوب.',
    'Enter a valid phone number.': 'أدخل رقم هاتف صحيح.',
    'Enter the 16-digit card number.': 'أدخل رقم البطاقة المكوّن من 16 رقماً.',
    'Use MM / YY.': 'استخدم صيغة شهر / سنة.',
    'Enter the 3-digit code.': 'أدخل الرمز المكوّن من 3 أرقام.',
    'Paid From': 'تم الدفع من',
    'Card': 'البطاقة',
    'PLACING ORDER…': 'جارٍ إتمام الطلب…',
    'Cash on Delivery:': 'الدفع عند الاستلام:',
    'please have': 'يُرجى تجهيز',
    'ready when your order arrives.': 'جاهزاً عند وصول طلبك.',
    'InstaPay:': 'إنستاباي:',
    'transfer': 'حوّل',
    'to': 'إلى',
    'Your order is confirmed once the transfer is received.': 'سيتم تأكيد طلبك بمجرد استلام التحويل.',
    'Card:': 'البطاقة:',
    'payment of': 'تم اعتماد دفعة بقيمة',
    'was authorised for this order.': 'لهذا الطلب.',
    'Add': 'أضف',
    'more for free shipping': 'أكثر للحصول على شحن مجاني',
    'You’ve unlocked free shipping!': 'لقد حصلت على شحن مجاني!',

    // scent family words — combined pairwise (e.g. "Woody Oriental") by
    // tFamily() below, so every family in the catalog translates correctly
    // without needing all ~70 two-word combinations listed individually
    'Amber': 'عنبري',
    'Floral': 'زهري',
    'Fruity': 'فاكهي',
    'Gourmand': 'حلواني',
    'Incense': 'بخوري',
    'Musky': 'مسكي',
    'Musk': 'مسك',
    'Oriental': 'شرقي',
    'Spicy': 'متبّل',
    'Sweet': 'حلو',
    'Woody': 'خشبي',
    'Aromatic': 'عطري',
    'Aquatic': 'مائي',
    'Fresh': 'منعش',
    'Citrus': 'حمضي',
    'Chypre': 'شيبر',
    'Green': 'أخضر',
    'Leather': 'جلدي',
    'Oud': 'عودي',
    'Tobacco': 'تبغي',
    'Boozy': 'كحولي',
    'Intense': 'مكثّف',
    'White': 'أبيض',
    'Watch': 'ساعة',
    'Oil': 'زيت',
    'Up to': 'حتى',
    'APPLY': 'تطبيق',
    'Edit Cart': 'تعديل السلة',
    'Shipping': 'الشحن',
    'Discount': 'الخصم',
    'Total': 'الإجمالي',
    'FREE': 'مجاني',
    'PLACE ORDER': 'إتمام الطلب',
    'BACK TO SHOPPING': 'العودة للتسوّق',
    'SECURE CHECKOUT': 'دفع آمن',
    'Your information is safe with us': 'بياناتك في أمان معنا',
    'Your payment information is secure': 'بيانات الدفع الخاصة بك آمنة',
    'Returns & Exchange Policy': 'سياسة الاستبدال والاسترجاع',
    '14-day returns on defective products': 'استرجاع خلال 14 يوم للمنتجات المعيبة',
    'Read the full policy': 'اقرأ السياسة كاملة',
    'FREE SHIPPING ON WATCHES': 'شحن مجاني على الساعات',

    // footer
// ---- bulk additions: full-site translation pass ----
    "Accessories — Wateen Perfumes": "إكسسوارات — واتين بيرفيومز",
    "Checkout — Wateen Perfumes": "إتمام الطلب — واتين بيرفيومز",
    "Men's Fragrances — Wateen Perfumes": "عطور رجالي — واتين بيرفيومز",
    "Men's Fragrances": "عطور رجالي",
    "Shop All — Wateen Perfumes": "تسوّق الكل — واتين بيرفيومز",
    "Unisex Fragrances — Wateen Perfumes": "عطور للجنسين — واتين بيرفيومز",
    "Unisex Fragrances": "عطور للجنسين",
    "Watches — Wateen Perfumes": "ساعات — واتين بيرفيومز",
    "Your Wishlist — Wateen Perfumes": "مفضّلتك — واتين بيرفيومز",
    "Your Wishlist": "مفضّلتك",
    "Women's Fragrances — Wateen Perfumes": "عطور حريمي — واتين بيرفيومز",
    "Women's Fragrances": "عطور حريمي",
    "Our Brands — Wateen Perfumes": "ماركاتنا — واتين بيرفيومز",
    "Our Brands": "ماركاتنا",
    "Returns & Exchange Policy — Wateen Perfumes": "سياسة الاستبدال والاسترجاع — واتين بيرفيومز",
    "About the Fragrance": "عن العطر",
    "Maintenance & Repair": "الصيانة والإصلاح",
    "Not accepted when:": "غير مقبول عندما:",
    "Original packaging and accessories are included, if applicable.": "العبوة الأصلية والملحقات مرفقة، إن وُجدت.",
    "of delivery if the product has a manufacturing defect or a genuine product issue. All requests are subject to inspection by our team.": "من التوصيل إذا كان بالمنتج عيب تصنيع أو مشكلة حقيقية. جميع الطلبات تخضع للفحص من فريقنا.",
    "Need Help?": "تحتاج مساعدة؟",
    "MY ACCOUNT": "حسابي",
    "MY CART": "سلتي",
    "Open menu": "فتح القائمة",
    "List view": "عرض قائمة",
    "Loading…": "جارٍ التحميل…",
    "Next brands": "الماركات التالية",
    "Next products": "المنتجات التالية",
    "Next reviews": "التقييمات التالية",
    "Previous reviews": "التقييمات السابقة",
    "No accessories available yet": "لا توجد إكسسوارات متاحة بعد",
    "Order Number": "رقم الطلب",
    "Order Receipt": "إيصال الطلب",
    "ORDER RECEIPT": "إيصال الطلب",
    "Launch Year": "سنة الإطلاق",
    "Mastercard": "ماستركارد",
    "MM / YY": "شهر / سنة",
    "Your Email": "بريدك الإلكتروني",
    "DELIVER TO": "التوصيل إلى",
    "New Cairo": "القاهرة الجديدة",
    "Apt 12, Floor 3": "شقة 12، الدور 3",
    "FREE SHIPPING": "شحن مجاني",
    "LIMITED TIME": "لفترة محدودة",
    "OFFER": "عرض",
    "ON ALL FRAGRANCES": "على كل العطور",
    "OUR BRANDS": "ماركاتنا",
    "Authentic brands. Timeless elegance.": "ماركات أصلية. أناقة خالدة.",
    "Curated scents for every story.": "عطور مختارة لكل حكاية.",
    "FRAGRANCE": "عطر",
    "MOMENTS": "لحظات",
    "MORE": "المزيد",
    "MORE THAN A": "أكثر من مجرد",
    "NEVER FADE": "لا تتلاشى أبداً",
    "OF YOUR LIFE": "من حياتك",
    "SCENTS WITH": "عطور مع",
    "SHOP NOW": "تسوّق الآن",
    "TIME, WORN BEAUTIFULLY": "الوقت، يُرتدى بجمال",
    "VIEW ALL": "عرض الكل",
    "VIEW COLLECTION": "عرض المجموعة",
    "BY": "بواسطة",
    "Select governorate": "اختر المحافظة",
    "Cairo": "القاهرة",
    "Giza": "الجيزة",
    "Alexandria": "الإسكندرية",
    "Qalyubia": "القليوبية",
    "Dakahlia": "الدقهلية",
    "Sharqia": "الشرقية",
    "Gharbia": "الغربية",
    "Monufia": "المنوفية",
    "Beheira": "البحيرة",
    "Kafr El Sheikh": "كفر الشيخ",
    "Damietta": "دمياط",
    "Port Said": "بورسعيد",
    "Ismailia": "الإسماعيلية",
    "Suez": "السويس",
    "Beni Suef": "بني سويف",
    "Faiyum": "الفيوم",
    "Minya": "المنيا",
    "Asyut": "أسيوط",
    "Sohag": "سوهاج",
    "Qena": "قنا",
    "Luxor": "الأقصر",
    "Aswan": "أسوان",
    "Red Sea": "البحر الأحمر",
    "MORE THAN A SCENT": "أكثر من مجرد عطر",
    "A FEELING": "شعور",
    "THAT STAYS": "يبقى",
    "SCROLL": "مرر للأسفل",
    "SCENTS": "عطور",
    "CREATE": "تصنع",
    "STORIES": "حكايات",
    "SCENTS CREATE STORIES": "العطور تصنع الحكايات",
    "SCENTS THAT CREATE STORIES": "عطور تصنع الحكايات",
    "OUR BEST SELLERS": "الأكثر مبيعاً لدينا",
    "CUSTOMERS'": "عملاؤنا",
    "FAVORITES": "المفضّلة",
    "TIMELESS SCENTS. REAL STORIES.": "عطور خالدة. حكايات حقيقية.",
    "TIMELESS SCENTS": "عطور خالدة",
    "SHOP BY CATEGORY": "تسوّق حسب القسم",
    "FIND": "اعثر على",
    "YOUR": "عطرك",
    "SCENT": "المميّز",
    "DIFFERENT MOODS. ONE DESTINATION.": "أمزجة مختلفة. وجهة واحدة.",
    "EXPLORE ALL": "استكشف الكل",
    "CAN'T FIND WHAT YOU'RE LOOKING FOR?": "لم تجد ما تبحث عنه؟",
    "Explore our full collection of luxury fragrances.": "تصفّح مجموعتنا الكاملة من العطور الفاخرة.",
    "VIEW ALL PRODUCTS": "عرض كل المنتجات",
    "FAST DELIVERY": "توصيل سريع",
    "Across Egypt": "في جميع أنحاء مصر",
    "100% AUTHENTIC": "أصلي 100%",
    "100% ORIGINAL": "أصلي 100%",
    "100% original": "أصلي 100%",
    "Original Products": "منتجات أصلية",
    "Authentic products only": "منتجات أصلية فقط",
    "EASY RETURNS": "استرجاع سهل",
    "Hassle-free within 14 days": "بدون تعقيد خلال 14 يوم",
    "24/7 SUPPORT": "دعم على مدار الساعة",
    "We're always here for you": "نحن دائماً هنا من أجلك",
    "SECURE PAYMENT": "دفع آمن",
    "Safe & Protected": "آمن ومحمي",
    "DEDICATED SUPPORT": "دعم مخصّص",
    "We're Here for You": "نحن هنا من أجلك",
    "CUSTOMER REVIEWS": "آراء العملاء",
    "REAL PEOPLE.": "أشخاص حقيقيون.",
    "LASTING IMPRESSIONS.": "انطباعات تدوم.",
    "SHOP THE COLLECTION": "تسوّق المجموعة",
    "Bold scents": "عطور جريئة",
    "for every occasion.": "لكل مناسبة.",
    "Elegance": "أناقة",
    "in every spray.": "في كل رشّة.",
    "Scents without": "عطور بلا",
    "boundaries.": "حدود.",
    "The perfect": "اللمسة",
    "finishing touch.": "الأخيرة المثالية.",
    "Time, worn": "الوقت، يُرتدى",
    "beautifully.": "بجمال.",
    "BECAUSE YOU DESERVE MORE": "لأنك تستحق الأفضل",
    "% OFF": "% خصم",
    "COLLECTIONS": "المجموعات",
    "CHOOSE A HOUSE TO EXPLORE ITS COLLECTION": "اختر داراً لاستكشاف مجموعتها",
    "CURATED BRANDS": "ماركات مختارة",
    "ICONIC HOUSES. EXTRAORDINARY STORIES.": "دور أيقونية. حكايات استثنائية.",
    "ICONIC HOUSES": "دور أيقونية",
    "ICONIC HOUSE": "دار أيقونية",
    "ICONIC": "أيقوني",
    "EXTRAORDINARY STORY": "حكاية استثنائية",
    "EXTRAORDINARY STORIES": "حكايات استثنائية",
    "Discover legendary fragrance houses and": "اكتشف دور العطور الأسطورية و",
    "experience the scents that define generations.": "عِش عطوراً حدّدت هوية أجيال.",
    "Discover the legendary fragrance houses behind our collection, each with its own signature and story.": "اكتشف دور العطور الأسطورية وراء مجموعتنا، كل واحدة بتوقيعها وحكايتها.",
    "Discover this fragrance house's collection.": "اكتشف مجموعة دار العطور هذه.",
    "ALL BRANDS": "كل الماركات",
    "EXPLORE BRANDS": "استكشف الماركات",
    "Previous brands": "الماركات السابقة",
    "ALL": "الكل",
    "All Products": "كل المنتجات",
    "Brands": "الماركات",
    "Currency": "العملة",
    "Cart": "السلة",
    "CLEAR ALL FILTERS": "مسح كل الفلاتر",
    "RESET": "إعادة تعيين",
    "GENDER": "النوع",
    "Price": "السعر",
    "Grid view": "عرض شبكي",
    "WISHLIST": "المفضّلة",
    "Your wishlist is empty": "قائمة المفضّلة فارغة",
    "Tap the heart on any fragrance you love, and it'll be waiting for you right here.": "اضغط على القلب في أي عطر يعجبك، وسيكون في انتظارك هنا.",
    "The scents you keep coming back to — kept safe here, ready whenever you're ready.": "العطور التي تعود إليها دائماً — محفوظة هنا، جاهزة وقتما تشاء.",
    "ITEMS SAVED": "عناصر محفوظة",
    "ITEMS": "عناصر",
    "RECENTLY VIEWED": "شوهد مؤخّراً",
    "Previous products": "المنتجات السابقة",
    "Add to wishlist": "أضف للمفضّلة",
    "Add": "أضف",
    "WATEEN": "واتين",
    "PERFUMES": "بيرفيومز",
    "WATEEN PERFUMES": "واتين بيرفيومز",
    "Wateen Perfumes": "واتين بيرفيومز",
    "A better you.": "نسخة أفضل منك.",
    "A BETTER YOU": "نسخة أفضل منك",
    "Wateen Perfumes — A Feeling That Stays": "واتين بيرفيومز — شعور يبقى",
    "A Feeling That Stays": "شعور يبقى",
    "Thank you for your trust — a scent, a stronger you.": "شكراً لثقتك — عطر واحد، ونسخة أقوى منك.",
    "THANK YOU": "شكراً لك",
    "Powered by": "بدعم من",
    "Search": "بحث",
    "Clear search": "مسح البحث",
    "Close search": "إغلاق البحث",
    "Close cart": "إغلاق السلة",
    "Close menu": "إغلاق القائمة",
    "Copy number": "نسخ الرقم",
    "COPY": "نسخ",
    "Journal": "المدوّنة",
    "Sitemap": "خريطة الموقع",
    "Our Story": "قصتنا",
    "Terms of Service": "شروط الخدمة",
    "Privacy Policy": "سياسة الخصوصية",
    "Facebook": "فيسبوك",
    "Instagram": "إنستغرام",
    "WhatsApp": "واتساب",
    "INSTA": "إنستغرام",
    "Be the first to know about new": "كن أول من يعلم بكل",
    "Be the first to know about new arrivals,": "كن أول من يعلم بالوصولات الجديدة،",
    "exclusive offers, and more.": "والعروض الحصرية، والمزيد.",
    "releases and exclusive offers.": "الإصدارات والعروض الحصرية.",
    "Enter your email": "أدخل بريدك الإلكتروني",
    "Email address": "البريد الإلكتروني",
    "Subscribe": "اشترك",
    "Send": "إرسال",
    "© 2024 Wateen Perfumes. All rights reserved.": "© 2024 واتين بيرفيومز. جميع الحقوق محفوظة.",
    "© 2026 Wateen Perfumes. All rights reserved.": "© 2026 واتين بيرفيومز. جميع الحقوق محفوظة.",
    "Zoom image": "تكبير الصورة",
    "Zoom in": "تكبير",
    "Zoom out": "تصغير",
    "Drag to move · scroll or pinch to zoom": "اسحب للتحريك · مرّر أو قرّب للتكبير",
    "Product image viewer": "عارض صور المنتج",
    "Close image viewer": "إغلاق عارض الصور",
    "Qty": "الكمية",
    "Item": "عنصر",
    "Reference": "المرجع",
    "Date": "التاريخ",
    "CONTINUE SHOPPING": "مواصلة التسوّق",
    "PROCEED TO CHECKOUT": "المتابعة لإتمام الطلب",
    "Same as delivery address": "نفس عنوان التوصيل",
    "Add a discount code": "أضف كود خصم",
    "(Including VAT)": "(شامل الضريبة)",
    "TOTAL PAID": "إجمالي المدفوع",
    "SAVE RECEIPT": "حفظ الإيصال",
    "SAVED FOR LATER": "محفوظ لوقت لاحق",
    "Thank you for choosing Wateen Perfumes — your order is confirmed and we're preparing it with care.": "شكراً لاختيارك واتين بيرفيومز — تم تأكيد طلبك ونحن نجهّزه بعناية.",
    "Our team will call you on": "سيتصل بك فريقنا على",
    "shortly to confirm delivery.": "قريباً لتأكيد التوصيل.",
    "TOMORROW": "غداً",
    "PAY": "ادفع",
    "Apple Pay": "أبل باي",
    "Visa": "فيزا",
    "Card": "بطاقة",
    "Payment Method": "طريقة الدفع",
    "Transfer the order total to this InstaPay number": "حوّل إجمالي الطلب إلى رقم إنستاباي هذا",
    "your number": "رقمك",
    ", then enter the number you transferred from so we can match your payment.": "، ثم أدخل الرقم الذي حوّلت منه حتى نتمكّن من مطابقة دفعتك.",
    "We use industry-standard encryption to protect your data.": "نستخدم تشفيراً بمعايير الصناعة لحماية بياناتك.",
    "more for free shipping": "أكثر للحصول على شحن مجاني",
    "/ 1000 EGP": "/ 1000 جنيه",
    "(0 items)": "(0 عناصر)",
    "- 0 EGP": "- 0 جنيه",
    "0 EGP": "0 جنيه",
    "550 EGP": "550 جنيه",
    "90 EGP": "90 جنيه",
    "EGP": "جنيه",
    "By placing your order, you agree to our": "بإتمامك للطلب، فأنت توافق على",
    "Returns:": "الاسترجاع:",
    "items can only be returned if they arrive with a genuine defect or damage. Please report it within 14 days of delivery with the item unused and in its original packaging.": "لا يمكن استرجاع المنتجات إلا إذا وصلت بعيب أو تلف حقيقي. يُرجى الإبلاغ خلال 14 يوماً من التوصيل مع بقاء المنتج غير مستخدم وفي عبوته الأصلية.",
    "Returns & Exchange Policy": "سياسة الاستبدال والاسترجاع",
    "Returns &": "الاستبدال و",
    "Exchange Policy": "سياسة الاسترجاع",
    "Exchange": "الاستبدال",
    "At Wateen Perfumes, we are committed to providing authentic, high-quality products and ensuring a premium experience from the moment you place your order until it reaches you.": "في واتين بيرفيومز، نلتزم بتقديم منتجات أصلية وعالية الجودة وضمان تجربة فاخرة من لحظة تقديم طلبك حتى وصوله إليك.",
    "Return Period": "فترة الاسترجاع",
    "You may request a return within": "يمكنك طلب استرجاع خلال",
    "from the date of delivery in case the product has a manufacturing defect or a genuine product issue.": "من تاريخ التوصيل في حال وجود عيب تصنيع أو مشكلة حقيقية في المنتج.",
    "Please note: Returns are accepted only for products with a confirmed defect or quality issue, subject to inspection by our team.": "يُرجى ملاحظة: يتم قبول الاسترجاع فقط للمنتجات التي بها عيب أو مشكلة جودة مؤكّدة، وذلك بعد فحصها من فريقنا.",
    "If your product has a defect or issue, please contact our customer service team.": "إذا كان بمنتجك عيب أو مشكلة، يُرجى التواصل مع فريق خدمة العملاء لدينا.",
    "If the issue can be repaired, maintenance or repair service will be provided depending on the nature of the problem and the condition of the product.": "إذا كان بالإمكان إصلاح المشكلة، سيتم توفير خدمة الصيانة أو الإصلاح حسب طبيعة المشكلة وحالة المنتج.",
    "Return Conditions": "شروط الاسترجاع",
    "To be eligible for a return:": "لتكون مؤهّلاً للاسترجاع:",
    "Eligible when:": "مؤهّل عندما:",
    "The request must be submitted within 14 days of delivery.": "يجب تقديم الطلب خلال 14 يوماً من التوصيل.",
    "The request is made within 14 days of delivery.": "تم تقديم الطلب خلال 14 يوماً من التوصيل.",
    "The product must have a confirmed defect or genuine issue.": "يجب أن يكون بالمنتج عيب أو مشكلة حقيقية مؤكّدة.",
    "The product has a confirmed defect or genuine issue.": "المنتج به عيب أو مشكلة حقيقية مؤكّدة.",
    "Photos or a video showing the issue may be requested.": "قد يُطلب منك صور أو فيديو يوضّح المشكلة.",
    "Photos or a video of the issue can be provided if requested.": "يمكن تقديم صور أو فيديو للمشكلة إذا طُلب ذلك.",
    "The product should be returned in its original condition whenever possible.": "يجب إعادة المنتج بحالته الأصلية قدر الإمكان.",
    "Original packaging and accessories should be included, if applicable.": "يجب إرفاق العبوة الأصلية والملحقات، إن وُجدت.",
    "Damage caused by misuse or improper handling is not covered.": "التلف الناتج عن سوء الاستخدام أو التعامل الخاطئ غير مشمول.",
    "Non-Returnable Cases": "حالات لا يُقبل فيها الاسترجاع",
    "Returns are not accepted in the following cases:": "لا يتم قبول الاسترجاع في الحالات التالية:",
    "Change of mind or personal preference regarding the fragrance.": "تغيير الرأي أو التفضيل الشخصي بخصوص العطر.",
    "It's a change of mind or fragrance preference.": "تغيير في الرأي أو تفضيل العطر.",
    "The product has been used or opened in a way that affects its resale condition.": "تم استخدام أو فتح المنتج بطريقة تؤثر على حالته لإعادة البيع.",
    "The product was used or opened in a way that affects resale condition.": "تم استخدام أو فتح المنتج بطريقة تؤثر على حالته لإعادة البيع.",
    "Damage caused by misuse, improper storage, or accidental damage.": "التلف الناتج عن سوء الاستخدام أو التخزين الخاطئ أو التلف العرضي.",
    "Damage was caused by misuse, improper storage, or an accident.": "حدث التلف بسبب سوء الاستخدام أو التخزين الخاطئ أو حادث عرضي.",
    "The return request is submitted after the 14-day return period.": "تم تقديم طلب الاسترجاع بعد انتهاء فترة الـ 14 يوماً.",
    "The request comes after the 14-day period.": "تم تقديم الطلب بعد فترة الـ 14 يوماً.",
    "How to Request a Return": "كيفية طلب الاسترجاع",
    "To request a return or maintenance service:": "لطلب خدمة الاسترجاع أو الصيانة:",
    "Contact our customer service team.": "تواصل مع فريق خدمة العملاء لدينا.",
    "Provide your order number and details of the issue.": "قدّم رقم طلبك وتفاصيل المشكلة.",
    "Send photos or a video of the problem if requested.": "أرسل صوراً أو فيديو للمشكلة إذا طُلب منك ذلك.",
    "Our team will review your request and guide you through the next steps.": "سيراجع فريقنا طلبك ويرشدك للخطوات التالية.",
    "Product Inspection": "فحص المنتج",
    "All return and maintenance requests are subject to inspection by the Wateen Perfumes team.": "جميع طلبات الاسترجاع والصيانة تخضع للفحص من فريق واتين بيرفيومز.",
    "The request will be approved once we confirm that the issue is related to a product defect and was not caused by misuse or improper handling.": "سيتم قبول الطلب بمجرد تأكيدنا أن المشكلة مرتبطة بعيب في المنتج ولم تنتج عن سوء استخدام أو تعامل خاطئ.",
    "If a product is confirmed to have a defect and cannot be repaired, it may be exchanged for the same product, subject to availability.": "إذا تأكّد وجود عيب بالمنتج ولم يكن قابلاً للإصلاح، يمكن استبداله بنفس المنتج حسب التوفر.",
    "If a defect is confirmed and cannot be repaired, the product may be exchanged for the same item, subject to availability.": "إذا تأكّد العيب ولم يكن قابلاً للإصلاح، يمكن استبدال المنتج بنفس القطعة حسب التوفر.",
    "If the same product is unavailable, our customer service team will contact you to discuss the available solution.": "إذا لم يكن نفس المنتج متوفراً، سيتواصل معك فريق خدمة العملاء لمناقشة الحل المتاح.",
    "Your satisfaction and trust are important to us.": "رضاك وثقتك مهمّان بالنسبة لنا.",
    "If you experience any issue with your order, please contact our customer service team and we will be happy to assist you.": "إذا واجهت أي مشكلة في طلبك، يُرجى التواصل مع فريق خدمة العملاء وسنكون سعداء بمساعدتك.",
    "CONTACT CUSTOMER SERVICE": "تواصل مع خدمة العملاء",
    "CONTACT US": "اتصل بنا",
    "We're curating this collection": "نحن نجهّز هذه المجموعة",
    "Check back soon — new products from this house are on the way.": "تابعنا قريباً — منتجات جديدة من هذه الدار في الطريق.",
    "We're curating our accessories collection — check back soon for refined pieces to complete your signature look.": "نحن نجهّز مجموعة الإكسسوارات — تابعنا قريباً لقطع راقية تكمّل إطلالتك المميّزة.",
    "Try clearing a filter or two — your next timepiece is close by.": "جرّب إزالة فلتر أو اثنين — ساعتك القادمة على بعد خطوة.",
    "“A SCENT THAT LEAVES A LASTING IMPRESSION.”": "«عطر يترك انطباعاً يدوم.»",
    "“Absolutely in love with the scent! It’s elegant, long-lasting and instantly became my signature.”": "«أحببت هذا العطر تماماً! أنيق وثابت وأصبح توقيعي المميّز على الفور.»",
    "“Premium quality and amazing packaging. You can feel the difference from the first spray.”": "«جودة فاخرة وتغليف رائع. تشعر بالفرق من أول رشّة.»",
    "“A scent that truly reflects elegance. I always get compliments whenever I wear it.”": "«عطر يعكس الأناقة حقاً. أحصل دائماً على إطراءات كلما ارتديته.»",
    "“Elegant bottle, unforgettable scent. Wateen has become my go-to gift for everyone.”": "«زجاجة أنيقة وعطر لا يُنسى. واتين أصبح هديتي المفضّلة للجميع.»",
    "“Fast delivery and the fragrance lasted all day. Exactly as described, will order again.”": "«توصيل سريع والعطر ثبت طوال اليوم. تماماً كما هو موصوف، سأطلب مرة أخرى.»",
    "“The packaging alone feels like a luxury gift. The scent lives up to it completely.”": "«التغليف وحده يبدو كهدية فاخرة. والعطر يليق به تماماً.»",
    "CAIRO, EG": "القاهرة، مصر",
    "ALEXANDRIA, EG": "الإسكندرية، مصر",
    "GIZA, EG": "الجيزة، مصر",
    "SHOP ALL": "تسوّق الكل",
    "DISCOVER SCENTS CRAFTED FOR EVERY MOMENT": "اكتشف عطوراً صُنعت لكل لحظة",
    "DISCOVER HOW REAL PEOPLE STYLE THEIR SCENTS AND TURN EVERYDAY MOMENTS INTO SOMETHING EXTRAORDINARY.": "اكتشف كيف يستخدم أشخاص حقيقيون عطورهم ويحوّلون اللحظات اليومية إلى شيء استثنائي.",
    "AROUND THE WORLD": "حول العالم",
    "GLOBAL ICONS": "أيقونات عالمية",
    "FOR EVERY CHAPTER": "لكل فصل",
    "FRAGRANCES FROM": "عطور من",
    "EXPLORE FRAGRANCES": "استكشف العطور",
    "Discover luxurious fragrances crafted for every moment, every mood, every you.": "اكتشف عطوراً فاخرة صُنعت لكل لحظة، كل مزاج، وكل نسخة منك.",
    "MORE THAN A FRAGRANCE": "أكثر من مجرد عطر",
    "More Than a Fragrance — A Better You.": "أكثر من مجرد عطر — نسخة أفضل منك.",
    "More than a fragrance.": "أكثر من مجرد عطر.",
    "Wateen Perfumes ·": "واتين بيرفيومز ·",
    "CLASSIC": "كلاسيكي",
    "RADIANT": "مشرق",
    "BALANCED": "متوازن",
    "PRECISE": "دقيق",
    "VERSATILE": "متعدّد الاستخدامات",
    "ELEGANT": "أنيق",
    "AUTHENTIC": "أصيل",
    "CURATED": "مُنتقى",
    "STYLE INSPIRATION": "إلهام الأناقة",
    "STYLES THAT": "أساليب",
    "THAT TELL": "تحكي",
    "SIGNATURE MOMENTS": "لحظات مميّزة",
    "THE ART OF PERFUMERY": "فن صناعة العطور",
    "WATCH THE STORY": "شاهد القصة",
    "THAN": "من",
    "THAN A": "من مجرد",
    "PEOPLE": "أشخاص",
    "PLACES": "أماكن",
    "A FRAGRANCE": "عطر",
    "A PURPOSE": "هدف",
    "A MORE BEAUTIFUL": "نسخة أجمل",
    "A SCENT · A STRONGER YOU": "عطر واحد · نسخة أقوى منك",
    'CUSTOMER CARE': 'خدمة العملاء',
    'Returns & Exchange': 'الاستبدال والاسترجاع',
    'STAY CONNECTED': 'ابقَ على تواصل',
    'SHOP': 'تسوّق',
    'ABOUT': 'عن الموقع'
  };

  window.t = function (s) {
    if (window.LANG !== 'ar') return s;
    var k = String(s == null ? '' : s).trim();
    return Object.prototype.hasOwnProperty.call(T, k) ? T[k] : s;
  };

  /* ---------- product-level helpers ----------
     Every page reads product text through these, so a product
     renders in whichever language is active without each page
     needing to know how the switch works. */
  window.pName = function (p) {
    return (window.LANG === 'ar' && p && p.nameAr) ? p.nameAr : (p ? p.name : '');
  };
  window.pBrand = function (p) {
    return (window.LANG === 'ar' && p && p.brandAr) ? p.brandAr : (p ? p.brand : '');
  };
  window.pDesc = function (p) {
    return (window.LANG === 'ar' && p && p.descAr) ? p.descAr : (p ? p.desc : '');
  };

  // scent families are stored as English word pairs ("Woody Oriental").
  // There's no Arabic column for this field, so each word is translated
  // individually and rejoined rather than requiring every two-word
  // combination to exist as its own dictionary entry.
  window.tFamily = function (family) {
    if (window.LANG !== 'ar' || !family) return family;
    return String(family).split(' ').map(function (w) {
      return Object.prototype.hasOwnProperty.call(T, w) ? T[w] : w;
    }).join(' ');
  };

  /* ---------- apply direction ---------- */
  function applyDir() {
    var ar = window.LANG === 'ar';
    document.documentElement.lang = ar ? 'ar' : 'en';
    document.documentElement.dir = ar ? 'rtl' : 'ltr';
    document.documentElement.classList.toggle('is-ar', ar);
  }
  applyDir();

  /* ---------- translate static markup ----------
     Walks text nodes only. Structure, classes, images and
     element order are never touched, so switching language
     cannot rearrange or break the layout. */
  function translateStaticText(root) {
    if (window.LANG !== 'ar') return;
    var walker = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var p = node.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = p.nodeName;
        // never touch code the page depends on
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [];
    var n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var raw = node.nodeValue;
      // HTML source often wraps a single sentence across several lines with
      // indentation ("Discover...for\n      every moment..."), which the
      // browser keeps as literal newlines/runs of spaces in the text node.
      // Matching against that exact whitespace would almost never hit a
      // dictionary key written as one clean sentence, so normalise runs of
      // whitespace to a single space before comparing.
      var key = raw.trim().replace(/\s+/g, ' ');
      if (!Object.prototype.hasOwnProperty.call(T, key)) return;
      // once translated, the node becomes a single clean run of text —
      // the original multi-line indentation served no visual purpose
      // (it's inline text, collapsed by the browser either way)
      node.nodeValue = raw.replace(/^(\s*)[\s\S]*?(\s*)$/, function (_, lead, trail) {
        return lead + T[key] + trail;
      });
    });
  }
  window.translateStaticText = translateStaticText;

  /* ---------- translate placeholders / aria labels ---------- */
  function translateAttributes(root) {
    if (window.LANG !== 'ar') return;
    (root || document).querySelectorAll('[placeholder]').forEach(function (el) {
      var k = el.getAttribute('placeholder');
      if (k && Object.prototype.hasOwnProperty.call(T, k.trim())) el.setAttribute('placeholder', T[k.trim()]);
    });
  }

  /* ---------- the switcher button ---------- */
  function setLang(next) {
    try { localStorage.setItem(KEY, next); } catch (e) {}
    // a reload is deliberate: every page script reads product data at parse
    // time, so re-running them in the new language is both simpler and safer
    // than trying to re-render half-initialised widgets in place.
    location.reload();
  }
  window.setLang = setLang;

  function buildSwitcher() {
    var label = window.LANG === 'ar' ? 'EN' : 'AR';
    var title = window.LANG === 'ar' ? 'English' : 'العربية';
    var html =
      '<button class="langBtn" type="button" aria-label="' + title + '" title="' + title + '">' +
        '<b>' + label + '</b>' +
      '</button>';

    // desktop: right beside the nav menu links, before the search/cart icons.
    // mobile: in the icon pill next to search/wishlist/cart.
    var slots = [];
    var navLinksRight = document.querySelector('.nav__cap--right .nav__links');
    var pill = document.querySelector('.nav__cap--right .nav__pill');
    if (navLinksRight && navLinksRight.parentNode && pill) {
      slots.push({ parent: navLinksRight.parentNode, before: pill });
    } else {
      var cur = document.querySelector('.nav__cur');
      if (cur && cur.parentNode) slots.push({ parent: cur.parentNode, before: cur });
    }
    var mobPill = document.querySelector('.nav__pill--mob');
    if (mobPill) slots.push({ parent: mobPill, before: null });
    // checkout has its own slim header
    var coHead = document.querySelector('.coHead__secure');
    if (coHead && coHead.parentNode) slots.push({ parent: coHead.parentNode, before: coHead });

    slots.forEach(function (slot) {
      var wrap = document.createElement('span');
      wrap.className = 'langSlot';
      wrap.innerHTML = html;
      wrap.querySelector('button').addEventListener('click', function () {
        setLang(window.LANG === 'ar' ? 'en' : 'ar');
      });
      slot.parent.insertBefore(wrap, slot.before);
    });
  }

  // <title> isn't part of document.body, so the text-node walker never
  // sees it — translate it explicitly, piece by piece, so a page whose
  // title wasn't literally in the dictionary word-for-word still translates
  // (e.g. "Men's Fragrances — Wateen Perfumes" translates the same way as
  // "Men's Fragrances" and "Wateen Perfumes" would individually)
  function translateTitle() {
    if (window.LANG !== 'ar' || !document.title) return;
    var parts = document.title.split(' — ');
    document.title = parts.map(function (p) {
      return Object.prototype.hasOwnProperty.call(T, p.trim()) ? T[p.trim()] : p;
    }).join(' — ');
  }

  function init() {
    translateStaticText(document.body);
    translateAttributes(document);
    translateTitle();
    buildSwitcher();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
