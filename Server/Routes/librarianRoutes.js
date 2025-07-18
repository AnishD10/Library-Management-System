const express = require('express');
const router = express.Router();
const librarianController = require('../Controllers/librarianController');

// Create a new librarian
router.post('/', librarianController.createLibrarian);

// Get all librarians
router.get('/', librarianController.getAllLibrarians);

// Get a librarian by ID
router.get('/:id', librarianController.getLibrarianById);

// Update a librarian by ID
router.put('/:id', librarianController.updateLibrarianById);

// Delete a librarian by ID
router.delete('/:id', librarianController.deleteLibrarianById);

module.exports = router;