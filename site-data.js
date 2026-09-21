/* ════════════════════════════════════════════════
   WATEEN PERFUMES — LIVE SITE DATA LOADER
   Loads the real catalog, store settings, and the
   currently-featured coupon from the backend, then
   exposes them as window.CATALOG / window.SITE_SETTINGS /
   window.FEATURED_COUPON in the exact shape the rest of
   the site already expects — so hero.js, checkout.js, and
   every page script keep working unmodified, just backed
   by the real database now.

   This used to fetch via a synchronous XHR so that every
   later page script (hero.js, checkout.js, category
   filters, etc.) could read window.CATALOG at parse time.
   That guaranteed the data was ready, but a synchronous XHR
   permanently disables the browser's back/forward cache
   (bfcache) on the whole page — every back-button press
   forced a full slow reload from the server instead of an
   instant restore.

   An earlier attempt fixed the bfcache problem by loading
   hero.js/checkout.js only *after* an async fetch resolved,
   but gated on the fetch succeeding — so on a slow or flaky
   connection (or any fetch failure) hero.js never ran at
   all, and the cart, wishlist, search and reveal animation
   it also contains went dark for the whole visit.

   This version keeps hero.js/checkout.js/every catalog-
   reading inline script loading as plain, always-run
   <script> tags — nothing about how or whether they execute
   changes — but each of them now starts by awaiting
   window.__dataReady (set below) before touching
   window.CATALOG. That promise NEVER rejects and always
   settles (see the timeout fallback below), so those scripts
   are still guaranteed to run and see real data whenever the
   network cooperates, and safely fall back to an empty
   catalog rather than hang forever if it doesn't. No sync
   XHR anywhere, so bfcache stays intact.

   Still calls the one combined /api/public/bootstrap
   endpoint (catalog + settings + featured coupon in one
   response, built in parallel server-side) instead of three
   separate requests.
   ════════════════════════════════════════════════ */
(function () {
  'use strict';

  var FALLBACK = {
    freeShippingThreshold: 1000, defaultShippingFee: 80,
    globalSaleEnabled: false, globalSalePercent: 0,
    codEnabled: true, instapayEnabled: true, cardEnabled: true, instapayNumber: '01027380269',
    shippingRatesByGovernorate: {}
  };

  // Every page starts this same request inline in <head>, long before this
  // file downloads (see window.__bootPromise there), so by the time we get
  // here it has often already resolved or is close to it. __bootPromise
  // never rejects — it resolves null on any failure — so .then() below
  // always fires. A page that somehow never defined it (or an ad-blocker
  // that stripped the inline script) still gets a promise here instead of
  // a hard error.
  var bootPromise = window.__bootPromise || Promise.resolve(null);

  // Absolute safety net: never let a stalled/never-resolving request leave
  // the rest of the site waiting forever. 5s is generous but bounded.
  var timeout = new Promise(function (resolve) {
    setTimeout(function () { resolve(null); }, 5000);
  });

  window.__dataReady = Promise.race([bootPromise, timeout]).then(function (boot) {
    window.CATALOG = (boot && boot.catalog) || (window.CATALOG || []);
    window.SITE_SETTINGS = (boot && boot.settings) || FALLBACK;
    window.FEATURED_COUPON = (boot && boot.featuredCoupon) || null;
  });

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

  // Needs both: window.SITE_SETTINGS/FEATURED_COUPON (only real once
  // __dataReady resolves, now that the fetch is async) and __wireRolls,
  // which hero.js defines once it runs. DOMContentLoaded fires whenever the
  // browser finishes parsing regardless of the fetch, so waiting on it alone
  // is no longer enough — wait for whichever of the two settles last.
  var domReady = new Promise(function (resolve) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', resolve);
    } else {
      setTimeout(resolve, 0);
    }
  });
  Promise.all([window.__dataReady, domReady]).then(applyAll);
})();
