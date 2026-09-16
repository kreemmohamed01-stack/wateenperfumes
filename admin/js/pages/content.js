/* ════════════════════════════════════════════════
   CONTENT PAGE
   The copy the storefront shows outside of products:
   announcement bar, hero wording, and the site-wide sale.
   ════════════════════════════════════════════════ */
window.PageContent = async function () {
  const el = document.getElementById('pageContent');
  el.innerHTML = `
    <div class="hero">
      <div class="hero__txt">
        <h2 class="hero__title">Content</h2>
        <p class="hero__sub">Banners and wording shown across the storefront.</p>
      </div>
      <div class="hero__mark">SCENTS<br>SHAPE<br>STORIES</div>
    </div>
    <div id="contentBody"><div class="skeleton" style="height:220px;border-radius:14px"></div></div>
  `;

  const s = await api.get('/settings');

  document.getElementById('contentBody').innerHTML = `
    <div class="panel">
      <div class="panel__head"><span class="panel__title">Announcement Bar</span></div>
      <div class="panel__body">
        <p class="muted" style="margin:0 0 14px;font-size:12px">
          The thin strip at the very top of every page. When a coupon is featured under
          Discounts, that promo replaces this text automatically.
        </p>
        <div class="field">
          <label>Message</label>
          <input id="c_announce" value="${escapeHtml(s.announcement_text || '')}" placeholder="FREE SHIPPING ON WATCHES">
        </div>
        <label class="switch" style="margin-bottom:14px">
          <input type="checkbox" id="c_announce_on" ${s.announcement_enabled !== 'false' ? 'checked' : ''}>
          <span class="switch__track"></span><span class="switch__label">Show the announcement bar</span>
        </label>
        <button class="btn btn--primary" id="cSaveAnnounce">Save</button>
      </div>
    </div>

    <div class="panel">
      <div class="panel__head"><span class="panel__title">Homepage Hero</span></div>
      <div class="panel__body">
        <div class="field">
          <label>Headline</label>
          <input id="c_hero_title" value="${escapeHtml(s.hero_title || '')}" placeholder="MORE THAN A FRAGRANCE">
        </div>
        <div class="field">
          <label>Sub-headline</label>
          <input id="c_hero_sub" value="${escapeHtml(s.hero_subtitle || '')}" placeholder="A BETTER YOU">
        </div>
        <button class="btn btn--primary" id="cSaveHero">Save</button>
      </div>
    </div>

    <div class="panel">
      <div class="panel__head"><span class="panel__title">Site-wide Sale</span></div>
      <div class="panel__body">
        <p class="muted" style="margin:0 0 14px;font-size:12px">
          Applies a percentage off every product that doesn't already have its own discount.
          Each product page and card will show its old price struck through.
        </p>
        <label class="switch" style="margin-bottom:14px">
          <input type="checkbox" id="c_sale_on" ${s.global_sale_enabled === 'true' ? 'checked' : ''}>
          <span class="switch__track"></span><span class="switch__label">Enable site-wide sale</span>
        </label>
        <div class="field" style="max-width:220px">
          <label>Discount percent</label>
          <input type="number" id="c_sale_pct" min="0" max="90" value="${escapeHtml(String(s.global_sale_percent || 0))}">
        </div>
        <button class="btn btn--primary" id="cSaveSale">Save</button>
      </div>
    </div>
  `;

  document.getElementById('cSaveAnnounce').addEventListener('click', () => savePatch({
    announcement_text: document.getElementById('c_announce').value,
    announcement_enabled: document.getElementById('c_announce_on').checked
  }));

  document.getElementById('cSaveHero').addEventListener('click', () => savePatch({
    hero_title: document.getElementById('c_hero_title').value,
    hero_subtitle: document.getElementById('c_hero_sub').value
  }));

  document.getElementById('cSaveSale').addEventListener('click', () => savePatch({
    global_sale_enabled: document.getElementById('c_sale_on').checked,
    global_sale_percent: Number(document.getElementById('c_sale_pct').value || 0)
  }));

  async function savePatch(patch) {
    try {
      await api.put('/settings', patch);
      toast('Saved — live on the store now.', 'success');
    } catch (e) { toast(e.message, 'error'); }
  }
};
