/* ════════════════════════════════════════════════
   ANALYTICS PAGE
   Visitor traffic (real people only — the server drops
   anything that looks automated) plus sales reporting.
   ════════════════════════════════════════════════ */

let analyticsLiveTimer = null;

window.PageAnalytics = async function () {
  const el = document.getElementById('pageContent');

  // the live counter polls, so it must stop when the page is navigated away from
  if (analyticsLiveTimer) { clearInterval(analyticsLiveTimer); analyticsLiveTimer = null; }

  el.innerHTML = `
    <div class="hero">
      <div class="hero__txt">
        <h2 class="hero__title">Analytics</h2>
        <p class="hero__sub">Real visitors and store performance. Bots and crawlers are excluded.</p>
      </div>
      <div class="hero__acts">
        <span class="livePill" id="livePill">
          <span class="livePill__dot"></span>
          <b id="liveCount">—</b> online now
        </span>
      </div>
    </div>

    <div class="kpiGrid" id="visitorKpis">
      ${Array.from({length:4}).map(()=>'<div class="skeleton" style="height:126px;border-radius:14px"></div>').join('')}
    </div>

    <div class="panel">
      <div class="panel__head">
        <span class="panel__title">Visitors</span>
        <div class="seg" id="visitorSeg">
          <button data-days="7">7 Days</button>
          <button data-days="30" class="is-on">30 Days</button>
          <button data-days="90">3 Months</button>
        </div>
      </div>
      <div class="panel__body"><div id="visitorChart" style="height:240px"></div></div>
    </div>

    <div class="grid2" style="margin-top:16px">
      <div class="panel">
        <div class="panel__head"><span class="panel__title">Most Visited Pages</span></div>
        <div id="topPages"><div class="skeleton skeletonRow"></div></div>
      </div>
      <div class="panel">
        <div class="panel__head"><span class="panel__title">Live Right Now</span></div>
        <div class="panel__body" id="livePages"><div class="skeleton skeletonRow"></div></div>
      </div>
    </div>

    <div class="grid2" style="margin-top:16px">
      <div class="panel">
        <div class="panel__head"><span class="panel__title">Devices</span></div>
        <div class="panel__body" id="deviceSplit"><div class="skeleton skeletonRow"></div></div>
      </div>
      <div class="panel">
        <div class="panel__head"><span class="panel__title">Traffic Sources</span></div>
        <div class="panel__body" id="referrerSplit"><div class="skeleton skeletonRow"></div></div>
      </div>
    </div>

    <div class="panel" style="margin-top:22px">
      <div class="panel__head">
        <span class="panel__title">Revenue &amp; Orders</span>
        <div class="hstack" style="gap:10px">
          <select id="analyticsRange">
            <option value="today">Today</option><option value="7d">Last 7 days</option>
            <option value="30d" selected>Last 30 days</option><option value="3m">Last 3 months</option><option value="12m">Last 12 months</option>
          </select>
          <button class="btn btn--ghost btn--sm" id="exportAnalyticsBtn">Export CSV</button>
        </div>
      </div>
      <div class="panel__body"><div id="analyticsChart" style="height:260px"></div></div>
    </div>

    <div class="grid2" style="margin-top:16px">
      <div class="panel"><div class="panel__head"><span class="panel__title">Sales by Category</span></div><div id="byCategory"><div class="skeleton skeletonRow"></div></div></div>
      <div class="panel"><div class="panel__head"><span class="panel__title">Sales by Brand</span></div><div id="byBrand"><div class="skeleton skeletonRow"></div></div></div>
    </div>
  `;

  document.getElementById('analyticsRange').addEventListener('change', loadSalesAnalytics);
  document.getElementById('exportAnalyticsBtn').addEventListener('click', exportAnalyticsCsv);

  document.getElementById('visitorSeg').addEventListener('click', async (e) => {
    const btn = e.target.closest('button[data-days]');
    if (!btn) return;
    document.querySelectorAll('#visitorSeg button').forEach(b => b.classList.toggle('is-on', b === btn));
    await loadVisitorChart(btn.dataset.days);
  });

  await Promise.all([loadVisitorStats(), loadVisitorChart(30), loadSalesAnalytics()]);

  // refresh the "online now" figure without reloading the whole page
  analyticsLiveTimer = setInterval(refreshLive, 30000);
};

async function loadVisitorStats() {
  try {
    const [summary, breakdown, pages] = await Promise.all([
      api.get('/analytics/summary'),
      api.get('/analytics/breakdown'),
      api.get('/analytics/top-pages')
    ]);

    document.getElementById('liveCount').textContent = fmtNumber(summary.online);

    document.getElementById('visitorKpis').innerHTML = [
      visitorKpi('Today', summary.today),
      visitorKpi('Last 7 Days', summary.week),
      visitorKpi('Last 30 Days', summary.month),
      conversionKpi(summary.month)
    ].join('');

    renderTopPages(pages);
    renderBreakdown(breakdown);
    await refreshLive();
  } catch (e) {
    document.getElementById('visitorKpis').innerHTML =
      `<div class="panel"><div class="panel__body">${emptyState('', 'Could not load visitor stats', e.message || '')}</div></div>`;
  }
}

function visitorKpi(label, d) {
  return `
    <div class="kpi">
      <div class="kpi__top">
        <span class="kpi__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="9" cy="8" r="3.2"/><path d="M2.8 19.5a6.2 6.2 0 0 1 12.4 0" stroke-linecap="round"/><path d="M16 5a3.2 3.2 0 0 1 0 6.2M18.6 19.5a5.8 5.8 0 0 0-4-5.4" stroke-linecap="round"/></svg></span>
        <span class="kpi__label">${escapeHtml(label)}</span>
      </div>
      <div class="kpi__value">${fmtNumber(d.visitors)}</div>
      <div class="kpi__foot"><i>${fmtNumber(d.views)} page views &middot; ${fmtNumber(d.sessions)} sessions</i></div>
    </div>`;
}

function conversionKpi(d) {
  return `
    <div class="kpi">
      <div class="kpi__top">
        <span class="kpi__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 19V11M9.5 19V7M15 19v-5M20.5 19V4" stroke-linecap="round"/></svg></span>
        <span class="kpi__label">Conversion Rate</span>
      </div>
      <div class="kpi__value">${d.conversionRate}%</div>
      <div class="kpi__foot"><i>${fmtNumber(d.orders)} orders from ${fmtNumber(d.visitors)} visitors &middot; 30 days</i></div>
    </div>`;
}

async function loadVisitorChart(days) {
  const box = document.getElementById('visitorChart');
  if (!box) return;
  box.innerHTML = '<div class="skeleton" style="height:100%"></div>';
  try {
    const series = await api.get('/analytics/series?days=' + days);
    if (!series.length) {
      box.style.height = 'auto';
      box.innerHTML = emptyState('', 'No visits recorded yet', 'Visitor numbers appear here as people browse the store.');
      return;
    }
    box.style.height = '240px';

    const max = Math.max(...series.map(s => s.visitors), 1);
    const w = 640, h = 240, padX = 30, padY = 22;
    const stepX = (w - padX * 2) / Math.max(1, series.length - 1);
    const pts = series.map((s, i) => [padX + i * stepX, h - padY - (s.visitors / max) * (h - padY * 2)]);
    const path = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
    const area = path + ` L${pts[pts.length-1][0].toFixed(1)},${h-padY} L${pts[0][0].toFixed(1)},${h-padY} Z`;
    const guides = [0,.25,.5,.75,1].map(f => {
      const y = h - padY - f * (h - padY * 2);
      return `<line x1="${padX}" y1="${y.toFixed(1)}" x2="${w-padX}" y2="${y.toFixed(1)}" stroke="rgba(26,22,19,.07)" stroke-width="1"/>`;
    }).join('');

    box.innerHTML = `
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="width:100%;height:100%">
        <defs><linearGradient id="vis-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1a7a4e" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#1a7a4e" stop-opacity="0"/>
        </linearGradient></defs>
        ${guides}
        <path d="${area}" fill="url(#vis-grad)"/>
        <path d="${path}" fill="none" stroke="#0f5536" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
      </svg>
      <div class="hstack" style="justify-content:space-between;margin-top:8px;font-size:11px;color:var(--ink-soft)">
        <span>${escapeHtml(fmtDay(series[0].day))}</span>
        <span>peak ${fmtNumber(max)} visitors/day</span>
        <span>${escapeHtml(fmtDay(series[series.length-1].day))}</span>
      </div>`;
  } catch (e) {
    box.style.height = 'auto';
    box.innerHTML = emptyState('', 'Could not load the chart', e.message || '');
  }
}

function renderTopPages(rows) {
  const box = document.getElementById('topPages');
  if (!box) return;
  if (!rows.length) {
    box.innerHTML = `<div class="panel__body">${emptyState('', 'No page views yet', 'Once people browse the store, the most visited pages show here.')}</div>`;
    return;
  }
  const max = Math.max(...rows.map(r => r.views), 1);
  box.innerHTML = `<div class="panel__body stack" style="gap:12px">${rows.map(r => `
    <div>
      <div class="hstack" style="justify-content:space-between;font-size:12.5px;margin-bottom:5px">
        <b style="font-weight:500">${escapeHtml(r.path)}</b>
        <span class="muted">${fmtNumber(r.visitors)} visitors &middot; ${fmtNumber(r.views)} views</span>
      </div>
      <div style="height:6px;border-radius:4px;background:var(--ivory-deep)">
        <div style="height:100%;width:${(r.views/max)*100}%;border-radius:4px;background:var(--gold-metal)"></div>
      </div>
    </div>`).join('')}</div>`;
}

function renderBreakdown(data) {
  const devBox = document.getElementById('deviceSplit');
  const refBox = document.getElementById('referrerSplit');

  const bar = (rows, labelKey) => {
    if (!rows.length) return emptyState('', 'Nothing yet', '');
    const total = rows.reduce((s, r) => s + r.visitors, 0) || 1;
    return `<div class="stack" style="gap:12px">${rows.map(r => {
      const pct = Math.round((r.visitors / total) * 100);
      return `
        <div>
          <div class="hstack" style="justify-content:space-between;font-size:12.5px;margin-bottom:5px">
            <b style="font-weight:500;text-transform:capitalize">${escapeHtml(String(r[labelKey]))}</b>
            <span class="muted">${pct}% &middot; ${fmtNumber(r.visitors)}</span>
          </div>
          <div style="height:6px;border-radius:4px;background:var(--ivory-deep)">
            <div style="height:100%;width:${pct}%;border-radius:4px;background:var(--gold-metal)"></div>
          </div>
        </div>`;
    }).join('')}</div>`;
  };

  if (devBox) devBox.innerHTML = bar(data.devices, 'device');
  if (refBox) refBox.innerHTML = bar(data.referrers, 'source');
}

async function refreshLive() {
  try {
    const live = await api.getSilent('/analytics/live');
    const countEl = document.getElementById('liveCount');
    if (countEl) countEl.textContent = fmtNumber(live.online);

    const box = document.getElementById('livePages');
    if (!box) return;
    if (!live.pages.length) {
      box.innerHTML = emptyState('', 'Nobody browsing right now', 'This updates automatically as people arrive.');
      return;
    }
    box.innerHTML = `<div class="miniList">${live.pages.map(p => `
      <div class="miniRow">
        <div class="miniRow__txt"><b>${escapeHtml(p.path)}</b></div>
        <span class="miniRow__right">${fmtNumber(p.visitors)} ${p.visitors === 1 ? 'person' : 'people'}</span>
      </div>`).join('')}</div>`;
  } catch (e) { /* the page stays on its last good numbers */ }
}

async function loadSalesAnalytics() {
  const range = document.getElementById('analyticsRange').value;
  const [series, byCat, byBrand] = await Promise.all([
    api.get('/overview/revenue-series?range=' + range),
    api.get('/overview/sales-by-category'),
    api.get('/overview/sales-by-brand')
  ]);

  const box = document.getElementById('analyticsChart');
  if (!series.length) {
    box.style.height = 'auto';
    box.innerHTML = emptyState('', 'No sales in this range', 'Revenue appears here once orders come in.');
  } else {
    box.style.height = '260px';
    const max = Math.max(...series.map(s => s.revenue), 1);
    box.innerHTML = `<div style="display:flex;align-items:flex-end;gap:4px;height:225px">
      ${series.map(s => `<div title="${escapeHtml(fmtDay(s.day))}: ${fmtMoney(s.revenue)}" style="flex:1;background:var(--gold-metal);border-radius:3px 3px 0 0;height:${Math.max(3,(s.revenue/max)*100)}%"></div>`).join('')}
    </div>
    <div class="hstack" style="justify-content:space-between;margin-top:8px;font-size:11px;color:var(--ink-soft)"><span>${escapeHtml(fmtDay(series[0].day))}</span><span>${escapeHtml(fmtDay(series[series.length-1].day))}</span></div>`;
  }

  const barList = (rows) => {
    if (!rows.length) return `<div class="panel__body">${emptyState('', 'No sales yet', '')}</div>`;
    const max = Math.max(...rows.map(r => r.revenue), 1);
    return `<div class="panel__body stack" style="gap:12px">${rows.map(r => `
      <div>
        <div class="hstack" style="justify-content:space-between;font-size:12.5px;margin-bottom:5px"><b style="font-weight:500">${escapeHtml(r.name)}</b><span class="muted">${fmtMoney(r.revenue)}</span></div>
        <div style="height:6px;border-radius:4px;background:var(--ivory-deep)"><div style="height:100%;width:${(r.revenue/max)*100}%;border-radius:4px;background:var(--gold-metal)"></div></div>
      </div>`).join('')}</div>`;
  };
  document.getElementById('byCategory').innerHTML = barList(byCat);
  document.getElementById('byBrand').innerHTML = barList(byBrand);
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
