/* ════════════════════════════════════════════════
   CUSTOMERS PAGE
   ════════════════════════════════════════════════ */
let customersState = { page: 1, q: '', segment: '' };

window.PageCustomers = async function (param) {
  if (param && /^\d+$/.test(param)) return renderCustomerDetail(Number(param));

  const el = document.getElementById('pageContent');
  el.innerHTML = `
    <div class="pageHead"><div><h2 class="pageHead__title">Customers</h2><p class="pageHead__sub">Everyone who has ordered from Wateen Perfumes.</p></div></div>
    <div class="panel">
      <div class="toolbar">
        <div class="toolbar__search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3" stroke-linecap="round"/></svg>
          <input type="text" id="custSearch" placeholder="Name, phone, email…">
        </div>
        <select id="custSegmentFilter">
          <option value="">All segments</option>
          <option value="new">New</option><option value="returning">Returning</option>
          <option value="vip">VIP</option><option value="high_spender">High Spender</option><option value="inactive">Inactive</option>
        </select>
      </div>
      <div class="tableWrap"><table class="dt">
        <thead><tr><th>Customer</th><th>Orders</th><th>Total Spent</th><th>Avg Order</th><th>Last Order</th><th>Segment</th><th></th></tr></thead>
        <tbody id="custBody"><tr><td colspan="7">${skeletonRows(8)}</td></tr></tbody>
      </table></div>
      <div class="pager" id="custPager"></div>
    </div>
  `;
  document.getElementById('custSearch').addEventListener('input', debounce(e => { customersState.q = e.target.value; customersState.page = 1; loadCustomers(); }, 350));
  document.getElementById('custSegmentFilter').addEventListener('change', e => { customersState.segment = e.target.value; customersState.page = 1; loadCustomers(); });
  await loadCustomers();
};

function segmentPill(s) {
  const map = { new: 'info', returning: 'neutral', vip: 'gold', high_spender: 'gold', inactive: 'neutral' };
  return `<span class="pill pill--${map[s]||'neutral'}">${(s||'new').replace('_',' ')}</span>`;
}

async function loadCustomers() {
  const body = document.getElementById('custBody');
  body.innerHTML = `<tr><td colspan="7">${skeletonRows(8)}</td></tr>`;
  const data = await api.get('/customers' + qs({ q: customersState.q, segment: customersState.segment, page: customersState.page, pageSize: 15 }));
  if (!data.items.length) { body.innerHTML = `<tr><td colspan="7">${emptyState('', 'No customers found', '')}</td></tr>`; document.getElementById('custPager').innerHTML=''; return; }
  body.innerHTML = data.items.map(c => `
    <tr onclick="window.location.hash='#/customers/${c.id}'" style="cursor:pointer">
      <td><b>${escapeHtml(c.name)}</b><span class="dt__meta">${escapeHtml(c.phone)}</span></td>
      <td>${c.ordersCount}</td><td>${fmtMoney(c.totalSpent)}</td><td>${fmtMoney(c.averageOrder)}</td>
      <td>${c.lastOrderAt ? fmtDate(c.lastOrderAt) : '—'}</td>
      <td>${segmentPill(c.segment)}</td>
      <td class="dt__actions"><a href="#/customers/${c.id}" class="btn btn--ghost btn--sm">View</a></td>
    </tr>`).join('');
  renderPager('custPager', data, p => { customersState.page = p; loadCustomers(); });
}

async function renderCustomerDetail(id) {
  const el = document.getElementById('pageContent');
  el.innerHTML = `<div class="skeleton" style="height:300px;border-radius:12px"></div>`;
  const c = await api.get('/customers/' + id);

  el.innerHTML = `
    <div class="pageHead">
      <div><a href="#/customers" class="muted" style="font-size:12px">← Back to customers</a><h2 class="pageHead__title" style="margin-top:6px">${escapeHtml(c.name)}</h2></div>
    </div>
    <div class="kpiGrid">
      <div class="kpi"><div class="kpi__label">Orders</div><div class="kpi__value">${c.ordersCount}</div></div>
      <div class="kpi"><div class="kpi__label">Total Spent</div><div class="kpi__value">${fmtMoney(c.totalSpent)}</div></div>
      <div class="kpi"><div class="kpi__label">Average Order</div><div class="kpi__value">${fmtMoney(c.averageOrder)}</div></div>
      <div class="kpi"><div class="kpi__label">Segment</div><div class="kpi__value" style="font-size:16px">${segmentPill(c.segment)}</div></div>
    </div>
    <div class="grid3">
      <div class="panel">
        <div class="panel__head"><span class="panel__title">Order History</span></div>
        <div class="tableWrap"><table class="dt"><thead><tr><th>Order</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
        <tbody>${c.orders.map(o => `<tr onclick="window.location.hash='#/orders/${o.id}'" style="cursor:pointer"><td><b>#${escapeHtml(o.orderNumber)}</b></td><td>${fmtDate(o.createdAt)}</td><td>${fmtMoney(o.total)}</td><td>${statusPill(o.status)}</td></tr>`).join('') || `<tr><td colspan="4">${emptyState('','No orders yet','')}</td></tr>`}</tbody></table></div>
      </div>
      <div>
        <div class="panel">
          <div class="panel__head"><span class="panel__title">Contact</span></div>
          <div class="panel__body stack" style="font-size:12.5px;gap:6px">
            <div>${escapeHtml(c.phone)}</div>
            ${c.email ? `<div>${escapeHtml(c.email)}</div>` : ''}
            <div class="muted">${escapeHtml(c.city||'')}, ${escapeHtml(c.governorate||'')}</div>
            <div class="muted">${escapeHtml(c.address||'')}</div>
          </div>
        </div>
        <div class="panel">
          <div class="panel__head"><span class="panel__title">Segment &amp; Status</span></div>
          <div class="panel__body">
            <div class="field"><label>Segment</label>
              <select id="custSegmentSelect">${['new','returning','vip','high_spender','inactive'].map(s=>`<option value="${s}" ${c.segment===s?'selected':''}>${s.replace('_',' ')}</option>`).join('')}</select>
            </div>
            <div class="field"><label>Status</label>
              <select id="custStatusSelect"><option value="active" ${c.status==='active'?'selected':''}>Active</option><option value="disabled" ${c.status==='disabled'?'selected':''}>Disabled</option></select>
            </div>
            <button class="btn btn--primary btn--block" id="saveCustBtn">Save</button>
          </div>
        </div>
        <div class="panel">
          <div class="panel__head"><span class="panel__title">Notes</span></div>
          <div class="panel__body"><textarea id="custNotes" rows="3">${escapeHtml(c.notes||'')}</textarea>
          <button class="btn btn--ghost btn--sm" id="saveNotesBtn" style="margin-top:10px">Save Note</button></div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('saveCustBtn').addEventListener('click', async () => {
    try {
      await api.put('/customers/' + id, { segment: document.getElementById('custSegmentSelect').value, status: document.getElementById('custStatusSelect').value });
      toast('Customer updated.', 'success');
    } catch (e) { toast(e.message, 'error'); }
  });
  document.getElementById('saveNotesBtn').addEventListener('click', async () => {
    try { await api.put('/customers/' + id, { notes: document.getElementById('custNotes').value }); toast('Note saved.', 'success'); }
    catch (e) { toast(e.message, 'error'); }
  });
}
