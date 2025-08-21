// Where book guardians are born and "SHHH!" becomes a superpower! 🤫
// Librarian Services: Service functions for librarians.
require('dotenv').config(); // 🔐 Loading our secret environment variables (top secret stuff!)
const librarian = require('../Models/Librarian');
const user = require('../Models/User');
const bcrypt = require('bcryptjs'); // 🔒 The password encryption wizard
const sendLoginDetails = require('../Utils/Mailer'); // 📬 Our trusty email owl delivery service
const crypto = require('crypto'); // 🎲 Digital dice for password generation

// Transform ordinary humans into certified book shepherds! 📚👨‍🏫
// Create a librarian, user, and send login details via email.
const createLibrarianService = async (newUserData) => {
  let newLibrarian; // 👶 Future guardian of knowledge (not yet awakened)
  let password = crypto.randomBytes(8).toString('hex'); // 🔑 Rolling 8 bytes of pure randomness for their secret key!

  try {
    // 🎯 Phase 1: The Librarian Awakening Ritual
    newLibrarian = new librarian(newUserData);
    await newLibrarian.save(); // 📜 Official librarian diploma granted!

    // 🎯 Phase 2: The Digital Identity Creation Laboratory
    // Every librarian needs their login credentials (it's like a superhero costume!)
    let newUser = new user({
      email: newUserData.email,
      password, // 🔓 The password before it becomes unreadable
      role: 'librarian', // 🏷️ Official title: "Keeper of Books and Silence"
    });

    // 🔐 Password Scrambling Ceremony! (Making it hacker-proof)
    newUser.password = await bcrypt.hash(password, 10); // 10 rounds of encryption = Pentagon-level security!

    await newUser.save(); // 💾 Store our newly minted digital librarian

    // 🎯 Phase 3: The Ceremonial Email Delivery!
    // Send them their magical login scrolls (better than Hogwarts letters!)
    await sendLoginDetails(
      newUser.email,
      'Librarian Account Created', // 🎉 Subject: "Welcome to the Knowledge Guild!"
      `Your account has been created. Email: ${newUser.email}, Password: ${password}` // 📋 The sacred login incantation
    );

    return { message: 'Success', librarian: newLibrarian, user: newUser }; // 🏆 Another librarian joins the force!
    
  } catch (err) {
    // 🚨 Emergency Rollback Protocol! 
    // If something breaks, we clean up our mess (responsible wizardry!)
    if (newLibrarian) {
      try {
        await librarian.deleteOne({ _id: newLibrarian._id }); // 🗑️ Undo the librarian creation spell
      } catch (rollbackErr) {
        console.error('Error rolling back librarian creation:', rollbackErr.message); // 💥 Even our cleanup spell failed!
      }
    }
    throw new Error(`Error creating librarian or user: ${err.message}`); // 📢 Announce our failure with dignity
  }
};

// 📊 The Great Librarian Census!
// Summon all librarians from across the digital realm! 🧙‍♀️🧙‍♂️
const getAllLibrarians = async () => {
  try {
    return await librarian.find(); // 🔮 Magical librarian summoning spell!
    
  } catch (err) {
    throw new Error('Error fetching librarians: ' + err.message); // 📡 Lost connection to librarian dimension
  }
};

// 🎯 The Librarian Tracker Supreme!
// Find one specific librarian in the vast knowledge empire
const getLibrarianById = async (id) => {
  try {
    // 🔍 Precision targeting: Locate the chosen librarian!
    const librarianData = await librarian.findById(id);
    
    if (!librarianData) {
      throw new Error('Librarian not found'); // 👻 This librarian has vanished behind the stacks!
    }
    
    return librarianData; // 🎁 Your requested librarian, served with a side of knowledge!
    
  } catch (err) {
    throw new Error('Error fetching librarian by ID: ' + err.message); // 🚨 Librarian hunt expedition failed!
  }
};

// ✨ The Librarian Enhancement Laboratory!
// Upgrade librarian stats faster than they can say "late fees"
const updateLibrarianById = async (id, updateData) => {
  try {
    // 🔄 The magnificent transformation: old librarian → new and improved librarian!
    const updatedLibrarian = await librarian.findByIdAndUpdate(id, updateData, { new: true });
    // { new: true } = "Show me the upgraded version, not the dusty archive copy!"
    
    if (!updatedLibrarian) {
      throw new Error('Librarian not found'); // 🎭 Attempted to upgrade a phantom librarian
    }
    
    return updatedLibrarian; // ✨ Behold! Your librarian has been enhanced!
    
  } catch (err) {
    throw new Error('Error updating librarian: ' + err.message); // 💔 Enhancement procedure went awry
  }
};

// 🎭 The Librarian Retirement Ceremony!
// When librarians must leave the sacred halls of knowledge forever
const deleteLibrarianById = async (id) => {
  try {
    // 💀 The solemn farewell - removing a librarian from the realm
    const deletedLibrarian = await librarian.findByIdAndDelete(id);
    
    if (!deletedLibrarian) {
      throw new Error('Librarian not found'); // 🕳️ Tried to retire someone who was never hired
    }

    // 🧹 Double cleanup duty! Delete their user account too (no loose ends!)
    await user.deleteOne({ email: deletedLibrarian.email }); // 🗑️ Complete digital existence erasure

    return { message: 'Librarian deleted successfully' }; // 🎊 Farewell, guardian of books! Your watch has ended
    
  } catch (err) {
    throw new Error('Error deleting librarian: ' + err.message); // 💣 Retirement ceremony exploded!
  }
};

// 📦 The Librarian Services Command Center!
// Where all our knowledge-keeper management functions assemble
module.exports = {
  createLibrarianService,  // 🎓 The academy graduation master
  getAllLibrarians,        // 📊 The librarian census coordinator  
  getLibrarianById,        // 🎯 The precision librarian locator
  updateLibrarianById,     // ✨ The librarian enhancement specialist
  deleteLibrarianById,     // 🎭 The retirement ceremony director
  // Together, they manage the entire lifecycle of our knowledge guardians! 🤓📚✨
};