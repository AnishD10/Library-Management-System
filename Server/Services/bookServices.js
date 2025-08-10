// 📖 Welcome to the Book Factory! 
// Where literary dreams are born and book data comes to life! ✨
const Book = require('../Models/Book');

// 🏭 The Book Manufacturing Plant!
// Turn raw data into beautiful, shelf-worthy digital books
const createBookService = async (bookData) => {
  try {
    // 🎨 Crafting a new book like a literary blacksmith
    const newBook = new Book(bookData);
    await newBook.save(); // 💾 Immortalize this masterpiece in the database
    
    return { message: 'Book created successfully', book: newBook }; // 🎉 Another book baby is born!
    
  } catch (error) {
    // 💥 When book creation goes wrong (it's not you, it's the data)
    throw new Error('Error creating book: ' + error.message);
  }
};

// 📚 The Grand Library Catalog!
// Summon ALL the books from the digital realm (like magic, but with MongoDB)
const getAllBooksService = async () => {
  try {
    // 🔮 Abracadabra! Show me every single book we own
    return await Book.find(); // The ultimate book parade! 📖📗📘📙
    
  } catch (error) {
    throw new Error('Error fetching books: ' + error.message); // 📡 Communication with book dimension failed
  }
};

// 🕵️‍♀️ The Book Detective Agency!
// Find that one specific book hiding in the database wilderness
const getBookByIdService = async (id) => {
  try {
    // 🔍 CSI: Database Investigation Unit in action!
    const book = await Book.findById(id);
    
    if (!book) {
      throw new Error('Book not found'); // 🕳️ Book has entered the Bermuda Triangle of databases
    }
    
    return book; // 🎯 Target acquired! Here's your literary treasure
    
  } catch (error) {
    throw new Error('Error fetching book: ' + error.message); // 🚨 The search mission failed!
  }
};

// ✨ The Book Makeover Salon!
// Give your book a fresh new look with updated information
const updateBookByIdService = async (id, updateData) => {
  try {
    // 💄 Time for a book glow-up! (findByIdAndUpdate = the ultimate makeover tool)
    const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true });
    // { new: true } = "Show me the stunning after photo, not the boring before!"
    
    if (!updatedBook) {
      throw new Error('Book not found'); // 👻 Tried to makeover a ghost book
    }
    
    return updatedBook; // ✨ Voilà! Your book is now runway-ready
    
  } catch (error) {
    throw new Error('Error updating book: ' + error.message); // 💔 Makeover session crashed and burned
  }
};

// 🔥 The Book Incinerator! 
// When books need to disappear forever (Don't worry, it's just data!)
const deleteBookByIdService = async (id) => {
  try {
    // 💀 The final farewell - sending a book to digital heaven
    const deletedBook = await Book.findByIdAndDelete(id);
    
    if (!deletedBook) {
      throw new Error('Book not found'); // 🎭 Attempted to delete a mythical book
    }
    
    return { message: 'Book deleted successfully' }; // ⚰️ Rest in peace, dear book data
    
  } catch (error) {
    throw new Error('Error deleting book: ' + error.message); // 💣 Deletion mission went kaboom!
  }
};

// 📦 The Book Services Export Warehouse!
// Where all our literary functions gather for their grand debut
module.exports = {
  createBookService,     // 🏭 The book factory worker
  getAllBooksService,    // 📚 The library catalog keeper
  getBookByIdService,    // 🕵️‍♀️ The book detective
  updateBookByIdService, // ✨ The book stylist
  deleteBookByIdService, // 🔥 The book eraser
  // Together, they manage the lifecycle of every book in our digital library! 📖➡️💻
};