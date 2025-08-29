// Book Routes: Endpoints for book operations. Because books can't route themselves.
const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/bookController');
const roleAccess = require('../Middlewaeres/role'); 
const authorize = require('../Middlewaeres/auth');
const uploadController = require('../Controllers/uploadController');
const upload = require('../Utils/upload'); // Import the upload middleware



// Create a new book (with image upload)
router.post('/', upload.single('image'), authorize, roleAccess('librarian'), bookController.createBook);

// Get all books
router.get('/', bookController.getAllBooks);

// Get a book by ID
router.get('/:id', bookController.getBookById);

// Update a book by ID
router.put('/:id', bookController.updateBookById);

// Delete a book by ID
router.delete('/:id', bookController.deleteBookById);

// Upload endpoint
router.post("/:id/upload-image", upload.single("image"), uploadController);


module.exports = router;