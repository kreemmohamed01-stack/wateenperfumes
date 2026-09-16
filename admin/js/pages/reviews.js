/* ════════════════════════════════════════════════
   REVIEWS PAGE
   ════════════════════════════════════════════════ */
let reviewsState = { status: '', page: 1 };

window.PageReviews = async function () {
  const el = document.getElementById('pageContent');
  el.innerHTML = `
    <div class="pageHead"><div><h2 class="pageHead__title">Reviews</h2><p class="pageHead__sub">Moderate customer reviews before they go live.</p></div></div>
    <div class="kpiGrid" id="reviewKpis"></div>
    <div class="panel">
      <div class="toolbar">
        <select id="reviewStatusFilter">
          <option value="">All statuses</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option><option value="hidden">Hidden</option>
        </select>
      </div>
      <div class="tableWrap"><table class="dt">
        <thead><tr><th>Product</th><th>Customer</th><th>Rating</th><th>Review</th><th>Date</th><th>Status</th><th></th></tr></thead>
        <tbody id="reviewsBody"><tr><td colspan="7">${skeletonRows(6)}</td></tr></tbody>
      </table></div>
      <div class="pager" id="reviewsPager"></div>
    </div>
  `;
  document.getElementById('reviewStatusFilter').addEventListener('change', e => { reviewsState.status = e.target.value; reviewsState.page = 1; loadReviews(); });
  await loadReviews();
};

async function loadReviews() {
  const body = document.getElementById('reviewsBody');
  body.innerHTML = `<tr><td colspan="7">${skeletonRows(6)}</td></tr>`;
  const data = await api.get('/reviews' + qs({ status: reviewsState.status, page: reviewsState.page, pageSize: 15 }));

  document.getElementById('reviewKpis').innerHTML = `
    <div class="kpi"><div class="kpi__label">Total Reviews</div><div class="kpi__value">${data.stats.total}</div></div>
    <div class="kpi"><div class="kpi__label">Average Rating</div><div class="kpi__value">${Number(data.stats.avgRating).toFixed(1)} ★</div></div>
    <div class="kpi"><div class="kpi__label">Pending Approval</div><div class="kpi__value">${data.stats.pending}</div></div>
  `;

  if (!data.items.length) { body.innerHTML = `<tr><td colspan="7">${emptyState('', 'No reviews found', '')}</td></tr>`; document.getElementById('reviewsPager').innerHTML=''; return; }

  body.innerHTML = data.items.map(r => `
    <tr>
      <td><b>${escapeHtml(r.productName)}</b></td>
      <td>${escapeHtml(r.customerName)}</td>
      <td>${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</td>
      <td style="max-width:280px"><span class="dt__meta" style="white-space:normal">${escapeHtml(r.body||r.title||'—')}</span></td>
      <td class="muted">${fmtDate(r.createdAt)}</td>
      <td><span class="pill pill--${r.status==='approved'?'success':r.status==='pending'?'warn':'neutral'}">${r.status}</span></td>
      <td class="dt__actions">
        ${r.status!=='approved'?`<button class="btn btn--ghost btn--sm" data-revstatus="${r.id}" data-val="approved">Approve</button>`:''}
        ${r.status!=='rejected'?`<button class="btn btn--ghost btn--sm" data-revstatus="${r.id}" data-val="rejected">Reject</button>`:''}
        <button class="btn btn--danger btn--sm" data-revdel="${r.id}">Delete</button>
      </td>
    </tr>`).join('');

  body.querySelectorAll('[data-revstatus]').forEach(btn => btn.addEventListener('click', async () => {
    try { await api.put('/reviews/' + btn.dataset.revstatus + '/status', { status: btn.dataset.val }); toast('Review updated.', 'success'); loadReviews(); }
    catch (e) { toast(e.message, 'error'); }
  }));
  body.querySelectorAll('[data-revdel]').forEach(btn => btn.addEventListener('click', async () => {
    const ok = await confirmModal({ title: 'Delete review', message: 'This cannot be undone.', confirmLabel: 'Delete', danger: true });
    if (!ok) return;
    try { await api.del('/reviews/' + btn.dataset.revdel); toast('Review deleted.', 'success'); loadReviews(); }
    catch (e) { toast(e.message, 'error'); }
  }));

  renderPager('reviewsPager', data, p => { reviewsState.page = p; loadReviews(); });
}
