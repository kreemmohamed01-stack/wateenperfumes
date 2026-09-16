const jwt = require('jsonwebtoken');
const { db } = require('../db');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET is not set — refusing to start without it.');

const COOKIE_NAME = 'wateen_admin_session';
const TOKEN_TTL = '8h';

function signToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: TOKEN_TTL });
}

function setSessionCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 8 * 60 * 60 * 1000
  });
}

function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME);
}

// verifies the session cookie and attaches req.user from the DB (not just the token)
// so a disabled/deleted account is rejected immediately, not just at token expiry.
async function requireAuth(req, res, next) {
  const token = req.cookies && req.cookies[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: 'Not authenticated.' });

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return res.status(401).json({ error: 'Session expired. Please log in again.' });
  }

  try {
    const user = await db.prepare('SELECT id, name, email, role, is_active FROM users WHERE id = ?').get(payload.sub);
    if (!user || !user.is_active) {
      return res.status(401).json({ error: 'Account not available.' });
    }
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
}

// role hierarchy: super_admin can do anything; other roles are checked explicitly
const ROLE_PERMISSIONS = {
  super_admin:        null, // null = all permissions
  admin:              null,
  manager:            ['products', 'orders', 'customers', 'analytics', 'discounts', 'content', 'inventory', 'reviews'],
  orders_manager:     ['orders', 'customers'],
  product_manager:    ['products', 'inventory', 'discounts'],
  marketing_manager:  ['content', 'discounts', 'analytics'],
  support:            ['orders', 'customers', 'reviews']
};

function requirePermission(area) {
  return function (req, res, next) {
    const allowed = ROLE_PERMISSIONS[req.user.role];
    if (allowed === null || allowed === undefined) return next();
    if (allowed.includes(area)) return next();
    return res.status(403).json({ error: 'You do not have permission to perform this action.' });
  };
}

// fire-and-forget by design: every call site calls this without awaiting it,
// so failures are only logged, never allowed to reject unhandled or block the response.
function logActivity(req, { action, entityType, entityId, description }) {
  db.prepare(`
    INSERT INTO activity_log (user_id, user_name, action, entity_type, entity_id, description, ip)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    req.user ? req.user.id : null,
    req.user ? req.user.name : 'system',
    action,
    entityType || null,
    entityId != null ? String(entityId) : null,
    description,
    req.ip
  ).catch(e => console.error('activity log failed', e));
}

module.exports = {
  COOKIE_NAME, signToken, setSessionCookie, clearSessionCookie,
  requireAuth, requirePermission, logActivity, ROLE_PERMISSIONS
};
