const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/bookController');
const roleAccess = require('../Middlewaeres/role'); 
const authorize = require('../Middlewaeres/auth');



// Create a new book
router.post('/',authorize ,  roleAccess('librarian'), bookController.createBook);

// Get all books
router.get('/', authorize, bookController.getAllBooks);

// Get a book by ID
router.get('/:id', bookController.getBookById);

// Update a book by ID
router.put('/:id', authorize, bookController.updateBookById);

// Delete a book by ID
router.delete('/:id', authorize, bookController.deleteBookById);

module.exports = router;