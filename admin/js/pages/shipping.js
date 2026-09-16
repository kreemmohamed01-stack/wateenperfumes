/* ════════════════════════════════════════════════
   SHIPPING PAGE
   Governorate rate table + the watches-ship-free rule.
   These are the exact same settings keys checkout.js
   reads at runtime, so anything saved here is live on
   the storefront immediately.
   ════════════════════════════════════════════════ */

/* the governorates the storefront's checkout actually offers — the four with
   no agreed rate (North/South Sinai, New Valley, Matrouh) were deliberately
   removed from the dropdown, so they must not reappear here either */
const SHIPPING_ZONES = [
  { label: 'Cairo & Giza',   govs: ['Cairo', 'Giza'] },
  { label: 'Alexandria, Qalyubia, Sharqia', govs: ['Alexandria', 'Qalyubia', 'Sharqia'] },
  { label: 'Canal Cities',   govs: ['Suez', 'Ismailia', 'Port Said'] },
  { label: 'The Delta',      govs: ['Dakahlia', 'Gharbia', 'Monufia', 'Beheira', 'Kafr El Sheikh', 'Damietta'] },
  { label: 'Upper Egypt',    govs: ['Beni Suef', 'Faiyum', 'Minya', 'Asyut', 'Sohag', 'Qena', 'Luxor', 'Aswan'] },
  { label: 'Red Sea',        govs: ['Red Sea'] }
];

window.PageShipping = async function () {
  const el = document.getElementById('pageContent');
  el.innerHTML = `
    <div class="hero">
      <div class="hero__txt">
        <h2 class="hero__title">Shipping</h2>
        <p class="hero__sub">Delivery rates by governorate, and who ships free.</p>
      </div>
      <div class="hero__mark">SCENTS<br>SHAPE<br>STORIES</div>
    </div>
    <div id="shippingBody"><div class="skeleton" style="height:200px;border-radius:14px"></div></div>
  `;

  const s = await api.get('/settings');
  const rates = safeJson(s.shipping_rates_by_governorate, {});
  const watchesFree = s.watches_free_shipping !== 'false';

  document.getElementById('shippingBody').innerHTML = `
    <div class="panel">
      <div class="panel__head"><span class="panel__title">Rules</span></div>
      <div class="panel__body stack" style="gap:14px">
        <label class="switch">
          <input type="checkbox" id="sh_watches_free" ${watchesFree ? 'checked' : ''}>
          <span class="switch__track"></span>
          <span class="switch__label">Watches always ship free</span>
        </label>
        <div class="field" style="max-width:280px;margin:0">
          <label>Fallback fee for any governorate left blank (EGP)</label>
          <input type="number" id="sh_default" value="${escapeHtml(String(s.default_shipping_fee || 80))}">
        </div>
        <button class="btn btn--primary" id="shSaveRules" style="width:fit-content">Save Rules</button>
      </div>
    </div>

    <div class="panel">
      <div class="panel__head">
        <span class="panel__title">Perfume Shipping by Governorate</span>
        <span class="muted" style="font-size:12px">Applied when an order contains anything other than a watch.</span>
      </div>
      <div class="panel__body">
        ${SHIPPING_ZONES.map(zone => `
          <div style="margin-bottom:20px">
            <div style="font-size:11px;letter-spacing:.14em;color:var(--ink-soft);margin-bottom:10px">${escapeHtml(zone.label.toUpperCase())}</div>
            <div class="field__row3">
              ${zone.govs.map(g => `
                <div class="field">
                  <label>${escapeHtml(g)}</label>
                  <input type="number" data-gov="${escapeHtml(g)}" value="${rates[g] != null ? rates[g] : ''}" placeholder="${escapeHtml(String(s.default_shipping_fee || 80))}">
                </div>`).join('')}
            </div>
          </div>`).join('')}
        <button class="btn btn--primary" id="shSaveRates">Save Governorate Rates</button>
      </div>
    </div>
  `;

  document.getElementById('shSaveRules').addEventListener('click', async () => {
    await saveSettingsPatch({
      watches_free_shipping: document.getElementById('sh_watches_free').checked,
      default_shipping_fee: Number(document.getElementById('sh_default').value || 80)
    });
  });

  document.getElementById('shSaveRates').addEventListener('click', async () => {
    const next = {};
    document.querySelectorAll('#shippingBody input[data-gov]').forEach(inp => {
      if (inp.value !== '') next[inp.dataset.gov] = Number(inp.value);
    });
    await saveSettingsPatch({ shipping_rates_by_governorate: JSON.stringify(next) });
  });
};

function safeJson(raw, fallback) {
  try { return JSON.parse(raw || ''); } catch (e) { return fallback; }
}

async function saveSettingsPatch(patch) {
  try {
    await api.put('/settings', patch);
    toast('Saved — live on the store now.', 'success');
  } catch (e) { toast(e.message, 'error'); }
}
