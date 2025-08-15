const mongoose = require('mongoose');
const book = require('./Book');

const borrowerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  booksBorrowed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' } ],
  fine : { type: Number, default: 0 },
});

const borrower = mongoose.model('Borrower', borrowerSchema);

module.exports = borrower;
