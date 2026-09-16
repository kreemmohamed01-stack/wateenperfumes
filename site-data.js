/* ════════════════════════════════════════════════
   WATEEN PERFUMES — LIVE SITE DATA LOADER
   Replaces the old static catalog.js. Loads the real
   catalog, store settings, and the currently-featured
   coupon from the backend API, then exposes them as
   window.CATALOG / window.SITE_SETTINGS / window.FEATURED_COUPON
   in the exact shape the rest of the site already expects —
   so hero.js, checkout.js, and every page script keep working
   unmodified, just backed by the real database now.

   Uses a synchronous XHR deliberately: every page script that
   follows (hero.js, checkout.js, category filters, etc.) reads
   window.CATALOG at parse time, not after a DOMContentLoaded
   callback, so the fetch must finish before this script tag
   returns control to the parser.
   ════════════════════════════════════════════════ */
(function () {
  'use strict';

  function fetchJsonSync(url) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false); // synchronous by design — see note above
      xhr.send(null);
      if (xhr.status >= 200 && xhr.status < 300) return JSON.parse(xhr.responseText);
    } catch (e) { /* fall through to fallback below */ }
    return null;
  }

  var catalog = fetchJsonSync('/api/public/catalog');
  var settings = fetchJsonSync('/api/public/settings');
  var featuredCoupon = fetchJsonSync('/api/public/coupons/featured');

  window.CATALOG = catalog || (window.CATALOG || []);
  window.SITE_SETTINGS = settings || {
    freeShippingThreshold: 1000, defaultShippingFee: 80,
    globalSaleEnabled: false, globalSalePercent: 0,
    codEnabled: true, instapayEnabled: true, cardEnabled: true, instapayNumber: '01027380269',
    shippingRatesByGovernorate: {}
  };
  window.FEATURED_COUPON = featuredCoupon || null;

  /* ---------- swap the top announcement bar for a live promo-code banner ---------- */
  function renderPromoBanner() {
    var bar = document.querySelector('.announce');
    if (!bar || !window.FEATURED_COUPON) return;

    var coupon = window.FEATURED_COUPON;
    bar.classList.add('is-promo');
    bar.innerHTML =
      '<div class="promoBar">' +
        '<span class="promoBar__star">✦</span>' +
        '<span class="promoBar__txt">USE CODE FOR ' + coupon.label + '</span>' +
        '<span class="promoBar__code">' + coupon.code +
          '<button type="button" class="promoBar__copyBtn" id="promoCopyBtn">COPY</button>' +
        '</span>' +
      '</div>';

    var btn = document.getElementById('promoCopyBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var done = function () {
        btn.classList.add('is-copied');
        btn.textContent = 'COPIED';
        setTimeout(function () { btn.classList.remove('is-copied'); btn.textContent = 'COPY'; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(coupon.code).then(done, done);
      } else {
        var tmp = document.createElement('textarea');
        tmp.value = coupon.code;
        tmp.style.position = 'fixed';
        tmp.style.opacity = '0';
        document.body.appendChild(tmp);
        tmp.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(tmp);
        done();
      }
    });
  }

  /* ---------- sync the homepage "LIMITED TIME OFFER — X% OFF" banner ---------- */
  function syncSaleBanner() {
    var rollEl = document.querySelector('.sale .roll');
    var saleSection = document.querySelector('.sale');
    if (!rollEl) return;

    if (window.SITE_SETTINGS.globalSaleEnabled && window.SITE_SETTINGS.globalSalePercent > 0) {
      rollEl.dataset.value = String(window.SITE_SETTINGS.globalSalePercent);
    } else if (saleSection) {
      // no active site-wide sale — hide the banner rather than show a false 0% offer
      saleSection.style.display = 'none';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { renderPromoBanner(); syncSaleBanner(); });
  } else {
    renderPromoBanner();
    syncSaleBanner();
  }
})();
