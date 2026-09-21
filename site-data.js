/* ════════════════════════════════════════════════
   WATEEN PERFUMES — LIVE SITE DATA LOADER
   Loads the real catalog, store settings, and the
   currently-featured coupon from the backend, then
   exposes them as window.CATALOG / window.SITE_SETTINGS /
   window.FEATURED_COUPON in the exact shape the rest of
   the site already expects — so hero.js, checkout.js and
   every page's inline script keep working unmodified,
   just backed by the real database.

   This used to block the page with a synchronous XHR so
   that later <script> tags could read window.CATALOG the
   instant they ran. That also permanently disables the
   browser's back/forward cache (bfcache) on every page
   that ever executes one — so every "back" press forced a
   full slow reload from the server instead of an instant
   restore, which is what made navigation feel so heavy.

   Now this fetches asynchronously (bfcache-safe) and every
   script that depends on window.CATALOG/SITE_SETTINGS is
   loaded via loadWhenDataReady() below instead of a plain
   <script src>, so it only runs once the data has actually
   arrived — same guarantee as before, just non-blocking.
   ════════════════════════════════════════════════ */
(function () {
  'use strict';

  var FALLBACK_SETTINGS = {
    freeShippingThreshold: 1000, defaultShippingFee: 80,
    globalSaleEnabled: false, globalSalePercent: 0,
    codEnabled: true, instapayEnabled: true, cardEnabled: true, instapayNumber: '01027380269',
    shippingRatesByGovernorate: {}
  };

  // Single combined request instead of three separate sequential ones —
  // the backend runs the same three queries in parallel and hands them
  // back together, so this pays for one round trip instead of three.
  var dataPromise = fetch('/api/public/bootstrap')
    .then(function (r) { return r.ok ? r.json() : null; })
    .catch(function () { return null; })
    .then(function (boot) {
      window.CATALOG = (boot && boot.catalog) || (window.CATALOG || []);
      window.SITE_SETTINGS = (boot && boot.settings) || FALLBACK_SETTINGS;
      window.FEATURED_COUPON = (boot && boot.featuredCoupon) || null;
      return boot;
    });

  // ---- public loader: any later <script> that reads window.CATALOG /
  // window.SITE_SETTINGS at parse time must be loaded through this instead
  // of a plain <script src="...">, so it only starts running once the
  // fetch above has actually populated those globals. Scripts run in the
  // order this is called, same as plain <script> tags would. ----
  var chain = dataPromise;
  window.loadWhenDataReady = function (src) {
    chain = chain.then(function () {
      return new Promise(function (resolve) {
        var s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = resolve; // don't let one failed script wedge the rest
        document.body.appendChild(s);
      });
    });
    return chain;
  };

  // ---- public loader for inline script bodies: pass a function and it
  // runs once the data is ready, in the same queued order as
  // loadWhenDataReady() calls around it. ----
  window.runWhenDataReady = function (fn) {
    chain = chain.then(fn);
    return chain;
  };

  // Exposes "every loadWhenDataReady()/runWhenDataReady() call queued so
  // far on this page has finished" as a promise. Read only after
  // DOMContentLoaded, by which point every <script> tag on the page has
  // already run and queued its own call onto `chain`, so this reliably
  // represents "the whole chain is done", not just some of it.
  window.__dataReadyChain = function () { return chain; };

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

  // Runs once every loadWhenDataReady()/runWhenDataReady() call on this
  // page has actually finished (hero.js, which defines __wireRolls,
  // included) — read via DOMContentLoaded rather than dataPromise directly,
  // so every later <script> tag on the page has had a chance to queue its
  // own call onto `chain` first, however many there turn out to be.
  function afterChain() { window.__dataReadyChain().then(applyAll); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', afterChain);
  } else {
    afterChain();
  }
})();
