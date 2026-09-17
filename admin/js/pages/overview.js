/* ════════════════════════════════════════════════
   OVERVIEW PAGE
   ════════════════════════════════════════════════ */

const KPI_ICONS = {
  revenue: '<path d="M4 19V9M10 19V5M16 19v-7M21 19H3" stroke-linecap="round"/>',
  orders:  '<path d="M6 7h12l-1 12a2 2 0 0 1-2 1.8H9A2 2 0 0 1 7 19L6 7Z" stroke-linejoin="round"/><path d="M9.2 7V5.4a2.8 2.8 0 0 1 5.6 0V7" stroke-linecap="round"/>',
  customers: '<circle cx="9" cy="8" r="3.2"/><path d="M2.8 19.5a6.2 6.2 0 0 1 12.4 0" stroke-linecap="round"/><path d="M16 5a3.2 3.2 0 0 1 0 6.2M18.6 19.5a5.8 5.8 0 0 0-4-5.4" stroke-linecap="round"/>',
  products: '<path d="M3 8l9-5 9 5-9 5-9-5Z" stroke-linejoin="round"/><path d="M3 8v8l9 5 9-5V8" stroke-linejoin="round"/>',
  rate: '<path d="M4 19V11M9.5 19V7M15 19v-5M20.5 19V4" stroke-linecap="round"/>'
};

window.PageOverview = async function () {
  const el = document.getElementById('pageContent');
  el.innerHTML = `
    <div class="hero">
      <div class="hero__txt">
        <h2 class="hero__title">Welcome back, ${escapeHtml(firstName())}</h2>
        <p class="hero__sub">Here's what's happening with your store today.</p>
      </div>
      <div class="hero__acts">
        <a href="#/analytics" class="livePill" id="overviewLivePill">
          <span class="livePill__dot"></span>
          <b id="overviewLiveCount">—</b> online now
        </a>
      </div>
    </div>

    <div class="kpiGrid" id="kpiGrid">${Array.from({length:5}).map(()=>'<div class="skeleton" style="height:126px;border-radius:14px"></div>').join('')}</div>

    <div class="grid3">
      <div class="panel">
        <div class="panel__head">
          <div>
            <span class="panel__title">Revenue Overview</span>
            <div id="revTotal" class="muted" style="font-size:12px;margin-top:2px">&nbsp;</div>
          </div>
          <div class="seg" id="revSeg">
            <button data-range="today">Today</button>
            <button data-range="7d">7 Days</button>
            <button data-range="30d" class="is-on">30 Days</button>
            <button data-range="90d">3 Months</button>
            <button data-range="365d">1 Year</button>
          </div>
        </div>
        <div class="panel__body"><div id="revenueChart" style="height:250px"></div></div>
      </div>

      <div class="panel">
        <div class="panel__head">
          <span class="panel__title">Orders by Status</span>
          <a href="#/orders" class="viewAll">View All
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h13M14 6l5 6-5 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
        <div class="panel__body"><div id="statusDonut"><div class="skeleton" style="height:150px"></div></div></div>
      </div>
    </div>

    <div class="grid3" style="margin-top:16px">
      <div class="panel">
        <div class="panel__head">
          <span class="panel__title">Top Selling Products</span>
          <a href="#/products" class="viewAll">View All
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h13M14 6l5 6-5 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
        <div id="topProducts"><div class="skeleton skeletonRow"></div><div class="skeleton skeletonRow"></div></div>
      </div>

      <div class="panel">
        <div class="panel__head">
          <span class="panel__title">Recent Orders</span>
          <a href="#/orders" class="viewAll">View All
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h13M14 6l5 6-5 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
        <div class="panel__body" id="recentOrders"><div class="skeleton skeletonRow"></div><div class="skeleton skeletonRow"></div></div>
      </div>
    </div>

    <div class="grid3" style="margin-top:16px">
      <div class="panel">
        <div class="panel__head">
          <span class="panel__title">Low Stock Products</span>
          <a href="#/inventory" class="viewAll">View All
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h13M14 6l5 6-5 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
        <div class="panel__body" id="lowStockList"><div class="skeleton skeletonRow"></div></div>
      </div>

      <div class="promoCard">
        <div class="promoCard__txt">NEW SEASON<br>NEW STORIES</div>
        <a href="#/content" class="btn btn--gold btn--sm">MANAGE BANNERS</a>
      </div>
    </div>
  `;

  wireRevenueSeg();

  const [kpis, series, recentOrders, topProducts, lowStock, statusCounts, liveVisitors] = await Promise.all([
    api.get('/overview/kpis'),
    api.get('/overview/revenue-series?range=30d'),
    api.get('/overview/recent-orders'),
    api.get('/overview/top-products'),
    api.get('/overview/low-stock'),
    api.getSilent('/overview/status-counts').catch(() => null),
    api.getSilent('/analytics/live').catch(() => null)
  ]);

  const liveEl = document.getElementById('overviewLiveCount');
  if (liveEl) liveEl.textContent = liveVisitors ? fmtNumber(liveVisitors.online) : '0';

  renderKpis(kpis);
  renderRevenueChart(series);
  renderRecentOrders(recentOrders);
  renderTopProducts(topProducts);
  renderLowStock(lowStock);
  renderStatusDonut(statusCounts, kpis);
};

function firstName() {
  // CURRENT_USER is a top-level `let` in app.js — a global binding, but not a
  // property of window, so it has to be read by name rather than off window
  const n = (typeof CURRENT_USER !== 'undefined' && CURRENT_USER && CURRENT_USER.name) || 'there';
  return String(n).trim().split(/\s+/)[0];
}

function wireRevenueSeg() {
  const seg = document.getElementById('revSeg');
  if (!seg) return;
  seg.addEventListener('click', async (e) => {
    const btn = e.target.closest('button[data-range]');
    if (!btn) return;
    seg.querySelectorAll('button').forEach(b => b.classList.toggle('is-on', b === btn));
    const box = document.getElementById('revenueChart');
    box.innerHTML = '<div class="skeleton" style="height:100%"></div>';
    try {
      renderRevenueChart(await api.get('/overview/revenue-series?range=' + btn.dataset.range));
    } catch (err) {
      box.innerHTML = emptyState('', 'Could not load revenue', err.message || '');
    }
  });
}

function kpiCard(icon, label, value, changePct, extra) {
  const hasChange = changePct !== undefined && changePct !== null && isFinite(changePct);
  const up = changePct >= 0;
  return `
    <div class="kpi">
      <div class="kpi__top">
        <span class="kpi__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">${KPI_ICONS[icon] || ''}</svg></span>
        <span class="kpi__label">${label}</span>
      </div>
      <div class="kpi__value">${value}</div>
      <div class="kpi__foot">
        ${hasChange
          ? `<span class="kpi__change ${up ? 'is-up' : 'is-down'}">${up ? '↑' : '↓'} ${Math.abs(changePct).toFixed(1)}%</span><i>vs last month</i>`
          : `<i>${extra || ''}</i>`}
      </div>
    </div>`;
}

function renderKpis(k) {
  const convRate = k.totalCustomers > 0 ? (k.totalOrders / k.totalCustomers) * 100 : 0;
  document.getElementById('kpiGrid').innerHTML = [
    kpiCard('revenue',  'Total Revenue',   fmtMoney(k.totalRevenue), null, 'all time'),
    kpiCard('orders',   'Total Orders',    fmtNumber(k.totalOrders), null, `${fmtNumber(k.pendingOrders)} pending`),
    kpiCard('customers','Total Customers', fmtNumber(k.totalCustomers), null, 'registered'),
    kpiCard('products', 'Products',        fmtNumber(k.totalProducts), null, `${fmtNumber(k.lowStockProducts)} low stock`),
    kpiCard('rate',     'Avg Order Value', fmtMoney(k.averageOrderValue), null, 'per order')
  ].join('');
}

function renderRevenueChart(series) {
  const box = document.getElementById('revenueChart');
  const totalBox = document.getElementById('revTotal');
  if (!series.length || !series.some(s => Number(s.revenue) > 0)) {
    if (totalBox) totalBox.textContent = fmtMoney(0);
    box.style.height = 'auto'; // don't hold the chart's full height for an empty message
    box.innerHTML = emptyState('', 'No revenue yet', 'Your sales chart will fill in as orders come in.');
    return;
  }
  box.style.height = '250px';

  const total = series.reduce((sum, s) => sum + Number(s.revenue || 0), 0);
  if (totalBox) totalBox.innerHTML = `<span style="font-family:var(--f-display);font-size:24px;color:var(--ink)">${fmtMoney(total)}</span>`;

  const max = Math.max(...series.map(s => s.revenue), 1);
  const w = 640, h = 250, padX = 30, padY = 22;
  const stepX = (w - padX * 2) / Math.max(1, series.length - 1);
  const points = series.map((s, i) => [
    padX + i * stepX,
    h - padY - (s.revenue / max) * (h - padY * 2)
  ]);
  const path = points.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const area = path + ` L${points[points.length-1][0].toFixed(1)},${h-padY} L${points[0][0].toFixed(1)},${h-padY} Z`;

  // four horizontal guide lines, labelled with their revenue value
  const gridLines = [0, .25, .5, .75, 1].map(f => {
    const y = h - padY - f * (h - padY * 2);
    return `<line x1="${padX}" y1="${y.toFixed(1)}" x2="${w-padX}" y2="${y.toFixed(1)}" stroke="rgba(26,22,19,.07)" stroke-width="1"/>`;
  }).join('');

  box.innerHTML = `
    <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="width:100%;height:100%">
      <defs><linearGradient id="rev-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#c9a227" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#c9a227" stop-opacity="0"/>
      </linearGradient></defs>
      ${gridLines}
      <path d="${area}" fill="url(#rev-grad)"/>
      <path d="${path}" fill="none" stroke="#a07d1c" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
    </svg>
    <div class="hstack" style="justify-content:space-between;margin-top:8px;font-size:11px;color:var(--ink-soft)">
      <span>${escapeHtml(fmtDay(series[0].day))}</span><span>${escapeHtml(fmtDay(series[series.length-1].day))}</span>
    </div>
  `;
}

const STATUS_COLORS = {
  pending: '#c9a227', confirmed: '#e3c76a', processing: '#a07d1c', packed: '#8a6f34',
  shipped: '#736a5f', out_for_delivery: '#9a8f80', delivered: '#1a7a4e',
  cancelled: '#c62828', returned: '#8f1d1d', refunded: '#bdb3a4'
};

function renderStatusDonut(counts, kpis) {
  const box = document.getElementById('statusDonut');
  if (!box) return;

  const entries = counts && counts.length
    ? counts.filter(c => Number(c.count) > 0)
    : [];

  if (!entries.length) {
    box.innerHTML = emptyState('', 'No orders yet', 'Order statuses will show here.');
    return;
  }

  const total = entries.reduce((s, e) => s + Number(e.count), 0);
  const r = 62, c = 2 * Math.PI * r;
  let offset = 0;

  const arcs = entries.map(e => {
    const frac = Number(e.count) / total;
    const seg = `<circle cx="75" cy="75" r="${r}" fill="none"
      stroke="${STATUS_COLORS[e.status] || '#bdb3a4'}" stroke-width="16"
      stroke-dasharray="${(frac * c).toFixed(2)} ${(c - frac * c).toFixed(2)}"
      stroke-dashoffset="${(-offset * c).toFixed(2)}"/>`;
    offset += frac;
    return seg;
  }).join('');

  box.innerHTML = `
    <div class="donutWrap">
      <div class="donut">
        <svg viewBox="0 0 150 150">${arcs}</svg>
        <div class="donut__mid"><div><b>${fmtNumber(total)}</b><i>Total Orders</i></div></div>
      </div>
      <div class="legend">
        ${entries.map(e => `
          <div class="legend__row">
            <span class="legend__dot" style="background:${STATUS_COLORS[e.status] || '#bdb3a4'}"></span>
            <span style="text-transform:capitalize">${escapeHtml(String(e.status).replace(/_/g,' '))}</span>
            <b>${fmtNumber(e.count)}</b>
          </div>`).join('')}
      </div>
    </div>`;
}

function statusPill(status) {
  const map = {
    pending: 'warn', confirmed: 'info', processing: 'info', packed: 'info', shipped: 'gold',
    out_for_delivery: 'gold', delivered: 'success', cancelled: 'danger', returned: 'danger', refunded: 'neutral'
  };
  return `<span class="pill pill--${map[status] || 'neutral'}"><span class="pill__dot"></span>${status.replace(/_/g, ' ')}</span>`;
}

function renderRecentOrders(rows) {
  const box = document.getElementById('recentOrders');
  if (!rows.length) { box.innerHTML = emptyState('', 'No orders yet', 'New orders will appear here the moment they come in.'); return; }
  box.innerHTML = `<div class="miniList">${rows.slice(0, 5).map(o => `
    <div class="miniRow" onclick="window.location.hash='#/orders/${o.id}'" style="cursor:pointer">
      <div class="miniRow__txt">
        <b>#${escapeHtml(o.orderNumber)}</b>
        <i>${escapeHtml(o.customerName)}${o.itemCount ? ' &middot; ' + o.itemCount + ' items' : ''}</i>
      </div>
      <div class="miniRow__right">${fmtMoney(o.total)}</div>
      ${statusPill(o.status)}
    </div>`).join('')}</div>`;
}

function renderTopProducts(rows) {
  const box = document.getElementById('topProducts');
  const sold = (rows || []).filter(r => r.unitsSold > 0).slice(0, 5);
  if (!sold.length) {
    box.innerHTML = `<div class="panel__body">${emptyState('', 'No sales yet', 'Your best sellers will be ranked here once products start selling.')}</div>`;
    return;
  }
  box.innerHTML = `<div class="tableWrap"><table class="dt">
    <thead><tr><th style="width:36px">#</th><th>Product</th><th>Sales</th><th>Revenue</th></tr></thead>
    <tbody>${sold.map((p, i) => `
      <tr onclick="window.location.hash='#/products'" style="cursor:pointer">
        <td class="muted">${i + 1}</td>
        <td>
          <div class="prodCell">
            <img class="prodCell__img" src="${resolveImageUrl(p.image)}" onerror="this.style.visibility='hidden'">
            <div class="prodCell__txt">
              <div class="prodCell__name">${escapeHtml(p.name)}</div>
              ${p.size ? `<span class="prodCell__meta">${escapeHtml(p.size)}</span>` : ''}
            </div>
          </div>
        </td>
        <td>${fmtNumber(p.unitsSold)}</td>
        <td>${fmtMoney(p.revenue)}</td>
      </tr>`).join('')}</tbody></table></div>`;
}

function renderLowStock(rows) {
  const box = document.getElementById('lowStockList');
  if (!rows.length) { box.innerHTML = emptyState('', 'All stocked up', 'Nothing is running low right now.'); return; }
  box.innerHTML = `<div class="miniList">${rows.slice(0, 5).map(r => {
    const left = r.stock - r.reserved;
    return `
    <div class="miniRow" onclick="window.location.hash='#/inventory'" style="cursor:pointer">
      <img class="miniRow__img" src="${resolveImageUrl(r.image)}" onerror="this.style.visibility='hidden'">
      <div class="miniRow__txt"><b>${escapeHtml(r.name)}</b>${r.size ? `<i>${escapeHtml(r.size)}</i>` : ''}</div>
      <span class="miniRow__qty">${left <= 0 ? 'Out of stock' : left + ' left'}</span>
    </div>`;
  }).join('')}</div>`;
}
