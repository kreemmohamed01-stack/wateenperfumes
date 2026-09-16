const express = require('express');
const { db } = require('../db');
const { requireAuth, requirePermission, logActivity } = require('../middleware/auth');

const router = express.Router();

function allSettings() {
  const rows = db.prepare('SELECT key, value FROM settings').all();
  const obj = {};
  rows.forEach(r => { obj[r.key] = r.value; });
  return obj;
}

router.get('/', requireAuth, (req, res) => {
  res.json(allSettings());
});

router.put('/', requireAuth, requirePermission('settings'), (req, res) => {
  const updates = req.body || {};
  const stmt = db.prepare(`
    INSERT INTO settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')
  `);
  const tx = db.transaction((entries) => { entries.forEach(([k, v]) => stmt.run(k, String(v))); });
  tx(Object.entries(updates));

  logActivity(req, { action: 'settings.update', entityType: 'settings', description: `Updated settings: ${Object.keys(updates).join(', ')}.` });
  res.json(allSettings());
});

/* ---------- public: everything the storefront needs to render live pricing/promos ---------- */
router.publicSettings = (req, res) => {
  const s = allSettings();
  res.json({
    storeName: s.store_name, currency: s.store_currency,
    freeShippingThreshold: Number(s.free_shipping_threshold || 1000),
    defaultShippingFee: Number(s.default_shipping_fee || 90),
    globalSaleEnabled: s.global_sale_enabled === 'true',
    globalSalePercent: Number(s.global_sale_percent || 0),
    codEnabled: s.cod_enabled !== 'false',
    instapayEnabled: s.instapay_enabled !== 'false',
    cardEnabled: s.card_enabled !== 'false',
    instapayNumber: s.instapay_number,
    shippingRatesByGovernorate: JSON.parse(s.shipping_rates_by_governorate || '{}'),
    social: {
      instagram: s.social_instagram, facebook: s.social_facebook,
      whatsapp: s.social_whatsapp, tiktok: s.social_tiktok
    }
  });
};

module.exports = router;
