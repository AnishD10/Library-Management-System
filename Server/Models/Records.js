const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Borrower', required: true },
  librarianId: { type: mongoose.Schema.Types.ObjectId, ref: 'Librarian', required: true },
  issueDate: { type: Date, default: Date.now },
  returnDate: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }, // Default to 30 days from issue
  status: { type: String, enum: ['issued', 'returned'], required: true },
});

const record = mongoose.model('Record', recordSchema);

module.exports = record;
