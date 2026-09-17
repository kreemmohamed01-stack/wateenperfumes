/* ════════════════════════════════════════════════
   BOT DETECTION
   The store owner only wants real people in the visitor
   numbers, so this errs on the side of rejecting: anything
   that looks even slightly automated is dropped rather than
   risk inflating the count. A missed human is a small loss;
   a counted bot makes the whole metric worthless.
   ════════════════════════════════════════════════ */

// Substrings that appear in the user-agent of crawlers, scrapers, monitors,
// headless browsers and HTTP libraries. Matched case-insensitively.
const BOT_UA_PATTERNS = [
  // generic self-identifiers
  'bot', 'crawler', 'spider', 'crawling', 'scraper', 'fetcher', 'archiver',
  // search engines
  'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 'yandex',
  'sogou', 'exabot', 'ia_archiver', 'applebot', 'petalbot', 'seznambot',
  // social / link unfurlers
  'facebookexternalhit', 'facebot', 'twitterbot', 'linkedinbot', 'slackbot',
  'telegrambot', 'whatsapp', 'discordbot', 'pinterest', 'redditbot',
  'embedly', 'quora link preview', 'skypeuripreview', 'vkshare',
  // SEO / marketing crawlers
  'ahrefsbot', 'semrushbot', 'mj12bot', 'dotbot', 'rogerbot', 'screaming frog',
  'dataforseo', 'serpstat', 'blexbot', 'megaindex', 'seokicks', 'sistrix',
  // uptime / monitoring / preview services
  'pingdom', 'uptimerobot', 'statuscake', 'site24x7', 'newrelic', 'datadog',
  'gtmetrix', 'lighthouse', 'pagespeed', 'chrome-lighthouse', 'vercel-screenshot',
  'better uptime', 'hetrixtool', 'monitis',
  // headless / automation
  'headlesschrome', 'phantomjs', 'selenium', 'webdriver', 'puppeteer',
  'playwright', 'cypress', 'electron',
  // HTTP clients / libraries
  'curl', 'wget', 'python-requests', 'python-urllib', 'aiohttp', 'httpx',
  'go-http-client', 'java/', 'okhttp', 'apache-httpclient', 'axios',
  'node-fetch', 'got ', 'guzzlehttp', 'libwww-perl', 'ruby', 'scrapy',
  'postman', 'insomnia', 'restsharp', 'httpie',
  // AI / LLM crawlers
  'gptbot', 'chatgpt-user', 'ccbot', 'anthropic', 'claudebot', 'perplexitybot',
  'google-extended', 'bytespider', 'amazonbot', 'diffbot', 'omgili',
  // misc
  'feedfetcher', 'rss', 'validator', 'w3c_', 'checkmarknetwork', 'zgrab',
  'masscan', 'nmap', 'censys', 'shodan', 'expanse'
];

/** True when the user-agent string looks automated. */
function isBotUserAgent(ua) {
  if (!ua) return true; // real browsers always send one
  const s = String(ua).toLowerCase();
  return BOT_UA_PATTERNS.some(p => s.includes(p));
}

/**
 * A real browser sends a recognisable engine token. Anything that claims to be
 * a browser but carries none of these is almost certainly spoofed, so this acts
 * as a second gate behind the blocklist above.
 */
function looksLikeRealBrowser(ua) {
  if (!ua) return false;
  const s = String(ua).toLowerCase();
  const hasEngine =
    s.includes('mozilla/') || s.includes('applewebkit') ||
    s.includes('gecko') || s.includes('webkit') || s.includes('trident');
  return hasEngine && s.length >= 25;
}

/**
 * Chromium sends Sec-Fetch-* on real navigations. A request claiming to be
 * Chrome with no Sec-Fetch-Site and no Accept-Language is not a real tab.
 */
function hasBrowserHeaders(headers) {
  if (!headers) return false;
  const ua = String(headers['user-agent'] || '').toLowerCase();
  const isChromium = ua.includes('chrome/') || ua.includes('edg/');
  if (!isChromium) return true; // Safari/Firefox vary too much to demand this
  return Boolean(headers['sec-fetch-site'] || headers['accept-language']);
}

/**
 * Final verdict for a request. `signals` carries the browser-side checks the
 * tracking beacon collected, which a plain HTTP client can't fake without
 * running a real DOM.
 */
function isRealVisitor(req, signals) {
  const ua = req.headers['user-agent'];

  if (isBotUserAgent(ua)) return { ok: false, reason: 'ua-blocklist' };
  if (!looksLikeRealBrowser(ua)) return { ok: false, reason: 'ua-not-browser' };
  if (!hasBrowserHeaders(req.headers)) return { ok: false, reason: 'missing-headers' };

  // Chromium exposes navigator.webdriver on automated sessions
  if (signals && signals.webdriver === true) return { ok: false, reason: 'webdriver' };

  // a real device reports a screen and a timezone
  if (signals) {
    if (signals.screenW != null && Number(signals.screenW) <= 0) return { ok: false, reason: 'no-screen' };
    if (signals.tz === '') return { ok: false, reason: 'no-timezone' };
  }

  return { ok: true, reason: null };
}

/** Coarse device bucket for the dashboard breakdown. */
function deviceType(ua) {
  const s = String(ua || '').toLowerCase();
  if (/ipad|tablet|playbook|silk/.test(s)) return 'tablet';
  if (/mobi|iphone|android|phone/.test(s)) return 'mobile';
  return 'desktop';
}

module.exports = { isRealVisitor, isBotUserAgent, deviceType };
