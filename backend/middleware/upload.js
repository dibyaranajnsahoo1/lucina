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

const applicationFileFilter = (req, file, cb) => {
  const allowedExtensions = /\.(pdf|jpe?g|png|webp|heic|heif)$/i;
  const allowedMimeTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif'
  ];

  const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedMimeTypes.includes(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }

  return cb(new Error('Only PDF or image files are allowed for donor applications.'));
};

// Upload for donor applications (up to 5 PDFs/images)
const applicationUploader = multer({
  storage: applicationStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB per file
  fileFilter: applicationFileFilter
}).array('uploadedFiles', 5);

const uploadApplicationFiles = (req, res, next) => {
  applicationUploader(req, res, (error) => {
    if (!error) {
      return next();
    }

    if (error instanceof multer.MulterError) {
      const message = error.code === 'LIMIT_FILE_SIZE'
        ? 'Each donor application file must be 2 MB or smaller.'
        : error.code === 'LIMIT_UNEXPECTED_FILE'
          ? 'You can upload up to 5 files.'
          : error.message;

      return res.status(400).json({ success: false, message });
    }

    return res.status(400).json({
      success: false,
      message: error.message || 'Invalid upload.'
    });
  });
};

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
