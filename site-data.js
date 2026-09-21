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

  // Single combined request instead of three separate sequential ones —
  // the backend runs the same three queries in parallel and hands them
  // back together, so this pays for one round trip instead of three.
  var boot = fetchJsonSync('/api/public/bootstrap');

  window.CATALOG = (boot && boot.catalog) || (window.CATALOG || []);
  window.SITE_SETTINGS = (boot && boot.settings) || {
    freeShippingThreshold: 1000, defaultShippingFee: 80,
    globalSaleEnabled: false, globalSalePercent: 0,
    codEnabled: true, instapayEnabled: true, cardEnabled: true, instapayNumber: '01027380269',
    shippingRatesByGovernorate: {}
  };
  window.FEATURED_COUPON = (boot && boot.featuredCoupon) || null;

  /* ---------- announcement bar: dashboard text, or hide it entirely ---------- */
  function applyAnnouncementSettings() {
    var bar = document.querySelector('.announce');
    if (!bar) return;
    var s = window.SITE_SETTINGS || {};
    // a featured coupon takes over the bar below, so leave it alone in that case
    if (window.FEATURED_COUPON) return;
    if (s.announcementEnabled === false) { bar.style.display = 'none'; return; }
    if (!s.announcementText) return;

    // the bar is a scrolling marquee built from alternating message/star spans,
    // so replace the whole track rather than a single text node — the message is
    // repeated so the loop still reads continuously as it scrolls
    var track = bar.querySelector('.announce__track');
    if (!track) return;
    var star = '<span class="announce__dot">✦</span>';
    var msg = '<span></span>';
    track.innerHTML = (msg + star).repeat(4);
    track.querySelectorAll('span:not(.announce__dot)').forEach(function (el) {
      el.textContent = s.announcementText;
    });
  }

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

  /* ---------- sync the homepage "LIMITED TIME OFFER — X% OFF" banner ----------
     The section ships hidden. It only appears when a site-wide sale is turned
     on in the dashboard, and always shows that sale's real percentage. */
  function syncSaleBanner() {
    var saleSection = document.querySelector('.sale');
    var rollEl = document.querySelector('.sale .roll');
    if (!saleSection || !rollEl) return;

    var s = window.SITE_SETTINGS || {};
    var pct = Number(s.globalSalePercent || 0);
    if (!s.globalSaleEnabled || pct <= 0) return; // stays hidden

    rollEl.dataset.value = String(pct);
    rollEl.textContent = '0';
    // clear the "already animated" guard — the value only becomes real here,
    // so this counter must be allowed to run even if it was observed earlier
    delete rollEl.dataset.rolled;
    saleSection.style.display = '';

    // hero.js takes its one-time snapshot of .roll elements before this runs,
    // so this counter has to be opted into the animation explicitly
    if (window.__wireRolls) window.__wireRolls(saleSection);
  }

  function applyAll() {
    applyAnnouncementSettings();
    renderPromoBanner();
    syncSaleBanner();
  }

  // this file is parsed before hero.js, which is what defines __wireRolls, so
  // the work is deferred to DOMContentLoaded (by which point hero.js has run).
  // If the document is somehow already parsed, fall back to a microtask so
  // hero.js still gets its chance to define the hook first.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAll);
  } else {
    setTimeout(applyAll, 0);
  }
})();
