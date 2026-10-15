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

  // Only the first page of a visit gets the full branded veil (wordmark +
  // spinner). Every page after that is usually served from cache in a blink,
  // so re-showing the loader there just made moving around feel slow —
  // those get a short plain fade instead (html.pt-fast in the CSS).
  var fast = false;
  try {
    fast = sessionStorage.getItem('wm_pt_seen') === '1';
    sessionStorage.setItem('wm_pt_seen', '1');
  } catch (e) { /* private mode: keep the full veil */ }

  // Marks <html> immediately — this is what makes the CSS paint the plain
  // dark veil (html.pt-ready::before/::after) before <body> even exists.
  root.classList.add('pt-ready');
  if (fast) root.classList.add('pt-fast');

  // Fetch the next page's HTML as soon as a shopper hovers (or starts
  // tapping) a link, so by the time the click lands it's already here.
  // Prefetch only downloads the document — it never runs its scripts — so
  // it can't fire Meta pixel / analytics events for pages nobody opened.
  // Browsers without Speculation Rules simply ignore this.
  try {
    if (HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules')) {
      var rules = document.createElement('script');
      rules.type = 'speculationrules';
      rules.textContent = JSON.stringify({
        prefetch: [{
          source: 'document',
          where: { and: [
            { href_matches: ['/*', '/*\\?*'] },
            { not: { href_matches: ['/admin/*', '/admin/*\\?*', '/api/*', '/api/*\\?*'] } }
          ] },
          eagerness: 'moderate'
        }]
      });
      document.head.appendChild(rules);
    }
  } catch (e) { /* purely an optimisation */ }

  /* ---------- brand intro video (first page of a visit only) ----------
     A 5s logo reveal played over the site while the page loads underneath,
     so it never adds to load time. Skipped for reduced-motion / data-saver
     visitors, and abandoned if it can't start within START_TIMEOUT_MS on a
     slow connection — the site is shown instead of a stalled intro. The file
     is cached for a year (vercel.json), so it's downloaded once per visitor.
     Browsers only allow sound without a tap when the visitor has played
     media on this site before; otherwise it starts muted with a sound
     button, which replays it from the start with sound. */
  var INTRO_SRC = '/assets/intro.mp4';
  var START_TIMEOUT_MS = 2500;
  var MAX_SHOW_MS = 8000; // hard cap if playback stalls mid-way on a weak connection
  var intro = null;

  function wantsIntro() {
    if (fast) return false;
    try {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
      if (navigator.connection && navigator.connection.saveData) return false;
    } catch (e) {}
    return true;
  }

  function closeIntro() {
    if (!intro || intro.classList.contains('is-out')) return;
    var el = intro;
    el.classList.add('is-out');
    try { el.querySelector('video').pause(); } catch (e) {}
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 700);
  }

  function injectIntro() {
    if (intro || !document.body || !wantsIntro()) return !!intro;
    intro = document.createElement('div');
    intro.id = 'wmIntro';
    intro.innerHTML =
      '<video playsinline preload="auto" poster="/assets/intro-poster.webp" src="' + INTRO_SRC + '"></video>' +
      '<button type="button" class="wmIntro__sound" hidden aria-label="Play with sound">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>' +
        '<span>SOUND</span>' +
      '</button>' +
      '<button type="button" class="wmIntro__skip">SKIP</button>';
    // on <html>, not <body>: body starts transparent and transformed while
    // the page loads, which would hide the intro and re-anchor its fixed
    // positioning to body's (possibly wider) box
    root.appendChild(intro);

    var video = intro.querySelector('video');
    var soundBtn = intro.querySelector('.wmIntro__sound');
    var started = false;
    var cap = setTimeout(closeIntro, MAX_SHOW_MS);

    video.addEventListener('playing', function () { started = true; }, { once: true });
    video.addEventListener('ended', closeIntro);
    video.addEventListener('error', closeIntro);
    intro.querySelector('.wmIntro__skip').addEventListener('click', closeIntro);
    soundBtn.addEventListener('click', function () {
      video.muted = false;
      video.currentTime = 0;
      clearTimeout(cap);
      cap = setTimeout(closeIntro, MAX_SHOW_MS);
      soundBtn.hidden = true;
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    });

    // try with sound first; if the browser refuses, fall back to muted
    video.muted = false;
    var p = video.play();
    if (p && p.catch) {
      p.catch(function () {
        video.muted = true;
        soundBtn.hidden = false;
        var p2 = video.play();
        if (p2 && p2.catch) p2.catch(closeIntro);
      });
    }

    setTimeout(function () { if (!started) closeIntro(); }, START_TIMEOUT_MS);
    return true;
  }

  function injectLoaderMark() {
    if (injectIntro()) return;
    if (fast || document.getElementById('ptLoader') || !document.body) return;
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
      else injectIntro();
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
      if (intro && intro.parentNode) intro.parentNode.removeChild(intro);
    }
  });
})();
