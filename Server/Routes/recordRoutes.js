const express = require('express');
const router = express.Router();
const recordController = require('../Controllers/recordController');
const roleAccess = require('../Middlewaeres/role');  // Import role middleware
const authorize = require('../Middlewaeres/auth'); // Import auth middleware

// Create a new record
router.post('/' , recordController.createRecord);

// Get all records
router.get('/', authorize, roleAccess('librarian'), recordController.getAllRecords);

// Get a record by ID
router.get('/:id', authorize, roleAccess('librarian'), recordController.getRecordById);

// Update a record by ID
router.put('/:id', authorize, roleAccess('librarian'), recordController.updateRecordById);

// Delete a record by ID
router.delete('/:id', authorize, roleAccess('librarian'), recordController.deleteRecordById);

module.exports = router;