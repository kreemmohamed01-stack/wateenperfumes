/* ════════════════════════════════════════════════
   WATEEN PERFUMES — VISITOR TRACKING
   Sends one beacon per pageview plus a periodic heartbeat so
   the dashboard can show who's on the site right now. The
   server decides what counts as a real visitor; this only
   gathers the browser-side signals it needs to judge.
   Fails silently and never blocks the page.
   ════════════════════════════════════════════════ */
(function () {
  'use strict';

  // Respect the browser's do-not-track preference.
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return;

  var SESSION_KEY = 'wateen_session_id';
  // every 2 min — well inside the dashboard's 5-minute "online now" window,
  // at half the serverless calls of a 1-minute beat
  var HEARTBEAT_MS = 120000;

  // A session id groups this visit's pageviews together. sessionStorage means
  // it naturally ends when the tab closes, which is what a "session" should be.
  function sessionId() {
    try {
      var id = sessionStorage.getItem(SESSION_KEY);
      if (!id) {
        id = Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
        sessionStorage.setItem(SESSION_KEY, id);
      }
      return id;
    } catch (e) {
      // private mode — still trackable for this pageview, just not groupable
      return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
    }
  }

  // Signals a plain HTTP client can't produce without a real browser engine.
  function signals() {
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    return {
      webdriver: navigator.webdriver === true,
      screenW: (window.screen && window.screen.width) || 0,
      screenH: (window.screen && window.screen.height) || 0,
      tz: tz,
      lang: navigator.language || ''
    };
  }

  // only send the referrer when it came from outside the site
  function externalReferrer() {
    var r = document.referrer || '';
    if (!r) return '';
    try {
      if (new URL(r).hostname === location.hostname) return '';
    } catch (e) { return ''; }
    return r;
  }

  function send(isHeartbeat) {
    var payload = {
      path: location.pathname + location.search,
      referrer: isHeartbeat ? '' : externalReferrer(),
      sessionId: sessionId(),
      signals: signals(),
      heartbeat: !!isHeartbeat
    };

    try {
      var body = JSON.stringify(payload);
      // sendBeacon survives the page being closed mid-request; fetch is the
      // fallback for browsers that don't have it.
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics/collect', new Blob([body], { type: 'application/json' }));
      } else {
        fetch('/api/analytics/collect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body,
          keepalive: true
        }).catch(function () {});
      }
    } catch (e) { /* tracking must never break the page */ }
  }

  send(false);

  // keep the "online now" count fresh while the tab is actually visible
  var timer = setInterval(function () {
    if (document.visibilityState === 'visible') send(true);
  }, HEARTBEAT_MS);

  window.addEventListener('pagehide', function () { clearInterval(timer); });
})();
