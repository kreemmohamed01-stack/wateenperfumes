/* ════════════════════════════════════════════════
   ADMIN API CLIENT
   Thin wrapper around fetch: sends the session cookie,
   throws readable errors, and centralises the base path
   so every page calls the same real backend.
   ════════════════════════════════════════════════ */
const API_BASE = '/api';

async function apiRequest(method, path, body, opts) {
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
