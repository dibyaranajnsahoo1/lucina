const express = require('express');
const router = express.Router();
const { login, getMe, setup, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/login', login);
router.post('/setup', setup);
router.get('/me', protect, getMe);
router.put('/change-password', protect, changePassword);

module.exports = router;
