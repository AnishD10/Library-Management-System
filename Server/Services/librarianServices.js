require('dotenv').config();
const librarian = require('../Models/Librarian');
const user = require('../Models/User');
const bcrypt = require('bcryptjs');
const sendLoginDetails = require('../Utils/Mailer'); // Assuming you have a mailer utility to send emails
const crypto = require('crypto'); // For generating random passwords

// Create a new librarian
const createLibrarianService = async (newUserData) => {
  let newLibrarian;
  let password = crypto.randomBytes(8).toString('hex'); // Generate a random password

  try {
    // Step 1: Create the librarian
    newLibrarian = new librarian(newUserData);
    await newLibrarian.save();

    // Step 2: Create the user for the librarian
    let newUser = new user({
      email: newUserData.email,
      password, // Use the plain text password
      role: 'librarian',
    });

    // Hash the password before saving
    newUser.password = await bcrypt.hash(password, 10);

    // Save the user
    await newUser.save();

    // Step 3: Send login details to the librarian's email
    await sendLoginDetails(
      newUser.email,
      'Librarian Account Created',
      `Your account has been created. Email: ${newUser.email}, Password: ${password}`
    );

    return { message: 'Success', librarian: newLibrarian, user: newUser };
  } catch (err) {
    // Rollback librarian creation if user creation fails
    if (newLibrarian) {
      try {
        await librarian.deleteOne({ _id: newLibrarian._id });
      } catch (rollbackErr) {
        console.error('Error rolling back librarian creation:', rollbackErr.message);
      }
    }
    throw new Error(`Error creating librarian or user: ${err.message}`);
  }
};

// Find a librarian by email
const findUserByEmail = async (email) => {
  try {
    return await user.findOne({ email });
  } catch (err) {
    throw new Error('Error finding user by email: ' + err.message);
  }
};

// Get all librarians
const getAllLibrarians = async () => {
  try {
    return await librarian.find();
  } catch (err) {
    throw new Error('Error fetching librarians: ' + err.message);
  }
};

// Get a librarian by ID
const getLibrarianById = async (id) => {
  try {
    const librarianData = await librarian.findById(id);
    if (!librarianData) {
      throw new Error('Librarian not found');
    }
    return librarianData;
  } catch (err) {
    throw new Error('Error fetching librarian by ID: ' + err.message);
  }
};

// Update a librarian by ID
const updateLibrarianById = async (id, updateData) => {
  try {
    const updatedLibrarian = await librarian.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedLibrarian) {
      throw new Error('Librarian not found');
    }
    return updatedLibrarian;
  } catch (err) {
    throw new Error('Error updating librarian: ' + err.message);
  }
};

// Delete a librarian by ID
const deleteLibrarianById = async (id) => {
  try {
    const deletedLibrarian = await librarian.findByIdAndDelete(id);
    if (!deletedLibrarian) {
      throw new Error('Librarian not found');
    }

    // Also delete the associated user
    await user.deleteOne({ email: deletedLibrarian.email });

    return { message: 'Librarian deleted successfully' };
  } catch (err) {
    throw new Error('Error deleting librarian: ' + err.message);
  }
};

module.exports = {
  createLibrarianService,
  findUserByEmail,
  getAllLibrarians,
  getLibrarianById,
  updateLibrarianById,
  deleteLibrarianById,
};