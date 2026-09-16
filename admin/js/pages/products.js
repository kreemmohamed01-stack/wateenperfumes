/* ════════════════════════════════════════════════
   PRODUCTS PAGE — list + full create/edit editor
   ════════════════════════════════════════════════ */

let productsState = { page: 1, q: '', status: '', category: '', brand: '', selected: new Set() };
let productsCategories = [];
let productsBrands = [];

window.PageProducts = async function (param) {
  if (param === 'new') return renderProductEditor(null);
  if (param && /^edit\/\d+$/.test(param)) return renderProductEditor(Number(param.split('/')[1]));

  const el = document.getElementById('pageContent');
  [productsCategories, productsBrands] = await Promise.all([api.get('/categories'), api.get('/brands')]);

  el.innerHTML = `
    <div class="hero">
      <div class="hero__txt">
        <h2 class="hero__title">Products</h2>
        <p class="hero__sub">Manage your fragrance collection</p>
      </div>
      <div class="hero__mark">SCENTS<br>SHAPE<br>STORIES</div>
    </div>

    <div class="statRow" id="prodStats">
      ${Array.from({length:4}).map(()=>'<div class="skeleton" style="height:78px;border-radius:14px"></div>').join('')}
    </div>

    <div class="panel">
      <div class="toolbar">
        <div class="toolbar__search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3" stroke-linecap="round"/></svg>
          <input type="text" id="prodSearch" placeholder="Search products, SKU…">
        </div>
        <select id="prodCategoryFilter"><option value="">All categories</option>${productsCategories.map(c=>`<option value="${c.slug}">${escapeHtml(c.name)}</option>`).join('')}</select>
        <select id="prodBrandFilter"><option value="">All brands</option>${productsBrands.map(b=>`<option value="${b.id}">${escapeHtml(b.name)}</option>`).join('')}</select>
        <select id="prodStatusFilter"><option value="">All statuses</option><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option></select>
        <div class="toolbar__spacer"></div>
      </div>
      <div class="bulkBar" id="prodBulkBar">
        <b><span id="prodSelectedCount">0</span> selected</b>
        <div class="bulkBar__acts">
          <button class="btn btn--ghost btn--sm" data-bulk="publish">Publish</button>
          <button class="btn btn--ghost btn--sm" data-bulk="unpublish">Unpublish</button>
          <button class="btn btn--ghost btn--sm" data-bulk="archive">Archive</button>
          <button class="btn btn--ghost btn--sm" data-bulk="best_seller">Mark Best Seller</button>
          <button class="btn btn--danger btn--sm" data-bulk="delete">Delete</button>
        </div>
      </div>
      <div class="tableWrap">
        <table class="dt">
          <thead><tr>
            <th style="width:32px"><input type="checkbox" class="dt__checkbox" id="prodSelectAll"></th>
            <th>Product</th><th>SKU</th><th>Category</th><th>Brand</th><th>Price</th><th>Stock</th><th>Status</th><th>Featured</th><th>Actions</th>
          </tr></thead>
          <tbody id="prodBody"><tr><td colspan="10">${skeletonRows(8)}</td></tr></tbody>
        </table>
      </div>
      <div class="pager" id="prodPager"></div>
    </div>
  `;

  document.getElementById('prodSearch').addEventListener('input', debounce(e => { productsState.q = e.target.value; productsState.page = 1; loadProducts(); }, 350));
  document.getElementById('prodCategoryFilter').addEventListener('change', e => { productsState.category = e.target.value; productsState.page = 1; loadProducts(); });
  document.getElementById('prodBrandFilter').addEventListener('change', e => { productsState.brand = e.target.value; productsState.page = 1; loadProducts(); });
  document.getElementById('prodStatusFilter').addEventListener('change', e => { productsState.status = e.target.value; productsState.page = 1; loadProducts(); });
  document.getElementById('prodSelectAll').addEventListener('change', e => {
    document.querySelectorAll('.prodRowCheck').forEach(cb => { cb.checked = e.target.checked; toggleProdSelect(cb.value, e.target.checked); });
  });
  document.querySelectorAll('[data-bulk]').forEach(btn => btn.addEventListener('click', () => applyProductBulk(btn.dataset.bulk)));

  productsState.selected = new Set();
  await Promise.all([loadProducts(), loadProductStats()]);
};

// the four counters above the table — each is a real query, not a derived
// count of the current page, so they don't change as you page through
async function loadProductStats() {
  const box = document.getElementById('prodStats');
  if (!box) return;
  try {
    const [all, published, drafts, low] = await Promise.all([
      api.get('/products?pageSize=1'),
      api.get('/products?pageSize=1&status=published'),
      api.get('/products?pageSize=1&status=draft'),
      api.get('/products?pageSize=1&lowStock=true')
    ]);
    box.innerHTML = `
      ${prodStat('box', all.total, 'Total Products')}
      ${prodStat('tag', published.total, 'Published')}
      ${prodStat('file', drafts.total, 'Drafts')}
      <div class="statTile statTile--action">
        <div class="hstack" style="gap:14px">
          <span class="statTile__icon" style="color:var(--danger);background:var(--danger-bg)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 4 2.5 20h19L12 4Z" stroke-linejoin="round"/><path d="M12 10v4M12 17v.01" stroke-linecap="round"/></svg>
          </span>
          <span class="statTile__txt"><b>${fmtNumber(low.total)}</b><i>Low Stock</i></span>
        </div>
        <a href="#/products/new" class="btn btn--primary btn--sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
          Add Product
        </a>
      </div>`;
  } catch (e) {
    box.innerHTML = '';
  }
}

function prodStat(icon, value, label) {
  return `
    <div class="statTile">
      <span class="statTile__icon">${iconSvg(icon)}</span>
      <span class="statTile__txt"><b>${fmtNumber(value)}</b><i>${escapeHtml(label)}</i></span>
    </div>`;
}

async function loadProducts() {
  const body = document.getElementById('prodBody');
  body.innerHTML = `<tr><td colspan="10">${skeletonRows(8)}</td></tr>`;
  const data = await api.get('/products' + qs({
    q: productsState.q, status: productsState.status, category: productsState.category,
    brand: productsState.brand, page: productsState.page, pageSize: 15
  }));

  if (!data.items.length) {
    body.innerHTML = `<tr><td colspan="10">${emptyState('', 'No products found', 'Try adjusting your filters, or add a new product.')}</td></tr>`;
    document.getElementById('prodPager').innerHTML = '';
    return;
  }

  body.innerHTML = data.items.map(p => {
    const prices = p.variants.map(v => v.price);
    const priceLabel = prices.length > 1 && Math.min(...prices) !== Math.max(...prices)
      ? `${fmtMoney(Math.min(...prices))} – ${fmtMoney(Math.max(...prices))}` : fmtMoney(prices[0] || 0);
    // show the pre-discount price struck through when this product is on sale
    const compareAt = p.variants.map(v => v.compareAtPrice).find(v => v != null);
    const showCompare = compareAt != null && Number(compareAt) > (prices[0] || 0);

    const totalStock = p.variants.reduce((s, v) => s + v.available, 0);
    const threshold = p.lowStockThreshold != null ? p.lowStockThreshold : 5;
    const stockClass = totalStock <= 0 ? 'is-crit' : (totalStock <= threshold ? 'is-low' : '');

    const cats = p.categories.map(c => c.name).join(', ') || '—';
    const size = p.variants.length === 1 ? (p.variants[0].size || '') : `${p.variants.length} sizes`;

    return `
      <tr>
        <td><input type="checkbox" class="dt__checkbox prodRowCheck" value="${p.id}"></td>
        <td>
          <div class="prodCell">
            <img class="prodCell__img" src="${p.images[0] ? resolveImageUrl(p.images[0].url) : ''}" onerror="this.style.visibility='hidden'">
            <div class="prodCell__txt">
              <a href="#/products/edit/${p.id}" class="prodCell__name">${escapeHtml(p.name)}</a>
              ${size ? `<span class="prodCell__meta">${escapeHtml(size)}</span>` : ''}
            </div>
          </div>
        </td>
        <td class="muted">${escapeHtml(p.sku || '—')}</td>
        <td>${escapeHtml(cats)}</td>
        <td>${p.brand ? escapeHtml(p.brand.name) : '—'}</td>
        <td>
          <div class="priceCell">
            <b>${priceLabel}</b>
            ${showCompare ? `<s>${fmtMoney(compareAt)}</s>` : ''}
          </div>
        </td>
        <td><span class="stockCell ${stockClass}">${totalStock <= 0 ? 'Out' : fmtNumber(totalStock)}</span></td>
        <td><span class="pill pill--${p.status==='published'?'success':p.status==='draft'?'neutral':'warn'}">${p.status}</span></td>
        <td>
          <button class="starBtn ${p.featured ? 'is-on' : ''}" data-star="${p.id}" title="Featured on the storefront">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m12 3 2.9 6 6.6.7-5 4.5 1.4 6.5-5.9-3.4-5.9 3.4L7.5 14 2.5 9.7l6.6-.7L12 3Z" stroke-linejoin="round"/></svg>
          </button>
        </td>
        <td class="dt__actions">
          <a href="#/products/edit/${p.id}" class="btn btn--ghost btn--sm btn--icon" title="Edit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Z" stroke-linejoin="round"/></svg>
          </a>
          <button class="btn btn--ghost btn--sm btn--icon" data-dup="${p.id}" title="Duplicate">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a1 1 0 0 1 1-1h9" stroke-linecap="round"/></svg>
          </button>
          <a href="/product.html?id=${encodeURIComponent(p.slug || '')}" target="_blank" rel="noopener" class="btn btn--ghost btn--sm btn--icon" title="View on the store">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" stroke-linejoin="round"/><circle cx="12" cy="12" r="3"/></svg>
          </a>
          <button class="btn btn--danger btn--sm btn--icon" data-del="${p.id}" title="Delete">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 7h14M10 7V5.5A1.5 1.5 0 0 1 11.5 4h1A1.5 1.5 0 0 1 14 5.5V7m-7 0 .8 12a1.5 1.5 0 0 0 1.5 1.4h5.4a1.5 1.5 0 0 0 1.5-1.4L18 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </td>
      </tr>`;
  }).join('');

  document.querySelectorAll('.prodRowCheck').forEach(cb => cb.addEventListener('change', e => toggleProdSelect(e.target.value, e.target.checked)));
  document.querySelectorAll('[data-dup]').forEach(btn => btn.addEventListener('click', () => duplicateProduct(btn.dataset.dup)));
  document.querySelectorAll('[data-del]').forEach(btn => btn.addEventListener('click', () => deleteProduct(btn.dataset.del)));
  document.querySelectorAll('[data-star]').forEach(btn => btn.addEventListener('click', () => toggleFeatured(btn)));

  renderPager('prodPager', data, p => { productsState.page = p; loadProducts(); });
}

function toggleProdSelect(id, checked) {
  if (checked) productsState.selected.add(id); else productsState.selected.delete(id);
  document.getElementById('prodBulkBar').classList.toggle('is-on', productsState.selected.size > 0);
  document.getElementById('prodSelectedCount').textContent = productsState.selected.size;
}

async function applyProductBulk(action) {
  const ids = [...productsState.selected];
  if (!ids.length) return;
  if (action === 'delete') {
    const ok = await confirmModal({ title: 'Delete products', message: `Delete ${ids.length} product(s)? Products with existing orders will be archived instead.`, confirmLabel: 'Delete', danger: true });
    if (!ok) return;
  }
  try {
    const value = action === 'best_seller' ? true : undefined;
    await api.post('/products/bulk', { ids, action: action === 'best_seller' ? 'set_best_seller' : action, value });
    toast('Applied to ' + ids.length + ' product(s).', 'success');
    productsState.selected.clear();
    loadProducts();
  } catch (e) { toast(e.message, 'error'); }
}

async function duplicateProduct(id) {
  try { await api.post(`/products/${id}/duplicate`); toast('Product duplicated.', 'success'); loadProducts(); }
  catch (e) { toast(e.message, 'error'); }
}

// star column — flips `featured` straight from the list, no round trip to the editor
async function toggleFeatured(btn) {
  const id = btn.dataset.star;
  const next = !btn.classList.contains('is-on');
  btn.classList.toggle('is-on', next); // optimistic, reverted below if it fails
  try {
    await api.put(`/products/${id}`, { featured: next });
    toast(next ? 'Featured on the storefront.' : 'Removed from featured.', 'success');
  } catch (e) {
    btn.classList.toggle('is-on', !next);
    toast(e.message, 'error');
  }
}

async function deleteProduct(id) {
  const ok = await confirmModal({ title: 'Delete product', message: 'This cannot be undone unless the product has past orders (then it will be archived).', confirmLabel: 'Delete', danger: true });
  if (!ok) return;
  try {
    const res = await api.del(`/products/${id}`);
    toast(res.archived ? 'Product archived (has existing orders).' : 'Product deleted.', 'success');
    loadProducts();
  } catch (e) { toast(e.message, 'error'); }
}

/* ════════════════════════════════════════════════
   PRODUCT EDITOR
   ════════════════════════════════════════════════ */

let editorImages = [];
let editorVariants = [];

async function renderProductEditor(id) {
  const el = document.getElementById('pageContent');
  el.innerHTML = `<div class="skeleton" style="height:500px;border-radius:12px"></div>`;

  const [categories, brands, product] = await Promise.all([
    api.get('/categories'), api.get('/brands'), id ? api.get('/products/' + id) : Promise.resolve(null)
  ]);

  editorImages = product ? product.images.map(i => ({ url: i.url })) : [];
  editorVariants = product ? product.variants.map(v => ({ ...v })) : [{ size: '', price: '', stock: 0, isDefault: true }];
  const selectedCatIds = product ? product.categories.map(c => c.id) : [];

  el.innerHTML = `
    <div class="pageHead">
      <div>
        <a href="#/products" class="muted" style="font-size:12px">← Back to products</a>
        <h2 class="pageHead__title" style="margin-top:6px">${product ? 'Edit Product' : 'Add Product'}</h2>
      </div>
      <div class="pageHead__acts">
        ${product ? `<span class="pill pill--${product.status==='published'?'success':'neutral'}">${product.status}</span>` : ''}
        <button class="btn btn--primary" id="saveProductBtn">${product ? 'Save Changes' : 'Create Product'}</button>
      </div>
    </div>

    <div class="grid3">
      <div>
        <div class="panel">
          <div class="panel__head"><span class="panel__title">Basic Information</span></div>
          <div class="panel__body">
            <div class="field__row">
              <div class="field"><label>Product Name <b>*</b></label><input id="f_name" value="${escapeHtml(product?.name||'')}" placeholder="e.g. Shuhrah"></div>
              <div class="field"><label>Arabic Name</label><input id="f_nameAr" value="${escapeHtml(product?.nameAr||'')}" dir="rtl"></div>
            </div>
            <div class="field__row3">
              <div class="field"><label>Brand</label>
                <select id="f_brand"><option value="">— No brand —</option>${brands.map(b=>`<option value="${b.id}" ${product?.brand?.id===b.id?'selected':''}>${escapeHtml(b.name)}</option>`).join('')}</select>
              </div>
              <div class="field"><label>Type</label><input id="f_type" value="${escapeHtml(product?.type||'Eau de Parfum')}"></div>
              <div class="field"><label>Gender</label>
                <select id="f_gender">${['Men','Women','Unisex'].map(g=>`<option ${product?.gender===g?'selected':''}>${g}</option>`).join('')}</select>
              </div>
            </div>
            <div class="field__row">
              <div class="field"><label>SKU</label><input id="f_sku" value="${escapeHtml(product?.sku||'')}"></div>
              <div class="field"><label>Barcode</label><input id="f_barcode" value="${escapeHtml(product?.barcode||'')}"></div>
            </div>
            <div class="field"><label>Description</label><textarea id="f_desc" rows="4">${escapeHtml(product?.description||'')}</textarea></div>
            <div class="field__row3">
              <div class="field"><label>Fragrance Family</label><input id="f_family" value="${escapeHtml(product?.family||'')}"></div>
              <div class="field"><label>Origin</label><input id="f_origin" value="${escapeHtml(product?.origin||'')}"></div>
              <div class="field"><label>Year</label><input id="f_year" value="${escapeHtml(product?.year||'')}"></div>
            </div>
            <div class="field__row3">
              <div class="field"><label>Top Notes</label><input id="f_notesTop" value="${escapeHtml(product?.notes?.top||'')}"></div>
              <div class="field"><label>Heart Notes</label><input id="f_notesHeart" value="${escapeHtml(product?.notes?.heart||'')}"></div>
              <div class="field"><label>Base Notes</label><input id="f_notesBase" value="${escapeHtml(product?.notes?.base||'')}"></div>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel__head"><span class="panel__title">Sizes &amp; Pricing</span><button class="btn btn--ghost btn--sm" id="addVariantBtn">+ Add Size</button></div>
          <div class="panel__body" id="variantsWrap"></div>
        </div>

        <div class="panel">
          <div class="panel__head"><span class="panel__title">Images</span></div>
          <div class="panel__body">
            <div class="imgGrid" id="imgGrid"></div>
            <p class="field__hint" style="margin-top:10px">Drag to reorder. The first image is the main product photo. Recommended: consistent aspect ratio, PNG/JPG/WEBP up to 8MB.</p>
          </div>
        </div>
      </div>

      <div>
        <div class="panel">
          <div class="panel__head"><span class="panel__title">Organization</span></div>
          <div class="panel__body">
            <div class="field"><label>Status</label>
              <select id="f_status">${['published','draft','archived'].map(s=>`<option value="${s}" ${product?.status===s?'selected':''}>${s}</option>`).join('')}</select>
            </div>
            <div class="field"><label>Categories</label>
              <div class="stack" id="catCheckboxes">
                ${categories.map(c => `<label class="checkRow"><input type="checkbox" value="${c.id}" ${selectedCatIds.includes(c.id)?'checked':''}> ${escapeHtml(c.name)}</label>`).join('')}
              </div>
              <p class="field__hint">First checked category becomes the primary listing page; a product can appear in multiple categories.</p>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel__head"><span class="panel__title">Placement &amp; Flags</span></div>
          <div class="panel__body stack" style="gap:4px">
            <label class="switch"><input type="checkbox" id="f_bestSeller" ${product?.bestSeller?'checked':''}><span class="switch__track"></span><span class="switch__label">Best Seller</span></label>
            <label class="switch"><input type="checkbox" id="f_featured" ${product?.featured?'checked':''}><span class="switch__track"></span><span class="switch__label">Featured</span></label>
            <label class="switch"><input type="checkbox" id="f_newArrival" ${product?.newArrival?'checked':''}><span class="switch__track"></span><span class="switch__label">New Arrival</span></label>
          </div>
        </div>

        <div class="panel">
          <div class="panel__head"><span class="panel__title">Product-Specific Discount</span></div>
          <div class="panel__body stack">
            <label class="switch"><input type="checkbox" id="f_discountActive" ${product?.discountActive?'checked':''}><span class="switch__track"></span><span class="switch__label">Apply a discount to this product</span></label>
            <div class="field" style="margin-top:12px">
              <label>Discount Percent</label>
              <input id="f_discountPercent" type="number" min="0" max="90" value="${product?.discountPercent||0}">
              <p class="field__hint">Shown as strike-through pricing on the site. Independent of the site-wide sale in Discounts &amp; Coupons.</p>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel__head"><span class="panel__title">SEO</span></div>
          <div class="panel__body">
            <div class="field"><label>Meta Title</label><input id="f_seoTitle" value="${escapeHtml(product?.seoTitle||'')}"></div>
            <div class="field"><label>Meta Description</label><textarea id="f_seoDesc" rows="3">${escapeHtml(product?.seoDesc||'')}</textarea></div>
          </div>
        </div>
      </div>
    </div>
  `;

  renderVariantsEditor();
  renderImageGrid();

  document.getElementById('addVariantBtn').addEventListener('click', () => {
    editorVariants.push({ size: '', price: '', stock: 0, isDefault: editorVariants.length === 0 });
    renderVariantsEditor();
  });

  document.getElementById('saveProductBtn').addEventListener('click', () => saveProduct(id, product));
}

function renderVariantsEditor() {
  const wrap = document.getElementById('variantsWrap');
  wrap.innerHTML = editorVariants.map((v, i) => `
    <div class="variantRow">
      <div class="field"><label>Size <b>*</b></label><input data-vf="size" data-i="${i}" value="${escapeHtml(v.size||'')}" placeholder="e.g. 50 ML"></div>
      <div class="field"><label>Price (EGP) <b>*</b></label><input data-vf="price" data-i="${i}" type="number" min="0" step="0.01" value="${v.price||''}"></div>
      <div class="field"><label>Compare-at</label><input data-vf="compareAtPrice" data-i="${i}" type="number" min="0" step="0.01" value="${v.compareAtPrice||''}"></div>
      <div class="field"><label>Stock</label><input data-vf="stock" data-i="${i}" type="number" min="0" value="${v.stock||0}"></div>
      <div class="hstack" style="gap:6px">
        <label class="hstack" style="gap:5px;font-size:10.5px" title="Default size shown first"><input type="radio" name="defaultVariant" data-vf="isDefault" data-i="${i}" ${v.isDefault?'checked':''}> Default</label>
        <button class="btn btn--danger btn--icon btn--sm" data-vdel="${i}" title="Remove size" ${editorVariants.length<=1?'disabled':''}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width:13px;height:13px"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg>
        </button>
      </div>
    </div>
  `).join('');

  wrap.querySelectorAll('[data-vf]').forEach(input => {
    input.addEventListener('input', (e) => {
      const i = Number(e.target.dataset.i);
      const field = e.target.dataset.vf;
      if (field === 'isDefault') { editorVariants.forEach((v,vi) => v.isDefault = vi === i); return; }
      editorVariants[i][field] = e.target.value;
    });
    if (input.dataset.vf === 'isDefault') input.addEventListener('change', (e) => {
      const i = Number(e.target.dataset.i);
      editorVariants.forEach((v,vi) => v.isDefault = vi === i);
    });
  });
  wrap.querySelectorAll('[data-vdel]').forEach(btn => btn.addEventListener('click', () => {
    editorVariants.splice(Number(btn.dataset.vdel), 1);
    if (!editorVariants.some(v=>v.isDefault) && editorVariants[0]) editorVariants[0].isDefault = true;
    renderVariantsEditor();
  }));
}

function renderImageGrid() {
  const grid = document.getElementById('imgGrid');
  grid.innerHTML = editorImages.map((img, i) => `
    <div class="imgCell ${i===0?'is-main':''}" draggable="true" data-i="${i}">
      <img src="${resolveImageUrl(img.url)}">
      <button class="imgCell__del" data-idel="${i}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg></button>
    </div>
  `).join('') + `
    <label class="imgDrop" id="imgDropZone">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 16V4M7 9l5-5 5 5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" stroke-linecap="round"/></svg>
      <span>Drop image or click to upload</span>
      <input type="file" id="imgFileInput" accept="image/png,image/jpeg,image/webp,image/gif" multiple>
    </label>
  `;

  grid.querySelectorAll('[data-idel]').forEach(btn => btn.addEventListener('click', () => {
    editorImages.splice(Number(btn.dataset.idel), 1);
    renderImageGrid();
  }));

  // drag to reorder
  let dragIndex = null;
  grid.querySelectorAll('.imgCell').forEach(cell => {
    cell.addEventListener('dragstart', () => { dragIndex = Number(cell.dataset.i); cell.classList.add('is-dragging'); });
    cell.addEventListener('dragend', () => cell.classList.remove('is-dragging'));
    cell.addEventListener('dragover', (e) => e.preventDefault());
    cell.addEventListener('drop', (e) => {
      e.preventDefault();
      const dropIndex = Number(cell.dataset.i);
      if (dragIndex === null || dragIndex === dropIndex) return;
      const [moved] = editorImages.splice(dragIndex, 1);
      editorImages.splice(dropIndex, 0, moved);
      renderImageGrid();
    });
  });

  const dropZone = document.getElementById('imgDropZone');
  const fileInput = document.getElementById('imgFileInput');
  fileInput.addEventListener('change', () => uploadImages(fileInput.files));
  dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('is-over'); });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('is-over'));
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault(); dropZone.classList.remove('is-over');
    uploadImages(e.dataTransfer.files);
  });
}

async function uploadImages(fileList) {
  const files = Array.from(fileList || []);
  for (const file of files) {
    const fd = new FormData();
    fd.append('image', file);
    try {
      const res = await api.post('/products/upload-image', fd);
      editorImages.push({ url: res.url });
    } catch (e) { toast(e.message, 'error'); }
  }
  renderImageGrid();
}

async function saveProduct(id, existing) {
  const val = (sel) => document.getElementById(sel).value.trim();
  const name = val('f_name');
  if (!name) return toast('Product name is required.', 'error');

  const categoryIds = [...document.querySelectorAll('#catCheckboxes input:checked')].map(cb => Number(cb.value));
  const cleanVariants = editorVariants
    .filter(v => v.size && v.size.toString().trim())
    .map(v => ({ id: v.id, size: v.size.trim(), price: Number(v.price), compareAtPrice: v.compareAtPrice ? Number(v.compareAtPrice) : null, stock: Number(v.stock)||0, isDefault: !!v.isDefault }));

  if (!cleanVariants.length) return toast('Add at least one size with a price.', 'error');
  if (cleanVariants.some(v => !v.price || v.price <= 0)) return toast('Every size needs a price greater than 0.', 'error');

  const payload = {
    name, nameAr: val('f_nameAr'), brandId: document.getElementById('f_brand').value || null,
    type: val('f_type'), gender: document.getElementById('f_gender').value, sku: val('f_sku'), barcode: val('f_barcode'),
    description: val('f_desc'), family: val('f_family'), origin: val('f_origin'), year: val('f_year'),
    notes: { top: val('f_notesTop'), heart: val('f_notesHeart'), base: val('f_notesBase') },
    status: document.getElementById('f_status').value, categoryIds,
    bestSeller: document.getElementById('f_bestSeller').checked,
    featured: document.getElementById('f_featured').checked,
    newArrival: document.getElementById('f_newArrival').checked,
    discountActive: document.getElementById('f_discountActive').checked,
    discountPercent: Number(document.getElementById('f_discountPercent').value) || 0,
    seoTitle: val('f_seoTitle'), seoDesc: val('f_seoDesc'),
    variants: cleanVariants, images: editorImages
  };

  const btn = document.getElementById('saveProductBtn');
  btn.disabled = true;
  try {
    if (id) await api.put('/products/' + id, payload);
    else await api.post('/products', payload);
    toast('Product saved.', 'success');
    window.location.hash = '#/products';
  } catch (e) {
    toast(e.message, 'error');
    btn.disabled = false;
  }
}
