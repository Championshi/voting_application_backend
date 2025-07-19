const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../jwt');
const { registerUser, loginUser, changePassword, getProfile } = require('../controllers/userController');

// User Authentication Routes
router.post('/signup', registerUser); // Register a user
router.post('/login', loginUser); // Login with Aadhar Card Number and Password

// Secured routes (require authentication)
router.put('/profile/password', authenticateToken, changePassword); // Change Password
router.get('/profile',authenticateToken, getProfile); // Get User Profile

module.exports = router;

