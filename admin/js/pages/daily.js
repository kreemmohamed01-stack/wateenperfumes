/* ════════════════════════════════════════════════
   DAILY ORDERS PAGE
   Orders and revenue per day (Cairo time), to compare
   against "Purchases" in Meta Ads Manager / Events Manager.
   Days with no orders are shown as 0 so gaps are obvious.
   ════════════════════════════════════════════════ */
window.PageDaily = async function () {
  const el = document.getElementById('pageContent');
  let days = 30;
  try { days = Number(localStorage.getItem('wm_daily_days')) || 30; } catch (e) {}

  el.innerHTML = `
    <div class="hero">
      <div class="hero__txt">
        <h2 class="hero__title">Daily Orders</h2>
        <p class="hero__sub">Orders per day — compare with Purchases in Meta Ads Manager (same dates, Cairo time).</p>
      </div>
      <div class="hero__mark">SCENTS<br>SHAPE<br>STORIES</div>
    </div>
    <div class="panel">
      <div class="panel__head" style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
        <span class="panel__title">Per day</span>
        <div style="display:flex;gap:6px" id="dailyRange">
          ${[7, 14, 30, 90].map(d => `<button class="btn ${d === days ? 'btn--primary' : ''}" data-days="${d}">${d} days</button>`).join('')}
        </div>
      </div>
      <div class="panel__body" id="dailyBody"><div class="skeleton" style="height:240px;border-radius:14px"></div></div>
    </div>
  `;

  document.getElementById('dailyRange').addEventListener('click', e => {
    const b = e.target.closest('[data-days]');
    if (!b) return;
    try { localStorage.setItem('wm_daily_days', b.dataset.days); } catch (err) {}
    window.PageDaily();
  });

  const box = document.getElementById('dailyBody');
  let rows;
  try { rows = await api.get('/orders/daily?days=' + days); }
  catch (e) { box.innerHTML = emptyState('', 'Could not load orders', e.message || ''); return; }

  // fill missing days with zeros, newest first (Cairo calendar days)
  const byDay = new Map(rows.map(r => [r.day, r]));
  const cairoToday = new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Cairo' }));
  const list = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(cairoToday); d.setDate(d.getDate() - i);
    const key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    list.push(byDay.get(key) || { day: key, orders: 0, revenue: 0, cancelled: 0, cancelledRevenue: 0, delivered: 0 });
  }

  const sum = k => list.reduce((s, r) => s + r[k], 0);
  const tOrders = sum('orders'), tRev = sum('revenue'), tCan = sum('cancelled'), tCanRev = sum('cancelledRevenue'), tDel = sum('delivered');
  const money = n => Math.round(n).toLocaleString('en-US') + ' EGP';
  const dayLabel = k => new Date(k + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

  box.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:18px">
      <div class="panel" style="padding:14px"><div class="muted" style="font-size:12px">Orders</div><b style="font-size:24px">${tOrders}</b></div>
      <div class="panel" style="padding:14px"><div class="muted" style="font-size:12px">Revenue</div><b style="font-size:24px">${money(tRev)}</b></div>
      <div class="panel" style="padding:14px"><div class="muted" style="font-size:12px">Cancelled / returned</div><b style="font-size:24px">${tCan}</b></div>
      <div class="panel" style="padding:14px"><div class="muted" style="font-size:12px">Net (after cancels)</div><b style="font-size:24px">${tOrders - tCan} · ${money(tRev - tCanRev)}</b></div>
      <div class="panel" style="padding:14px"><div class="muted" style="font-size:12px">Delivered</div><b style="font-size:24px">${tDel}</b></div>
    </div>
    <div class="tableWrap">
      <table class="dt">
        <thead><tr><th>Day</th><th>Orders</th><th>Revenue</th><th>Cancelled</th><th>Net orders</th><th>Delivered</th></tr></thead>
        <tbody>
          ${list.map(r => `
            <tr${r.orders ? '' : ' style="opacity:.5"'}>
              <td>${escapeHtml(dayLabel(r.day))}</td>
              <td><b>${r.orders}</b></td>
              <td>${money(r.revenue)}</td>
              <td>${r.cancelled}</td>
              <td>${r.orders - r.cancelled}</td>
              <td>${r.delivered}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <p class="muted" style="font-size:12px;margin-top:12px">
      Meta counts a Purchase for every order placed — including ones later cancelled — so compare its number with the <b>Orders</b> column.
      Set Ads Manager's reporting time zone to Cairo for the days to line up.
    </p>
  `;
};
