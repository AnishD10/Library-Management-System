const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

const borrower = mongoose.model('Borrower', borrowerSchema);

module.exports = borrower;
