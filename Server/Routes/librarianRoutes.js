const express = require('express');
const router = express.Router();
const librarianController = require('../Controllers/librarianController');
const roleAccess = require('../Middlewaeres/role'); 

// Create a new librarian
router.post('/', librarianController.createLibrarian);

// Get all librarians
router.get('/', roleAccess('librarian'), librarianController.getAllLibrarians);

// Get a librarian by ID
router.get('/:id', roleAccess('librarian'), librarianController.getLibrarianById);

// Update a librarian by ID
router.put('/:id', roleAccess('librarian'), librarianController.updateLibrarianById);

// Delete a librarian by ID
router.delete('/:id', roleAccess('librarian'), librarianController.deleteLibrarianById);

module.exports = router;