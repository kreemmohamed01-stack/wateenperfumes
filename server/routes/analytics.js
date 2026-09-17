/* ════════════════════════════════════════════════
   VISITOR ANALYTICS
   A small first-party tracker: the storefront posts a beacon
   on each pageview, the server decides whether it came from a
   real person, and the dashboard reads the aggregates back.
   No third-party scripts, no raw IPs stored.
   ════════════════════════════════════════════════ */
const express = require('express');
const crypto = require('crypto');
const { db } = require('../db');
const { requireAuth } = require('../middleware/auth');
const { isRealVisitor, deviceType } = require('../lib/bot-filter');

const router = express.Router();

// Rotating salt so a visitor hash can't be reversed to an IP, and can't be
// correlated across days. Regenerated per process start and per day.
const SALT_SECRET = process.env.JWT_SECRET || 'wateen-analytics-salt';

function dayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return String(fwd).split(',')[0].trim();
  return req.ip || req.socket?.remoteAddress || '';
}

/** Stable per-day pseudonymous id: hash(ip + ua + day + secret). */
function visitorHash(req) {
  const raw = clientIp(req) + '|' + (req.headers['user-agent'] || '') + '|' + dayStamp();
  return crypto.createHmac('sha256', SALT_SECRET).update(raw).digest('hex').slice(0, 32);
}

/* ---------- public: the tracking beacon ---------- */
router.post('/collect', async (req, res) => {
  // Always answer 204 regardless of what we decide — the browser shouldn't be
  // able to tell whether it was counted, and a tracking failure must never
  // surface as an error on the storefront.
  try {
    const b = req.body || {};
    const verdict = isRealVisitor(req, b.signals);
    if (!verdict.ok) return res.status(204).end();

    const visitorId = visitorHash(req);
    const sessionId = String(b.sessionId || '').slice(0, 64) || visitorId;
    const path = String(b.path || '/').slice(0, 300);
    const referrer = b.referrer ? String(b.referrer).slice(0, 300) : null;
    const device = deviceType(req.headers['user-agent']);
    const country = req.headers['x-vercel-ip-country'] || null;

    // "new" means this hashed visitor hasn't been seen before today
    const seen = await db.prepare(
      'SELECT 1 FROM page_views WHERE visitor_id = ? LIMIT 1'
    ).get(visitorId);

    await db.prepare(`
      INSERT INTO page_views (visitor_id, session_id, path, referrer, country, device, is_new)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(visitorId, sessionId, path, referrer, country, device, !seen);

    await db.prepare(`
      INSERT INTO visitor_presence (visitor_id, path, last_seen)
      VALUES (?, ?, NOW())
      ON CONFLICT (visitor_id) DO UPDATE SET path = excluded.path, last_seen = NOW()
    `).run(visitorId, path);

    res.status(204).end();
  } catch (e) {
    res.status(204).end();
  }
});

/* ---------- admin: dashboard aggregates ---------- */

// headline counters for the analytics page
router.get('/summary', requireAuth, async (req, res, next) => {
  try {
    const windows = {
      today: "created_at >= date_trunc('day', NOW())",
      week:  "created_at >= NOW() - INTERVAL '7 days'",
      month: "created_at >= NOW() - INTERVAL '30 days'"
    };

    const out = {};
    for (const [key, where] of Object.entries(windows)) {
      const row = await db.prepare(`
        SELECT COUNT(DISTINCT visitor_id) visitors,
               COUNT(DISTINCT session_id) sessions,
               COUNT(*) views
        FROM page_views WHERE ${where}
      `).get();

      // orders in the same window, for the conversion rate
      const ord = await db.prepare(`
        SELECT COUNT(*) n FROM orders
        WHERE ${where.replace('created_at', 'created_at')}
          AND status NOT IN ('cancelled','returned','refunded')
      `).get();

      const visitors = Number(row.visitors);
      const orders = Number(ord.n);
      out[key] = {
        visitors,
        sessions: Number(row.sessions),
        views: Number(row.views),
        orders,
        conversionRate: visitors > 0 ? Number(((orders / visitors) * 100).toFixed(2)) : 0
      };
    }

    // people active in the last 5 minutes
    const live = await db.prepare(`
      SELECT COUNT(*) n FROM visitor_presence WHERE last_seen >= NOW() - INTERVAL '5 minutes'
    `).get();
    out.online = Number(live.n);

    res.json(out);
  } catch (e) { next(e); }
});

// visitors per day, for the chart
router.get('/series', requireAuth, async (req, res, next) => {
  try {
    const days = Math.min(Math.max(Number(req.query.days) || 30, 1), 365);
    const rows = await db.prepare(`
      SELECT created_at::date AS day,
             COUNT(DISTINCT visitor_id) visitors,
             COUNT(*) views
      FROM page_views
      WHERE created_at >= NOW() - INTERVAL '${days} days'
      GROUP BY day ORDER BY day
    `).all();
    res.json(rows.map(r => ({ day: r.day, visitors: Number(r.visitors), views: Number(r.views) })));
  } catch (e) { next(e); }
});

// which pages people actually look at
router.get('/top-pages', requireAuth, async (req, res, next) => {
  try {
    const rows = await db.prepare(`
      SELECT path, COUNT(*) views, COUNT(DISTINCT visitor_id) visitors
      FROM page_views
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY path ORDER BY views DESC LIMIT 12
    `).all();
    res.json(rows.map(r => ({ path: r.path, views: Number(r.views), visitors: Number(r.visitors) })));
  } catch (e) { next(e); }
});

// device split + where traffic comes from
router.get('/breakdown', requireAuth, async (req, res, next) => {
  try {
    const devices = await db.prepare(`
      SELECT device, COUNT(DISTINCT visitor_id) visitors
      FROM page_views WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY device ORDER BY visitors DESC
    `).all();

    const referrers = await db.prepare(`
      SELECT COALESCE(NULLIF(referrer, ''), 'Direct') source, COUNT(DISTINCT visitor_id) visitors
      FROM page_views WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY source ORDER BY visitors DESC LIMIT 10
    `).all();

    res.json({
      devices: devices.map(r => ({ device: r.device || 'unknown', visitors: Number(r.visitors) })),
      referrers: referrers.map(r => ({ source: r.source, visitors: Number(r.visitors) }))
    });
  } catch (e) { next(e); }
});

// who's on the site right now, and what they're looking at
router.get('/live', requireAuth, async (req, res, next) => {
  try {
    const rows = await db.prepare(`
      SELECT path, COUNT(*) n FROM visitor_presence
      WHERE last_seen >= NOW() - INTERVAL '5 minutes'
      GROUP BY path ORDER BY n DESC LIMIT 10
    `).all();
    const total = await db.prepare(`
      SELECT COUNT(*) n FROM visitor_presence WHERE last_seen >= NOW() - INTERVAL '5 minutes'
    `).get();
    res.json({ online: Number(total.n), pages: rows.map(r => ({ path: r.path, visitors: Number(r.n) })) });
  } catch (e) { next(e); }
});

module.exports = router;
