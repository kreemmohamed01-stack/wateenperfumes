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

const hasCloudinaryConfig = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

if (hasCloudinaryConfig) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

const ALLOWED_EXT = new Set(['png', 'jpg', 'jpeg', 'webp', 'gif']);

// files land in memory first, then get streamed to Cloudinary explicitly —
// this avoids depending on multer-storage-cloudinary, which pins an old,
// vulnerable cloudinary v1 peer dependency (GHSA-g4mf-96x5-5m2c) and hasn't
// been updated for the cloudinary v2 SDK used here.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = (file.originalname.split('.').pop() || '').toLowerCase();
    if (!ALLOWED_EXT.has(ext)) return cb(new Error('Unsupported image type.'));
    cb(null, true);
  }
});

function uploadBufferToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'wateen-perfumes', transformation: [{ width: 1600, height: 1600, crop: 'limit' }] },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    stream.end(buffer);
  });
}

module.exports = { upload, uploadBufferToCloudinary, hasCloudinaryConfig };
