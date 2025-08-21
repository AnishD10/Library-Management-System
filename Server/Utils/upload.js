const multer = require("multer");
const path = require("path");

// Upload Utility: Handles file uploads. Because books need their glam shots.
// Defines where and how files should be stored (no red carpets, just disk storage)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, "uploads/"); // Make sure this folder exists, or your images will vanish into the void
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

// File type filter: Only images allowed. No PDFs, no Word docs, just pure pixel art.
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const isValid = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  if (isValid) cb(null, true);
  else cb(new Error("Only images allowed (.jpeg, .jpg, .png)"));
};

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max, because nobody wants a 4K book cover
  fileFilter,
});

module.exports = upload;