const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const roleAccess = require('../Middlewaeres/role');
const authorize = require('../Middlewaeres/auth'); 
const {payFine , renewBook} = require('../Utils/FineOperations'); // Import fine operations utility
// Import role middleware

// Define routes for user-related operations
router.post('/login', userController.loginUser);
router.post('/forgotPassword', userController.forgotPassword);
router.put('/resetPassword', userController.resetPassword);

router.post('/register' ,  userController.createUser);
router.post('/verify-otp', userController.verifyOtp)
router.put('/pay-fine', payFine);
router.put('/renew', renewBook) // Route for paying fines, protected by authorization middleware
; // Route for OTP verification



module.exports = router;
