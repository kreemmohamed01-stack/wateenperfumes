/* ════════════════════════════════════════════════
   ADMIN API CLIENT
   Thin wrapper around fetch: sends the session cookie,
   throws readable errors, and centralises the base path
   so every page calls the same real backend.
   ════════════════════════════════════════════════ */
const API_BASE = '/api';

// short-lived cache for lookups that barely change (categories, brands) —
// every Products page visit was re-fetching both from scratch, adding a
// full network round trip (cold Vercel function + Neon query) that a
// 60-second cache makes disappear for anyone browsing normally.
const CACHEABLE_GET_PATHS = ['/categories', '/brands'];
const CACHE_TTL_MS = 60000;
const _getCache = new Map();

function cacheKeyFor(path) {
  return CACHEABLE_GET_PATHS.find(p => path === p || path.startsWith(p + '?'));
}

function invalidateCache(path) {
  // a write to /categories or /brands (create/update/delete/reorder) invalidates that lookup
  for (const key of [..._getCache.keys()]) {
    if (path.startsWith(key)) _getCache.delete(key);
  }
}

async function apiRequest(method, path, body, opts) {
  const cacheKey = method === 'GET' ? cacheKeyFor(path) : null;
  if (cacheKey) {
    const hit = _getCache.get(path);
    if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.data;
  }

  const isForm = body instanceof FormData;
  const res = await fetch(API_BASE + path, {
    method,
    credentials: 'include',
    headers: isForm ? undefined : (body !== undefined ? { 'Content-Type': 'application/json' } : undefined),
    body: isForm ? body : (body !== undefined ? JSON.stringify(body) : undefined)
  });

  if (res.status === 401 && !(opts && opts.silentAuth)) {
    if (window.location.pathname !== '/admin/login.html') {
      window.location.href = '/admin/login.html';
    }
    throw new Error('Not authenticated.');
  }

  let data = null;
  const text = await res.text();
  if (text) { try { data = JSON.parse(text); } catch (e) { data = null; } }

  if (!res.ok) {
    const message = (data && data.error) || ('Request failed (' + res.status + ').');
    throw new Error(message);
  }

  if (cacheKey) _getCache.set(path, { data, at: Date.now() });
  else if (method !== 'GET') invalidateCache(path);

  return data;
}

const api = {
  get:    (path) => apiRequest('GET', path),
  post:   (path, body) => apiRequest('POST', path, body),
  put:    (path, body) => apiRequest('PUT', path, body),
  del:    (path) => apiRequest('DELETE', path),
  getSilent: (path) => apiRequest('GET', path, undefined, { silentAuth: true })
};

function qs(params) {
  const usp = new URLSearchParams();
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') usp.set(k, v);
  });
  const s = usp.toString();
  return s ? '?' + s : '';
}

function fmtMoney(n) {
  return Math.round(n || 0).toLocaleString('en-US') + ' EGP';
}
function fmtNumber(n) {
  return Math.round(n || 0).toLocaleString('en-US');
}
function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso.replace(' ', 'T') + 'Z');
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}
function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// product/brand/category images are either a full Cloudinary URL (new
// uploads) or a legacy relative path like "assets/products/x.png" (from
// the original catalog) — only the relative kind needs a leading slash.
function resolveImageUrl(url) {
  if (!url) return '';
  return /^https?:\/\//i.test(url) ? url : '/' + url;
}
