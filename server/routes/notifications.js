const express = require('express');
const { db } = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM notifications ORDER BY created_at DESC LIMIT 50').all();
  const unread = db.prepare('SELECT COUNT(*) c FROM notifications WHERE is_read = 0').get().c;
  res.json({
    unread,
    items: rows.map(n => ({
      id: n.id, type: n.type, title: n.title, body: n.body, link: n.link,
      isRead: !!n.is_read, createdAt: n.created_at
    }))
  });
});

router.put('/:id/read', requireAuth, (req, res) => {
  db.prepare('UPDATE notifications SET is_read = 1 WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

router.put('/read-all', requireAuth, (req, res) => {
  db.prepare('UPDATE notifications SET is_read = 1 WHERE is_read = 0').run();
  res.json({ ok: true });
});

module.exports = router;
