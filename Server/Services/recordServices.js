const Record = require('../Models/Records');
const Book = require('../Models/Book');

// Create a new record
const createRecordService = async (recordData) => {
  try {
    const book = await Book.findById(recordData.bookId);
    if (!book) {
      throw new Error('Book not found');
    }

    if (book.quantity < recordData.quantity) {
      throw new Error('Not enough books available');
    }

    // Deduct the quantity of books
    book.quantity -= recordData.quantity;
    await book.save();

    const newRecord = new Record(recordData);
    await newRecord.save();
    return { message: 'Record created successfully', record: newRecord };
  } catch (error) {
    throw new Error('Error creating record: ' + error.message);
  }
};

// Get all records
const getAllRecordsService = async () => {
  try {
    return await Record.find().populate('bookId borrowerId librarianId');
  } catch (error) {
    throw new Error('Error fetching records: ' + error.message);
  }
};

// Get a record by ID
const getRecordByIdService = async (id) => {
  try {
    const record = await Record.findById(id).populate('bookId borrowerId librarianId');
    if (!record) {
      throw new Error('Record not found');
    }
    return record;
  } catch (error) {
    throw new Error('Error fetching record: ' + error.message);
  }
};

// Update a record by ID
const updateRecordByIdService = async (id, updateData) => {
  try {
    const updatedRecord = await Record.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedRecord) {
      throw new Error('Record not found');
    }
    return updatedRecord;
  } catch (error) {
    throw new Error('Error updating record: ' + error.message);
  }
};

// Delete a record by ID
const deleteRecordByIdService = async (id) => {
  try {
    const deletedRecord = await Record.findByIdAndDelete(id);
    if (!deletedRecord) {
      throw new Error('Record not found');
    }

    // Restore the book quantity
    const book = await Book.findById(deletedRecord.bookId);
    if (book) {
      book.quantity += deletedRecord.quantity;
      await book.save();
    }

    return { message: 'Record deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting record: ' + error.message);
  }
};

module.exports = {
  createRecordService,
  getAllRecordsService,
  getRecordByIdService,
  updateRecordByIdService,
  deleteRecordByIdService,
};