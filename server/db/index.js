/* ════════════════════════════════════════════════
   DATABASE CONNECTION — PostgreSQL (via `pg`)
   Provides a small helper shaped like the old
   better-sqlite3 API (`db.prepare(sql).get/all/run`)
   but backed by real async Postgres queries, so the
   route files keep their original SQL text — using
   `?` or `@name` placeholders — unchanged. This module
   translates those placeholders to Postgres's `$1,$2...`
   automatically.

   WHAT ROUTE FILES STILL HAD TO CHANGE:
   - Every `db.prepare(...).get/all/run(...)` call is now
     async and must be awaited.
   - `db.transaction(fn)` (synchronous, better-sqlite3-style)
     became `await withTransaction(async (db) => {...})`,
     where the callback receives a transactional db handle
     and every query inside it must use that handle.
   - SQLite-only syntax was swapped for Postgres equivalents:
     `datetime('now')` -> `NOW()`, `INSERT ... OR IGNORE` ->
     `INSERT ... ON CONFLICT DO NOTHING`, etc.
   ════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL (or POSTGRES_URL) is not set — refusing to start without a database connection.');
}

const pool = new Pool({
  connectionString,
  ssl: connectionString.includes('sslmode=require') || process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false
});

// translates `?` and `@name` placeholders (SQLite style, used throughout
// the route files) into Postgres's positional `$1, $2, ...` style, and
// returns the correctly-ordered flat parameter array to send alongside it.
//
// mode is decided by how the call was actually made (the shape of `params`,
// mirroring better-sqlite3's own dispatch), never by scanning the SQL text
// for "@" — string literals routinely contain "@" (emails, social handles)
// and would otherwise be misdetected as named placeholders.
function toPgQuery(sql, params) {
  const singleObjectArg = params.length === 1 && params[0] !== null && typeof params[0] === 'object' && !Array.isArray(params[0]);

  if (singleObjectArg) {
    const obj = params[0];
    const values = [];
    const text = sql.replace(/@([a-zA-Z_][a-zA-Z0-9_]*)/g, (_, name) => {
      values.push(obj[name] === undefined ? null : obj[name]);
      return '$' + values.length;
    });
    // the object had no @name tokens to substitute (e.g. an empty filter
    // object on a query with no WHERE clause) — treat as zero parameters
    return values.length ? { text, values } : { text: sql, values: [] };
  }

  if (/\?/.test(sql)) {
    // params are already positional, either spread individually or (rarely) passed as a single array
    let flat = params;
    if (params.length === 1 && Array.isArray(params[0])) flat = params[0];
    let i = 0;
    const text = sql.replace(/\?/g, () => '$' + (++i));
    return { text, values: flat };
  }

  // no placeholders at all
  return { text: sql, values: [] };
}

function wrap(executor) {
  return {
    prepare(sql) {
      return {
        async get(...params) {
          const { text, values } = toPgQuery(sql, params);
          const res = await executor.query(text, values);
          return res.rows[0];
        },
        async all(...params) {
          const { text, values } = toPgQuery(sql, params);
          const res = await executor.query(text, values);
          return res.rows;
        },
        async run(...params) {
          const { text, values } = toPgQuery(sql, params);
          // only INSERTs into tables with a serial "id" column need lastInsertRowid;
          // adding RETURNING unconditionally would break UPDATE/DELETE and tables
          // without an "id" PK (product_categories, settings), so it's opt-in here.
          const isPlainInsert = /^\s*insert\s+into\s+(\w+)/i.test(text) && !/returning/i.test(text);
          const noIdTable = /^\s*insert\s+into\s+(product_categories|settings|coupon_redemptions|visitor_presence)\b/i.test(text);
          const finalText = (isPlainInsert && !noIdTable) ? text.replace(/;?\s*$/, ' RETURNING id') : text;
          const res = await executor.query(finalText, values);
          return { changes: res.rowCount, lastInsertRowid: res.rows[0] ? res.rows[0].id : undefined };
        }
      };
    },
    async exec(sql) {
      await executor.query(sql);
    }
  };
}

const db = wrap(pool);

async function withTransaction(fn) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const txDb = wrap(client);
    const result = await fn(txDb);
    await client.query('COMMIT');
    return result;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

async function initSchema() {
  const schema = fs.readFileSync(path.join(__dirname, 'schema.postgres.sql'), 'utf8');
  await pool.query(schema);
}

module.exports = { db, pool, withTransaction, initSchema };
