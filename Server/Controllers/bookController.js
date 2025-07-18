const bookService = require('../Services/bookServices');

// Create a new book
const createBook = async (req, res) => {
  const { title, isbn, author, quantity } = req.body;

  // Validate required fields
  if (!title ||  !author || !quantity) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await bookService.createBookService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating book', error: error.message });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooksService();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};

// Get a book by ID
const getBookById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Book ID is required' });
  }

  try {
    const book = await bookService.getBookByIdService(id);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(404).json({ message: 'Book not found', error: error.message });
  }
};

// Update a book by ID
const updateBookById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Book ID is required' });
  }

  if (!updateData || Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: 'Update data is required' });
  }

  try {
    const updatedBook = await bookService.updateBookByIdService(id, updateData);
    return res.status(200).json(updatedBook);
  } catch (error) {
    return res.status(404).json({ message: 'Error updating book', error: error.message });
  }
};

// Delete a book by ID
const deleteBookById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Book ID is required' });
  }

  try {
    const result = await bookService.deleteBookByIdService(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: 'Error deleting book', error: error.message });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};