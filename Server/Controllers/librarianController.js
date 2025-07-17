const librarianService = require('../Services/librarianServices');

// Create a new librarian
const createLibrarian = async (req, res) => {
  const { name, email, phone, address } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Validate phone number (example: must be 10 digits)
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'Invalid phone number format. Must be 10 digits.' });
  }

  // Check if email already exists
  const emailExists = await librarianService.findUserByEmail(email);
  if (emailExists) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  try {
    // Call the service to create the librarian
    const result = await librarianService.createLibrarianService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating librarian', error: error.message });
  }
};

// Get all librarians
const getAllLibrarians = async (req, res) => {
  try {
    const librarians = await librarianService.getAllLibrarians();
    return res.status(200).json(librarians);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching librarians', error: error.message });
  }
};

// Get a librarian by ID
const getLibrarianById = async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!id) {
    return res.status(400).json({ message: 'Librarian ID is required' });
  }

  try {
    const librarian = await librarianService.getLibrarianById(id);
    return res.status(200).json(librarian);
  } catch (error) {
    return res.status(404).json({ message: 'Librarian not found', error: error.message });
  }
};

// Update a librarian by ID
const updateLibrarianById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // Validate ID
  if (!id) {
    return res.status(400).json({ message: 'Librarian ID is required' });
  }

  // Validate update data
  if (!updateData || Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: 'Update data is required' });
  }

  try {
    const updatedLibrarian = await librarianService.updateLibrarianById(id, updateData);
    return res.status(200).json(updatedLibrarian);
  } catch (error) {
    return res.status(404).json({ message: 'Error updating librarian', error: error.message });
  }
};

// Delete a librarian by ID
const deleteLibrarianById = async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!id) {
    return res.status(400).json({ message: 'Librarian ID is required' });
  }

  try {
    const result = await librarianService.deleteLibrarianById(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: 'Error deleting librarian', error: error.message });
  }
};

module.exports = {
  createLibrarian,
  getAllLibrarians,
  getLibrarianById,
  updateLibrarianById,
  deleteLibrarianById,
};