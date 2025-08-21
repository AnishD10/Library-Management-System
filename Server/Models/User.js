// User Model: Mongoose schema for users. Users: the plot thickens.
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true } ,
  role : { type: String, enum: ['librarian', 'borrower'], default: 'borrower' },
  otp : { type: String, default: null },
  otpExpiry: { type: Date, default: null },
});

const user = mongoose.model('User', userSchema);

module.exports = user;
