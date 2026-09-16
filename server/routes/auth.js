const express = require('express');
const bcrypt = require('bcryptjs');
const { db } = require('../db');
const { signToken, setSessionCookie, clearSessionCookie, requireAuth, logActivity } = require('../middleware/auth');

const router = express.Router();

// simple in-memory rate limit for login attempts, keyed by IP
const attempts = new Map();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 10 * 60 * 1000;

function tooManyAttempts(ip) {
  const rec = attempts.get(ip);
  if (!rec) return false;
  if (Date.now() - rec.first > WINDOW_MS) { attempts.delete(ip); return false; }
  return rec.count >= MAX_ATTEMPTS;
}
function recordAttempt(ip) {
  const rec = attempts.get(ip);
  if (!rec || Date.now() - rec.first > WINDOW_MS) attempts.set(ip, { first: Date.now(), count: 1 });
  else rec.count += 1;
}
function clearAttempts(ip) { attempts.delete(ip); }

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

    if (tooManyAttempts(req.ip)) {
      return res.status(429).json({ error: 'Too many attempts. Try again in a few minutes.' });
    }

    const user = await db.prepare('SELECT * FROM users WHERE email = ?').get(String(email).trim().toLowerCase());
    if (!user || !user.is_active || !bcrypt.compareSync(password, user.password_hash)) {
      recordAttempt(req.ip);
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    clearAttempts(req.ip);
    await db.prepare('UPDATE users SET last_login_at = NOW() WHERE id = ?').run(user.id);

    const token = signToken(user);
    setSessionCookie(res, token);

    logActivity({ user: { id: user.id, name: user.name }, ip: req.ip }, {
      action: 'auth.login', entityType: 'user', entityId: user.id,
      description: user.name + ' logged in.'
    });

    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (e) { next(e); }
});

router.post('/logout', requireAuth, (req, res) => {
  logActivity(req, { action: 'auth.logout', entityType: 'user', entityId: req.user.id, description: req.user.name + ' logged out.' });
  clearSessionCookie(res);
  res.json({ ok: true });
});

router.get('/me', requireAuth, (req, res) => {
  res.json(req.user);
});

router.post('/change-password', requireAuth, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || !newPassword || newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters.' });
    }
    const user = await db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
    if (!bcrypt.compareSync(currentPassword, user.password_hash)) {
      return res.status(401).json({ error: 'Current password is incorrect.' });
    }
    const hash = bcrypt.hashSync(newPassword, 10);
    await db.prepare('UPDATE users SET password_hash = ?, updated_at = NOW() WHERE id = ?').run(hash, req.user.id);
    logActivity(req, { action: 'auth.change_password', entityType: 'user', entityId: req.user.id, description: 'Password changed.' });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

module.exports = router;
