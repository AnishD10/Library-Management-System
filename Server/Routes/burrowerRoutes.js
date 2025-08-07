const express = require('express');
const router = express.Router();
const borrowerController = require('../Controllers/burrowerController');
const roleAccess = require('../Middlewaeres/role'); 

// Create a new borrower
router.post('/', borrowerController.createBorrower);

// Get all borrowers
router.get('/', roleAccess('librarian'), borrowerController.getAllBorrowers);

// Get a borrower by ID
router.get('/:id', roleAccess('librarian'), borrowerController.getBorrowerById);

// Update a borrower by ID
router.put('/:id', roleAccess('librarian'), borrowerController.updateBorrowerById);

// Delete a borrower by ID
router.delete('/:id', borrowerController.deleteBorrowerById);

module.exports = router;