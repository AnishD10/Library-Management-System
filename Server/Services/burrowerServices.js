const Borrower = require('../Models/Borrower');
const crypto = require('crypto'); // For generating random passwords
const bcrypt = require('bcryptjs');
const user = require('../Models/User');
const sendLoginDetails = require('../Utils/Mailer'); // Assuming you have a mailer utility
// to send emails



// Create a new borrower
const createBorrowerService = async (newUserData) => {
  let newBorrower;
  let password = crypto.randomBytes(8).toString('hex'); // Generate a random password

  try {
    // Step 1: Create the librarian
    newBorrower = new Borrower(newUserData);
    await newBorrower.save();

    // Step 2: Create the user for the librarian
    let newUser = new user({
      email: newUserData.email,
      password, // Use the plain text password
      role: 'borrower',
    });
    console.log(password)
    // Hash the password before saving
    newUser.password = await bcrypt.hash(password, 10);

    // Save the user
    await newUser.save();

    // Step 3: Send login details to the librarian's email
    await sendLoginDetails(
      newUser.email,
      'Borrower Account Created',
      `Your account has been created. Email: ${newUser.email}, Password: ${password}`
    );

    return { message: 'Success', borrower: newBorrower, user: newUser };
  } catch (err) {
    // Rollback borrower creation if user creation fails
    if (newBorrower) {
      try {
        await Borrower.deleteOne({ _id: newBorrower._id });
      } catch (rollbackErr) {
        console.error('Error rolling back borrower creation:', rollbackErr.message);
      }
    }
    throw new Error(`Error creating borrower or user: ${err.message}`);
  }
};

// Get all borrowers
const getAllBorrowersService = async () => {
  try {
    return await Borrower.find().populate('booksBorrowed');
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