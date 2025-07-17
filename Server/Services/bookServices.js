const Book = require('../Models/Book');

// Create a new book
const createBookService = async (bookData) => {
  try {
    const newBook = new Book(bookData);
    await newBook.save();
    return { message: 'Book created successfully', book: newBook };
  } catch (error) {
    throw new Error('Error creating book: ' + error.message);
  }
};

// Get all books
const getAllBooksService = async () => {
  try {
    return await Book.find();
  } catch (error) {
    throw new Error('Error fetching books: ' + error.message);
  }
};

// Get a book by ID
const getBookByIdService = async (id) => {
  try {
    const book = await Book.findById(id);
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  } catch (error) {
    throw new Error('Error fetching book: ' + error.message);
  }
};

// Update a book by ID
const updateBookByIdService = async (id, updateData) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedBook) {
      throw new Error('Book not found');
    }
    return updatedBook;
  } catch (error) {
    throw new Error('Error updating book: ' + error.message);
  }
};

// Delete a book by ID
const deleteBookByIdService = async (id) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      throw new Error('Book not found');
    }
    return { message: 'Book deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting book: ' + error.message);
  }
};

module.exports = {
  createBookService,
  getAllBooksService,
  getBookByIdService,
  updateBookByIdService,
  deleteBookByIdService,
};