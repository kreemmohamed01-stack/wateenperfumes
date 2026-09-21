/* ════════════════════════════════════════════════
   WATEEN PERFUMES — SITE-WIDE PAGE TRANSITIONS
   Adds a smooth fade/rise-in on load, purely visual —
   it never delays or intercepts navigation itself, so
   back/forward and link clicks stay as fast as the
   browser's native bfcache restore. CSS-only opacity/
   transform, no dependencies, ~0.5KB, fully skipped
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

  function reveal() {
    root.classList.add('pt-in');
  }

  if (reduceMotion) {
    reveal();
    return;
  }

  // Entry: fade/rise the page in on first paint. Runs immediately — this is
  // the only thing this script does. It never touches link clicks, never
  // delays navigation, and never blocks the browser's instant bfcache
  // restore on back/forward.
  requestAnimationFrame(function () {
    requestAnimationFrame(reveal);
  });

  // Every bfcache restore (back/forward) re-fires "pageshow" with
  // persisted=true on the exact same document — reveal it again straight
  // away so the page is instantly visible, not re-run the fade-in.
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) reveal();
  });
})();
