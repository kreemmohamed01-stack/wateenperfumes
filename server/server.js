require('dotenv').config({ quiet: true });
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { initSchema } = require('./db');

const ROOT = path.join(__dirname, '..');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const brandRoutes = require('./routes/brands');
const orderRoutes = require('./routes/orders');
const customerRoutes = require('./routes/customers');
const inventoryRoutes = require('./routes/inventory');
const couponRoutes = require('./routes/coupons');
const reviewRoutes = require('./routes/reviews');
const notificationRoutes = require('./routes/notifications');
const activityRoutes = require('./routes/activity');
const settingsRoutes = require('./routes/settings');
const overviewRoutes = require('./routes/overview');
const publicCatalogRoutes = require('./routes/public-catalog');
const staffRoutes = require('./routes/staff');

const app = express();
app.disable('x-powered-by');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

/* ---------- public API (no auth) — used by the storefront itself ---------- */
app.use('/api/public', publicCatalogRoutes);
app.use('/api/public/settings', (req, res, next) => settingsRoutes.publicSettings(req, res, next));
app.post('/api/public/orders', (req, res, next) => orderRoutes.createPublicOrder(req, res, next));
app.post('/api/public/coupons/validate', (req, res, next) => couponRoutes.validatePublic(req, res, next));
app.get('/api/public/coupons/featured', (req, res, next) => couponRoutes.featuredPublic(req, res, next));
app.post('/api/public/reviews', (req, res, next) => reviewRoutes.submitPublic(req, res, next));

/* ---------- admin API (auth required inside each router) ---------- */
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/overview', overviewRoutes);
app.use('/api/staff', staffRoutes);

/* ---------- uploaded product images ---------- */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* ---------- admin dashboard (static SPA) ---------- */
app.use('/admin', express.static(path.join(ROOT, 'admin')));
app.get('/admin/*splat', (req, res) => res.sendFile(path.join(ROOT, 'admin', 'index.html')));

/* ---------- the existing public website, unchanged ---------- */
app.use(express.static(ROOT, { index: 'index.html' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: process.env.NODE_ENV === 'production' ? 'Something went wrong.' : err.message });
});

const PORT = process.env.PORT || 3000;

initSchema()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Wateen Perfumes server running: http://localhost:${PORT}`);
      console.log(`Admin dashboard:               http://localhost:${PORT}/admin`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database schema:', err);
    process.exit(1);
  });
