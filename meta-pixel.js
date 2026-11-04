/* ════════════════════════════════════════════════
   WATEEN PERFUMES — META PIXEL + CONVERSIONS API
   Loads Meta's pixel (fbevents.js) and exposes one helper,
   window.wmTrack(eventName, data), that every page script
   calls for shopping events (ViewContent, AddToCart, ...).

   Each event is sent twice with the SAME event_id:
     1. from the browser, via fbq()
     2. from our server, via POST /api/public/meta-event,
        which forwards it to Meta's Conversions API
   Meta deduplicates the pair by event_id, so it's counted
   once — but still arrives when an ad-blocker or iOS
   privacy settings stop the browser copy.

   Purchase fires only after the server confirms an order was
   saved (checkout.js), once per order. The server sends its CAPI copy
   itself when the order is saved (see server/routes/orders.js),
   so the browser only fires the pixel half here.

   The access token for the Conversions API lives ONLY in the
   server's environment variables (META_CAPI_TOKEN) — never here.

   Loaded async from <head>; pages define a tiny queueing
   stub for wmTrack first, so calls made before this file
   arrives are queued and replayed below, not lost.
   ════════════════════════════════════════════════ */
(function () {
  'use strict';

  var PIXEL_ID = '2142124783046397';

  // events the server relay accepts — keep in sync with server/lib/meta-capi.js
  var RELAYED = { PageView: 1, ViewContent: 1, AddToCart: 1, AddToWishlist: 1, InitiateCheckout: 1, Search: 1, Contact: 1 };

  /* ---------- Meta's standard base code ---------- */
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
    n.queue = [];
    // Meta's script (~260 KB with its config) is fetched only once the page has
    // finished loading and the browser is idle, or on the shopper's first tap /
    // scroll — whichever comes first — so it never competes with the page's own
    // content for bandwidth or CPU. fbq() calls queue up until then, and every
    // event (except Purchase) also goes out at once through the server relay.
    var loaded = false;
    function inject() {
      if (loaded) return; loaded = true;
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }
    function soon() {
      if (f.requestIdleCallback) f.requestIdleCallback(inject, { timeout: 2500 });
      else setTimeout(inject, 1200);
    }
    if (b.readyState === 'complete') soon(); else f.addEventListener('load', soon);
    ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (ev) {
      f.addEventListener(ev, inject, { once: true, passive: true });
    });
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  // Turn off Meta's "automatic events": left on, the pixel guesses events from
  // button clicks — every tap on PLACE ORDER / SECURE CHECKOUT got reported as
  // a Purchase even when the form didn't validate and no order was created,
  // inflating sales in Ads Manager. Every event is sent explicitly below.
  fbq('set', 'autoConfig', false, PIXEL_ID);
  fbq('init', PIXEL_ID);

  function newEventId(name) {
    return name + '.' + Date.now().toString(36) + '.' + Math.random().toString(36).slice(2, 10);
  }

  function relay(name, eventId, data) {
    try {
      var body = JSON.stringify({
        eventName: name,
        eventId: eventId,
        url: location.href,
        data: data || {}
      });
      // same-origin, so the _fbp/_fbc cookies the pixel sets ride along and
      // the server can pass them to Meta for better matching
      fetch('/api/public/meta-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
        keepalive: true,
        credentials: 'same-origin'
      }).catch(function () {});
    } catch (e) { /* tracking must never break the page */ }
  }

  // opts.eventId lets a caller pin the id (Purchase uses the order number so
  // it matches the server's copy); opts.browserOnly skips the relay.
  function track(name, data, opts) {
    opts = opts || {};
    var eventId = opts.eventId || newEventId(name);
    try { fbq('track', name, data || {}, { eventID: eventId }); } catch (e) {}
    if (!opts.browserOnly && RELAYED[name]) relay(name, eventId, data);
    return eventId;
  }

  var queued = window.__wmQ || [];
  window.wmTrack = track;
  window.__wmQ = { push: function (args) { track.apply(null, args); } };

  track('PageView');
  for (var i = 0; i < queued.length; i++) track.apply(null, queued[i]);

  /* ---------- Contact: taps on any WhatsApp / phone link ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (/wa\.me|whatsapp\.com|^tel:/i.test(href)) track('Contact', { content_name: /^tel:/i.test(href) ? 'phone' : 'whatsapp' });
  }, true);
})();
