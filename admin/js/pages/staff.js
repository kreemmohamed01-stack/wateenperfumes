/* ════════════════════════════════════════════════
   STAFF & PERMISSIONS PAGE
   ════════════════════════════════════════════════ */
window.PageStaff = async function () {
  const el = document.getElementById('pageContent');
  el.innerHTML = `
    <div class="pageHead">
      <div><h2 class="pageHead__title">Staff &amp; Permissions</h2><p class="pageHead__sub">Role-based access, enforced on the server for every request.</p></div>
      <div class="pageHead__acts"><button class="btn btn--primary" id="addStaffBtn">+ Add Staff Member</button></div>
    </div>
    <div class="panel"><div class="tableWrap"><table class="dt">
      <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Last Login</th><th>Status</th><th></th></tr></thead>
      <tbody id="staffBody"><tr><td colspan="6">${skeletonRows(4)}</td></tr></tbody>
    </table></div></div>
  `;
  document.getElementById('addStaffBtn').addEventListener('click', () => openStaffModal(null));
  await loadStaff();
};

async function loadStaff() {
  let rows;
  try { rows = await api.get('/staff'); }
  catch (e) { document.getElementById('pageContent').innerHTML = emptyState('', 'Access restricted', e.message); return; }

  const body = document.getElementById('staffBody');
  body.innerHTML = rows.map(u => `
    <tr>
      <td><b>${escapeHtml(u.name)}</b>${u.id===CURRENT_USER.id?' <span class="muted">(you)</span>':''}</td>
      <td>${escapeHtml(u.email)}</td>
      <td><span class="pill pill--gold">${u.role.replace(/_/g,' ')}</span></td>
      <td class="muted">${u.last_login_at ? fmtDate(u.last_login_at) : 'Never'}</td>
      <td><span class="pill pill--${u.is_active?'success':'neutral'}">${u.is_active?'Active':'Disabled'}</span></td>
      <td class="dt__actions">
        <button class="btn btn--ghost btn--sm" data-editstaff="${u.id}">Edit</button>
        ${u.id!==CURRENT_USER.id?`<button class="btn btn--danger btn--sm" data-delstaff="${u.id}">Disable</button>`:''}
      </td>
    </tr>`).join('');

  body.querySelectorAll('[data-editstaff]').forEach(btn => btn.addEventListener('click', () => openStaffModal(rows.find(r=>r.id==btn.dataset.editstaff))));
  body.querySelectorAll('[data-delstaff]').forEach(btn => btn.addEventListener('click', async () => {
    const ok = await confirmModal({ title: 'Disable staff account', message: 'They will no longer be able to log in.', confirmLabel: 'Disable', danger: true });
    if (!ok) return;
    try { await api.del('/staff/' + btn.dataset.delstaff); toast('Account disabled.', 'success'); loadStaff(); }
    catch (e) { toast(e.message, 'error'); }
  }));
}

const ROLE_OPTIONS = [
  ['super_admin','Super Admin — full access'], ['admin','Admin — full access'],
  ['manager','Manager — products, orders, customers, analytics, discounts, content, inventory, reviews'],
  ['orders_manager','Orders Manager — orders, customers'],
  ['product_manager','Product Manager — products, inventory, discounts'],
  ['marketing_manager','Marketing Manager — content, discounts, analytics'],
  ['support','Support — orders, customers, reviews']
];

function openStaffModal(user) {
  const modal = openModal(`
    <div class="modal__head"><h3 class="modal__title">${user ? 'Edit' : 'Add'} Staff Member</h3><button class="modal__close" data-modal-close>✕</button></div>
    <div class="modal__body">
      <div class="field"><label>Full Name <b>*</b></label><input id="stName" value="${escapeHtml(user?.name||'')}"></div>
      <div class="field"><label>Email <b>*</b></label><input id="stEmail" type="email" value="${escapeHtml(user?.email||'')}" ${user?'disabled':''}></div>
      <div class="field"><label>Role <b>*</b></label>
        <select id="stRole">${ROLE_OPTIONS.map(([v,l]) => `<option value="${v}" ${user?.role===v?'selected':''}>${l}</option>`).join('')}</select>
      </div>
      <div class="field"><label>${user ? 'New Password (leave blank to keep current)' : 'Password'} ${user?'':'<b>*</b>'}</label><input id="stPassword" type="password" placeholder="At least 8 characters"></div>
      ${user ? `<label class="switch"><input type="checkbox" id="stActive" ${user.is_active?'checked':''}><span class="switch__track"></span><span class="switch__label">Active</span></label>` : ''}
    </div>
    <div class="modal__foot"><button class="btn btn--ghost" data-modal-close>Cancel</button><button class="btn btn--primary" id="saveStaffBtn">Save</button></div>
  `);

  modal.el.querySelector('#saveStaffBtn').addEventListener('click', async () => {
    const name = document.getElementById('stName').value.trim();
    const email = document.getElementById('stEmail').value.trim();
    const role = document.getElementById('stRole').value;
    const password = document.getElementById('stPassword').value;
    if (!name || (!user && !email)) return toast('Name and email are required.', 'error');

    try {
      if (user) {
        await api.put('/staff/' + user.id, { name, role, isActive: document.getElementById('stActive').checked, password: password || undefined });
      } else {
        if (!password || password.length < 8) return toast('Password must be at least 8 characters.', 'error');
        await api.post('/staff', { name, email, password, role });
      }
      toast('Staff account saved.', 'success');
      modal.close();
      loadStaff();
    } catch (e) { toast(e.message, 'error'); }
  });
}
