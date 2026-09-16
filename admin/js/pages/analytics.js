/* ════════════════════════════════════════════════
   ANALYTICS PAGE
   ════════════════════════════════════════════════ */
window.PageAnalytics = async function () {
  const el = document.getElementById('pageContent');
  el.innerHTML = `
    <div class="pageHead">
      <div><h2 class="pageHead__title">Analytics</h2><p class="pageHead__sub">Deeper performance reporting across the store.</p></div>
      <div class="pageHead__acts">
        <select id="analyticsRange">
          <option value="today">Today</option><option value="7d">Last 7 days</option>
          <option value="30d" selected>Last 30 days</option><option value="3m">Last 3 months</option><option value="12m">Last 12 months</option>
        </select>
        <button class="btn btn--ghost" id="exportAnalyticsBtn">Export CSV</button>
      </div>
    </div>
    <div class="panel"><div class="panel__head"><span class="panel__title">Revenue &amp; Orders</span></div><div class="panel__body"><div id="analyticsChart" style="height:280px"></div></div></div>
    <div class="grid2" style="margin-top:16px">
      <div class="panel"><div class="panel__head"><span class="panel__title">Sales by Category</span></div><div id="byCategory"><div class="skeleton skeletonRow"></div></div></div>
      <div class="panel"><div class="panel__head"><span class="panel__title">Sales by Brand</span></div><div id="byBrand"><div class="skeleton skeletonRow"></div></div></div>
    </div>
  `;

  document.getElementById('analyticsRange').addEventListener('change', loadAnalytics);
  document.getElementById('exportAnalyticsBtn').addEventListener('click', exportAnalyticsCsv);
  await loadAnalytics();
};

async function loadAnalytics() {
  const range = document.getElementById('analyticsRange').value;
  const [series, byCat, byBrand] = await Promise.all([
    api.get('/overview/revenue-series?range=' + range),
    api.get('/overview/sales-by-category'),
    api.get('/overview/sales-by-brand')
  ]);

  const box = document.getElementById('analyticsChart');
  if (!series.length) { box.innerHTML = emptyState('', 'No data for this range', ''); }
  else {
    const max = Math.max(...series.map(s => s.revenue), 1);
    box.innerHTML = `<div style="display:flex;align-items:flex-end;gap:4px;height:240px">
      ${series.map(s => `<div title="${s.day}: ${fmtMoney(s.revenue)}" style="flex:1;background:linear-gradient(180deg,var(--gold-light),var(--gold-deep));border-radius:3px 3px 0 0;height:${Math.max(3,(s.revenue/max)*100)}%"></div>`).join('')}
    </div>
    <div class="hstack" style="justify-content:space-between;margin-top:8px;font-size:10px;color:var(--ink-soft)"><span>${series[0].day}</span><span>${series[series.length-1].day}</span></div>`;
  }

  const barList = (rows, key) => {
    if (!rows.length) return emptyState('', 'No sales yet', '');
    const max = Math.max(...rows.map(r => r.revenue), 1);
    return `<div class="panel__body stack" style="gap:12px">${rows.map(r => `
      <div>
        <div class="hstack" style="justify-content:space-between;font-size:12px;margin-bottom:5px"><b>${escapeHtml(r.name)}</b><span>${fmtMoney(r.revenue)}</span></div>
        <div style="height:6px;border-radius:4px;background:var(--ivory-deep)"><div style="height:100%;width:${(r.revenue/max)*100}%;border-radius:4px;background:var(--gold-deep)"></div></div>
      </div>`).join('')}</div>`;
  };
  document.getElementById('byCategory').innerHTML = barList(byCat, 'name');
  document.getElementById('byBrand').innerHTML = barList(byBrand, 'name');
}

function exportAnalyticsCsv() {
  api.get('/overview/revenue-series?range=' + document.getElementById('analyticsRange').value).then(series => {
    const rows = [['Date','Revenue','Orders'], ...series.map(s => [s.day, s.revenue, s.orders])];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'wateen-analytics.csv'; a.click();
  });
}
