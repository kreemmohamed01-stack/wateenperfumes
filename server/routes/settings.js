const express = require('express');
const { db, withTransaction } = require('../db');
const { requireAuth, requirePermission, logActivity } = require('../middleware/auth');

const router = express.Router();

async function allSettings() {
  const rows = await db.prepare('SELECT key, value FROM settings').all();
  const obj = {};
  rows.forEach(r => { obj[r.key] = r.value; });
  return obj;
}

router.get('/', requireAuth, async (req, res, next) => {
  try { res.json(await allSettings()); } catch (e) { next(e); }
});

router.put('/', requireAuth, requirePermission('settings'), async (req, res, next) => {
  try {
    const updates = req.body || {};
    await withTransaction(async (tdb) => {
      for (const [k, v] of Object.entries(updates)) {
        await tdb.prepare(`
          INSERT INTO settings (key, value, updated_at) VALUES (?, ?, NOW())
          ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = NOW()
        `).run(k, String(v));
      }
    });

    logActivity(req, { action: 'settings.update', entityType: 'settings', description: `Updated settings: ${Object.keys(updates).join(', ')}.` });
    res.json(await allSettings());
  } catch (e) { next(e); }
});

/* ---------- public: everything the storefront needs to render live pricing/promos ---------- */
router.publicSettings = async (req, res, next) => {
  try {
    const s = await allSettings();
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
  } catch (e) { next(e); }
};

module.exports = router;
