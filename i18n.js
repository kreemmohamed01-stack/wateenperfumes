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
    'Ring': 'خاتم',
    'Bracelet': 'إسوارة',
    'Necklace': 'عقد',
    'Cuff': 'كاف',
    'Earrings': 'حلق',
    'Accessory': 'إكسسوار',
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
    'About the Fragrance': 'عن المنتج',
    'Fragrance Notes': 'النفحات العطرية',
    'Top Notes': 'النفحات العليا',
    'Heart Notes': 'نفحات القلب',
    'Base Notes': 'النفحات القاعدية',
    'Family': 'العائلة',
    'Concentration': 'التركيز',
    'Year': 'سنة الإصدار',
    'Launch Year': 'سنة الإصدار',
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
    'ABOUT': 'عن الموقع',

    // product-detail bits with no dedicated Arabic field on the product object
    'Out of Stock': 'غير متوفّر',
    'Low Stock': 'الكمية محدودة',
    'available': 'قطعة متبقية',
    'Men': 'رجالي',
    'Women': 'حريمي',
    'Unisex': 'للجنسين',
    'UAE': 'الإمارات',
    'UK': 'المملكة المتحدة',

    // ---- footer: Customer Care + legal links ----
    'Wholesale Orders': 'طلبات الجملة',
    'Shipping Policy': 'سياسة الشحن',
    'Terms & Conditions': 'الشروط والأحكام',
    'Terms &amp; Conditions': 'الشروط والأحكام',
    'Privacy Policy': 'سياسة الخصوصية',
    'Terms of Service': 'الشروط والأحكام',
    'Sitemap': 'خريطة الموقع',

    // ---- wholesale.html ----
    'Wholesale Orders — Wateen Perfumes': 'طلبات الجملة — واتين بيرفيومز',
    'Wholesale': 'طلبات',
    'Orders': 'الجملة',
    'Wateen Perfumes is your first destination for luxury fragrances at wholesale prices. We are proud to offer top authentic brands at competitive prices and premium quality, to strengthen your own brand and delight your customers.':
      'واتين بيرفيومز وجهتك الأولى للعطور الفاخرة بأسعار الجملة. نحن فخورون بتقديم أرقى الماركات الأصلية بأسعار تنافسية وجودة عالية، لتعزيز هويتك التجارية وإسعاد عملائك.',
    'Who Can Order Wholesale': 'مين يقدر يطلب بالجملة',
    'Our wholesale program is open to retail shops, resellers, gift stores, corporate gifting, and anyone looking to stock authentic fragrances in bulk.':
      'برنامج الجملة لدينا متاح لمحلات التجزئة، الموزعين، متاجر الهدايا، الهدايا المؤسسية، وأي شخص يريد توفير عطور أصلية بكميات كبيرة.',
    "What's Available": 'المتاح لدينا',
    "A wide, ever-growing range covering men's, women's, and unisex fragrances, along with our best-selling houses — so you can offer a well-rounded selection to your own customers.":
      'تشكيلة واسعة ومتجدّدة تغطّي عطور الرجال والنساء والعطور المشتركة، بالإضافة لأشهر دورنا مبيعاً — لتقدّم لعملائك مجموعة متكاملة.',
    'Wholesale Pricing & Terms': 'أسعار وشروط الجملة',
    'Wholesale Pricing &amp; Terms': 'أسعار وشروط الجملة',
    'Wholesale orders have their own pricing and terms, agreed directly with our team based on quantity and product mix. These terms are separate from our standard retail return policy unless otherwise agreed in writing.':
      'طلبات الجملة لها أسعار وشروط منفصلة، يتم الاتفاق عليها مباشرة مع فريقنا حسب الكمية ونوعية المنتجات. هذه الشروط منفصلة عن سياسة الاسترجاع الخاصة بالتجزئة إلا إذا تم الاتفاق على غير ذلك كتابياً.',
    'How to Order': 'إزاي تطلب',
    "Message us on WhatsApp with the products and quantities you're interested in.": 'ابعتلنا على واتساب بالمنتجات والكميات اللي حابب تطلبها.',
    'Our team will share current wholesale pricing and availability.': 'فريقنا هيبعتلك أسعار الجملة الحالية والمتاح منها.',
    "Once agreed, we'll confirm payment and delivery details with you directly.": 'بعد الاتفاق، هنأكّد معاك تفاصيل الدفع والتوصيل مباشرة.',
    'Grow Your Brand With Us': 'عزّز علامتك التجارية معنا',
    'Boost your brand today — reach out and take advantage of our wholesale offers.': 'عزّز علامتك التجارية الآن — تواصل معنا واستفد من عروض الجملة.',
    'WHOLESALE ORDERS — WHATSAPP': 'طلبات الجملة — واتساب',

    // ---- shipping-policy.html ----
    'Shipping Policy — Wateen Perfumes': 'سياسة الشحن — واتين بيرفيومز',
    'We deliver to every governorate in Egypt. Shipping is currently available within Egypt only.':
      'بنوصّل الطلبات لكل محافظات جمهورية مصر العربية. الشحن حالياً داخل مصر فقط.',
    'Order Processing': 'تجهيز الطلب',
    'We prepare your order within 1–2 business days of confirmation. Business days run Saturday through Thursday, excluding public holidays.':
      'بنجهّز طلبك خلال يوم إلى يومين عمل من تأكيد الطلب. أيام العمل من السبت إلى الخميس، ما عدا الإجازات الرسمية.',
    'For Instapay payments, preparation begins once we receive and verify your transfer screenshot.':
      'لو كان الدفع عن طريق إنستاباي، بيبدأ التجهيز بعد استلام سكرين شوت التحويل والتأكد منه.',
    'Delivery Time': 'مدة التوصيل',
    'Delivery takes 2–5 business days depending on your governorate. Greater Cairo, Alexandria, and the Delta are usually faster, while more remote governorates may take up to the maximum.':
      'التوصيل بياخد من يومين إلى خمسة أيام عمل حسب المحافظة. القاهرة الكبرى والإسكندرية والدلتا عادةً أسرع، والمحافظات البعيدة ممكن توصل للحد الأقصى.',
    "During peak periods (holidays, major promotions) delivery may take an extra day or two, and we'll let you know if a delay happens.":
      'في مواسم الضغط (الأعياد، العروض الكبيرة) ممكن تزيد المدة يوم أو يومين، وهنبلغك لو حصل تأخير.',
    'Shipping Fees': 'مصاريف الشحن',
    'Shipping fees are calculated automatically at checkout based on your governorate, and shown to you before you confirm your order.':
      'مصاريف الشحن بتتحسب أوتوماتيك في صفحة إتمام الطلب حسب المحافظة، وبتظهرلك قبل ما تأكد الطلب.',
    'Tracking Your Order': 'متابعة الشحنة',
    'Once your order ships, our courier or our team will contact you on the mobile number registered with your order to arrange a delivery time. Please make sure this number is correct and reachable.':
      'أول ما الطلب يتشحن، هيتواصل معاك مندوب الشحن أو فريقنا على رقم الموبايل المسجل في الطلب لتحديد ميعاد التسليم. من فضلك تأكد إن الرقم صحيح وشغال.',
    'On Delivery': 'عند الاستلام',
    'Inspect the package before accepting it. If the outer packaging is visibly opened or damaged, please refuse the delivery and contact us immediately.':
      'افحص الكرتونة قبل ما تستلم. لو العبوة الخارجية مفتوحة أو متضررة بشكل واضح، ارفض الاستلام وكلمنا فورًا.',
    'For cash-on-delivery orders, please have the full amount ready, including shipping fees.':
      'لو الدفع عند الاستلام، جهّز المبلغ كامل شامل مصاريف الشحن.',
    'If no one is available to receive the order after two delivery attempts, it will be returned to us, and re-shipping will carry a new shipping fee.':
      'لو مفيش حد استلم بعد محاولتين تواصل من شركة الشحن، الطلب بيرجعلنا، وإعادة الشحن بتكون بمصاريف شحن جديدة.',
    "For any question about your shipment, reach out to our customer service team and we'll be happy to assist you.":
      'لأي استفسار عن شحنتك، تواصل مع فريق خدمة العملاء وسنكون سعداء بمساعدتك.',

    // ---- terms.html ----
    'Terms &amp; Conditions — Wateen Perfumes': 'الشروط والأحكام — واتين بيرفيومز',
    'Terms & Conditions — Wateen Perfumes': 'الشروط والأحكام — واتين بيرفيومز',
    'Terms &': 'الشروط',
    'Conditions': 'والأحكام',
    'By using the Wateen Perfumes website or ordering through it, you agree to the following terms. Please read them before placing your order.':
      'باستخدامك لموقع واتين بيرفيومز أو الطلب من خلاله، فأنت توافق على الشروط التالية. من فضلك اقرأها قبل ما تطلب.',
    'Who We Are': 'من نحن',
    'Wateen Perfumes is an online store selling authentic fragrances, watches, and accessories, curated from trusted, authorized distributors.':
      'واتين بيرفيومز متجر إلكتروني لبيع العطور الأصلية والساعات والإكسسوارات، منتقاة من موزعين معتمدين وموثوقين.',
    'Products & Prices': 'المنتجات والأسعار',
    'Products &amp; Prices': 'المنتجات والأسعار',
    'Every product listed is 100% authentic, sourced from official distributors.': 'كل المنتجات المعروضة أصلية 100% ومصدرها الموزع الرسمي.',
    'Prices are in Egyptian pounds and include VAT, but exclude shipping fees, which are shown at checkout.':
      'الأسعار بالجنيه المصري وشاملة ضريبة القيمة المضافة، وغير شاملة مصاريف الشحن اللي بتظهر في صفحة إتمام الطلب.',
    'Prices and offers may change at any time. The price that applies is the one shown when your order is confirmed.':
      'الأسعار والعروض قابلة للتغيير في أي وقت. السعر الساري هو اللي كان معروض وقت تأكيد طلبك.',
    "Product photos are for illustration; there may be slight differences in color or packaging depending on the production batch.":
      'صور المنتجات للتوضيح، وممكن يكون فيه فرق بسيط في اللون أو شكل العبوة حسب دفعة الإنتاج.',
    'If a clear pricing error occurs, we reserve the right to cancel the order and notify you before shipping.':
      'لو حصل خطأ واضح في سعر منتج، من حقنا نلغي الطلب ونبلغك قبل الشحن.',
    'Orders & Confirmation': 'الطلب والتأكيد',
    'Orders &amp; Confirmation': 'الطلب والتأكيد',
    "Your order is confirmed once our team contacts you, or once we receive your Instapay transfer screenshot.":
      'الطلب بيتأكد بعد ما فريقنا يتواصل معاك أو بعد استلام سكرين شوت التحويل في حالة الدفع بإنستاباي.',
    "We reserve the right to refuse or cancel any order if the product is unavailable, the details provided are incomplete, or there's doubt about the validity of the payment — we'll notify you if this happens.":
      'من حقنا نرفض أو نلغي أي طلب لو المنتج غير متاح، أو البيانات غير مكتملة، أو في شك في صحة عملية الدفع، وهنبلغك في الحالة دي.',
    'You are responsible for the accuracy of the name, address, and phone number on your order.':
      'أنت مسؤول عن صحة الاسم والعنوان ورقم الموبايل في الطلب.',
    'Payment': 'الدفع',
    'Cash on Delivery: pay our courier in cash for the order total plus shipping fees.':
      'الدفع عند الاستلام: بتدفع للمندوب نقدًا قيمة الطلب ومصاريف الشحن.',
    "Instapay: transfer the order total to our account and send us the transfer screenshot on WhatsApp. Your order is prepared once the transfer is confirmed.":
      'إنستاباي: بتحوّل قيمة الطلب على حسابنا وتبعتلنا سكرين شوت التحويل على واتساب. الطلب بيتجهز بعد التأكد من التحويل.',
    'We will never ask you for your card details or a password over WhatsApp or email.':
      'لا نطلب منك أبدًا بيانات بطاقتك البنكية أو كلمة سر على واتساب أو الإيميل.',
    'Shipping & Returns': 'الشحن والاسترجاع',
    'Shipping &amp; Returns': 'الشحن والاسترجاع',
    'Both pages are part of these terms.': 'الصفحتين جزء من الشروط دي.',
    'Wholesale orders have their own pricing and terms, agreed directly with our team, and are not covered by our individual-customer return policy unless otherwise agreed in writing.':
      'طلبات الجملة ليها أسعار وشروط منفصلة بيتم الاتفاق عليها مباشرة مع فريقنا، ولا تخضع لسياسة الاسترجاع الخاصة بالأفراد إلا لو تم الاتفاق على غير كده كتابيًا.',
    'Account & Data': 'الحساب والبيانات',
    'Account &amp; Data': 'الحساب والبيانات',
    'You are responsible for keeping your account details confidential.': 'أنت مسؤول عن الحفاظ على سرية بيانات حسابك على الموقع.',
    'We use your data (name, address, phone number, email) only to fulfil your order and to contact you about it, and never sell or share it with anyone outside the shipping and payment partners needed to complete your order.':
      'بنستخدم بياناتك (الاسم، العنوان، الموبايل، الإيميل) لتنفيذ طلبك والتواصل معاك بخصوصه فقط، ولا نبيعها أو نشاركها مع أي طرف خارج شركات الشحن وبوابات الدفع اللازمة لتنفيذ الطلب.',
    'Signing up for our newsletter is optional and you can unsubscribe at any time.':
      'الاشتراك في النشرة البريدية اختياري وتقدر تلغيه في أي وقت.',
    'Intellectual Property': 'الملكية الفكرية',
    'The Wateen Perfumes name, logo, and the website\'s design and content belong to us. The names and logos of the brands we sell belong to their respective owners. No content from this site may be copied or used commercially without our written permission.':
      'اسم واتين بيرفيومز والشعار وتصميم الموقع ومحتواه ملك لنا. أسماء وشعارات العلامات التجارية المعروضة ملك لأصحابها. لا يجوز نسخ أي محتوى من الموقع أو استخدامه تجاريًا بدون إذن كتابي.',
    'Limits of Liability': 'حدود المسؤولية',
    'We are committed to delivering your product in its original condition. Our liability on any order does not exceed the value of the products paid for in that order.':
      'نلتزم بتوصيل المنتج بحالته الأصلية. مسؤوليتنا في أي طلب لا تتجاوز قيمة المنتجات المدفوعة في الطلب نفسه.',
    'We are not responsible for delays caused by circumstances beyond our control, such as weather, public holidays, or courier disruptions, and we\'ll do our best to keep you informed if a delay occurs.':
      'لسنا مسؤولين عن التأخير الناتج عن ظروف خارجة عن إرادتنا مثل الأحوال الجوية أو الإجازات الرسمية أو أعطال شركات الشحن، وهنبذل جهدنا نبلغك في حينه.',
    'Fragrances are personal products, and how a scent develops on skin varies from person to person — this is not a product defect.':
      'العطور منتجات شخصية، والتفاعل مع البشرة يختلف من شخص لآخر وده مش عيب في المنتج.',
    'Changes to These Terms': 'تعديل الشروط',
    'We may update these terms from time to time. The version published on our website at the time you place your order is the one that applies to it.':
      'ممكن نعدّل الشروط دي من وقت للتاني. النسخة المنشورة على الموقع وقت تقديم طلبك هي اللي بتسري عليه.',
    'Governing Law': 'القانون الحاكم',
    'These terms are governed by the laws of the Arab Republic of Egypt, including Consumer Protection Law No. 181 of 2018, and any dispute falls under the jurisdiction of the Egyptian courts.':
      'تخضع هذه الشروط لقوانين جمهورية مصر العربية، بما في ذلك قانون حماية المستهلك رقم 181 لسنة 2018، وأي نزاع يكون من اختصاص المحاكم المصرية.',
    'Contact Us': 'تواصل معنا',
    'WhatsApp or call:': 'واتساب أو اتصال:',
    'Daily, from 9 AM to 11 PM.': 'يوميًا من 9 صباحًا إلى 11 مساءً.',
    'If you have any question about these terms, please contact our customer service team and we will be happy to assist you.':
      'إذا كان لديك أي سؤال بخصوص هذه الشروط، يُرجى التواصل مع فريق خدمة العملاء وسنكون سعداء بمساعدتك.',

    // ---- privacy-policy.html ----
    'Privacy Policy — Wateen Perfumes': 'سياسة الخصوصية — واتين بيرفيومز',
    'Your trust matters to us. This page explains what information we collect, why we collect it, and how we protect it.':
      'ثقتك تهمّنا. هذه الصفحة توضّح البيانات التي نجمعها، وسبب جمعها، وكيف نحميها.',
    'Information We Collect': 'البيانات التي نجمعها',
    "When you place an order or contact us, we collect your name, address, phone number, and email address — only what's needed to process your order and stay in touch with you about it.":
      'عند تقديم طلب أو التواصل معنا، نجمع اسمك وعنوانك ورقم هاتفك وبريدك الإلكتروني — فقط ما يلزم لتنفيذ طلبك والتواصل معك بخصوصه.',
    'How We Use Your Information': 'كيف نستخدم بياناتك',
    "We use your data solely to fulfil and deliver your order, communicate with you about it, and — if you've opted in — send you our newsletter. We never sell your data to anyone.":
      'نستخدم بياناتك فقط لتنفيذ وتوصيل طلبك، والتواصل معك بخصوصه، و— إذا اشتركت — إرسال نشرتنا البريدية. لا نبيع بياناتك لأي طرف على الإطلاق.',
    'Who We Share It With': 'مع من نشارك بياناتك',
    'We only share the details necessary to complete your order with our shipping couriers and payment partners (such as Instapay). We do not share your information with any other third party.':
      'نشارك فقط البيانات اللازمة لتنفيذ طلبك مع شركات الشحن وشركاء الدفع (مثل إنستاباي). لا نشارك بياناتك مع أي طرف آخر.',
    'Payment Security': 'أمان الدفع',
    'We never ask for your card details or account passwords over WhatsApp, email, or any messaging platform. If you ever receive such a request claiming to be from us, please do not respond and let us know.':
      'لا نطلب منك أبدًا بيانات بطاقتك البنكية أو كلمات السر على واتساب أو الإيميل أو أي وسيلة تواصل. لو استلمت طلباً مشابهاً بزعم أنه منّا، من فضلك لا تستجب وأخبرنا فوراً.',
    'Newsletter': 'النشرة البريدية',
    'Subscribing to our newsletter is entirely optional, and you can unsubscribe at any time using the link in any email we send, or by contacting us directly.':
      'الاشتراك في نشرتنا البريدية اختياري تمامًا، ويمكنك إلغاء الاشتراك في أي وقت من خلال الرابط في أي رسالة نرسلها، أو بالتواصل معنا مباشرة.',
    'Cookies': 'ملفات تعريف الارتباط',
    'Our website uses basic cookies to keep your cart and wishlist working correctly across pages. We do not use cookies to track you across other websites.':
      'يستخدم موقعنا ملفات تعريف ارتباط أساسية لضمان عمل سلة التسوق وقائمة الأمنيات بشكل صحيح بين الصفحات. لا نستخدم ملفات تعريف الارتباط لتتبعك في مواقع أخرى.',
    'Your Rights': 'حقوقك',
    'You can ask us at any time to see, correct, or delete the personal information we hold about you by contacting our customer service team.':
      'يمكنك في أي وقت أن تطلب منّا رؤية أو تصحيح أو حذف بياناتك الشخصية لدينا بالتواصل مع فريق خدمة العملاء.',
    'Questions About Your Data?': 'أسئلة حول بياناتك؟',
    'If you have any question about how we handle your information, please contact our customer service team and we will be happy to assist you.':
      'إذا كان لديك أي سؤال حول كيفية تعاملنا مع بياناتك، يُرجى التواصل مع فريق خدمة العملاء وسنكون سعداء بمساعدتك.',

    // ---- sitemap.html ----
    'Sitemap — Wateen Perfumes': 'خريطة الموقع — واتين بيرفيومز',
    "Every page on Wateen Perfumes, in one place.": 'كل صفحات موقع واتين بيرفيومز، في مكان واحد.',
    'Customer Care': 'خدمة العملاء',
    'Account & Legal': 'الحساب والقوانين',
    'Account &amp; Legal': 'الحساب والقوانين',
    'All Products': 'كل المنتجات',
    'Checkout': 'إتمام الطلب',
    "Can't Find What You're Looking For?": 'مش لاقي ما تبحث عنه؟',
    "Reach out to our customer service team and we'll be happy to help you find it.":
      'تواصل مع فريق خدمة العملاء وسنكون سعداء بمساعدتك في إيجاده.'
  };

  // fragrance-note ingredient words: stored as free-text comma lists with no
  // Arabic column, so each term is translated individually and rejoined —
  // same approach as tFamily() below, extended to a much longer vocabulary
  var NOTES = {
    'Almond':'لوز','Almond Macaron':'ماكارون اللوز','Amber':'عنبر','Ambergris':'عنبر بحري',
    'Amberwood':'خشب العنبر','Apple':'تفاح','Apricot':'مشمش','Aquatic Notes':'نفحات مائية',
    'Aromatic Herbs':'أعشاب عطرية','Bamboo Accord':'مسحة الخيزران','Benzoin':'بنزوين',
    'Bergamot':'برغموت','Black Pepper':'فلفل أسود','Blackcurrant':'كشمش أسود','Blueberry':'توت أزرق',
    'Bourbon Accord':'مسحة البوربون','Brazilian Pink Pepper':'فلفل وردي برازيلي','Brown Butter':'زبدة بنية',
    'Brown Sugar':'سكر بني','Bukhoor Accord':'مسحة البخور','Butter':'زبدة','Candied Fruit':'فاكهة مسكّرة',
    'Caramel':'كراميل','Caramelized Milk':'حليب مكرمل','Cardamom':'هيل','Cashmere Wood':'خشب الكشمير',
    'Cedarwood':'خشب الأرز','Chiffon Cake':'كيكة الشيفون','Chocolate':'شوكولاتة','Chocolate Ganache':'غاناش الشوكولاتة',
    'Cinnamon':'قرفة','Citrus':'حمضيات','Clove':'قرنفل','Cocoa':'كاكاو','Coconut':'جوز الهند',
    'Coconut Milk':'حليب جوز الهند','Coffee':'قهوة','Condensed Milk':'حليب مكثّف','Cookie Dough':'عجينة الكوكيز',
    'Cotton Candy':'غزل البنات','Cranberry':'توت بري','Cream':'كريمة','Damask Rose':'الورد الدمشقي',
    'Dark Chocolate':'شوكولاتة داكنة','Dark Woods':'أخشاب داكنة','Dates':'تمر','Dhan Al Oud':'دهن العود',
    'Driftwood':'خشب الطافي','Dry Spices':'توابل جافة','Egyptian Thyme':'زعتر مصري','Espresso':'إسبريسو',
    'Floral Accord':'مسحة زهرية','Floral Notes':'نفحات زهرية','Florals':'أزهار','Frankincense':'لبان',
    'Freesia':'فريزيا','French Black Truffle':'كمأة سوداء فرنسية','French Vanilla':'فانيليا فرنسية',
    'Gardenia':'غاردينيا','Geranium':'غرنوقي','Grapefruit':'جريب فروت','Green Apple':'تفاح أخضر',
    'Green Notes':'نفحات خضراء','Green Tea':'شاي أخضر','Hazelnut':'بندق','Heliotrope':'هليوتروب',
    'Honey':'عسل','Incense':'بخور','Indian Sandalwood':'صندل هندي','Iranian Saffron':'زعفران إيراني',
    'Iris':'سوسن','Jasmine':'ياسمين','Labdanum':'لادانم','Ladyfinger':'بسكويت الليدي فينجر',
    'Lavender':'لافندر','Leather':'جلد','Lemon':'ليمون','Light Florals':'أزهار خفيفة','Light Woods':'أخشاب خفيفة',
    'Lily':'زنبق','Litchi':'ليتشي','Macaron Shell':'قشرة الماكارون','Magnolia':'ماغنوليا','Mahonial':'ماهونيال',
    'Mandarin':'يوسفي','Mango':'مانجو','Maple':'قيقب','Marine Notes':'نفحات بحرية','Marshmallow':'مارشميلو',
    'Mascarpone':'ماسكاربوني','Matcha':'ماتشا','Mint':'نعناع','Mixed Berries':'توت مشكّل','Musk':'مسك',
    'Myrrh':'مُرّ','Nutmeg':'جوزة الطيب','Orange':'برتقال','Orange Blossom':'زهر البرتقال','Oud':'عود',
    'Passion Fruit':'فاكهة الآلام','Patchouli':'باتشولي','Peach':'خوخ','Pear':'كمثرى','Pecan':'جوز البقان',
    'Peony':'فاوانيا','Pepper':'فلفل','Pink Pepper':'فلفل وردي','Pink Peppercorn':'حبة فلفل وردي',
    'Plum':'برقوق','Pomegranate':'رمان','Praline':'برالين','Raspberry':'توت العليق','Red Berries':'توت أحمر',
    'Red Fruits':'فواكه حمراء','Rose':'ورد','Rosewood':'خشب الورد','Saffron':'زعفران','Sandalwood':'صندل',
    'Sea Notes':'نفحات بحرية','Sea Salt':'ملح البحر','Shortbread':'شورت بريد','Sichuan Pepper':'فلفل سيتشوان',
    'Smoked Woods':'أخشاب مدخّنة','Soft Florals':'أزهار ناعمة','Sorbet Accord':'مسحة السوربيه',
    'Spices':'توابل','Sponge Cake':'كيك إسفنجي','Starfruit':'فاكهة النجمة','Steamed Milk':'حليب مبخّر',
    'Strawberry':'فراولة','Sugar':'سكر','Sugar Syrup':'شراب السكر','Sugarcane':'قصب السكر',
    'Taif Rose':'ورد الطائف','Tangerine':'يوسفي','Tobacco':'تبغ','Tobacco Leaf':'ورق التبغ','Toffee':'توفي',
    'Tonka Bean':'حبة التونكا','Tuberose':'زنبق ليلي','Vanilla':'فانيليا','Vanilla Cream':'كريمة الفانيليا',
    'Vanilla Orchid':'أوركيد الفانيليا','Vetiver':'نجيل الطيب','Violet':'بنفسج','Violet Leaf':'ورق البنفسج',
    'Water Notes':'نفحات مائية','White Florals':'أزهار بيضاء','White Flowers':'زهور بيضاء','White Musk':'مسك أبيض',
    'White Oud':'عود أبيض','Woods':'أخشاب','Ylang-Ylang':'إيلنغ إيلنغ'
  };

  window.tNotes = function (str) {
    if (window.LANG !== 'ar' || !str) return str;
    return String(str).split(',').map(function (part) {
      var trimmed = part.trim();
      return Object.prototype.hasOwnProperty.call(NOTES, trimmed) ? NOTES[trimmed] : trimmed;
    }).join('، ');
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
    // mobile: right beside the burger/menu icon, not the search/cart pill.
    // .nav__mobTop is a 2-item space-between flex row (burger vs. pill; the
    // logo is centred absolutely and doesn't count), so the burger and the
    // language button are wrapped together as one flex item rather than
    // added as a 3rd top-level child, which would throw off that spacing.
    var burger = document.querySelector('.nav__burger');
    if (burger && burger.parentNode) {
      var burgerWrap = document.createElement('span');
      burgerWrap.className = 'nav__burgerWrap';
      burger.parentNode.insertBefore(burgerWrap, burger);
      burgerWrap.appendChild(burger);
      slots.push({ parent: burgerWrap, before: null });
    } else {
      var mobPill = document.querySelector('.nav__pill--mob');
      if (mobPill) slots.push({ parent: mobPill, before: null });
    }
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
