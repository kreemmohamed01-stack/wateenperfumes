/* ════════════════════════════════════════════════
   IMAGE UPLOAD — Cloudinary
   Product photos, brand logos, and category images all
   go through here. Uploads must land on durable cloud
   storage, not local disk — Vercel's filesystem is
   read-only/ephemeral in production, so anything written
   to disk at request time disappears.
   ════════════════════════════════════════════════ */
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const hasCloudinaryConfig = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

if (hasCloudinaryConfig) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

const ALLOWED_EXT = new Set(['png', 'jpg', 'jpeg', 'webp', 'gif']);

const storage = hasCloudinaryConfig
  ? new CloudinaryStorage({
      cloudinary,
      params: {
        folder: 'wateen-perfumes',
        allowed_formats: [...ALLOWED_EXT],
        transformation: [{ width: 1600, height: 1600, crop: 'limit' }]
      }
    })
  : multer.memoryStorage(); // local dev fallback when Cloudinary env vars aren't set — see note in upload route

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = (file.originalname.split('.').pop() || '').toLowerCase();
    if (!ALLOWED_EXT.has(ext)) return cb(new Error('Unsupported image type.'));
    cb(null, true);
  }
});

module.exports = { upload, hasCloudinaryConfig };
