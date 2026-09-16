-- ════════════════════════════════════════════════
-- WATEEN PERFUMES — DATABASE SCHEMA (PostgreSQL)
-- ════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'admin',
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS brands (
  id          SERIAL PRIMARY KEY,
  slug        TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  name_ar     TEXT,
  logo        TEXT,
  banner      TEXT,
  description TEXT,
  website     TEXT,
  country     TEXT,
  featured    BOOLEAN NOT NULL DEFAULT FALSE,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  seo_title   TEXT,
  seo_desc    TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
  id          SERIAL PRIMARY KEY,
  slug        TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  description TEXT,
  image       TEXT,
  hero_image  TEXT,
  banner      TEXT,
  seo_title   TEXT,
  seo_desc    TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id                SERIAL PRIMARY KEY,
  slug              TEXT NOT NULL UNIQUE,
  name              TEXT NOT NULL,
  name_ar           TEXT,
  brand_id          INTEGER REFERENCES brands(id) ON DELETE SET NULL,
  type              TEXT,
  sku               TEXT,
  barcode           TEXT,
  description       TEXT,
  short_description TEXT,
  gender            TEXT,
  family            TEXT,
  origin            TEXT,
  year              TEXT,
  notes_top         TEXT,
  notes_heart       TEXT,
  notes_base        TEXT,
  tag_html          TEXT,
  cost_price        REAL,
  weight            REAL,
  rating            REAL NOT NULL DEFAULT 0,
  reviews_count     INTEGER NOT NULL DEFAULT 0,
  status            TEXT NOT NULL DEFAULT 'published',
  featured          BOOLEAN NOT NULL DEFAULT FALSE,
  best_seller       BOOLEAN NOT NULL DEFAULT FALSE,
  new_arrival       BOOLEAN NOT NULL DEFAULT FALSE,
  on_sale           BOOLEAN NOT NULL DEFAULT FALSE,
  discount_percent  REAL NOT NULL DEFAULT 0,
  discount_active   BOOLEAN NOT NULL DEFAULT FALSE,
  low_stock_threshold INTEGER NOT NULL DEFAULT 5,
  video_url         TEXT,
  seo_title         TEXT,
  seo_desc          TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_categories (
  product_id  INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  is_primary  BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (product_id, category_id)
);

CREATE TABLE IF NOT EXISTS product_variants (
  id            SERIAL PRIMARY KEY,
  product_id    INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size          TEXT NOT NULL,
  sku           TEXT,
  price         REAL NOT NULL,
  compare_at_price REAL,
  stock         INTEGER NOT NULL DEFAULT 0,
  reserved      INTEGER NOT NULL DEFAULT 0,
  is_default    BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_images (
  id          SERIAL PRIMARY KEY,
  product_id  INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_main     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory_log (
  id          SERIAL PRIMARY KEY,
  variant_id  INTEGER NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
  change_qty  INTEGER NOT NULL,
  reason      TEXT NOT NULL,
  note        TEXT,
  user_id     INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customers (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT,
  phone         TEXT NOT NULL,
  governorate   TEXT,
  city          TEXT,
  address       TEXT,
  apartment     TEXT,
  status        TEXT NOT NULL DEFAULT 'active',
  segment       TEXT NOT NULL DEFAULT 'new',
  notes         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id                SERIAL PRIMARY KEY,
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
  payment_method    TEXT NOT NULL DEFAULT 'cod',
  payment_status    TEXT NOT NULL DEFAULT 'pending',
  payment_reference TEXT,
  shipping_method   TEXT NOT NULL DEFAULT 'standard',
  status            TEXT NOT NULL DEFAULT 'pending',
  customer_notes    TEXT,
  admin_notes       TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id           SERIAL PRIMARY KEY,
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
  id          SERIAL PRIMARY KEY,
  order_id    INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  status      TEXT NOT NULL,
  note        TEXT,
  user_id     INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS coupons (
  id                 SERIAL PRIMARY KEY,
  code               TEXT NOT NULL UNIQUE,
  type               TEXT NOT NULL,
  amount             REAL NOT NULL DEFAULT 0,
  min_order          REAL NOT NULL DEFAULT 0,
  max_discount       REAL,
  usage_limit        INTEGER,
  per_customer_limit INTEGER,
  used_count         INTEGER NOT NULL DEFAULT 0,
  starts_at          TIMESTAMPTZ,
  expires_at         TIMESTAMPTZ,
  applicable_products   TEXT,
  applicable_categories TEXT,
  applicable_brands     TEXT,
  is_active          BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured        BOOLEAN NOT NULL DEFAULT FALSE,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS coupon_redemptions (
  id          SERIAL PRIMARY KEY,
  coupon_id   INTEGER NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
  order_id    INTEGER REFERENCES orders(id) ON DELETE SET NULL,
  customer_id INTEGER REFERENCES customers(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id          SERIAL PRIMARY KEY,
  product_id  INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  rating      INTEGER NOT NULL,
  title       TEXT,
  body        TEXT,
  status      TEXT NOT NULL DEFAULT 'pending',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
  id          SERIAL PRIMARY KEY,
  type        TEXT NOT NULL,
  title       TEXT NOT NULL,
  body        TEXT,
  link        TEXT,
  is_read     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
  key         TEXT PRIMARY KEY,
  value       TEXT NOT NULL DEFAULT '',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS activity_log (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER REFERENCES users(id) ON DELETE SET NULL,
  user_name   TEXT,
  action      TEXT NOT NULL,
  entity_type TEXT,
  entity_id   TEXT,
  description TEXT NOT NULL,
  ip          TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
