const Record = require('../Models/Records');
const Book = require('../Models/Book');
const Borrower = require('../Models/Borrower');

const createRecordService = async (recordData) => {
  try {
    const book = await Book.findById(recordData.bookId);
    if (!book) {
      throw new Error('Book not found');
    }

   
    
    const borrower = await Borrower.findById(recordData.borrowerId);
    if (!borrower) {
      throw new Error('Borrower not found');
    }

    if (recordData.status === 'issue') {
      if (borrower.booksBorrowed.includes(recordData.bookId)) {
        throw new Error('Book already borrowed by this borrower');
      }
      
       if (book.available <= 0 ) {
      throw new Error(`Sorry ! ${book.title} is out of stock `);
    }
      
      borrower.booksBorrowed.push(recordData.bookId);
      await borrower.save(); // Save the evidence of their literary addiction
      
      book.available -= 1; // 📉 One less book in our fortress of knowledge
      await book.save(); // 💾 Save the book's updated availability first!

      console.log("Book issued sucessfully")
    
    }
    else if(recordData.status === 'return') {
      if (!borrower.booksBorrowed.includes(recordData.bookId)) {
        throw new Error('Book was not borrowed by this borrower or returned already'); 
      }
      if(borrower.fine > 0) {
        throw new Error('Please clear up the charges before returning the book'); 
      }
      // 🗑️ Remove book from their collection (bye bye, literary friend!)
      borrower.booksBorrowed.pull(recordData.bookId);
      await borrower.save(); // Update their reading resume
      
      book.available += 1; // 📈 Our book army grows stronger!
      
      if (book.available > book.quantity) {
        book.available = book.quantity; // Reality check: Physics still applies here
      } 

      await book.save(); // 💾 Save the book's updated availability first!
      console.log("Book returned sucessfully")
    }
    
    
    const newRecord = new Record(recordData);
    await newRecord.save(); // Immortalize this moment in database history
    
    return { message: 'Record created successfully', record: newRecord };
    
  } catch (error) {
    throw new Error('Error creating record: ' + error.message);
  }
};

const getAllRecordsService = async () => {
  try {
    return await Record.find().populate('bookId borrowerId librarianId');
  } catch (error) {
    throw new Error('Error fetching records: ' + error.message);
  }
};

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

const deleteRecordByIdService = async (id) => {
  try {
    const deletedRecord = await Record.findByIdAndDelete(id);
    
    if (!deletedRecord) {
      throw new Error('Record not found');
    }

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