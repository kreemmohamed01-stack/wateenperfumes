/* ════════════════════════════════════════════════
   APP SHELL — sidebar, topbar, hash router
   ════════════════════════════════════════════════ */

let CURRENT_USER = null;
let SIDEBAR_COLLAPSED = localStorage.getItem('wateen_admin_sidebar_collapsed') === 'true';

const PAGE_TITLES = {
  overview: 'Overview', orders: 'Orders', products: 'Products', categories: 'Categories',
  brands: 'Brands', customers: 'Customers', inventory: 'Inventory', discounts: 'Discounts & Coupons',
  reviews: 'Reviews', analytics: 'Analytics', notifications: 'Notifications',
  staff: 'Staff & Permissions', settings: 'Settings', activity: 'Activity Log'
};

function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '') || 'overview';
  const [page, ...rest] = hash.split('/');
  return { page, param: rest.join('/') };
}

function renderShell() {
  document.getElementById('app').innerHTML = `
    <div class="sidebar__scrim" id="sidebarScrim"></div>
    <aside class="sidebar ${SIDEBAR_COLLAPSED ? 'is-collapsed' : ''}" id="sidebar">
      <div class="sidebar__brand">
        <img src="/assets/logo.png" alt="Wateen Perfumes">
        <div class="sidebar__brandTxt"><b>WATEEN</b><i>PERFUMES</i></div>
      </div>
      <nav class="sidebar__nav" id="sidebarNav"></nav>
      <div class="sidebar__foot">
        <div class="sidebar__user">
          <div class="sidebar__avatar" id="userAvatar">?</div>
          <div class="sidebar__userTxt"><b id="userName">—</b><i id="userRole">—</i></div>
        </div>
        <button class="sidebar__collapseBtn" id="collapseBtn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 5 8 12l7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Collapse</span>
        </button>
        <button class="sidebar__logoutBtn" id="logoutBtn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke-linecap="round" stroke-linejoin="round"/><path d="m16 17 5-5-5-5M21 12H9" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>
    <div class="main">
      <header class="topbar">
        <button class="topbar__menuBtn" id="menuBtn" aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/></svg>
        </button>
        <h1 class="topbar__title" id="pageTitle">Overview</h1>
        <div class="topbar__search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3" stroke-linecap="round"/></svg>
          <input type="text" id="globalSearch" placeholder="Search orders, products, customers…">
        </div>
        <div class="topbar__right">
          <button class="iconBtn" id="notifBtn" aria-label="Notifications">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 9a6 6 0 0 1 12 0v5l2 3H4l2-3V9Z" stroke-linejoin="round"/><path d="M9.5 20a2.5 2.5 0 0 0 5 0"/></svg>
            <span class="iconBtn__dot" id="notifDot" style="display:none">0</span>
          </button>
        </div>
      </header>
      <main class="content" id="pageContent"></main>
    </div>
  `;

  buildSidebarNav();
  wireShellEvents();
  refreshNotifBadge();
}

function buildSidebarNav() {
  const nav = document.getElementById('sidebarNav');
  const role = CURRENT_USER ? CURRENT_USER.role : null;
  const isSuper = role === 'super_admin' || role === 'admin';

  nav.innerHTML = NAV_SECTIONS.map(section => {
    const items = section.items.filter(item => !item.superOnly || isSuper);
    if (!items.length) return '';
    return `
      <div class="sidebar__group">
        <div class="sidebar__groupLabel">${section.label}</div>
        ${items.map(item => `
          <a href="#/${item.id}" class="sidebar__link" data-page="${item.id}">
            ${iconSvg(item.icon)}
            <span class="sidebar__linkTxt">${item.label}</span>
            ${item.id === 'notifications' ? '<span class="sidebar__badge" id="navNotifBadge" style="display:none">0</span>' : ''}
          </a>
        `).join('')}
      </div>
    `;
  }).join('');
}

function wireShellEvents() {
  document.getElementById('collapseBtn').addEventListener('click', () => {
    SIDEBAR_COLLAPSED = !SIDEBAR_COLLAPSED;
    localStorage.setItem('wateen_admin_sidebar_collapsed', String(SIDEBAR_COLLAPSED));
    document.getElementById('sidebar').classList.toggle('is-collapsed', SIDEBAR_COLLAPSED);
  });

  document.getElementById('logoutBtn').addEventListener('click', async () => {
    const ok = await confirmModal({ title: 'Log out', message: 'End your admin session?', confirmLabel: 'Log out' });
    if (!ok) return;
    try { await api.post('/auth/logout'); } catch (e) {}
    window.location.href = '/admin/login.html';
  });

  document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('is-open');
    document.getElementById('sidebarScrim').classList.add('is-on');
  });
  document.getElementById('sidebarScrim').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('is-open');
    document.getElementById('sidebarScrim').classList.remove('is-on');
  });

  document.getElementById('notifBtn').addEventListener('click', () => {
    window.location.hash = '#/notifications';
  });

  document.getElementById('globalSearch').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      window.location.hash = '#/orders?q=' + encodeURIComponent(e.target.value.trim());
    }
  });
}

async function refreshNotifBadge() {
  try {
    const data = await api.getSilent('/notifications');
    const dot = document.getElementById('notifDot');
    const navBadge = document.getElementById('navNotifBadge');
    if (dot) { dot.style.display = data.unread ? 'grid' : 'none'; dot.textContent = data.unread > 99 ? '99+' : data.unread; }
    if (navBadge) { navBadge.style.display = data.unread ? 'inline-flex' : 'none'; navBadge.textContent = data.unread; }
  } catch (e) { /* silent */ }
}

function setActiveNav(page) {
  document.querySelectorAll('.sidebar__link').forEach(a => a.classList.toggle('is-active', a.dataset.page === page));
  document.getElementById('pageTitle').textContent = PAGE_TITLES[page] || 'Overview';
  document.title = (PAGE_TITLES[page] || 'Dashboard') + ' — Wateen Admin';
  document.getElementById('sidebar').classList.remove('is-open');
  document.getElementById('sidebarScrim').classList.remove('is-on');
}

const PAGE_RENDERERS = {
  overview: () => window.PageOverview(),
  orders: (param) => window.PageOrders(param),
  products: (param) => window.PageProducts(param),
  categories: () => window.PageCategories(),
  brands: () => window.PageBrands(),
  customers: (param) => window.PageCustomers(param),
  inventory: () => window.PageInventory(),
  discounts: () => window.PageDiscounts(),
  reviews: () => window.PageReviews(),
  analytics: () => window.PageAnalytics(),
  notifications: () => window.PageNotifications(),
  staff: () => window.PageStaff(),
  settings: () => window.PageSettings(),
  activity: () => window.PageActivity()
};

async function route() {
  const { page, param } = currentRoute();
  setActiveNav(page);
  const content = document.getElementById('pageContent');
  const renderer = PAGE_RENDERERS[page];
  if (!renderer) {
    content.innerHTML = emptyState('', 'Page not found', 'Choose a section from the sidebar.');
    return;
  }
  try {
    await renderer(param);
  } catch (e) {
    console.error(e);
    content.innerHTML = emptyState('', 'Something went wrong', e.message || 'Please try again.');
  }
  refreshNotifBadge();
}

async function initApp() {
  try {
    CURRENT_USER = await api.get('/auth/me');
  } catch (e) {
    window.location.href = '/admin/login.html';
    return;
  }

  renderShell();
  document.getElementById('userName').textContent = CURRENT_USER.name;
  document.getElementById('userRole').textContent = CURRENT_USER.role.replace(/_/g, ' ');
  document.getElementById('userAvatar').textContent = CURRENT_USER.name.trim().charAt(0).toUpperCase();

  window.addEventListener('hashchange', route);
  route();
}

document.addEventListener('DOMContentLoaded', initApp);
