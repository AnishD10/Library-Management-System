// Borrower Routes: Endpoints for borrower operations. Borrowers need directions too.
const express = require('express');
const router = express.Router();
const borrowerController = require('../Controllers/burrowerController');
const roleAccess = require('../Middlewaeres/role'); 

// Create a new borrower
router.post('/', borrowerController.createBorrower);

// Get all borrowers
router.get('/', borrowerController.getAllBorrowers);

// Get a borrower by ID
router.get('/:id', borrowerController.getBorrowerById);

// Update a borrower by ID
router.put('/:id',  borrowerController.updateBorrowerById);

// Delete a borrower by ID
router.delete('/:id', borrowerController.deleteBorrowerById);

module.exports = router;