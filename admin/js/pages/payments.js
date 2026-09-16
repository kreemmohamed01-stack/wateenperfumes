/* ════════════════════════════════════════════════
   PAYMENTS PAGE
   Which payment methods the checkout offers, plus a
   live read of how customers have actually been paying.
   ════════════════════════════════════════════════ */
window.PagePayments = async function () {
  const el = document.getElementById('pageContent');
  el.innerHTML = `
    <div class="hero">
      <div class="hero__txt">
        <h2 class="hero__title">Payments</h2>
        <p class="hero__sub">Choose how customers can pay at checkout.</p>
      </div>
      <div class="hero__mark">SCENTS<br>SHAPE<br>STORIES</div>
    </div>
    <div class="grid2" id="paymentsBody">
      <div class="skeleton" style="height:240px;border-radius:14px"></div>
      <div class="skeleton" style="height:240px;border-radius:14px"></div>
    </div>
  `;

  const [s, breakdown] = await Promise.all([
    api.get('/settings'),
    api.getSilent('/orders/payment-breakdown').catch(() => null)
  ]);

  document.getElementById('paymentsBody').innerHTML = `
    <div class="panel">
      <div class="panel__head"><span class="panel__title">Payment Methods</span></div>
      <div class="panel__body stack" style="gap:14px">
        <label class="switch">
          <input type="checkbox" id="p_cod" ${s.cod_enabled !== 'false' ? 'checked' : ''}>
          <span class="switch__track"></span><span class="switch__label">Cash on Delivery</span>
        </label>
        <label class="switch">
          <input type="checkbox" id="p_instapay" ${s.instapay_enabled !== 'false' ? 'checked' : ''}>
          <span class="switch__track"></span><span class="switch__label">InstaPay</span>
        </label>
        <label class="switch">
          <input type="checkbox" id="p_card" ${s.card_enabled !== 'false' ? 'checked' : ''}>
          <span class="switch__track"></span><span class="switch__label">Credit / Debit Card</span>
        </label>
        <div class="field" style="margin:10px 0 0;max-width:320px">
          <label>InstaPay Number</label>
          <input id="p_instapay_number" value="${escapeHtml(s.instapay_number || '')}">
        </div>
        <button class="btn btn--primary" id="pSave" style="width:fit-content">Save</button>
        <p class="muted" style="margin:6px 0 0;font-size:12px">
          Turning a method off hides it on the storefront checkout right away.
        </p>
      </div>
    </div>

    <div class="panel">
      <div class="panel__head"><span class="panel__title">How Customers Pay</span></div>
      <div class="panel__body" id="payBreakdown"></div>
    </div>
  `;

  const box = document.getElementById('payBreakdown');
  const rows = (breakdown || []).filter(r => Number(r.count) > 0);
  if (!rows.length) {
    box.innerHTML = emptyState('', 'No payments yet', 'Once orders start coming in, the split between payment methods shows here.');
  } else {
    const total = rows.reduce((sum, r) => sum + Number(r.count), 0);
    const LABEL = { cod: 'Cash on Delivery', instapay: 'InstaPay', card: 'Card' };
    box.innerHTML = `<div class="legend">${rows.map(r => {
      const pct = Math.round((Number(r.count) / total) * 100);
      return `
        <div>
          <div class="legend__row" style="margin-bottom:6px">
            <span>${escapeHtml(LABEL[r.method] || r.method)}</span>
            <b>${pct}% &middot; ${fmtNumber(r.count)}</b>
          </div>
          <div style="height:7px;border-radius:20px;background:var(--ivory-deep);overflow:hidden">
            <div style="height:100%;width:${pct}%;background:var(--gold-metal)"></div>
          </div>
        </div>`;
    }).join('')}</div>`;
  }

  document.getElementById('pSave').addEventListener('click', async () => {
    try {
      await api.put('/settings', {
        cod_enabled: document.getElementById('p_cod').checked,
        instapay_enabled: document.getElementById('p_instapay').checked,
        card_enabled: document.getElementById('p_card').checked,
        instapay_number: document.getElementById('p_instapay_number').value
      });
      toast('Saved — live on the store now.', 'success');
    } catch (e) { toast(e.message, 'error'); }
  });
};
