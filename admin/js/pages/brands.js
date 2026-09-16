/* ════════════════════════════════════════════════
   BRANDS PAGE
   ════════════════════════════════════════════════ */
window.PageBrands = async function () {
  const el = document.getElementById('pageContent');
  el.innerHTML = `
    <div class="pageHead">
      <div><h2 class="pageHead__title">Brands</h2><p class="pageHead__sub">Manage the fragrance houses carried on your storefront.</p></div>
      <div class="pageHead__acts"><button class="btn btn--primary" id="addBrandBtn">+ Add Brand</button></div>
    </div>
    <div class="panel"><div class="tableWrap"><table class="dt">
      <thead><tr><th>Brand</th><th>Products</th><th>Units Sold</th><th>Revenue</th><th>Best Seller</th><th>Status</th><th></th></tr></thead>
      <tbody id="brandBody"><tr><td colspan="7">${skeletonRows(6)}</td></tr></tbody>
    </table></div></div>
  `;
  document.getElementById('addBrandBtn').addEventListener('click', () => openBrandModal(null));
  await loadBrands();
};

async function loadBrands() {
  const rows = await api.get('/brands');
  const body = document.getElementById('brandBody');
  if (!rows.length) { body.innerHTML = `<tr><td colspan="7">${emptyState('', 'No brands yet', '')}</td></tr>`; return; }
  body.innerHTML = rows.map(b => `
    <tr>
      <td class="hstack">
        <img class="dt__thumb" style="border-radius:50%;width:34px;height:34px" src="${resolveImageUrl(b.logo)}" onerror="this.style.visibility='hidden'">
        <b>${escapeHtml(b.name)}</b>${b.featured?' <span class="pill pill--gold" style="margin-left:6px">Featured</span>':''}
      </td>
      <td>${b.productCount}</td>
      <td>${fmtNumber(b.totalUnitsSold)}</td>
      <td>${fmtMoney(b.totalRevenue)}</td>
      <td class="muted">${escapeHtml(b.bestSellingProduct || '—')}</td>
      <td><span class="pill pill--${b.isActive?'success':'neutral'}">${b.isActive?'Active':'Disabled'}</span></td>
      <td class="dt__actions">
        <button class="btn btn--ghost btn--sm" data-editbrand="${b.id}">Edit</button>
        <button class="btn btn--danger btn--sm" data-delbrand="${b.id}">Delete</button>
      </td>
    </tr>`).join('');
  body.querySelectorAll('[data-editbrand]').forEach(btn => btn.addEventListener('click', () => openBrandModal(rows.find(r=>r.id==btn.dataset.editbrand))));
  body.querySelectorAll('[data-delbrand]').forEach(btn => btn.addEventListener('click', () => deleteBrand(btn.dataset.delbrand)));
}

function openBrandModal(brand) {
  const modal = openModal(`
    <div class="modal__head"><h3 class="modal__title">${brand ? 'Edit' : 'Add'} Brand</h3><button class="modal__close" data-modal-close>✕</button></div>
    <div class="modal__body">
      <div class="field__row">
        <div class="field"><label>Name <b>*</b></label><input id="brandName" value="${escapeHtml(brand?.name||'')}"></div>
        <div class="field"><label>Arabic Name</label><input id="brandNameAr" value="${escapeHtml(brand?.nameAr||'')}" dir="rtl"></div>
      </div>
      <div class="field"><label>Description</label><textarea id="brandDesc" rows="3">${escapeHtml(brand?.description||'')}</textarea></div>
      <div class="field__row">
        <div class="field"><label>Logo URL</label><input id="brandLogo" value="${escapeHtml(brand?.logo||'')}"></div>
        <div class="field"><label>Banner URL</label><input id="brandBanner" value="${escapeHtml(brand?.banner||'')}"></div>
      </div>
      <div class="field__row">
        <div class="field"><label>Website</label><input id="brandWebsite" value="${escapeHtml(brand?.website||'')}"></div>
        <div class="field"><label>Country</label><input id="brandCountry" value="${escapeHtml(brand?.country||'')}"></div>
      </div>
      <label class="switch" style="margin-bottom:8px"><input type="checkbox" id="brandFeatured" ${brand?.featured?'checked':''}><span class="switch__track"></span><span class="switch__label">Featured brand</span></label>
      ${brand ? `<label class="switch"><input type="checkbox" id="brandActive" ${brand.isActive?'checked':''}><span class="switch__track"></span><span class="switch__label">Active on storefront</span></label>` : ''}
    </div>
    <div class="modal__foot"><button class="btn btn--ghost" data-modal-close>Cancel</button><button class="btn btn--primary" id="saveBrandBtn">Save</button></div>
  `);

  modal.el.querySelector('#saveBrandBtn').addEventListener('click', async () => {
    const name = document.getElementById('brandName').value.trim();
    if (!name) return toast('Brand name is required.', 'error');
    const payload = {
      name, nameAr: document.getElementById('brandNameAr').value, description: document.getElementById('brandDesc').value,
      logo: document.getElementById('brandLogo').value, banner: document.getElementById('brandBanner').value,
      website: document.getElementById('brandWebsite').value, country: document.getElementById('brandCountry').value,
      featured: document.getElementById('brandFeatured').checked
    };
    if (brand) payload.isActive = document.getElementById('brandActive').checked;
    try {
      if (brand) await api.put('/brands/' + brand.id, payload);
      else await api.post('/brands', payload);
      toast('Brand saved.', 'success');
      modal.close();
      loadBrands();
    } catch (e) { toast(e.message, 'error'); }
  });
}

async function deleteBrand(id) {
  const ok = await confirmModal({ title: 'Delete brand', message: 'Brands with products will be disabled instead of deleted.', confirmLabel: 'Delete', danger: true });
  if (!ok) return;
  try {
    const res = await api.del('/brands/' + id);
    toast(res.disabled ? 'Brand disabled (still has products).' : 'Brand deleted.', 'success');
    loadBrands();
  } catch (e) { toast(e.message, 'error'); }
}
