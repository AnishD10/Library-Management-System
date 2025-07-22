const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/bookController');
const roleAccess = require('../Middlewaeres/role'); 


// Create a new book
router.post('/', roleAccess('librarian'), bookController.createBook);

// Get all books
router.get('/', roleAccess('librarian'), bookController.getAllBooks);

// Get a book by ID
router.get('/:id', roleAccess('librarian'), bookController.getBookById);

// Update a book by ID
router.put('/:id', roleAccess('librarian'), bookController.updateBookById);

// Delete a book by ID
router.delete('/:id', roleAccess('librarian'), bookController.deleteBookById);

module.exports = router;