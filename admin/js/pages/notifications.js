/* ════════════════════════════════════════════════
   NOTIFICATIONS PAGE
   ════════════════════════════════════════════════ */
const NOTIF_ICON = {
  new_order: '📦', low_stock: '⚠️', out_of_stock: '⛔', new_customer: '👤',
  new_review: '⭐', payment_received: '💳', cancelled_order: '✕', refund: '↩'
};

window.PageNotifications = async function () {
  const el = document.getElementById('pageContent');
  el.innerHTML = `
    <div class="pageHead">
      <div><h2 class="pageHead__title">Notifications</h2><p class="pageHead__sub">Everything that needs your attention.</p></div>
      <div class="pageHead__acts"><button class="btn btn--ghost" id="markAllReadBtn">Mark all as read</button></div>
    </div>
    <div class="panel"><div id="notifList">${skeletonRows(6)}</div></div>
  `;
  document.getElementById('markAllReadBtn').addEventListener('click', async () => {
    await api.put('/notifications/read-all');
    loadNotifList();
    refreshNotifBadge();
  });
  await loadNotifList();
};

async function loadNotifList() {
  const data = await api.get('/notifications');
  const box = document.getElementById('notifList');
  if (!data.items.length) { box.innerHTML = emptyState('', 'No notifications yet', ''); return; }
  box.innerHTML = data.items.map(n => `
    <div class="hstack" data-notif="${n.id}" data-link="${n.link||''}" style="padding:14px 20px;border-bottom:1px solid var(--line-soft);cursor:pointer;${n.isRead?'':'background:rgba(21,85,54,.06)'}">
      <span style="font-size:18px">${NOTIF_ICON[n.type]||'🔔'}</span>
      <div style="flex:1"><b style="font-size:12.5px">${escapeHtml(n.title)}</b><div class="muted" style="font-size:11.5px">${escapeHtml(n.body||'')}</div></div>
      <span class="muted" style="font-size:10.5px;white-space:nowrap">${fmtDate(n.createdAt)}</span>
      ${!n.isRead ? '<span style="width:8px;height:8px;border-radius:50%;background:var(--gold-deep)"></span>' : ''}
    </div>`).join('');

  box.querySelectorAll('[data-notif]').forEach(row => row.addEventListener('click', async () => {
    await api.put('/notifications/' + row.dataset.notif + '/read');
    if (row.dataset.link) window.location.hash = '#' + row.dataset.link;
    else loadNotifList();
    refreshNotifBadge();
  }));
}
