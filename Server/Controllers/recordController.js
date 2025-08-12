const recordService = require('../Services/recordServices');

// Create a new record
const createRecord = async (req, res) => {
  const { bookId, borrowerId ,status } = req.body;

  if (!bookId || !borrowerId || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await recordService.createRecordService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating record ', error: error.message });
  }
};

// Get all records
const getAllRecords = async (req, res) => {
  try {
    const records = await recordService.getAllRecordsService();
    return res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching records', error: error.message });
  }
};

// Get a record by ID
const getRecordById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Record ID is required' });
  }

  try {
    const record = await recordService.getRecordByIdService(id);
    return res.status(200).json(record);
  } catch (error) {
    return res.status(404).json({ message: 'Record not found', error: error.message });
  }
};

// Update a record by ID
const updateRecordById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Record ID is required' });
  }

  if (!updateData || Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: 'Update data is required' });
  }

  try {
    const updatedRecord = await recordService.updateRecordByIdService(id, updateData);
    return res.status(200).json(updatedRecord);
  } catch (error) {
    return res.status(404).json({ message: 'Error updating record', error: error.message });
  }
};

// Delete a record by ID
const deleteRecordById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Record ID is required' });
  }

  try {
    const result = await recordService.deleteRecordByIdService(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: 'Error deleting record', error: error.message });
  }
};

module.exports = {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecordById,
  deleteRecordById,
};