const express = require('express');
const bcrypt = require('bcryptjs');
const { db } = require('../db');
const { requireAuth, requirePermission, logActivity, ROLE_PERMISSIONS } = require('../middleware/auth');

const router = express.Router();

function onlySuperAdmin(req, res, next) {
  if (req.user.role !== 'super_admin' && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can manage staff.' });
  }
  next();
}

router.get('/', requireAuth, onlySuperAdmin, async (req, res, next) => {
  try {
    const rows = await db.prepare('SELECT id, name, email, role, is_active, last_login_at, created_at FROM users ORDER BY created_at').all();
    res.json(rows);
  } catch (e) { next(e); }
});

router.get('/roles', requireAuth, (req, res) => {
  res.json(Object.keys(ROLE_PERMISSIONS).map(role => ({ role, permissions: ROLE_PERMISSIONS[role] })));
});

router.post('/', requireAuth, onlySuperAdmin, async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body || {};
    if (!name || !email || !password || password.length < 8) {
      return res.status(400).json({ error: 'Name, email, and an 8+ character password are required.' });
    }
    if (!ROLE_PERMISSIONS[role]) return res.status(400).json({ error: 'Invalid role.' });
    const normalizedEmail = String(email).trim().toLowerCase();
    if (await db.prepare('SELECT id FROM users WHERE email = ?').get(normalizedEmail)) {
      return res.status(400).json({ error: 'A user with this email already exists.' });
    }
    const hash = bcrypt.hashSync(password, 10);
    const result = await db.prepare('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)')
      .run(name.trim(), normalizedEmail, hash, role);
    logActivity(req, { action: 'staff.create', entityType: 'user', entityId: result.lastInsertRowid, description: `Created staff account "${name}" (${role}).` });
    res.status(201).json({ id: result.lastInsertRowid, name, email: normalizedEmail, role });
  } catch (e) { next(e); }
});

router.put('/:id', requireAuth, onlySuperAdmin, async (req, res, next) => {
  try {
    const existing = await db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'User not found.' });
    const b = req.body || {};
    if (b.role && !ROLE_PERMISSIONS[b.role]) return res.status(400).json({ error: 'Invalid role.' });

    await db.prepare(`
      UPDATE users SET name=@name, role=@role, is_active=@is_active, updated_at=NOW() WHERE id=@id
    `).run({
      id: existing.id,
      name: b.name != null ? b.name : existing.name,
      role: b.role != null ? b.role : existing.role,
      is_active: b.isActive != null ? !!b.isActive : existing.is_active
    });

    if (b.password) {
      if (b.password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' });
      await db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(bcrypt.hashSync(b.password, 10), existing.id);
    }

    logActivity(req, { action: 'staff.update', entityType: 'user', entityId: existing.id, description: `Updated staff account "${existing.name}".` });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.delete('/:id', requireAuth, onlySuperAdmin, async (req, res, next) => {
  try {
    if (Number(req.params.id) === req.user.id) return res.status(400).json({ error: 'You cannot delete your own account.' });
    const existing = await db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'User not found.' });
    await db.prepare('UPDATE users SET is_active = FALSE WHERE id = ?').run(existing.id);
    logActivity(req, { action: 'staff.disable', entityType: 'user', entityId: existing.id, description: `Disabled staff account "${existing.name}".` });
    res.json({ disabled: true });
  } catch (e) { next(e); }
});

module.exports = router;
