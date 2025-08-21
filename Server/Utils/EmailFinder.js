// EmailFinder Utility: Finds emails. Because sometimes, you just need to find someone (or a book).
const user = require('../Models/User');
const borrower = require('../Models/Borrower');
const Book = require('../Models/Book');
const findUserByEmail = async (email) => {
  try {
    return await user.findOne({ email });
  } catch (err) {
    throw new Error('Error finding user by email: ' + err.message);
  }
};


const findBorrowerByEmail = async (email) => {
  try {
    return await borrower.findOne({ email });
  } catch (err) {
    throw new Error('Error finding borrower by email: ' + err.message);
  }
};

const findBookByTitle = async (title) => {
  try {
    return await Book.findOne({ title });
  } catch (err) {
    throw new Error('Error finding book by title: ' + err.message);
  }
};

module.exports = {
  findBookByTitle,
  findBorrowerByEmail,
  findUserByEmail }