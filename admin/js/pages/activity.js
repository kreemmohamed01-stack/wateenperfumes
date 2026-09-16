/* ════════════════════════════════════════════════
   ACTIVITY LOG PAGE
   ════════════════════════════════════════════════ */
let activityState = { page: 1, q: '' };

window.PageActivity = async function () {
  const el = document.getElementById('pageContent');
  el.innerHTML = `
    <div class="pageHead"><div><h2 class="pageHead__title">Activity Log</h2><p class="pageHead__sub">Every action taken by staff in this dashboard.</p></div></div>
    <div class="panel">
      <div class="toolbar">
        <div class="toolbar__search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3" stroke-linecap="round"/></svg>
          <input type="text" id="actSearch" placeholder="Search actions…">
        </div>
      </div>
      <div class="tableWrap"><table class="dt">
        <thead><tr><th>Staff</th><th>Action</th><th>Description</th><th>Date</th></tr></thead>
        <tbody id="actBody"><tr><td colspan="4">${skeletonRows(10)}</td></tr></tbody>
      </table></div>
      <div class="pager" id="actPager"></div>
    </div>
  `;
  document.getElementById('actSearch').addEventListener('input', debounce(e => { activityState.q = e.target.value; activityState.page = 1; loadActivity(); }, 350));
  await loadActivity();
};

async function loadActivity() {
  const body = document.getElementById('actBody');
  body.innerHTML = `<tr><td colspan="4">${skeletonRows(10)}</td></tr>`;
  const data = await api.get('/activity' + qs({ q: activityState.q, page: activityState.page, pageSize: 30 }));
  if (!data.items.length) { body.innerHTML = `<tr><td colspan="4">${emptyState('', 'No activity recorded yet', '')}</td></tr>`; document.getElementById('actPager').innerHTML=''; return; }
  body.innerHTML = data.items.map(a => `
    <tr>
      <td><b>${escapeHtml(a.user_name || 'System')}</b></td>
      <td class="muted">${escapeHtml(a.action)}</td>
      <td>${escapeHtml(a.description)}</td>
      <td class="muted">${fmtDate(a.created_at)}</td>
    </tr>`).join('');
  renderPager('actPager', data, p => { activityState.page = p; loadActivity(); });
}
