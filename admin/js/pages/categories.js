/* ════════════════════════════════════════════════
   CATEGORIES PAGE
   ════════════════════════════════════════════════ */
window.PageCategories = async function () {
  const el = document.getElementById('pageContent');
  el.innerHTML = `
    <div class="pageHead">
      <div><h2 class="pageHead__title">Categories</h2><p class="pageHead__sub">Organize how products are grouped across the storefront.</p></div>
      <div class="pageHead__acts"><button class="btn btn--primary" id="addCatBtn">+ Add Category</button></div>
    </div>
    <div class="panel"><div class="tableWrap"><table class="dt">
      <thead><tr><th>Category</th><th>Slug</th><th>Products</th><th>Status</th><th></th></tr></thead>
      <tbody id="catBody"><tr><td colspan="5">${skeletonRows(5)}</td></tr></tbody>
    </table></div></div>
  `;
  document.getElementById('addCatBtn').addEventListener('click', () => openCategoryModal(null));
  await loadCategories();
};

async function loadCategories() {
  const rows = await api.get('/categories');
  const body = document.getElementById('catBody');
  if (!rows.length) { body.innerHTML = `<tr><td colspan="5">${emptyState('', 'No categories yet', '')}</td></tr>`; return; }
  body.innerHTML = rows.map(c => `
    <tr>
      <td class="hstack"><img class="dt__thumb" src="${resolveImageUrl(c.image)}" onerror="this.style.visibility='hidden'"><b>${escapeHtml(c.name)}</b></td>
      <td class="muted">${escapeHtml(c.slug)}</td>
      <td>${c.productCount}</td>
      <td><span class="pill pill--${c.isActive?'success':'neutral'}">${c.isActive?'Active':'Disabled'}</span></td>
      <td class="dt__actions">
        <button class="btn btn--ghost btn--sm" data-editcat="${c.id}">Edit</button>
        <button class="btn btn--danger btn--sm" data-delcat="${c.id}">Delete</button>
      </td>
    </tr>`).join('');
  body.querySelectorAll('[data-editcat]').forEach(b => b.addEventListener('click', () => openCategoryModal(rows.find(r=>r.id==b.dataset.editcat))));
  body.querySelectorAll('[data-delcat]').forEach(b => b.addEventListener('click', () => deleteCategory(b.dataset.delcat)));
}

function openCategoryModal(cat) {
  const modal = openModal(`
    <div class="modal__head"><h3 class="modal__title">${cat ? 'Edit' : 'Add'} Category</h3><button class="modal__close" data-modal-close>✕</button></div>
    <div class="modal__body">
      <div class="field"><label>Name <b>*</b></label><input id="catName" value="${escapeHtml(cat?.name||'')}"></div>
      <div class="field"><label>Description</label><textarea id="catDesc" rows="3">${escapeHtml(cat?.description||'')}</textarea></div>
      <div class="field"><label>Thumbnail Image URL</label><input id="catImage" value="${escapeHtml(cat?.image||'')}" placeholder="assets/category/men.jpg"></div>
      <div class="field"><label>Hero Banner Image URL</label><input id="catHero" value="${escapeHtml(cat?.heroImage||'')}" placeholder="assets/category/men-hero.jpg"></div>
      <div class="field__row">
        <div class="field"><label>SEO Title</label><input id="catSeoTitle" value="${escapeHtml(cat?.seoTitle||'')}"></div>
        <div class="field"><label>SEO Description</label><input id="catSeoDesc" value="${escapeHtml(cat?.seoDesc||'')}"></div>
      </div>
      ${cat ? `<label class="switch"><input type="checkbox" id="catActive" ${cat.isActive?'checked':''}><span class="switch__track"></span><span class="switch__label">Active on storefront</span></label>` : ''}
    </div>
    <div class="modal__foot"><button class="btn btn--ghost" data-modal-close>Cancel</button><button class="btn btn--primary" id="saveCatBtn">Save</button></div>
  `);

  modal.el.querySelector('#saveCatBtn').addEventListener('click', async () => {
    const name = document.getElementById('catName').value.trim();
    if (!name) return toast('Category name is required.', 'error');
    const payload = {
      name, description: document.getElementById('catDesc').value,
      image: document.getElementById('catImage').value, heroImage: document.getElementById('catHero').value,
      seoTitle: document.getElementById('catSeoTitle').value, seoDesc: document.getElementById('catSeoDesc').value
    };
    if (cat) payload.isActive = document.getElementById('catActive').checked;
    try {
      if (cat) await api.put('/categories/' + cat.id, payload);
      else await api.post('/categories', payload);
      toast('Category saved.', 'success');
      modal.close();
      loadCategories();
    } catch (e) { toast(e.message, 'error'); }
  });
}

async function deleteCategory(id) {
  const ok = await confirmModal({ title: 'Delete category', message: 'Categories in use will be disabled instead of deleted.', confirmLabel: 'Delete', danger: true });
  if (!ok) return;
  try {
    const res = await api.del('/categories/' + id);
    toast(res.disabled ? 'Category disabled (still has products).' : 'Category deleted.', 'success');
    loadCategories();
  } catch (e) { toast(e.message, 'error'); }
}
