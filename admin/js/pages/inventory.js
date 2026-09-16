/* ════════════════════════════════════════════════
   INVENTORY PAGE
   ════════════════════════════════════════════════ */
let inventoryState = { page: 1, q: '', lowOnly: false, outOnly: false, selected: new Set() };

window.PageInventory = async function () {
  const el = document.getElementById('pageContent');
  el.innerHTML = `
    <div class="pageHead"><div><h2 class="pageHead__title">Inventory</h2><p class="pageHead__sub">Stock levels across every size variant.</p></div></div>
    <div class="panel">
      <div class="toolbar">
        <div class="toolbar__search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3" stroke-linecap="round"/></svg>
          <input type="text" id="invSearch" placeholder="Product or SKU…">
        </div>
        <label class="checkRow"><input type="checkbox" id="invLowOnly"> Low stock only</label>
        <label class="checkRow"><input type="checkbox" id="invOutOnly"> Out of stock only</label>
        <div class="toolbar__spacer"></div>
      </div>
      <div class="bulkBar" id="invBulkBar">
        <b><span id="invSelectedCount">0</span> selected</b>
        <div class="bulkBar__acts">
          <input type="number" id="invBulkQty" placeholder="±Qty" style="width:80px;padding:7px 10px;border-radius:7px;border:none;font-size:11.5px">
          <button class="btn btn--ghost btn--sm" id="invBulkApply">Apply</button>
        </div>
      </div>
      <div class="tableWrap"><table class="dt">
        <thead><tr><th style="width:32px"><input type="checkbox" class="dt__checkbox" id="invSelectAll"></th><th>Product</th><th>SKU</th><th>Price</th><th>Stock</th><th>Reserved</th><th>Available</th><th></th></tr></thead>
        <tbody id="invBody"><tr><td colspan="8">${skeletonRows(10)}</td></tr></tbody>
      </table></div>
      <div class="pager" id="invPager"></div>
    </div>
  `;

  document.getElementById('invSearch').addEventListener('input', debounce(e => { inventoryState.q = e.target.value; inventoryState.page = 1; loadInventory(); }, 350));
  document.getElementById('invLowOnly').addEventListener('change', e => { inventoryState.lowOnly = e.target.checked; loadInventory(); });
  document.getElementById('invOutOnly').addEventListener('change', e => { inventoryState.outOnly = e.target.checked; loadInventory(); });
  document.getElementById('invSelectAll').addEventListener('change', e => {
    document.querySelectorAll('.invRowCheck').forEach(cb => { cb.checked = e.target.checked; toggleInvSelect(cb.value, e.target.checked); });
  });
  document.getElementById('invBulkApply').addEventListener('click', applyInvBulk);

  inventoryState.selected = new Set();
  await loadInventory();
};

async function loadInventory() {
  const body = document.getElementById('invBody');
  body.innerHTML = `<tr><td colspan="8">${skeletonRows(10)}</td></tr>`;
  const data = await api.get('/inventory' + qs({ q: inventoryState.q, lowOnly: inventoryState.lowOnly, outOnly: inventoryState.outOnly, page: inventoryState.page, pageSize: 25 }));

  if (!data.items.length) { body.innerHTML = `<tr><td colspan="8">${emptyState('', 'No matching stock rows', '')}</td></tr>`; document.getElementById('invPager').innerHTML=''; return; }

  body.innerHTML = data.items.map(r => `
    <tr>
      <td><input type="checkbox" class="dt__checkbox invRowCheck" value="${r.variantId}"></td>
      <td class="hstack"><img class="dt__thumb" src="${resolveImageUrl(r.image)}" onerror="this.style.visibility='hidden'"><span><b>${escapeHtml(r.productName)}</b><span class="dt__meta">${escapeHtml(r.size)}</span></span></td>
      <td class="muted">${escapeHtml(r.sku||'—')}</td>
      <td>${fmtMoney(r.price)}</td>
      <td>${r.stock}</td>
      <td>${r.reserved}</td>
      <td>${r.isOut ? '<span class="pill pill--danger">Out</span>' : r.isLow ? `<span class="pill pill--warn">${r.available} low</span>` : r.available}</td>
      <td class="dt__actions">
        <button class="btn btn--ghost btn--sm" data-adjust="${r.variantId}" data-name="${escapeHtml(r.productName)} (${escapeHtml(r.size)})">Adjust</button>
      </td>
    </tr>`).join('');

  document.querySelectorAll('.invRowCheck').forEach(cb => cb.addEventListener('change', e => toggleInvSelect(e.target.value, e.target.checked)));
  document.querySelectorAll('[data-adjust]').forEach(btn => btn.addEventListener('click', () => openAdjustModal(btn.dataset.adjust, btn.dataset.name)));

  renderPager('invPager', data, p => { inventoryState.page = p; loadInventory(); });
}

function toggleInvSelect(id, checked) {
  if (checked) inventoryState.selected.add(id); else inventoryState.selected.delete(id);
  document.getElementById('invBulkBar').classList.toggle('is-on', inventoryState.selected.size > 0);
  document.getElementById('invSelectedCount').textContent = inventoryState.selected.size;
}

async function applyInvBulk() {
  const qty = Number(document.getElementById('invBulkQty').value);
  if (!qty) return toast('Enter a non-zero quantity.', 'error');
  try {
    await api.post('/inventory/bulk-adjust', { variantIds: [...inventoryState.selected], changeQty: qty, reason: 'bulk_adjustment' });
    toast('Stock updated for ' + inventoryState.selected.size + ' item(s).', 'success');
    inventoryState.selected.clear();
    loadInventory();
  } catch (e) { toast(e.message, 'error'); }
}

function openAdjustModal(variantId, name) {
  const modal = openModal(`
    <div class="modal__head"><h3 class="modal__title">Adjust Stock</h3><button class="modal__close" data-modal-close>✕</button></div>
    <div class="modal__body">
      <p class="muted" style="font-size:12.5px;margin-top:0">${name}</p>
      <div class="field"><label>Change Quantity <span class="field__hint">(use negative to remove)</span></label><input type="number" id="adjQty" placeholder="e.g. 20 or -5"></div>
      <div class="field"><label>Reason</label>
        <select id="adjReason"><option value="restock">Restock</option><option value="adjustment">Manual Adjustment</option><option value="return">Return</option><option value="damage">Damage / Loss</option></select>
      </div>
      <div class="field"><label>Note</label><input id="adjNote" placeholder="Optional note"></div>
    </div>
    <div class="modal__foot"><button class="btn btn--ghost" data-modal-close>Cancel</button><button class="btn btn--primary" id="adjSaveBtn">Apply</button></div>
  `);
  modal.el.querySelector('#adjSaveBtn').addEventListener('click', async () => {
    const changeQty = Number(document.getElementById('adjQty').value);
    if (!changeQty) return toast('Enter a non-zero quantity.', 'error');
    try {
      await api.post('/inventory/adjust', { variantId: Number(variantId), changeQty, reason: document.getElementById('adjReason').value, note: document.getElementById('adjNote').value });
      toast('Stock adjusted.', 'success');
      modal.close();
      loadInventory();
    } catch (e) { toast(e.message, 'error'); }
  });
}
