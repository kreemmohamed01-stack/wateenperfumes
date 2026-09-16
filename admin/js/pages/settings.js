/* ════════════════════════════════════════════════
   SETTINGS PAGE
   ════════════════════════════════════════════════ */
const EGYPT_GOVERNORATES = [
  'Cairo','Giza','Alexandria','Qalyubia','Dakahlia','Sharqia','Gharbia','Monufia','Beheira',
  'Kafr El Sheikh','Damietta','Port Said','Ismailia','Suez','North Sinai','South Sinai',
  'Beni Suef','Faiyum','Minya','Asyut','Sohag','Qena','Luxor','Aswan','Red Sea','New Valley','Matrouh'
];

window.PageSettings = async function () {
  const el = document.getElementById('pageContent');
  el.innerHTML = `
    <div class="pageHead"><div><h2 class="pageHead__title">Settings</h2><p class="pageHead__sub">Store-wide configuration.</p></div></div>
    <div class="tabs" id="settingsTabs">
      <button class="is-active" data-tab="general">General</button>
      <button data-tab="shipping">Shipping</button>
      <button data-tab="payments">Payments</button>
      <button data-tab="social">Social</button>
    </div>
    <div id="settingsPanel" style="margin-top:16px"></div>
  `;
  const settings = await api.get('/settings');
  window.__settingsCache = settings;
  renderSettingsTab('general', settings);

  document.querySelectorAll('#settingsTabs button').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('#settingsTabs button').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    renderSettingsTab(btn.dataset.tab, window.__settingsCache);
  }));
};

function renderSettingsTab(tab, s) {
  const box = document.getElementById('settingsPanel');
  if (tab === 'general') {
    box.innerHTML = `
      <div class="panel"><div class="panel__head"><span class="panel__title">Store Information</span></div>
        <div class="panel__body">
          <div class="field__row">
            <div class="field"><label>Store Name</label><input id="s_store_name" value="${escapeHtml(s.store_name||'')}"></div>
            <div class="field"><label>Currency</label><input id="s_store_currency" value="${escapeHtml(s.store_currency||'EGP')}"></div>
          </div>
          <div class="field__row">
            <div class="field"><label>Contact Email</label><input id="s_store_email" value="${escapeHtml(s.store_email||'')}"></div>
            <div class="field"><label>Contact Phone</label><input id="s_store_phone" value="${escapeHtml(s.store_phone||'')}"></div>
          </div>
          <button class="btn btn--primary" id="saveGeneralBtn">Save</button>
        </div>
      </div>`;
    document.getElementById('saveGeneralBtn').addEventListener('click', () => saveSettings({
      store_name: val('s_store_name'), store_currency: val('s_store_currency'),
      store_email: val('s_store_email'), store_phone: val('s_store_phone')
    }));
  }

  if (tab === 'shipping') {
    const rates = JSON.parse(s.shipping_rates_by_governorate || '{}');
    box.innerHTML = `
      <div class="panel"><div class="panel__head"><span class="panel__title">Shipping</span></div>
        <div class="panel__body">
          <div class="field__row">
            <div class="field"><label>Default Shipping Fee (EGP)</label><input type="number" id="s_default_shipping_fee" value="${s.default_shipping_fee||90}"></div>
            <div class="field"><label>Free Shipping Threshold (EGP)</label><input type="number" id="s_free_shipping_threshold" value="${s.free_shipping_threshold||1000}"></div>
          </div>
          <button class="btn btn--primary" id="saveShippingBtn">Save</button>
        </div>
      </div>
      <div class="panel"><div class="panel__head"><span class="panel__title">Shipping Fee by Governorate</span></div>
        <div class="panel__body">
          <p class="muted" style="margin-top:0;font-size:12px">Leave blank to use the default fee above.</p>
          <div class="field__row3" id="govRatesGrid">
            ${EGYPT_GOVERNORATES.map(g => `<div class="field"><label>${g}</label><input type="number" data-gov="${g}" value="${rates[g] ?? ''}" placeholder="${s.default_shipping_fee||90}"></div>`).join('')}
          </div>
          <button class="btn btn--primary" id="saveGovRatesBtn">Save Governorate Rates</button>
        </div>
      </div>`;
    document.getElementById('saveShippingBtn').addEventListener('click', () => saveSettings({
      default_shipping_fee: Number(val('s_default_shipping_fee')), free_shipping_threshold: Number(val('s_free_shipping_threshold'))
    }));
    document.getElementById('saveGovRatesBtn').addEventListener('click', () => {
      const newRates = {};
      document.querySelectorAll('#govRatesGrid input').forEach(inp => { if (inp.value) newRates[inp.dataset.gov] = Number(inp.value); });
      saveSettings({ shipping_rates_by_governorate: JSON.stringify(newRates) });
    });
  }

  if (tab === 'payments') {
    box.innerHTML = `
      <div class="panel"><div class="panel__head"><span class="panel__title">Payment Methods</span></div>
        <div class="panel__body stack">
          <label class="switch"><input type="checkbox" id="s_cod_enabled" ${s.cod_enabled!=='false'?'checked':''}><span class="switch__track"></span><span class="switch__label">Cash on Delivery</span></label>
          <label class="switch"><input type="checkbox" id="s_instapay_enabled" ${s.instapay_enabled!=='false'?'checked':''}><span class="switch__track"></span><span class="switch__label">InstaPay</span></label>
          <label class="switch"><input type="checkbox" id="s_card_enabled" ${s.card_enabled!=='false'?'checked':''}><span class="switch__track"></span><span class="switch__label">Credit / Debit Card</span></label>
          <div class="field" style="margin-top:14px;max-width:320px"><label>InstaPay Number</label><input id="s_instapay_number" value="${escapeHtml(s.instapay_number||'')}"></div>
          <button class="btn btn--primary" id="savePaymentsBtn" style="width:fit-content">Save</button>
        </div>
      </div>
      <div class="panel"><div class="panel__head"><span class="panel__title">Security</span></div>
        <div class="panel__body"><p class="muted" style="margin:0;font-size:12px">Payment processing secrets (card gateway keys, etc.) are never stored in the database or sent to the browser — they live only in the server's <code>.env</code> file when a real payment gateway is integrated.</p></div>
      </div>`;
    document.getElementById('savePaymentsBtn').addEventListener('click', () => saveSettings({
      cod_enabled: document.getElementById('s_cod_enabled').checked, instapay_enabled: document.getElementById('s_instapay_enabled').checked,
      card_enabled: document.getElementById('s_card_enabled').checked, instapay_number: val('s_instapay_number')
    }));
  }

  if (tab === 'social') {
    box.innerHTML = `
      <div class="panel"><div class="panel__head"><span class="panel__title">Social Links</span></div>
        <div class="panel__body">
          <div class="field"><label>Instagram</label><input id="s_social_instagram" value="${escapeHtml(s.social_instagram||'')}"></div>
          <div class="field"><label>Facebook</label><input id="s_social_facebook" value="${escapeHtml(s.social_facebook||'')}"></div>
          <div class="field"><label>WhatsApp</label><input id="s_social_whatsapp" value="${escapeHtml(s.social_whatsapp||'')}"></div>
          <div class="field"><label>TikTok</label><input id="s_social_tiktok" value="${escapeHtml(s.social_tiktok||'')}"></div>
          <button class="btn btn--primary" id="saveSocialBtn">Save</button>
        </div>
      </div>`;
    document.getElementById('saveSocialBtn').addEventListener('click', () => saveSettings({
      social_instagram: val('s_social_instagram'), social_facebook: val('s_social_facebook'),
      social_whatsapp: val('s_social_whatsapp'), social_tiktok: val('s_social_tiktok')
    }));
  }

  function val(id) { return document.getElementById(id).value; }
}

async function saveSettings(patch) {
  try {
    const updated = await api.put('/settings', patch);
    window.__settingsCache = updated;
    toast('Settings saved.', 'success');
  } catch (e) { toast(e.message, 'error'); }
}
