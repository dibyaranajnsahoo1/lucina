const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const applicationStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lucina_applications',
    resource_type: 'auto', // allows raw files like pdfs and images
    allowed_formats: ['pdf', 'jpg', 'jpeg', 'png', 'webp', 'heic', 'heif']
  },
});

const donorImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lucina_donors',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif']
  },
});

module.exports = {
  cloudinary,
  applicationStorage,
  donorImageStorage
};
