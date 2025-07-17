const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Borrower', required: true },
  librarianId: { type: mongoose.Schema.Types.ObjectId, ref: 'Librarian', required: true },
  issueDate: { type: Date, default: Date.now },
  returnDate: { type: Date, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ['issued', 'returned'], default: 'issued' },
});

const record = mongoose.model('Record', recordSchema);

module.exports = record;
