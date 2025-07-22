const express = require('express');
const router = express.Router();
const recordController = require('../Controllers/recordController');
const roleAccess = require('../Middlewaeres/role');  // Import role middleware

// Create a new record
router.post('/',roleAccess('librarian') , recordController.createRecord);

// Get all records
router.get('/', roleAccess('librarian'), recordController.getAllRecords);

// Get a record by ID
router.get('/:id', roleAccess('librarian'), recordController.getRecordById);

// Update a record by ID
router.put('/:id', roleAccess('librarian'), recordController.updateRecordById);

// Delete a record by ID
router.delete('/:id', roleAccess('librarian'), recordController.deleteRecordById);

module.exports = router;