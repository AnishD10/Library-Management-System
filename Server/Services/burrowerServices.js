// 🤓 Welcome to the Borrower Registration Center!
// Where book lovers get their official "I Promise Not To Steal Books" license! 📜
const Borrower = require('../Models/Borrower');
const crypto = require('crypto'); // 🎲 For generating random passwords (like a digital dice roll)
const bcrypt = require('bcryptjs'); // 🔐 The password scrambler supreme
const user = require('../Models/User');
const sendLoginDetails = require('../Utils/Mailer'); // 📧 Our friendly neighborhood email delivery service
// Because borrowers need to know their secret codes! 🕵️‍♂️

// 🎪 The Great Borrower Creation Circus!
// A three-ring performance: Create borrower → Create user → Send email magic! ✨
const createBorrowerService = async (newUserData) => {
  let newBorrower; // 👶 Our borrower baby (not yet born)
  let password = crypto.randomBytes(8).toString('hex'); // 🎲 Rolling the dice for a password (8 bytes of pure randomness!)

  try {
    // 🎭 Act 1: The Borrower Birth Certificate Creation
    // (Copy-paste comment says "librarian" but we're making borrowers - plot twist! 😄)
    newBorrower = new Borrower(newUserData);
    await newBorrower.save(); // 📋 Official borrower registration complete!

    // 🎭 Act 2: The User Account Assembly Line 
    // Because every borrower needs login credentials (it's the law!)
    let newUser = new user({
      name: newUserData.name, // 👤 Borrower's name (because "Hey You!" isn't a valid login )
      email: newUserData.email,
      password, // 🔑 The plain text password (soon to be encrypted!)
      role: 'borrower', // 🏷️ Official title: "Professional Book Borrower"
    });
    
    console.log(password) // 👀 Peek at the password before it gets scrambled
    
    // 🔐 Password Scrambling Session! (Make it unreadable to humans)
    newUser.password = await bcrypt.hash(password, 10); // 10 rounds of scrambling = Fort Knox level security

    await newUser.save(); // 💾 Save our newly minted user to the digital vault

    // 🎭 Act 3: The Email Delivery Performance!
    // Send them their shiny new login details (like delivering a golden ticket!)
    await sendLoginDetails(
      newUser.email,
      'Borrower Account Created', // 🎉 Subject: "Welcome to the book borrowing club!"
      `Your account has been created. Email: ${newUser.email}, Password: ${password}` // 📝 The sacred login scroll
    );

    return { message: 'Success', borrower: newBorrower, user: newUser }; // 🏆 Triple win!
    
  } catch (err) {
    // 🚨 Emergency Cleanup Protocol! 
    // If anything goes wrong, we clean up our mess (responsible coding!)
    if (newBorrower) {
      try {
        await Borrower.deleteOne({ _id: newBorrower._id }); // 🗑️ Undo the borrower creation
      } catch (rollbackErr) {
        console.error('Error rolling back borrower creation:', rollbackErr.message); // 💥 Even the cleanup failed!
      }
    }
    throw new Error(`Error creating borrower or user: ${err.message}`); // 📢 Announce our failure with dignity
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