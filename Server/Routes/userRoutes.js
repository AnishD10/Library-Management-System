const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Define routes for user-related operations
router.post('/login', userController.loginUser);
router.post('/forgotPassword', userController.forgotPassword);
router.put('/resetPassword', userController.resetPassword);

router.post('/register', userController.createUser);



module.exports = router;
