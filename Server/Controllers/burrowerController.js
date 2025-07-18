const borrowerService = require('../Services/burrowerServices');
const EmailFinder = require('../Utils/EmailFinder')


// Create a new borrower
const createBorrower = async (req, res) => {
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
  const emailExists = await EmailFinder.findUserByEmail(email);
  if (emailExists) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  try {
    // Call the service to create the burrower
    const result = await borrowerService.createBorrowerService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating burrower', error: error.message });
  }
};

// Get all borrowers
const getAllBorrowers = async (req, res) => {
  try {
    const borrowers = await borrowerService.getAllBorrowersService();
    return res.status(200).json(borrowers);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching borrowers', error: error.message });
  }
};

// Get a borrower by ID
const getBorrowerById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Borrower ID is required' });
  }

  try {
    const borrower = await borrowerService.getBorrowerByIdService(id);
    return res.status(200).json(borrower);
  } catch (error) {
    return res.status(404).json({ message: 'Borrower not found', error: error.message });
  }
};

// Update a borrower by ID
const updateBorrowerById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Borrower ID is required' });
  }

  if (!updateData || Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: 'Update data is required' });
  }

  try {
    const updatedBorrower = await borrowerService.updateBorrowerByIdService(id, updateData);
    return res.status(200).json(updatedBorrower);
  } catch (error) {
    return res.status(404).json({ message: 'Error updating borrower', error: error.message });
  }
};

// Delete a borrower by ID
const deleteBorrowerById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Borrower ID is required' });
  }

  try {
    const result = await borrowerService.deleteBorrowerByIdService(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: 'Error deleting borrower', error: error.message });
  }
};

module.exports = {
  createBorrower,
  getAllBorrowers,
  getBorrowerById,
  updateBorrowerById,
  deleteBorrowerById,
};