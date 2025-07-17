const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true } ,
  role : { type: String, enum: ['librarian', 'borrower'], required: true },
  otp : { type: String, default: null },
  otpExpiry: { type: Date, default: null },
});

const user = mongoose.model('User', userSchema);

module.exports = user;
