const Record = require('../Models/Records');
const Book = require('../Models/Book');
const Borrower = require('../Models/Borrower');
const cron = require('node-cron');




// Create a new record
const createRecordService = async (recordData) => {
  try {
    const book = await Book.findById(recordData.bookId);
    if (!book) {
      throw new Error('Book not found');
    }

    if (book.available < recordData.quantity) {
      throw new Error('Not enough books available');
    }
    const borrower = await Borrower.findById(recordData.borrowerId);
    if (!borrower) {
      throw new Error('Borrower not found');
    }

    // Deduct the quantity of books
    if (recordData.status === 'issued') {
      if (borrower.booksBorrowed.includes(recordData.bookId)) {
        throw new Error('Book already borrowed by this borrower');
      }
      borrower.booksBorrowed.push(recordData.bookId);

      await borrower.save(); // Save borrower changes
      book.available -= 1;

      if (book.available < 0) {
        book.available = 0; // Ensure available does not go below zero
      }
    
    }
    else if(recordData.status === 'returned') {
      if (!borrower.booksBorrowed.includes(recordData.bookId)) {
        throw new Error('Book was not borrowed by this borrower or returned already');
      }
      borrower.booksBorrowed.pull(recordData.bookId);
      await borrower.save();
      book.available += 1;
      if (book.available > book.quantity) {
        book.available = book.quantity; // Ensure available does not exceed total quantity
      } 
    }
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