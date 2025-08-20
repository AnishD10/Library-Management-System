const user = require('../Models/User');
const borrower = require('../Models/Borrower'); // Assuming you have a Borrower model
const findUserByEmail = async (email) => {
  try {
    return await user.findOne({ email });
  } catch (err) {
    throw new Error('Error finding user by email: ' + err.message);
  }
};

const findBorrowerByEmail = async (email) => {
  try {
    return await borrower.findOne({
      email
    }); 
  } catch (err) {
    throw new Error('Error finding borrower by email: ' + err.message);
  }
}

module.exports = {
  findBorrowerByEmail,
  findUserByEmail }