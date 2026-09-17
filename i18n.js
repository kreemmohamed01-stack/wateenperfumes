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
      var key = raw.trim();
      if (!Object.prototype.hasOwnProperty.call(T, key)) return;
      // keep the original surrounding whitespace so inline spacing survives
      node.nodeValue = raw.replace(key, T[key]);
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
    var label = window.LANG === 'ar' ? 'EN' : 'ع';
    var title = window.LANG === 'ar' ? 'English' : 'العربية';
    var html =
      '<button class="langBtn" type="button" aria-label="' + title + '" title="' + title + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
          '<circle cx="12" cy="12" r="9"/>' +
          '<path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" stroke-linecap="round"/>' +
        '</svg>' +
        '<b>' + label + '</b>' +
      '</button>';

    // desktop: next to the currency button. mobile: in the icon pill.
    var slots = [];
    var cur = document.querySelector('.nav__cur');
    if (cur && cur.parentNode) slots.push({ parent: cur.parentNode, before: cur });
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

  function init() {
    translateStaticText(document.body);
    translateAttributes(document);
    buildSwitcher();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
