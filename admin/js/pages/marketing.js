/* ════════════════════════════════════════════════
   MARKETING PAGE
   Campaign-level view: which coupon is on the promo bar,
   how each code is performing, and product placement
   (best sellers / featured / new arrivals) on the storefront.
   ════════════════════════════════════════════════ */
window.PageMarketing = async function () {
  const el = document.getElementById('pageContent');
  el.innerHTML = `
    <div class="hero">
      <div class="hero__txt">
        <h2 class="hero__title">Marketing</h2>
        <p class="hero__sub">Promotions, placement, and how your codes are performing.</p>
      </div>
      <div class="hero__acts">
        <a href="#/discounts" class="btn btn--gold">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
          New Coupon
        </a>
      </div>
    </div>
    <div id="mkBody"><div class="skeleton" style="height:220px;border-radius:14px"></div></div>
  `;

  // each placement list is filtered server-side — the products endpoint caps
  // pageSize at 100, so filtering a single fetched page client-side would miss
  // anything past the first 100 of the catalog
  const [coupons, bestSellerRes, featuredRes, newArrivalRes] = await Promise.all([
    api.get('/coupons'),
    api.get('/products?pageSize=100&bestSeller=true'),
    api.get('/products?pageSize=100&featured=true'),
    api.get('/products?pageSize=100&newArrival=true')
  ]);

  const featuredCoupon = coupons.find(c => c.isFeatured);
  const active = coupons.filter(c => c.isActive);
  const totalRedeemed = coupons.reduce((s, c) => s + Number(c.redeemedCount || 0), 0);

  const bestSellers = bestSellerRes.items;
  const featuredProducts = featuredRes.items;
  const newArrivals = newArrivalRes.items;
  // the true totals, which can exceed the 100 we fetched for the chips
  const counts = { best: bestSellerRes.total, featured: featuredRes.total, newArrival: newArrivalRes.total };

  document.getElementById('mkBody').innerHTML = `
    <div class="statRow">
      ${statTile('percent', active.length, 'Active coupons')}
      ${statTile('star', totalRedeemed, 'Times redeemed')}
      ${statTile('award', counts.best, 'Best sellers on the homepage')}
      ${statTile('tag', counts.featured, 'Featured products')}
    </div>

    <div class="panel">
      <div class="panel__head">
        <span class="panel__title">Promo Bar</span>
        <a href="#/discounts" class="viewAll">Manage coupons
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h13M14 6l5 6-5 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
      <div class="panel__body">
        ${featuredCoupon ? `
          <div class="promoCard" style="min-height:120px">
            <div class="promoCard__txt">USE CODE <span style="color:var(--gold-light)">${escapeHtml(featuredCoupon.code)}</span></div>
            <div style="position:relative;z-index:2;font-size:12.5px;opacity:.85;margin-top:4px">
              ${couponValue(featuredCoupon)} &middot; redeemed ${fmtNumber(featuredCoupon.redeemedCount)} times
            </div>
          </div>
          <p class="muted" style="margin:14px 0 0;font-size:12px">
            This code is replacing the announcement bar at the top of the storefront right now.
          </p>
        ` : emptyState('', 'No coupon featured', 'Feature a coupon under Discounts to show it in the site-wide promo bar.')}
      </div>
    </div>

    <div class="panel">
      <div class="panel__head"><span class="panel__title">Coupon Performance</span></div>
      ${coupons.length ? `
        <div class="tableWrap"><table class="dt">
          <thead><tr><th>Code</th><th>Value</th><th>Redeemed</th><th>Limit</th><th>Status</th></tr></thead>
          <tbody>${coupons.map(c => `
            <tr onclick="window.location.hash='#/discounts'" style="cursor:pointer">
              <td><b>${escapeHtml(c.code)}</b></td>
              <td>${couponValue(c)}</td>
              <td>${fmtNumber(c.redeemedCount)}</td>
              <td>${c.usageLimit ? fmtNumber(c.usageLimit) : '<span class="muted">Unlimited</span>'}</td>
              <td>${c.isActive
                ? '<span class="pill pill--success"><span class="pill__dot"></span>Active</span>'
                : '<span class="pill pill--neutral"><span class="pill__dot"></span>Inactive</span>'}</td>
            </tr>`).join('')}</tbody>
        </table></div>
      ` : `<div class="panel__body">${emptyState('', 'No coupons yet', 'Create your first discount code to start running promotions.')}</div>`}
    </div>

    <div class="panel">
      <div class="panel__head">
        <span class="panel__title">Storefront Placement</span>
        <a href="#/products" class="viewAll">Edit products
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h13M14 6l5 6-5 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
      <div class="panel__body">
        <p class="muted" style="margin:0 0 16px;font-size:12px">
          Set from each product's edit page. Best sellers fill the homepage grid, featured products
          get the gold star, and new arrivals are flagged as new on their cards.
        </p>
        ${placementBlock('Best Sellers', bestSellers, counts.best)}
        ${placementBlock('Featured', featuredProducts, counts.featured)}
        ${placementBlock('New Arrivals', newArrivals, counts.newArrival)}
      </div>
    </div>
  `;
};

function statTile(icon, value, label) {
  return `
    <div class="statTile">
      <span class="statTile__icon">${iconSvg(icon)}</span>
      <span class="statTile__txt"><b>${fmtNumber(value)}</b><i>${escapeHtml(label)}</i></span>
    </div>`;
}

function couponValue(c) {
  return c.type === 'percent'
    ? `${c.amount}% off`
    : (c.type === 'free_shipping' ? 'Free shipping' : `${fmtMoney(c.amount)} off`);
}

function placementBlock(title, list, total) {
  const count = total != null ? total : list.length;
  const shown = list.slice(0, 12);
  const hidden = count - shown.length;
  return `
    <div style="margin-bottom:18px">
      <div style="font-size:11px;letter-spacing:.14em;color:var(--ink-soft);margin-bottom:10px">
        ${escapeHtml(title.toUpperCase())} &middot; ${fmtNumber(count)}
      </div>
      ${count
        ? `<div class="hstack" style="flex-wrap:wrap;gap:8px">${shown.map(p =>
            `<span class="chip">${escapeHtml(p.name)}</span>`).join('')}
            ${hidden > 0 ? `<span class="chip muted">+${fmtNumber(hidden)} more</span>` : ''}
          </div>`
        : `<p class="muted" style="margin:0;font-size:12.5px">Nothing placed here yet.</p>`}
    </div>`;
}
