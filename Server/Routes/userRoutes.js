const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const roleAccess = require('../Middlewaeres/role');
const authorize = require('../Middlewaeres/auth'); 
// Import role middleware

// Define routes for user-related operations
router.post('/login', userController.loginUser);
router.post('/forgotPassword', userController.forgotPassword);
router.put('/resetPassword', userController.resetPassword);

router.post('/register' ,  userController.createUser);
router.post('/verify-otp', userController.verifyOtp); // Route for OTP verification



module.exports = router;
