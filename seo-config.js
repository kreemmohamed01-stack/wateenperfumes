/* ════════════════════════════════════════════════
   WATEEN PERFUMES — SEO CONFIG
   Single place to hold the production domain. Swap
   SITE_URL to the real domain once it's purchased —
   every canonical/OG/Twitter/JSON-LD tag that uses
   data-seo-url (see updateSeoUrls() below) and every
   dynamic tag set by product.html/brand.html reads
   from here, so one edit here is all it takes.
   ════════════════════════════════════════════════ */
(function () {
  var SITE_URL = 'https://www.wateenperfumeseg.com';
  var SITE_NAME = 'Wateen Perfumes';

  window.SEO = {
    siteUrl: SITE_URL,
    siteName: SITE_NAME,
    // resolves a site-root-relative path ("/shop.html", "assets/logo.png") to an absolute URL
    abs: function (path) {
      if (!path) return SITE_URL + '/';
      if (/^https?:\/\//i.test(path)) return path;
      return SITE_URL + '/' + String(path).replace(/^\/+/, '');
    }
  };

  // Any tag authored with a relative/placeholder value tagged data-seo-url="1"
  // gets rewritten to an absolute URL against SITE_URL on load, so the static
  // HTML markup itself never has to hardcode the domain.
  document.addEventListener('DOMContentLoaded', function () {
    var nodes = document.querySelectorAll('[data-seo-url]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var attr = el.tagName === 'META' ? 'content' : 'href';
      var val = el.getAttribute(attr);
      if (val) el.setAttribute(attr, window.SEO.abs(val));
    }
  });
})();
