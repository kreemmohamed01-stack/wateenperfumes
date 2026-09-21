/* ════════════════════════════════════════════════
   WATEEN PERFUMES — SITE-WIDE PAGE TRANSITIONS
   A brief loading veil plus a soft fade-in, both purely
   visual. Nothing here ever intercepts a click or delays
   a navigation, so links, back and forward stay exactly
   as fast as the browser makes them.

   Timing matters a lot here. An earlier version revealed
   the page on window "load", which waits for every image
   on the page — the homepage has ~70 — so on a phone the
   whole site sat behind a blank veil for many seconds.
   The veil now clears as soon as the DOM is parsed and
   the page's own data is in (DOMContentLoaded), which is
   the moment the page is genuinely usable. Images stream
   in afterwards on their own, as they always did.
   ════════════════════════════════════════════════ */
(function () {
  'use strict';

  var root = document.documentElement;

  // Marks <html> immediately — this is what makes the CSS paint the plain
  // dark veil (html.pt-ready::before/::after) before <body> even exists.
  root.classList.add('pt-ready');

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

  function hideLoaderMark() {
    var el = document.getElementById('ptLoader');
    if (el) el.classList.add('is-hidden');
  }

  var revealed = false;
  function revealOnce() {
    if (revealed) return;
    revealed = true;
    root.classList.add('pt-in');
    hideLoaderMark();
  }

  // <body> doesn't exist the instant this script runs (it sits right after
  // <meta charset>), so poll briefly for it. If the page turns out to be
  // ready before the veil mark is even injected, skip injecting it at all —
  // flashing a spinner onto an already-finished page is worse than no
  // spinner.
  if (document.body) {
    injectLoaderMark();
  } else {
    var poll = setInterval(function () {
      if (!document.body) return;
      clearInterval(poll);
      if (!revealed) injectLoaderMark();
    }, 4);
  }

  // ---- readiness ----
  // DOMContentLoaded: markup parsed, and site-data.js (which runs inline
  // near the end of <body>) has already populated the catalog by then, so
  // the page is genuinely usable. Deliberately NOT window "load", which
  // would wait on every image and keep the site hidden for seconds.
  // The timeout is only a safety net for a stalled parse.
  var MAX_WAIT_MS = 2500;

  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    revealOnce();
  } else {
    document.addEventListener('DOMContentLoaded', revealOnce);
    setTimeout(revealOnce, MAX_WAIT_MS);
  }

  // bfcache restore (back/forward) re-fires pageshow on the same document —
  // reveal instantly, no fade, no veil.
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      revealed = true;
      root.classList.add('pt-in');
      hideLoaderMark();
    }
  });
})();
