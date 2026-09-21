/* ════════════════════════════════════════════════
   STOREFRONT PAYLOAD CACHE
   The /api/public/bootstrap response (the whole published
   catalog + settings + featured coupon) is what every page
   on the site downloads before it can render, and building
   it means several cross-table queries over 400+ products.
   It only changes when someone edits the store, so it's
   held here briefly and served from memory in between.

   Kept in its own tiny module rather than inside the route
   file so the admin routes can invalidate it after a write
   without requiring the public route (which would be a
   circular import).
   ════════════════════════════════════════════════ */

const TTL_MS = 30 * 1000;

let entry = null; // { body: string, at: number }

function get() {
  if (!entry) return null;
  if (Date.now() - entry.at >= TTL_MS) { entry = null; return null; }
  return entry.body;
}

function set(body) {
  entry = { body, at: Date.now() };
}

// Called by the admin routes after any write that changes what the
// storefront shows, so the edit is live immediately instead of after the TTL.
function invalidate() {
  entry = null;
}

module.exports = { get, set, invalidate, TTL_MS };
