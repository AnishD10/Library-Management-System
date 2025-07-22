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

router.post('/register', authorize, roleAccess('librarian') ,  userController.createUser);



module.exports = router;
