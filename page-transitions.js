/* ════════════════════════════════════════════════
   WATEEN PERFUMES — SITE-WIDE PAGE TRANSITIONS
   Adds a smooth fade/rise-in on load and a fade-out
   before internal navigation, so moving between pages
   feels like one continuous app instead of a hard
   reload. Pure CSS transitions (GPU-friendly, no
   layout thrash) driven by a couple of classes on
   <html>. No dependencies, ~1KB, and fully skipped
   for users who asked for reduced motion.
   ════════════════════════════════════════════════ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  // Mark the page as JS-driven so the CSS can hide the transition veil for
  // no-JS visitors (progressive enhancement — content is never blocked on
  // this script loading).
  root.classList.add('pt-ready');

  if (reduceMotion) {
    root.classList.add('pt-in');
    return;
  }

  // ---- entry: fade/rise the page in on first paint ----
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      root.classList.add('pt-in');
    });
  });

  // Pages restored from the bfcache (back/forward) already have pt-in set
  // from before, but Safari can drop it on some transitions — force it back.
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) root.classList.add('pt-in');
  });

  // ---- exit: fade the page out just before leaving, then navigate ----
  var EXIT_MS = 260;
  var navigating = false;

  function isInternalNav(a) {
    if (!a || !a.href) return false;
    if (a.target && a.target !== '' && a.target !== '_self') return false;
    if (a.hasAttribute('download')) return false;
    if (a.dataset.noTransition !== undefined) return false;
    var url;
    try { url = new URL(a.href, location.href); } catch (e) { return false; }
    if (url.origin !== location.origin) return false;
    // same-page anchors (#foo) shouldn't trigger a full-page fade
    if (url.pathname === location.pathname && url.search === location.search && url.hash) return false;
    return /\.html?$|\/$/.test(url.pathname) || url.pathname === '' || !/\.[a-z0-9]+$/i.test(url.pathname);
  }

  document.addEventListener('click', function (e) {
    if (navigating) return;
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var a = e.target.closest('a');
    if (!isInternalNav(a)) return;

    e.preventDefault();
    navigating = true;
    root.classList.add('pt-out');

    var done = false;
    function go() {
      if (done) return;
      done = true;
      location.href = a.href;
    }
    root.addEventListener('transitionend', go, { once: true });
    setTimeout(go, EXIT_MS); // safety net if transitionend doesn't fire
  }, true);
})();
