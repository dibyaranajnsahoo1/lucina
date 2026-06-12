const express = require('express');
const router = express.Router();
const {
  getTestimonials, getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial
} = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');

// Admin
router.get('/admin/all', protect, getAllTestimonials);
router.post('/', protect, createTestimonial);
router.put('/:id', protect, updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

// Public
router.get('/', getTestimonials);

module.exports = router;
