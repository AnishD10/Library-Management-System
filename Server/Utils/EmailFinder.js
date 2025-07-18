const user = require('../Models/User');
const findUserByEmail = async (email) => {
  try {
    return await user.findOne({ email });
  } catch (err) {
    throw new Error('Error finding user by email: ' + err.message);
  }
};

module.exports = {
  findUserByEmail}