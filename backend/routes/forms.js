const express = require('express');
const router = express.Router();
const {
  submitDonorApplication, getDonorApplications, getDonorApplication,
  downloadDonorApplicationFile, updateDonorApplicationStatus, deleteDonorApplication,
  submitFindDonorForm, getFindDonorForms, updateFindDonorStatus, deleteFindDonorForm,
  submitContactForm, getContactForms, updateContactStatus, deleteContactForm,
  getDashboardStats
} = require('../controllers/formController');
const { protect } = require('../middleware/auth');
const { uploadApplicationFiles } = require('../middleware/upload');

// Dashboard stats
router.get('/stats', protect, getDashboardStats);

// Donor Application routes
router.post('/donor-application', uploadApplicationFiles, submitDonorApplication);
router.get('/donor-applications', protect, getDonorApplications);
router.get('/donor-applications/:id/files/:filename', protect, downloadDonorApplicationFile);
router.get('/donor-applications/:id', protect, getDonorApplication);
router.put('/donor-applications/:id', protect, updateDonorApplicationStatus);
router.delete('/donor-applications/:id', protect, deleteDonorApplication);

// Find Donor Form routes
router.post('/find-donor', submitFindDonorForm);
router.get('/find-donor', protect, getFindDonorForms);
router.put('/find-donor/:id', protect, updateFindDonorStatus);
router.delete('/find-donor/:id', protect, deleteFindDonorForm);

// Contact Form routes
router.post('/contact', submitContactForm);
router.get('/contact', protect, getContactForms);
router.put('/contact/:id', protect, updateContactStatus);
router.delete('/contact/:id', protect, deleteContactForm);

module.exports = router;
