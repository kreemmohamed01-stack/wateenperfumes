/* ════════════════════════════════════════════════
   SHARED UI HELPERS — toasts, confirm modal, generic modal
   ════════════════════════════════════════════════ */

const ICONS = {
  success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12.5 4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01" stroke-linecap="round"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01" stroke-linecap="round"/></svg>'
};

function ensureToastRoot() {
  let root = document.querySelector('.toasts');
  if (!root) { root = document.createElement('div'); root.className = 'toasts'; document.body.appendChild(root); }
  return root;
}

function toast(message, type) {
  type = type || 'info';
  const root = ensureToastRoot();
  const el = document.createElement('div');
  el.className = 'toast toast--' + type;
  el.innerHTML = '<span class="toast__icon">' + ICONS[type] + '</span><span>' + escapeHtml(message) + '</span>' +
    '<button class="toast__close" aria-label="Dismiss"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg></button>';
  root.appendChild(el);
  const remove = () => { el.style.opacity = '0'; setTimeout(() => el.remove(), 200); };
  el.querySelector('.toast__close').addEventListener('click', remove);
  setTimeout(remove, 4200);
}

function openModal(html, opts) {
  opts = opts || {};
  const scrim = document.createElement('div');
  scrim.className = 'modalScrim';
  scrim.innerHTML = '<div class="modal ' + (opts.size === 'lg' ? 'modal--lg' : '') + '">' + html + '</div>';
  document.body.appendChild(scrim);
  requestAnimationFrame(() => scrim.classList.add('is-on'));

  function close() {
    scrim.classList.remove('is-on');
    setTimeout(() => scrim.remove(), 180);
    document.removeEventListener('keydown', onKey);
  }
  function onKey(e) { if (e.key === 'Escape' && !opts.persistent) close(); }
  document.addEventListener('keydown', onKey);

  scrim.addEventListener('mousedown', (e) => { if (e.target === scrim && !opts.persistent) close(); });
  scrim.querySelectorAll('[data-modal-close]').forEach(btn => btn.addEventListener('click', close));

  return { el: scrim, close };
}

function confirmModal({ title, message, confirmLabel, danger }) {
  return new Promise((resolve) => {
    const modal = openModal(`
      <div class="modal__head"><h3 class="modal__title">${escapeHtml(title)}</h3>
        <button class="modal__close" data-modal-close aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width:16px;height:16px"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg></button></div>
      <div class="modal__body"><p style="margin:0;font-size:13px;color:var(--ink-soft)">${escapeHtml(message)}</p></div>
      <div class="modal__foot">
        <button class="btn btn--ghost" data-act="cancel">Cancel</button>
        <button class="btn ${danger ? 'btn--danger' : 'btn--primary'}" data-act="confirm">${escapeHtml(confirmLabel || 'Confirm')}</button>
      </div>
    `);
    modal.el.querySelector('[data-act="cancel"]').addEventListener('click', () => { modal.close(); resolve(false); });
    modal.el.querySelector('[data-act="confirm"]').addEventListener('click', () => { modal.close(); resolve(true); });
  });
}

function skeletonRows(n) {
  return Array.from({ length: n || 5 }).map(() => '<div class="skeleton skeletonRow"></div>').join('');
}

function emptyState(icon, title, sub) {
  return `<div class="empty">${icon || ''}<b>${escapeHtml(title)}</b><span>${escapeHtml(sub || '')}</span></div>`;
}

function debounce(fn, ms) {
  let t;
  return function (...args) { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), ms); };
}
