const multer = require('multer');
const path = require('path');
const { applicationStorage, donorImageStorage } = require('../config/cloudinary');

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
