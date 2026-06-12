const express = require('express');
const router = express.Router();
const {
  getDonors, getDonor, createDonor, updateDonor, deleteDonor, getAllDonorsAdmin
} = require('../controllers/donorController');
const { protect } = require('../middleware/auth');
const { uploadDonorImages } = require('../middleware/upload');

// Admin routes
router.get('/admin/all', protect, getAllDonorsAdmin);
router.post('/', protect, uploadDonorImages, createDonor);
router.put('/:id', protect, uploadDonorImages, updateDonor);
router.delete('/:id', protect, deleteDonor);

// Public routes
router.get('/', getDonors);
router.get('/:id', getDonor);

module.exports = router;
