const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Borrower', required: true },
  librarianId: { type: mongoose.Schema.Types.ObjectId, ref: 'Librarian'},
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date , default: function() {
    const date = new Date(this.issueDate);
    date.setDate(date.getDate() + 30); // Set due date to 30 days after issue date
    return date;
  }},
  status: { type: String, enum: ['issue', 'return'], default: 'issue'},
});

const record = mongoose.model('Record', recordSchema);

module.exports = record;
