const { db } = require('../db');

function notify(type, title, body, link) {
  db.prepare(`
    INSERT INTO notifications (type, title, body, link) VALUES (?, ?, ?, ?)
  `).run(type, title, body || null, link || null);
}

module.exports = { notify };
