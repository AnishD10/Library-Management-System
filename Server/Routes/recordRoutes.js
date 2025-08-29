// Record Routes: Endpoints for record operations. Every book's story needs a path.
const express = require('express');
const router = express.Router();
const recordController = require('../Controllers/recordController');
const roleAccess = require('../Middlewaeres/role');  // Import role middleware
const authorize = require('../Middlewaeres/auth'); // Import auth middleware

// Create a new record
router.post('/' , recordController.createRecord);

// Get all records
router.get('/', recordController.getAllRecords);

// Get a record by ID
router.get('/:id',  recordController.getRecordById);

// Update a record by ID
router.put('/:id', recordController.updateRecordById);

// Delete a record by ID
router.delete('/:id', recordController.deleteRecordById);



module.exports = router;