/* ════════════════════════════════════════════════
   DISCOUNTS & COUPONS PAGE
   Includes the site-wide sale % control and the
   "featured coupon" banner shown above the navbar.
   ════════════════════════════════════════════════ */
window.PageDiscounts = async function () {
  const el = document.getElementById('pageContent');
  el.innerHTML = `
    <div class="pageHead">
      <div><h2 class="pageHead__title">Discounts &amp; Coupons</h2><p class="pageHead__sub">Control the site-wide sale, and manage promo codes.</p></div>
      <div class="pageHead__acts"><button class="btn btn--primary" id="addCouponBtn">+ Create Coupon</button></div>
    </div>

    <div class="panel">
      <div class="panel__head"><span class="panel__title">Site-Wide Sale</span></div>
      <div class="panel__body">
        <p class="muted" style="margin-top:0;font-size:12.5px">This controls the "LIMITED TIME OFFER — X% OFF" banner on the homepage and applies automatically to every product's displayed price (unless a product has its own discount configured in Products).</p>
        <label class="switch" style="margin-bottom:16px"><input type="checkbox" id="saleEnabled"><span class="switch__track"></span><span class="switch__label">Site-wide sale is active</span></label>
        <div class="field" style="max-width:260px"><label>Sale Percentage</label><input type="number" id="salePercent" min="0" max="90"></div>
        <button class="btn btn--primary" id="saveSaleBtn">Save Sale Settings</button>
      </div>
    </div>

    <div class="panel">
      <div class="panel__head"><span class="panel__title">Promo Banner (above navbar)</span></div>
      <div class="panel__body">
        <p class="muted" style="margin-top:0;font-size:12.5px">When a coupon is marked <b>Featured</b> below, it replaces the scrolling announcement bar at the very top of every page with a highlighted, copyable promo code banner. Only one coupon can be featured at a time.</p>
        <div id="featuredCouponPreview"></div>
      </div>
    </div>

    <div class="panel">
      <div class="panel__head"><span class="panel__title">All Coupons</span></div>
      <div class="tableWrap"><table class="dt">
        <thead><tr><th>Code</th><th>Type</th><th>Amount</th><th>Usage</th><th>Expires</th><th>Featured</th><th>Status</th><th></th></tr></thead>
        <tbody id="couponsBody"><tr><td colspan="8">${skeletonRows(4)}</td></tr></tbody>
      </table></div>
    </div>
  `;

  document.getElementById('addCouponBtn').addEventListener('click', () => openCouponModal(null));
  document.getElementById('saveSaleBtn').addEventListener('click', saveSaleSettings);

  const settings = await api.get('/settings');
  document.getElementById('saleEnabled').checked = settings.global_sale_enabled === 'true';
  document.getElementById('salePercent').value = settings.global_sale_percent || 20;

  await loadCoupons();
};

async function saveSaleSettings() {
  try {
    await api.put('/settings', {
      global_sale_enabled: document.getElementById('saleEnabled').checked,
      global_sale_percent: Number(document.getElementById('salePercent').value) || 0
    });
    toast('Sale settings updated — live on the site now.', 'success');
  } catch (e) { toast(e.message, 'error'); }
}

async function loadCoupons() {
  const rows = await api.get('/coupons');
  renderFeaturedPreview(rows.find(c => c.isFeatured));

  const body = document.getElementById('couponsBody');
  if (!rows.length) { body.innerHTML = `<tr><td colspan="8">${emptyState('', 'No coupons yet', 'Create your first promo code.')}</td></tr>`; return; }

  body.innerHTML = rows.map(c => `
    <tr>
      <td><b>${escapeHtml(c.code)}</b></td>
      <td class="muted">${c.type.replace('_',' ')}</td>
      <td>${c.type==='percent' ? c.amount+'%' : c.type==='fixed' ? fmtMoney(c.amount) : '—'}</td>
      <td>${c.redeemedCount}${c.usageLimit ? ' / ' + c.usageLimit : ''}</td>
      <td class="muted">${c.expiresAt ? fmtDate(c.expiresAt) : 'No expiry'}</td>
      <td><label class="switch"><input type="checkbox" class="featToggle" data-id="${c.id}" ${c.isFeatured?'checked':''}><span class="switch__track"></span></label></td>
      <td><span class="pill pill--${c.isActive?'success':'neutral'}">${c.isActive?'Active':'Inactive'}</span></td>
      <td class="dt__actions">
        <button class="btn btn--ghost btn--sm" data-editcoupon="${c.id}">Edit</button>
        <button class="btn btn--danger btn--sm" data-delcoupon="${c.id}">Delete</button>
      </td>
    </tr>`).join('');

  body.querySelectorAll('.featToggle').forEach(cb => cb.addEventListener('change', async (e) => {
    try { await api.put('/coupons/' + e.target.dataset.id, { isFeatured: e.target.checked }); toast('Banner updated.', 'success'); loadCoupons(); }
    catch (err) { toast(err.message, 'error'); e.target.checked = !e.target.checked; }
  }));
  body.querySelectorAll('[data-editcoupon]').forEach(btn => btn.addEventListener('click', () => openCouponModal(rows.find(r=>r.id==btn.dataset.editcoupon))));
  body.querySelectorAll('[data-delcoupon]').forEach(btn => btn.addEventListener('click', () => deleteCoupon(btn.dataset.delcoupon)));
}

function renderFeaturedPreview(coupon) {
  const box = document.getElementById('featuredCouponPreview');
  if (!coupon) { box.innerHTML = emptyState('', 'No banner currently active', 'Toggle "Featured" on a coupon below to promote it site-wide.'); return; }
  const label = coupon.type === 'percent' ? coupon.amount + '% OFF' : coupon.type === 'fixed' ? fmtMoney(coupon.amount) + ' OFF' : 'FREE SHIPPING';
  box.innerHTML = `
    <div style="background:var(--ink);color:#fff;border-radius:10px;padding:14px 20px;display:flex;align-items:center;gap:14px;flex-wrap:wrap">
      <span style="font-family:var(--f-display);font-size:15px;letter-spacing:.04em">✦ USE CODE</span>
      <span style="background:var(--gold-deep);padding:6px 14px;border-radius:6px;font-weight:600;letter-spacing:.08em">${escapeHtml(coupon.code)}</span>
      <span style="font-size:12.5px">for ${label}</span>
      <span class="pill pill--gold" style="margin-left:auto">Live now</span>
    </div>`;
}

function couponFieldsBySizeType() { return ['percent','fixed','free_shipping','bogo','first_order']; }

function openCouponModal(coupon) {
  const modal = openModal(`
    <div class="modal__head"><h3 class="modal__title">${coupon ? 'Edit' : 'Create'} Coupon</h3><button class="modal__close" data-modal-close>✕</button></div>
    <div class="modal__body">
      <div class="field__row">
        <div class="field"><label>Code <b>*</b></label><input id="cpCode" value="${escapeHtml(coupon?.code||'')}" placeholder="WATEEN10" style="text-transform:uppercase"></div>
        <div class="field"><label>Type <b>*</b></label>
          <select id="cpType">
            <option value="percent" ${coupon?.type==='percent'?'selected':''}>Percentage discount</option>
            <option value="fixed" ${coupon?.type==='fixed'?'selected':''}>Fixed amount discount</option>
            <option value="free_shipping" ${coupon?.type==='free_shipping'?'selected':''}>Free shipping</option>
            <option value="bogo" ${coupon?.type==='bogo'?'selected':''}>Buy X Get Y</option>
            <option value="first_order" ${coupon?.type==='first_order'?'selected':''}>First-order discount</option>
          </select>
        </div>
      </div>
      <div class="field__row">
        <div class="field"><label>Amount</label><input type="number" id="cpAmount" value="${coupon?.amount||''}" placeholder="e.g. 10 for 10%"></div>
        <div class="field"><label>Minimum Order</label><input type="number" id="cpMinOrder" value="${coupon?.minOrder||0}"></div>
      </div>
      <div class="field__row">
        <div class="field"><label>Max Discount (optional cap)</label><input type="number" id="cpMaxDiscount" value="${coupon?.maxDiscount||''}"></div>
        <div class="field"><label>Usage Limit (total)</label><input type="number" id="cpUsageLimit" value="${coupon?.usageLimit||''}"></div>
      </div>
      <div class="field__row">
        <div class="field"><label>Per-Customer Limit</label><input type="number" id="cpPerCustomer" value="${coupon?.perCustomerLimit||''}"></div>
        <div class="field"><label>Expires At</label><input type="date" id="cpExpires" value="${coupon?.expiresAt ? coupon.expiresAt.slice(0,10) : ''}"></div>
      </div>
      <label class="switch" style="margin-bottom:8px"><input type="checkbox" id="cpActive" ${coupon?.isActive!==false?'checked':''}><span class="switch__track"></span><span class="switch__label">Active</span></label>
      <label class="switch"><input type="checkbox" id="cpFeatured" ${coupon?.isFeatured?'checked':''}><span class="switch__track"></span><span class="switch__label">Show as banner above navbar</span></label>
    </div>
    <div class="modal__foot"><button class="btn btn--ghost" data-modal-close>Cancel</button><button class="btn btn--primary" id="saveCouponBtn">Save</button></div>
  `);

  modal.el.querySelector('#saveCouponBtn').addEventListener('click', async () => {
    const code = document.getElementById('cpCode').value.trim();
    if (!code) return toast('Coupon code is required.', 'error');
    const payload = {
      code, type: document.getElementById('cpType').value, amount: Number(document.getElementById('cpAmount').value)||0,
      minOrder: Number(document.getElementById('cpMinOrder').value)||0,
      maxDiscount: document.getElementById('cpMaxDiscount').value ? Number(document.getElementById('cpMaxDiscount').value) : null,
      usageLimit: document.getElementById('cpUsageLimit').value ? Number(document.getElementById('cpUsageLimit').value) : null,
      perCustomerLimit: document.getElementById('cpPerCustomer').value ? Number(document.getElementById('cpPerCustomer').value) : null,
      expiresAt: document.getElementById('cpExpires').value || null,
      isActive: document.getElementById('cpActive').checked,
      isFeatured: document.getElementById('cpFeatured').checked
    };
    try {
      if (coupon) await api.put('/coupons/' + coupon.id, payload);
      else await api.post('/coupons', payload);
      toast('Coupon saved.', 'success');
      modal.close();
      loadCoupons();
    } catch (e) { toast(e.message, 'error'); }
  });
}

async function deleteCoupon(id) {
  const ok = await confirmModal({ title: 'Delete coupon', message: 'This cannot be undone.', confirmLabel: 'Delete', danger: true });
  if (!ok) return;
  try { await api.del('/coupons/' + id); toast('Coupon deleted.', 'success'); loadCoupons(); }
  catch (e) { toast(e.message, 'error'); }
}
