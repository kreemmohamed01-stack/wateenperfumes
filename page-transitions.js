/* ════════════════════════════════════════════════
   WATEEN PERFUMES — SITE-WIDE PAGE TRANSITIONS
   Two things, both purely visual — neither ever delays
   or intercepts navigation itself, so back/forward and
   link clicks stay as fast as the browser makes them
   (including instant bfcache restores):

   1. A full-screen loading veil. The plain dark layer is
      painted by CSS alone (html.pt-ready::before/::after
      in page-transitions.css) the instant this script
      runs — before <body> even exists, since this file is
      linked at the very top of <head>. The wordmark +
      spinner on top of it are injected here as the first
      element in <body>, the moment the parser reaches it
      (a few milliseconds later at most). The whole veil
      stays up until the page is actually ready (fonts,
      images and this page's own data fetch have all
      settled — see revealOnce() below), not just once the
      browser has painted an empty shell.

   2. A soft fade/rise-in for the page content itself once
      that happens.

   No dependencies, fully skipped (motion-wise) for users
   who asked for reduced motion — the veil still shows and
   clears either way, just without the spin/slide.
   ════════════════════════════════════════════════ */
(function () {
  'use strict';

  var root = document.documentElement;

  // Marks <html> immediately — this alone is what makes the CSS paint the
  // plain dark veil (html.pt-ready::before/::after), before <body> exists.
  root.classList.add('pt-ready');

  // ---- inject the wordmark + spinner as the first element in <body> ----
  function injectLoaderMark() {
    if (document.getElementById('ptLoader') || !document.body) return;
    var el = document.createElement('div');
    el.id = 'ptLoader';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML =
      '<div class="ptLoader__inner">' +
        '<div class="ptLoader__ring">' +
          '<svg viewBox="0 0 40 40">' +
            '<circle class="ptLoader__track" cx="20" cy="20" r="18"></circle>' +
            '<circle class="ptLoader__arc" cx="20" cy="20" r="18"></circle>' +
          '</svg>' +
        '</div>' +
        '<p class="ptLoader__mark">WATE<i>E</i>N</p>' +
      '</div>';
    document.body.insertBefore(el, document.body.firstChild);
  }

  // <body> doesn't exist the instant this script runs (it's placed right
  // after <meta charset>, before <body> opens), so poll very briefly for
  // it — the parser reaches <body> within a few milliseconds of this
  // script finishing, well before the page has anything worth seeing.
  if (document.body) {
    injectLoaderMark();
  } else {
    var poll = setInterval(function () {
      if (document.body) { clearInterval(poll); injectLoaderMark(); }
    }, 4);
  }

  function hideLoaderMark() {
    var el = document.getElementById('ptLoader');
    if (el) el.classList.add('is-hidden');
  }

  function reveal() {
    root.classList.add('pt-in');
    hideLoaderMark();
  }

  // ---- readiness: window 'load' (fonts, images, and this page's own
  // synchronous data fetch in site-data.js have all settled by then) —
  // with a hard cap so a slow third-party asset can never leave the veil
  // stuck on screen indefinitely. ----
  var MAX_WAIT_MS = 4000;
  var revealed = false;
  function revealOnce() {
    if (revealed) return;
    revealed = true;
    reveal();
  }

  if (document.readyState === 'complete') {
    revealOnce();
  } else {
    window.addEventListener('load', revealOnce);
    setTimeout(revealOnce, MAX_WAIT_MS);
  }

  // Every bfcache restore (back/forward) re-fires "pageshow" with
  // persisted=true on the exact same document — reveal it again straight
  // away (loader included, in case it somehow didn't finish clearing) so
  // the page is instantly visible, not re-run the fade-in.
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) { root.classList.add('pt-in'); hideLoaderMark(); }
  });
})();
