/* ════════════════════════════════════════════════
   ORDERS PAGE — list + detail
   ════════════════════════════════════════════════ */

const ORDER_STATUSES = ['pending', 'confirmed', 'processing', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned', 'refunded'];

let ordersState = { page: 1, q: '', status: '', selected: new Set() };

window.PageOrders = async function (param) {
  if (param && /^\d+$/.test(param)) return renderOrderDetail(Number(param));

  const el = document.getElementById('pageContent');
  const initialQ = (new URLSearchParams(param || '')).get('q') || '';
  ordersState.q = initialQ;

  el.innerHTML = `
    <div class="pageHead">
      <div><h2 class="pageHead__title">Orders</h2><p class="pageHead__sub">Every order placed on the storefront, in real time.</p></div>
    </div>
    <div class="panel">
      <div class="toolbar">
        <div class="toolbar__search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3" stroke-linecap="round"/></svg>
          <input type="text" id="ordersSearch" placeholder="Order #, customer, phone…" value="${escapeHtml(initialQ)}">
        </div>
        <select id="ordersStatusFilter">
          <option value="">All statuses</option>
          ${ORDER_STATUSES.map(s => `<option value="${s}">${s.replace(/_/g,' ')}</option>`).join('')}
        </select>
        <div class="toolbar__spacer"></div>
        <button class="btn btn--ghost btn--sm" id="ordersExportBtn">Export CSV</button>
      </div>
      <div class="bulkBar" id="ordersBulkBar">
        <b><span id="ordersSelectedCount">0</span> selected</b>
        <div class="bulkBar__acts">
          <select id="bulkStatusSelect" style="padding:7px 10px;border-radius:7px;border:none;font-size:11.5px">
            <option value="">Set status…</option>
            ${ORDER_STATUSES.map(s => `<option value="${s}">${s.replace(/_/g,' ')}</option>`).join('')}
          </select>
          <button class="btn btn--ghost btn--sm" id="bulkApplyBtn">Apply</button>
        </div>
      </div>
      <div class="tableWrap">
        <table class="dt">
          <thead><tr>
            <th style="width:32px"><input type="checkbox" class="dt__checkbox" id="ordersSelectAll"></th>
            <th>Order</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th>
            <th>Payment</th><th>Status</th><th></th>
          </tr></thead>
          <tbody id="ordersBody"><tr><td colspan="8">${skeletonRows(6)}</td></tr></tbody>
        </table>
      </div>
      <div class="pager" id="ordersPager"></div>
    </div>
  `;

  document.getElementById('ordersSearch').value = initialQ;
  document.getElementById('ordersSearch').addEventListener('input', debounce((e) => { ordersState.q = e.target.value; ordersState.page = 1; loadOrders(); }, 350));
  document.getElementById('ordersStatusFilter').addEventListener('change', (e) => { ordersState.status = e.target.value; ordersState.page = 1; loadOrders(); });
  document.getElementById('ordersSelectAll').addEventListener('change', (e) => {
    document.querySelectorAll('.ordersRowCheck').forEach(cb => { cb.checked = e.target.checked; toggleOrderSelect(cb.value, e.target.checked); });
  });
  document.getElementById('bulkApplyBtn').addEventListener('click', applyBulkStatus);
  document.getElementById('ordersExportBtn').addEventListener('click', exportOrdersCsv);

  ordersState.selected = new Set();
  await loadOrders();
};

async function loadOrders() {
  const body = document.getElementById('ordersBody');
  body.innerHTML = `<tr><td colspan="8">${skeletonRows(6)}</td></tr>`;

  const data = await api.get('/orders' + qs({ q: ordersState.q, status: ordersState.status, page: ordersState.page, pageSize: 15 }));

  if (!data.items.length) {
    body.innerHTML = `<tr><td colspan="8">${emptyState('', 'No orders found', 'Try a different search or filter.')}</td></tr>`;
    document.getElementById('ordersPager').innerHTML = '';
    return;
  }

  body.innerHTML = data.items.map(o => `
    <tr>
      <td><input type="checkbox" class="dt__checkbox ordersRowCheck" value="${o.id}"></td>
      <td><b><a href="#/orders/${o.id}" style="color:var(--gold-deep)">#${escapeHtml(o.orderNumber)}</a></b></td>
      <td>${escapeHtml(o.customer.name)}<span class="dt__meta">${escapeHtml(o.customer.phone)}</span></td>
      <td>${fmtDate(o.createdAt)}</td>
      <td>${o.items.reduce((s,i)=>s+i.qty,0)} item(s)</td>
      <td><b>${fmtMoney(o.total)}</b></td>
      <td>${paymentPill(o)}</td>
      <td>${orderStatusSelect(o)}</td>
      <td class="dt__actions"><a href="#/orders/${o.id}" class="btn btn--ghost btn--sm">View</a></td>
    </tr>
  `).join('');

  document.querySelectorAll('.ordersRowCheck').forEach(cb => cb.addEventListener('change', (e) => toggleOrderSelect(e.target.value, e.target.checked)));
  document.querySelectorAll('.orderStatusSelect').forEach(sel => sel.addEventListener('change', (e) => changeOrderStatus(e.target.dataset.id, e.target.value)));

  renderPager('ordersPager', data, (p) => { ordersState.page = p; loadOrders(); });
}

function paymentPill(o) {
  const labelMap = { cod: 'COD', instapay: 'InstaPay', card: 'Card' };
  const statusMap = { pending: 'warn', paid: 'success', failed: 'danger', refunded: 'neutral' };
  return `<span class="pill pill--${statusMap[o.paymentStatus] || 'neutral'}">${labelMap[o.paymentMethod] || o.paymentMethod} · ${o.paymentStatus}</span>`;
}

function orderStatusSelect(o) {
  return `<select class="orderStatusSelect" data-id="${o.id}" style="padding:6px 8px;border-radius:6px;border:1px solid var(--line);font-size:11.5px">
    ${ORDER_STATUSES.map(s => `<option value="${s}" ${s===o.status?'selected':''}>${s.replace(/_/g,' ')}</option>`).join('')}
  </select>`;
}

async function changeOrderStatus(id, status) {
  try {
    await api.put(`/orders/${id}/status`, { status });
    toast('Order status updated.', 'success');
  } catch (e) { toast(e.message, 'error'); loadOrders(); }
}

function toggleOrderSelect(id, checked) {
  if (checked) ordersState.selected.add(id); else ordersState.selected.delete(id);
  const bar = document.getElementById('ordersBulkBar');
  bar.classList.toggle('is-on', ordersState.selected.size > 0);
  document.getElementById('ordersSelectedCount').textContent = ordersState.selected.size;
}

async function applyBulkStatus() {
  const value = document.getElementById('bulkStatusSelect').value;
  if (!value) return toast('Choose a status first.', 'error');
  try {
    await api.post('/orders/bulk', { ids: [...ordersState.selected], action: 'status', value });
    toast('Updated ' + ordersState.selected.size + ' order(s).', 'success');
    ordersState.selected.clear();
    loadOrders();
  } catch (e) { toast(e.message, 'error'); }
}

function exportOrdersCsv() {
  api.get('/orders' + qs({ q: ordersState.q, status: ordersState.status, page: 1, pageSize: 100 })).then(data => {
    const rows = [['Order','Customer','Phone','Date','Total','Payment','Status']];
    data.items.forEach(o => rows.push([o.orderNumber, o.customer.name, o.customer.phone, o.createdAt, o.total, o.paymentMethod, o.status]));
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'wateen-orders.csv';
    a.click();
  });
}

function renderPager(elId, data, onPage) {
  const totalPages = Math.max(1, Math.ceil(data.total / data.pageSize));
  const box = document.getElementById(elId);
  box.innerHTML = `
    <span class="pager__info">${data.total} result(s) · page ${data.page} of ${totalPages}</span>
    <div class="pager__btns">
      <button ${data.page<=1?'disabled':''} data-p="${data.page-1}">‹</button>
      <button ${data.page>=totalPages?'disabled':''} data-p="${data.page+1}">›</button>
    </div>`;
  box.querySelectorAll('button[data-p]').forEach(b => b.addEventListener('click', () => onPage(Number(b.dataset.p))));
}

/* ---------- order detail ---------- */

async function renderOrderDetail(id) {
  const el = document.getElementById('pageContent');
  el.innerHTML = `<div class="skeleton" style="height:400px;border-radius:12px"></div>`;
  const o = await api.get('/orders/' + id);

  el.innerHTML = `
    <div class="pageHead">
      <div>
        <a href="#/orders" class="muted" style="font-size:12px">← Back to orders</a>
        <h2 class="pageHead__title" style="margin-top:6px">Order #${escapeHtml(o.orderNumber)}</h2>
        <p class="pageHead__sub">Placed ${fmtDate(o.createdAt)}</p>
      </div>
      <div class="pageHead__acts">
        <button class="btn btn--ghost" id="printInvoiceBtn">Print Invoice</button>
        <button class="btn btn--ghost" id="contactCustomerBtn">Contact Customer</button>
        ${!['cancelled','refunded'].includes(o.status) ? '<button class="btn btn--danger" id="cancelOrderBtn">Cancel Order</button>' : ''}
      </div>
    </div>

    <div class="grid3">
      <div>
        <div class="panel">
          <div class="panel__head"><span class="panel__title">Items</span></div>
          <div class="tableWrap"><table class="dt"><thead><tr><th>Product</th><th>Size</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr></thead>
          <tbody>${o.items.map(i => `
            <tr>
              <td class="hstack"><img class="dt__thumb" src="${resolveImageUrl(i.image)}" onerror="this.style.visibility='hidden'"><span>${escapeHtml(i.name)}<span class="dt__meta">${escapeHtml(i.brand||'')}</span></span></td>
              <td>${escapeHtml(i.size||'—')}</td><td>${i.qty}</td><td>${fmtMoney(i.unitPrice)}</td><td>${fmtMoney(i.unitPrice*i.qty)}</td>
            </tr>`).join('')}</tbody></table></div>
          <div class="panel__body" style="border-top:1px solid var(--line-soft)">
            <div class="stack" style="align-items:flex-end">
              <div class="hstack" style="justify-content:space-between;width:220px"><span class="muted">Subtotal</span><b>${fmtMoney(o.subtotal)}</b></div>
              <div class="hstack" style="justify-content:space-between;width:220px"><span class="muted">Discount</span><b>- ${fmtMoney(o.discountTotal)}</b></div>
              <div class="hstack" style="justify-content:space-between;width:220px"><span class="muted">Shipping</span><b>${fmtMoney(o.shippingFee)}</b></div>
              <div class="hstack" style="justify-content:space-between;width:220px;font-size:16px;margin-top:6px"><span>Total</span><b>${fmtMoney(o.total)}</b></div>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel__head"><span class="panel__title">Order Timeline</span></div>
          <div class="panel__body">
            <div class="stack" style="gap:14px">
              ${o.timeline.map(t => `
                <div class="hstack" style="align-items:flex-start;gap:12px">
                  <span style="width:8px;height:8px;border-radius:50%;background:var(--gold-deep);margin-top:5px;flex:0 0 auto"></span>
                  <div><b style="font-size:12.5px;text-transform:capitalize">${t.status.replace(/_/g,' ')}</b>
                  <div class="muted" style="font-size:11px">${fmtDate(t.createdAt)}${t.note ? ' — ' + escapeHtml(t.note) : ''}</div></div>
                </div>`).join('')}
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel__head"><span class="panel__title">Admin Notes</span></div>
          <div class="panel__body">
            <textarea id="adminNotesInput" rows="3" placeholder="Internal note about this order…">${escapeHtml(o.adminNotes||'')}</textarea>
            <button class="btn btn--ghost btn--sm" id="saveNotesBtn" style="margin-top:10px">Save Note</button>
          </div>
        </div>
      </div>

      <div>
        <div class="panel">
          <div class="panel__head"><span class="panel__title">Customer</span></div>
          <div class="panel__body stack" style="gap:8px;font-size:12.5px">
            <div><b>${escapeHtml(o.customer.name)}</b></div>
            <div class="muted">${escapeHtml(o.customer.phone)}</div>
            ${o.customer.email ? `<div class="muted">${escapeHtml(o.customer.email)}</div>` : ''}
          </div>
        </div>
        <div class="panel">
          <div class="panel__head"><span class="panel__title">Shipping Address</span></div>
          <div class="panel__body stack" style="gap:4px;font-size:12.5px">
            <div>${escapeHtml(o.address.address || '')}</div>
            ${o.address.apartment ? `<div>${escapeHtml(o.address.apartment)}</div>` : ''}
            <div>${escapeHtml(o.address.city || '')}, ${escapeHtml(o.address.governorate || '')}</div>
          </div>
        </div>
        <div class="panel">
          <div class="panel__head"><span class="panel__title">Status</span></div>
          <div class="panel__body stack">
            <div class="field"><label>Order Status</label>${orderStatusSelect(o)}</div>
            <div class="field">
              <label>Payment Status</label>
              <select id="paymentStatusSelect">
                ${['pending','paid','failed','refunded'].map(s => `<option value="${s}" ${s===o.paymentStatus?'selected':''}>${s}</option>`).join('')}
              </select>
            </div>
            ${o.couponCode ? `<div class="chip">Coupon: ${escapeHtml(o.couponCode)}</div>` : ''}
          </div>
        </div>
        ${o.customerNotes ? `<div class="panel"><div class="panel__head"><span class="panel__title">Customer Notes</span></div><div class="panel__body">${escapeHtml(o.customerNotes)}</div></div>` : ''}
      </div>
    </div>
  `;

  el.querySelector('.orderStatusSelect').addEventListener('change', async (e) => {
    try { await api.put(`/orders/${id}/status`, { status: e.target.value }); toast('Status updated.', 'success'); renderOrderDetail(id); }
    catch (err) { toast(err.message, 'error'); }
  });
  document.getElementById('paymentStatusSelect').addEventListener('change', async (e) => {
    try { await api.put(`/orders/${id}/payment`, { paymentStatus: e.target.value }); toast('Payment status updated.', 'success'); }
    catch (err) { toast(err.message, 'error'); }
  });
  document.getElementById('saveNotesBtn').addEventListener('click', async () => {
    try { await api.put(`/orders/${id}/notes`, { adminNotes: document.getElementById('adminNotesInput').value }); toast('Note saved.', 'success'); }
    catch (err) { toast(err.message, 'error'); }
  });
  document.getElementById('printInvoiceBtn').addEventListener('click', () => window.print());
  document.getElementById('contactCustomerBtn').addEventListener('click', () => {
    window.open('https://wa.me/2' + o.customer.phone.replace(/\D/g,''), '_blank');
  });
  const cancelBtn = document.getElementById('cancelOrderBtn');
  if (cancelBtn) cancelBtn.addEventListener('click', async () => {
    const ok = await confirmModal({ title: 'Cancel order', message: `Cancel order #${o.orderNumber}? Stock will be restored.`, confirmLabel: 'Cancel Order', danger: true });
    if (!ok) return;
    try { await api.put(`/orders/${id}/status`, { status: 'cancelled' }); toast('Order cancelled.', 'success'); renderOrderDetail(id); }
    catch (err) { toast(err.message, 'error'); }
  });
}
