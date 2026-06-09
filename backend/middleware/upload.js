const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const donorImagesDir = path.join(uploadDir, 'donor-images');
if (!fs.existsSync(donorImagesDir)) {
  fs.mkdirSync(donorImagesDir, { recursive: true });
}

const applicationFilesDir = path.join(uploadDir, 'applications');
if (!fs.existsSync(applicationFilesDir)) {
  fs.mkdirSync(applicationFilesDir, { recursive: true });
}

// Storage for donor application images
const applicationStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, applicationFilesDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `app-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// Storage for donor profile images
const donorImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, donorImagesDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `donor-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// File filter
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|heic|heif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (extname || mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Upload for donor applications (up to 5 images)
const uploadApplicationFiles = multer({
  storage: applicationStorage,
  limits: { fileSize: 64 * 1024 * 1024 }, // 64MB
  fileFilter: imageFilter
}).array('uploadedFiles', 5);

// Upload for donor profile images
const uploadDonorImages = multer({
  storage: donorImageStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: imageFilter
}).array('profileImages', 10);

// Single donor image
const uploadSingleDonorImage = multer({
  storage: donorImageStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: imageFilter
}).single('profileImage');

module.exports = {
  uploadApplicationFiles,
  uploadDonorImages,
  uploadSingleDonorImage
};
