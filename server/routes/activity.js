const express = require('express');
const { db } = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', requireAuth, (req, res) => {
  const { q, userId, page = 1, pageSize = 40 } = req.query;
  const where = [];
  const params = {};
  if (q) { where.push('(description LIKE @q OR action LIKE @q)'); params.q = '%' + q + '%'; }
  if (userId) { where.push('user_id = @userId'); params.userId = userId; }
  const whereSql = where.length ? 'WHERE ' + where.join(' AND ') : '';

  const total = db.prepare(`SELECT COUNT(*) c FROM activity_log ${whereSql}`).get(params).c;
  const limit = Math.min(200, Math.max(1, Number(pageSize) || 40));
  const offset = (Math.max(1, Number(page) || 1) - 1) * limit;

  const rows = db.prepare(`
    SELECT * FROM activity_log ${whereSql} ORDER BY created_at DESC LIMIT @limit OFFSET @offset
  `).all({ ...params, limit, offset });

  res.json({ total, page: Number(page), pageSize: limit, items: rows });
});

module.exports = router;
