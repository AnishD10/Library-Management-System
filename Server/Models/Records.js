const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Borrower', required: true },
  librarianId: { type: mongoose.Schema.Types.ObjectId, ref: 'Librarian'},
  issueDate: { type: Date, default: Date.now },
  reminderDate : {type:Date , default : () => new Date(Date.now() + 14 * 24 * 60 * 1000) }, // Default to 14 days from issue
  status: { type: String, enum: ['issued', 'returned'], required: true },
});

const record = mongoose.model('Record', recordSchema);

module.exports = record;
