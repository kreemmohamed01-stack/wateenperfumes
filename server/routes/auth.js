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

// bcrypt hash of the dashboard's shared password (password-only login)
const OWNER_PASSWORD_HASH = '$2b$10$4LhHjbTVaMF9wZun3.j32./oja4G5iyAhPoPCnGQsou42b5WQTiia';

router.post('/login', async (req, res, next) => {
  try {
    // accepts either a username or an email in the same field, so the login
    // form can ask for whichever the store owner finds easier to remember
    const { username, email, password } = req.body || {};
    const identifier = String(username || email || '').trim().toLowerCase();
    if (!password) return res.status(400).json({ error: 'Password is required.' });

    if (tooManyAttempts(req.ip)) {
      return res.status(429).json({ error: 'Too many attempts. Try again in a few minutes.' });
    }

    let user;
    if (!identifier) {
      // password-only sign-in (owner's request): one shared password signs in
      // as the store's super admin. ADMIN_PASSWORD in the environment
      // overrides the built-in one.
      const ok = process.env.ADMIN_PASSWORD
        ? password === process.env.ADMIN_PASSWORD
        : bcrypt.compareSync(password, OWNER_PASSWORD_HASH);
      user = ok
        ? await db.prepare("SELECT * FROM users WHERE role = 'super_admin' AND is_active = TRUE ORDER BY id LIMIT 1").get()
        : null;
      if (!user) {
        recordAttempt(req.ip);
        return res.status(401).json({ error: 'Wrong password.' });
      }
    } else {
      user = await db.prepare('SELECT * FROM users WHERE username = ? OR email = ?').get(identifier, identifier);
    }
    if (!user || !user.is_active || (identifier && !bcrypt.compareSync(password, user.password_hash))) {
      recordAttempt(req.ip);
      return res.status(401).json({ error: 'Invalid username or password.' });
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
