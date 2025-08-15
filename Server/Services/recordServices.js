// 📚 Welcome to the Library's Record-Keeping Department! 
// Where books meet borrowers and records are born (or sometimes die) 💀
const Record = require('../Models/Records');
const Book = require('../Models/Book');
const Borrower = require('../Models/Borrower');

// 🎭 The Grand Theater of Book Transactions! 
// This function orchestrates the epic drama of issuing and returning books
const createRecordService = async (recordData) => {
  try {
    // 🕵️‍♂️ First, let's see if this book actually exists (plot twist: sometimes it doesn't!)
    const book = await Book.findById(recordData.bookId);
    if (!book) {
      throw new Error('Book not found'); // 404: Book has vanished into thin air! 🪄
    }

    // 📊 Stock check! Are we about to disappoint someone? (Probably yes)
    if (book.available < 1) {
      throw new Error(`Sorry ! ${book.title} is out of stock `); // 😢 Dreams crushed by inventory
    }
    
    // 🔍 Now let's hunt for the borrower (they better exist or this gets awkward)
    const borrower = await Borrower.findById(recordData.borrowerId);
    if (!borrower) {
      throw new Error('Borrower not found'); // 👻 Ghost borrower detected!
    }

    // 🎪 The main event! Time to juggle books like a circus performer
    if (recordData.status === 'issue') {
      // 🚫 Anti-hoarding policy: One book per person (we're not running Amazon here!)
      if (borrower.booksBorrowed.includes(recordData.bookId)) {
        throw new Error('Book already borrowed by this borrower'); // 🤷‍♂️ Someone's being greedy!
      }
      
      // 📝 Add book to borrower's collection (their personal library grows!)
      borrower.booksBorrowed.push(recordData.bookId);
      await borrower.save(); // Save the evidence of their literary addiction
      
      book.available -= 1; // 📉 One less book in our fortress of knowledge
      await book.save(); // 💾 Save the book's updated availability first!


      console.log("Book issued sucessfully") // 👀 Peek at the book's new status
    
    }
    else if(recordData.status === 'return') {
      // 🔄 The Return of the Book (better sequel than most movies)
      if (!borrower.booksBorrowed.includes(recordData.bookId)) {
        throw new Error('Book was not borrowed by this borrower or returned already'); 
        // 🤔 Either they're lying or have memory issues
      }
      if(borrower.fine > 0) {
        throw new Error('Please clear up the charges before returning the book'); 
      }// 💸
      // 🗑️ Remove book from their collection (bye bye, literary friend!)
      borrower.booksBorrowed.pull(recordData.bookId);
      await borrower.save(); // Update their reading resume
      
      book.available += 1; // 📈 Our book army grows stronger!
      
      // 🛡️ Safety check: We don't want more books than we actually own (that would be magic!)
      if (book.available > book.quantity) {
        book.available = book.quantity; // Reality check: Physics still applies here
      } 

      await book.save(); // 💾 Save the book's updated availability first!
      // Change status to issue
      console.log("Book returned sucessfully") // 👀 Peek at the book's new status
    }
    
    await book.save(); // Save our book's updated social status (this was happening too late!)
    
    // 🎉 The grand finale! Create the official record (like a birth certificate for transactions)
    const newRecord = new Record(recordData);
    await newRecord.save(); // Immortalize this moment in database history
    
    return { message: 'Record created successfully', record: newRecord }; // 🏆 Victory dance!
    
  } catch (error) {
    // 💥 When things go wrong, we don't panic - we just throw errors professionally
    throw new Error('Error creating record: ' + error.message);
  }
};

// 📋 The Great Record Census! 
// Fetch all records like you're collecting Pokemon cards (gotta catch 'em all!)
const getAllRecordsService = async () => {
  try {
    // 🔗 Populate = fancy word for "get me the full story, not just IDs"
    return await Record.find().populate('bookId borrowerId librarianId');
    // Think of populate as asking for the full gossip, not just names
  } catch (error) {
    throw new Error('Error fetching records: ' + error.message); // 🚨 Houston, we have a problem!
  }
};

// 🎯 The Record Hunter! 
// Find one specific record in the vast digital wilderness
const getRecordByIdService = async (id) => {
  try {
    // 🔍 Detective work: Find the record and bring its whole family (populated data)
    const record = await Record.findById(id).populate('bookId borrowerId librarianId');
    
    if (!record) {
      throw new Error('Record not found'); // 🕳️ It fell into the database void!
    }
    
    return record; // 🎁 Here's your prize!
    
  } catch (error) {
    throw new Error('Error fetching record: ' + error.message); // 💔 Something went terribly wrong
  }
};

// ✏️ The Record Makeover Artist! 
// Give your record a fresh new look (update its data)
const updateRecordByIdService = async (id, updateData) => {
  try {
    // 🔄 The magical transformation spell: findByIdAndUpdate!
    // { new: true } = "Show me the after photo, not the before"
    const updatedRecord = await Record.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedRecord) {
      throw new Error('Record not found'); // 👻 Tried to update a ghost record
    }
    
    return updatedRecord; // ✨ Ta-da! Your updated masterpiece
    
  } catch (error) {
    throw new Error('Error updating record: ' + error.message); // 🛠️ Update failed spectacularly
  }
};

// 🗑️ The Digital Shredder! 
// When records need to disappear forever (RIP little record)
const deleteRecordByIdService = async (id) => {
  try {
    // 💀 The final goodbye - delete the record from existence
    const deletedRecord = await Record.findByIdAndDelete(id);
    
    if (!deletedRecord) {
      throw new Error('Record not found'); // 🎭 Tried to delete something that never existed
    }

    // 🔄 Cleanup duty: When we delete a record, we need to fix the book count
    // (Because math should still make sense, even in chaos)
    const book = await Book.findById(deletedRecord.bookId);
    if (book) {
      book.quantity += deletedRecord.quantity; // 📚 Books return to the mothership
      await book.save(); // Save the corrected universe
    }
    return { message: 'Record deleted successfully' }; // 🎊 Mission accomplished! Record has been sent to the digital afterlife
    
  } catch (error) {
    throw new Error('Error deleting record: ' + error.message); // 💣 Deletion went kaboom!
  }
};

// 🔄 The Status Shapeshifter

// 📦 The Export Department! 
// Where all our beautiful functions go to meet the outside world
module.exports = {
  createRecordService,    // 🎭 The drama queen (handles all the action)
  getAllRecordsService,   // 📊 The census taker (counts everything)
  getRecordByIdService,   // 🕵️ The detective (finds specific records)
  updateRecordByIdService,// ✏️ The makeover artist (changes things)
  deleteRecordByIdService,// 🗑️ The cleanup crew (removes the evidence)

  // Together, they form the ultimate library management dream team! 🦸‍♀️🦸‍♂️
};