const Borrower = require('../Models/Borrower');

// Create a new borrower
const createBorrowerService = async (borrowerData) => {
  try {
    const newBorrower = new Borrower(borrowerData);
    await newBorrower.save();
    return { message: 'Borrower created successfully', borrower: newBorrower };
  } catch (error) {
    throw new Error('Error creating borrower: ' + error.message);
  }
};

// Get all borrowers
const getAllBorrowersService = async () => {
  try {
    return await Borrower.find();
  } catch (error) {
    throw new Error('Error fetching borrowers: ' + error.message);
  }
};

// Get a borrower by ID
const getBorrowerByIdService = async (id) => {
  try {
    const borrower = await Borrower.findById(id);
    if (!borrower) {
      throw new Error('Borrower not found');
    }
    return borrower;
  } catch (error) {
    throw new Error('Error fetching borrower: ' + error.message);
  }
};

// Update a borrower by ID
const updateBorrowerByIdService = async (id, updateData) => {
  try {
    const updatedBorrower = await Borrower.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedBorrower) {
      throw new Error('Borrower not found');
    }
    return updatedBorrower;
  } catch (error) {
    throw new Error('Error updating borrower: ' + error.message);
  }
};

// Delete a borrower by ID
const deleteBorrowerByIdService = async (id) => {
  try {
    const deletedBorrower = await Borrower.findByIdAndDelete(id);
    if (!deletedBorrower) {
      throw new Error('Borrower not found');
    }
    return { message: 'Borrower deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting borrower: ' + error.message);
  }
};

module.exports = {
  createBorrowerService,
  getAllBorrowersService,
  getBorrowerByIdService,
  updateBorrowerByIdService,
  deleteBorrowerByIdService,
};