/* ════════════════════════════════════════════════
   OVERVIEW PAGE
   ════════════════════════════════════════════════ */
window.PageOverview = async function () {
  const el = document.getElementById('pageContent');
  el.innerHTML = `
    <div class="pageHead">
      <div><h2 class="pageHead__title">Overview</h2><p class="pageHead__sub">Live performance across your entire store.</p></div>
    </div>
    <div class="kpiGrid" id="kpiGrid">${Array.from({length:8}).map(()=>'<div class="skeleton" style="height:96px;border-radius:10px"></div>').join('')}</div>
    <div class="grid3">
      <div class="panel">
        <div class="panel__head"><span class="panel__title">Revenue — last 30 days</span></div>
        <div class="panel__body"><div id="revenueChart" style="height:260px"></div></div>
      </div>
      <div class="panel">
        <div class="panel__head"><span class="panel__title">Low Stock Alerts</span></div>
        <div id="lowStockList"><div class="skeleton skeletonRow"></div><div class="skeleton skeletonRow"></div></div>
      </div>
    </div>
    <div class="grid3" style="margin-top:16px">
      <div class="panel">
        <div class="panel__head"><span class="panel__title">Recent Orders</span><a href="#/orders" class="btn btn--ghost btn--sm">View all</a></div>
        <div id="recentOrders"><div class="skeleton skeletonRow"></div><div class="skeleton skeletonRow"></div></div>
      </div>
      <div class="panel">
        <div class="panel__head"><span class="panel__title">Top Selling Products</span></div>
        <div id="topProducts"><div class="skeleton skeletonRow"></div><div class="skeleton skeletonRow"></div></div>
      </div>
    </div>
  `;

  const [kpis, series, recentOrders, topProducts, lowStock] = await Promise.all([
    api.get('/overview/kpis'),
    api.get('/overview/revenue-series?range=30d'),
    api.get('/overview/recent-orders'),
    api.get('/overview/top-products'),
    api.get('/overview/low-stock')
  ]);

  renderKpis(kpis);
  renderRevenueChart(series);
  renderRecentOrders(recentOrders);
  renderTopProducts(topProducts);
  renderLowStock(lowStock);
};

function kpiCard(label, value, changePct, extra) {
  const hasChange = changePct !== undefined && changePct !== null && isFinite(changePct);
  const up = changePct >= 0;
  return `
    <div class="kpi">
      <div class="kpi__label">${label}</div>
      <div class="kpi__value">${value}</div>
      <div class="kpi__foot">
        ${hasChange ? `<span class="kpi__change ${up ? 'is-up' : 'is-down'}">${up ? '▲' : '▼'} ${Math.abs(changePct).toFixed(1)}%</span><i>vs yesterday</i>` : `<i>${extra || ''}</i>`}
      </div>
    </div>`;
}

function renderKpis(k) {
  document.getElementById('kpiGrid').innerHTML = [
    kpiCard('Total Revenue', fmtMoney(k.totalRevenue), null, 'all time'),
    kpiCard("Today's Revenue", fmtMoney(k.todayRevenue), k.todayRevenueChangePct),
    kpiCard('Orders Today', fmtNumber(k.ordersToday), k.ordersTodayChangePct),
    kpiCard('Total Orders', fmtNumber(k.totalOrders), null, 'all time'),
    kpiCard('Pending Orders', fmtNumber(k.pendingOrders), null, 'awaiting action'),
    kpiCard('Completed Orders', fmtNumber(k.completedOrders), null, 'delivered'),
    kpiCard('Total Customers', fmtNumber(k.totalCustomers), null, 'registered'),
    kpiCard('Products', fmtNumber(k.totalProducts), null, `${k.lowStockProducts} low stock`),
    kpiCard('Average Order Value', fmtMoney(k.averageOrderValue), null, 'per order')
  ].join('');
}

function renderRevenueChart(series) {
  const box = document.getElementById('revenueChart');
  if (!series.length) { box.innerHTML = emptyState('', 'No revenue yet', 'Orders will appear here once placed.'); return; }

  const max = Math.max(...series.map(s => s.revenue), 1);
  const w = 600, h = 240, pad = 24;
  const stepX = (w - pad * 2) / Math.max(1, series.length - 1);
  const points = series.map((s, i) => {
    const x = pad + i * stepX;
    const y = h - pad - (s.revenue / max) * (h - pad * 2);
    return [x, y];
  });
  const path = points.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const area = path + ` L${points[points.length-1][0]},${h-pad} L${points[0][0]},${h-pad} Z`;

  box.innerHTML = `
    <svg viewBox="0 0 ${w} ${h}" style="width:100%;height:100%">
      <defs><linearGradient id="rev-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#b98b52" stop-opacity="0.28"/>
        <stop offset="100%" stop-color="#b98b52" stop-opacity="0"/>
      </linearGradient></defs>
      <path d="${area}" fill="url(#rev-grad)"/>
      <path d="${path}" fill="none" stroke="#8f6633" stroke-width="2"/>
      ${points.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="2.4" fill="#8f6633"/>`).join('')}
    </svg>
    <div class="hstack" style="justify-content:space-between;margin-top:6px;font-size:10px;color:var(--ink-soft)">
      <span>${series[0].day}</span><span>${series[series.length-1].day}</span>
    </div>
  `;
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
  if (!rows.length) { box.innerHTML = emptyState('', 'No orders yet', ''); return; }
  box.innerHTML = `<div class="tableWrap"><table class="dt"><tbody>${rows.map(o => `
    <tr onclick="window.location.hash='#/orders/${o.id}'" style="cursor:pointer">
      <td><b>#${escapeHtml(o.orderNumber)}</b><span class="dt__meta">${escapeHtml(o.customerName)}</span></td>
      <td>${fmtMoney(o.total)}</td>
      <td>${statusPill(o.status)}</td>
    </tr>`).join('')}</tbody></table></div>`;
}

function renderTopProducts(rows) {
  const box = document.getElementById('topProducts');
  if (!rows.length || !rows.some(r => r.unitsSold > 0)) { box.innerHTML = emptyState('', 'No sales yet', ''); return; }
  box.innerHTML = `<div class="tableWrap"><table class="dt"><tbody>${rows.filter(r=>r.unitsSold>0).slice(0,6).map(p => `
    <tr>
      <td class="hstack">
        <img class="dt__thumb" src="${p.image ? '/' + p.image : ''}" onerror="this.style.visibility='hidden'">
        <span class="dt__name">${escapeHtml(p.name)}</span>
      </td>
      <td>${p.unitsSold} sold</td>
      <td>${fmtMoney(p.revenue)}</td>
    </tr>`).join('')}</tbody></table></div>`;
}

function renderLowStock(rows) {
  const box = document.getElementById('lowStockList');
  if (!rows.length) { box.innerHTML = emptyState('', 'All stocked up', 'No products are low on stock.'); return; }
  box.innerHTML = `<div class="tableWrap"><table class="dt"><tbody>${rows.map(r => `
    <tr onclick="window.location.hash='#/products'" style="cursor:pointer">
      <td><b>${escapeHtml(r.name)}</b><span class="dt__meta">${escapeHtml(r.size)}</span></td>
      <td>${(r.stock - r.reserved) <= 0 ? '<span class="pill pill--danger">Out of stock</span>' : `<span class="pill pill--warn">${r.stock - r.reserved} left</span>`}</td>
    </tr>`).join('')}</tbody></table></div>`;
}
