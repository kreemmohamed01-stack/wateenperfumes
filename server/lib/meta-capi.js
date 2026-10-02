/* ════════════════════════════════════════════════
   META CONVERSIONS API
   Server-side copy of the Meta Pixel events (see meta-pixel.js
   on the storefront). Sending from the server as well as the
   browser means ad attribution still works for shoppers whose
   browser blocks the pixel; Meta dedupes the two copies by
   event_id.

   Configured from environment variables only — the access
   token must never reach the browser or git:
     META_PIXEL_ID          the dataset/pixel id
     META_CAPI_TOKEN        Conversions API access token
     META_TEST_EVENT_CODE   optional; routes events to the
                            "Test events" tab in Events Manager
     META_GRAPH_VERSION     optional; Graph API version
   With no token set, every call here is a silent no-op.

   Never throws: a tracking failure must not fail an order.
   ════════════════════════════════════════════════ */
const crypto = require('crypto');
const { isBotUserAgent } = require('./bot-filter');

const PIXEL_ID = process.env.META_PIXEL_ID || '2142124783046397';
const TOKEN = process.env.META_CAPI_TOKEN || '';
const GRAPH_VERSION = process.env.META_GRAPH_VERSION || 'v24.0';
const TEST_CODE = process.env.META_TEST_EVENT_CODE || '';
const TIMEOUT_MS = 4000;

// events the public relay endpoint will forward — Purchase is deliberately
// absent: only the order route may report a sale, with server-side totals.
const RELAYABLE = new Set(['PageView', 'ViewContent', 'AddToCart', 'AddToWishlist', 'InitiateCheckout', 'Search', 'Contact']);

function enabled() { return !!TOKEN; }

function sha256(v) {
  if (v === undefined || v === null) return undefined;
  const s = String(v).trim().toLowerCase();
  return s ? crypto.createHash('sha256').update(s).digest('hex') : undefined;
}

// Egyptian numbers are typed locally (01xxxxxxxxx); Meta wants them with the
// country code and digits only (201xxxxxxxxx).
function normalizePhone(p) {
  let d = String(p || '').replace(/\D/g, '');
  if (d.startsWith('0020')) d = d.slice(2);
  if (d.length === 11 && d.startsWith('01')) d = '2' + d;
  return d || undefined;
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  const ip = (fwd ? String(fwd).split(',')[0] : req.socket && req.socket.remoteAddress) || '';
  return ip.trim().replace(/^::ffff:/, '') || undefined;
}

// browser-side match keys: IP, user agent, and the _fbp/_fbc cookies the
// pixel sets on our domain (sent along because the relay is same-origin)
function requestUserData(req) {
  const cookies = req.cookies || {};
  const ud = {
    client_ip_address: clientIp(req),
    client_user_agent: req.headers['user-agent'] || undefined,
    fbp: cookies._fbp || undefined,
    fbc: cookies._fbc || undefined
  };
  Object.keys(ud).forEach(k => ud[k] === undefined && delete ud[k]);
  return ud;
}

async function sendEvents(events) {
  if (!enabled() || !events.length) return;
  const body = { data: events };
  if (TEST_CODE) body.test_event_code = TEST_CODE;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(TOKEN)}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: ctrl.signal }
    );
    if (!res.ok) console.error('[meta-capi]', res.status, (await res.text()).slice(0, 500));
  } catch (e) {
    console.error('[meta-capi]', e.name === 'AbortError' ? 'timeout' : e.message);
  } finally {
    clearTimeout(timer);
  }
}

// whitelists and clamps whatever the browser sent as custom_data
function cleanCustomData(d) {
  d = d && typeof d === 'object' ? d : {};
  const out = {};
  if (Number.isFinite(Number(d.value)) && d.value !== '' && d.value !== null) out.value = Math.max(0, Number(d.value));
  if (out.value !== undefined) out.currency = 'EGP';
  if (Array.isArray(d.content_ids)) out.content_ids = d.content_ids.slice(0, 50).map(x => String(x).slice(0, 64));
  if (typeof d.content_type === 'string') out.content_type = d.content_type === 'product_group' ? 'product_group' : 'product';
  if (typeof d.content_name === 'string') out.content_name = d.content_name.slice(0, 200);
  if (typeof d.content_category === 'string') out.content_category = d.content_category.slice(0, 100);
  if (typeof d.search_string === 'string') out.search_string = d.search_string.slice(0, 100);
  if (Number.isInteger(Number(d.num_items)) && Number(d.num_items) > 0) out.num_items = Math.min(Number(d.num_items), 999);
  if (Array.isArray(d.contents)) {
    out.contents = d.contents.slice(0, 50).map(c => ({
      id: String(c && c.id || '').slice(0, 64),
      quantity: Math.max(1, Math.min(Number(c && c.quantity) || 1, 999))
    })).filter(c => c.id);
  }
  return out;
}

/* ---------- POST /api/public/meta-event (browser relay) ---------- */
async function relayHandler(req, res) {
  // respond only after the send: on Vercel the function can be frozen as
  // soon as the response goes out. Crawlers are skipped so they never count
  // as ad traffic.
  try {
    const b = req.body || {};
    const name = String(b.eventName || '');
    const eventId = String(b.eventId || '').slice(0, 100);
    if (enabled() && RELAYABLE.has(name) && eventId && !isBotUserAgent(req.headers['user-agent'] || '')) {
      let url = typeof b.url === 'string' ? b.url.slice(0, 1000) : '';
      if (!/^https?:\/\//i.test(url)) url = req.headers.referer || '';
      await sendEvents([{
        event_name: name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: 'website',
        event_source_url: url || undefined,
        user_data: requestUserData(req),
        custom_data: cleanCustomData(b.data)
      }]);
    }
  } catch (e) {
    console.error('[meta-capi] relay', e.message);
  }
  res.status(204).end();
}

/* ---------- Purchase, sent by the order route once the order is saved ---------- */
// eventId must match what checkout.js passes to the pixel: 'purchase.' + orderNumber
async function sendPurchase(req, order) {
  if (!enabled()) return;
  const name = String(order.customer && order.customer.name || '').trim().split(/\s+/);
  const phone = normalizePhone(order.customer && order.customer.phone);
  const items = Array.isArray(order.items) ? order.items : [];

  const user = Object.assign(requestUserData(req), {
    ph: phone ? [sha256(phone)] : undefined,
    em: order.customer && order.customer.email ? [sha256(order.customer.email)] : undefined,
    fn: name[0] ? [sha256(name[0])] : undefined,
    ln: name.length > 1 ? [sha256(name[name.length - 1])] : undefined,
    ct: order.address && order.address.city ? [sha256(String(order.address.city).replace(/\s+/g, ''))] : undefined,
    st: order.address && order.address.governorate ? [sha256(String(order.address.governorate).replace(/\s+/g, ''))] : undefined,
    country: [sha256('eg')],
    external_id: phone ? [sha256(phone)] : undefined
  });
  Object.keys(user).forEach(k => user[k] === undefined && delete user[k]);

  await sendEvents([{
    event_name: 'Purchase',
    event_time: Math.floor(Date.now() / 1000),
    event_id: 'purchase.' + order.orderNumber,
    action_source: 'website',
    event_source_url: req.headers.referer || undefined,
    user_data: user,
    custom_data: {
      currency: 'EGP',
      value: Number(order.total) || 0,
      order_id: order.orderNumber,
      content_type: 'product',
      content_ids: items.map(i => String(i.productId || i.name)).slice(0, 50),
      contents: items.map(i => ({ id: String(i.productId || i.name), quantity: Number(i.qty) || 1, item_price: Number(i.unitPrice) || 0 })).slice(0, 50),
      num_items: items.reduce((s, i) => s + (Number(i.qty) || 0), 0)
    }
  }]);
}

module.exports = { relayHandler, sendPurchase, enabled };
