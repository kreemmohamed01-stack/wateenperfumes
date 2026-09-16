-- ════════════════════════════════════════════════
-- WATEEN PERFUMES — DATABASE SCHEMA (SQLite)
-- ════════════════════════════════════════════════

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'admin', -- super_admin, admin, manager, orders_manager, product_manager, marketing_manager, support
  is_active     INTEGER NOT NULL DEFAULT 1,
  last_login_at TEXT,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS brands (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  name_ar     TEXT,
  logo        TEXT,
  banner      TEXT,
  description TEXT,
  website     TEXT,
  country     TEXT,
  featured    INTEGER NOT NULL DEFAULT 0,
  is_active   INTEGER NOT NULL DEFAULT 1,
  seo_title   TEXT,
  seo_desc    TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS categories (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT NOT NULL UNIQUE,   -- men, women, unisex, accessories, watches, ...
  name        TEXT NOT NULL,
  description TEXT,
  image       TEXT,
  hero_image  TEXT,
  banner      TEXT,
  seo_title   TEXT,
  seo_desc    TEXT,
  is_active   INTEGER NOT NULL DEFAULT 1,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS products (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  slug              TEXT NOT NULL UNIQUE,     -- was catalog "id"
  name              TEXT NOT NULL,
  name_ar           TEXT,
  brand_id          INTEGER REFERENCES brands(id) ON DELETE SET NULL,
  type              TEXT,                     -- Eau de Parfum, Watch, ...
  sku               TEXT,
  barcode           TEXT,
  description       TEXT,
  short_description TEXT,
  gender            TEXT,                     -- Men / Women / Unisex
  family            TEXT,                     -- fragrance family
  origin            TEXT,
  year              TEXT,
  notes_top         TEXT,
  notes_heart       TEXT,
  notes_base        TEXT,
  tag_html          TEXT,                     -- small marketing tag shown on product card
  cost_price        REAL,
  weight            REAL,
  rating            REAL NOT NULL DEFAULT 0,
  reviews_count     INTEGER NOT NULL DEFAULT 0,
  status            TEXT NOT NULL DEFAULT 'published', -- draft, published, archived
  featured          INTEGER NOT NULL DEFAULT 0,
  best_seller       INTEGER NOT NULL DEFAULT 0,
  new_arrival       INTEGER NOT NULL DEFAULT 0,
  on_sale           INTEGER NOT NULL DEFAULT 0,
  discount_percent  REAL NOT NULL DEFAULT 0,   -- per-product discount %, independent of global sale
  discount_active   INTEGER NOT NULL DEFAULT 0,
  low_stock_threshold INTEGER NOT NULL DEFAULT 5,
  video_url         TEXT,
  seo_title         TEXT,
  seo_desc          TEXT,
  created_at        TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at        TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS product_categories (
  product_id  INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  is_primary  INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (product_id, category_id)
);

-- one row per size — each has its own real price/stock
CREATE TABLE IF NOT EXISTS product_variants (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id    INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size          TEXT NOT NULL,             -- "50 ML", "100 ML", "One Size", ...
  sku           TEXT,
  price         REAL NOT NULL,
  compare_at_price REAL,                   -- "was" price for strike-through
  stock         INTEGER NOT NULL DEFAULT 0,
  reserved      INTEGER NOT NULL DEFAULT 0,
  is_default    INTEGER NOT NULL DEFAULT 0,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS product_images (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id  INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_main     INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS inventory_log (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  variant_id  INTEGER NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
  change_qty  INTEGER NOT NULL,            -- +N or -N
  reason      TEXT NOT NULL,               -- restock, sale, adjustment, return
  note        TEXT,
  user_id     INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS customers (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT NOT NULL,
  email         TEXT,
  phone         TEXT NOT NULL,
  governorate   TEXT,
  city          TEXT,
  address       TEXT,
  apartment     TEXT,
  status        TEXT NOT NULL DEFAULT 'active',   -- active, disabled
  segment       TEXT NOT NULL DEFAULT 'new',      -- new, returning, vip, high_spender, inactive
  notes         TEXT,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS orders (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  order_number      TEXT NOT NULL UNIQUE,
  customer_id       INTEGER REFERENCES customers(id) ON DELETE SET NULL,
  customer_name     TEXT NOT NULL,
  customer_phone    TEXT NOT NULL,
  customer_email    TEXT,
  governorate       TEXT,
  city              TEXT,
  address           TEXT,
  apartment         TEXT,
  subtotal          REAL NOT NULL DEFAULT 0,
  discount_total    REAL NOT NULL DEFAULT 0,
  shipping_fee      REAL NOT NULL DEFAULT 0,
  total             REAL NOT NULL DEFAULT 0,
  coupon_code       TEXT,
  payment_method    TEXT NOT NULL DEFAULT 'cod',  -- cod, instapay, card
  payment_status    TEXT NOT NULL DEFAULT 'pending', -- pending, paid, failed, refunded
  payment_reference TEXT,
  shipping_method   TEXT NOT NULL DEFAULT 'standard',
  status            TEXT NOT NULL DEFAULT 'pending', -- pending, confirmed, processing, packed, shipped, out_for_delivery, delivered, cancelled, returned, refunded
  customer_notes    TEXT,
  admin_notes       TEXT,
  created_at        TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at        TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS order_items (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id     INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id   INTEGER REFERENCES products(id) ON DELETE SET NULL,
  variant_id   INTEGER REFERENCES product_variants(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  brand_name   TEXT,
  size         TEXT,
  qty          INTEGER NOT NULL,
  unit_price   REAL NOT NULL,
  image        TEXT
);

CREATE TABLE IF NOT EXISTS order_timeline (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id    INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  status      TEXT NOT NULL,
  note        TEXT,
  user_id     INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS coupons (
  id                 INTEGER PRIMARY KEY AUTOINCREMENT,
  code               TEXT NOT NULL UNIQUE,
  type               TEXT NOT NULL,          -- percent, fixed, free_shipping, bogo, first_order
  amount             REAL NOT NULL DEFAULT 0,
  min_order          REAL NOT NULL DEFAULT 0,
  max_discount       REAL,
  usage_limit        INTEGER,
  per_customer_limit INTEGER,
  used_count         INTEGER NOT NULL DEFAULT 0,
  starts_at          TEXT,
  expires_at         TEXT,
  applicable_products   TEXT,  -- JSON array of product ids, empty = all
  applicable_categories TEXT,  -- JSON array of category ids, empty = all
  applicable_brands     TEXT,  -- JSON array of brand ids, empty = all
  is_active          INTEGER NOT NULL DEFAULT 1,
  is_featured        INTEGER NOT NULL DEFAULT 0,  -- shown as live banner on site
  created_at         TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at         TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS coupon_redemptions (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  coupon_id   INTEGER NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
  order_id    INTEGER REFERENCES orders(id) ON DELETE SET NULL,
  customer_id INTEGER REFERENCES customers(id) ON DELETE SET NULL,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS reviews (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id  INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  rating      INTEGER NOT NULL,
  title       TEXT,
  body        TEXT,
  status      TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected, hidden
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS notifications (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  type        TEXT NOT NULL,   -- new_order, low_stock, out_of_stock, new_customer, new_review, payment_received, cancelled_order, refund
  title       TEXT NOT NULL,
  body        TEXT,
  link        TEXT,
  is_read     INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS settings (
  key         TEXT PRIMARY KEY,
  value       TEXT NOT NULL DEFAULT '',
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS activity_log (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER REFERENCES users(id) ON DELETE SET NULL,
  user_name   TEXT,
  action      TEXT NOT NULL,       -- e.g. "product.create", "order.status_change"
  entity_type TEXT,
  entity_id   TEXT,
  description TEXT NOT NULL,
  ip          TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_variants_product ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_images_product ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_pc_product ON product_categories(product_id);
CREATE INDEX IF NOT EXISTS idx_pc_category ON product_categories(category_id);
CREATE INDEX IF NOT EXISTS idx_activity_created ON activity_log(created_at);
