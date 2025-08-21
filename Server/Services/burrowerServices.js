// Borrower Services: Service functions for borrowers.
const Borrower = require('../Models/Borrower');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const user = require('../Models/User');
const sendLoginDetails = require('../Utils/Mailer');

// Create a borrower, user, and send login details via email.
const createBorrowerService = async (newUserData) => {
  let newBorrower;
  let password = crypto.randomBytes(8).toString('hex');

  try {
  // Create and save borrower
  newBorrower = new Borrower(newUserData);
  await newBorrower.save();

    // Create user and hash password
    let newUser = new user({
      name: newUserData.name,
      email: newUserData.email,
      password,
      role: 'borrower',
    });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    // Send login details via email
    await sendLoginDetails(
      newUser.email,
      password // send the generated password
    );
    return newBorrower;
  } catch (err) {
    // Roll back borrower creation if anything fails
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


// 📊 The Borrower Census Bureau!
// Count all our lovely book borrowers (and their reading habits!)
const getAllBorrowersService = async () => {
  try {
    // 🔗 .populate('booksBorrowed') = "Show me their book collection, not just mysterious IDs!"
    return await Borrower.find().populate('booksBorrowed'); // 📚 The full borrower parade with their book babies!
    
  } catch (error) {
    throw new Error('Error fetching borrowers: ' + error.message); // 📡 Lost connection to borrower dimension
  }
};

// 🎯 The Borrower Hunter Extraordinaire!
// Find one specific borrower in the vast digital wilderness
const getBorrowerByIdService = async (id) => {
  try {
    // 🕵️‍♀️ Detective mode: Locate the target borrower!
    const borrower = await Borrower.findById(id);
    
    if (!borrower) {
      throw new Error('Borrower not found'); // 👻 This borrower has vanished into thin air!
    }
    
    return borrower; // 🎁 Here's your requested borrower, served fresh!
    
  } catch (error) {
    throw new Error('Error fetching borrower: ' + error.message); // 🚨 Borrower hunt mission failed!
  }
};

// ✨ The Borrower Transformation Chamber!
// Update borrower info faster than they can say "overdue books"
const updateBorrowerByIdService = async (id, updateData) => {
  try {
    // 🔄 The magical metamorphosis: old borrower data → new and improved borrower data!
    const updatedBorrower = await Borrower.findByIdAndUpdate(id, updateData, { new: true });
    // { new: true } = "Show me the shiny updated version, not the dusty old one!"
    
    if (!updatedBorrower) {
      throw new Error('Borrower not found'); // 🎭 Attempted to update a mythical borrower
    }
    
    return updatedBorrower; // ✨ Ta-da! Your borrower has been upgraded!
    
  } catch (error) {
    throw new Error('Error updating borrower: ' + error.message); // 💔 Update mission crashed spectacularly
  }
};

// ⚰️ The Borrower Farewell Committee!
// When borrowers must depart from our digital realm forever
const deleteBorrowerByIdService = async (id) => {
  try {
    // 💀 The final goodbye - removing a borrower from existence
    const deletedBorrower = await Borrower.findByIdAndDelete(id);
    
    if (!deletedBorrower) {
      throw new Error('Borrower not found'); // 🕳️ Tried to delete someone who was never there
    }
    
    return { message: 'Borrower deleted successfully' }; // 🎊 Farewell, dear borrower! May your books find new homes
    
  } catch (error) {
    throw new Error('Error deleting borrower: ' + error.message); // 💣 Deletion ceremony went kaboom!
  }
};

// 📦 The Borrower Services Export Headquarters!
// Where all our borrower-wrangling functions gather for deployment
module.exports = {
  createBorrowerService,       // 🎪 The circus master (handles the complex creation show)
  getAllBorrowersService,      // 📊 The census coordinator (counts all the borrowers)
  getBorrowerByIdService,      // 🎯 The precision sniper (finds exact borrowers)
  updateBorrowerByIdService,   // ✨ The upgrade specialist (makes borrowers better)
  deleteBorrowerByIdService,   // ⚰️ The farewell director (handles the goodbyes)
  // United, they form the elite Borrower Management Task Force! 🦸‍♀️📚🦸‍♂️
};