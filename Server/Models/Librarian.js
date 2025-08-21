// Librarian Model: Mongoose schema for librarians. Librarians: the keepers of order (and overdue fines).
const mongoose = require('mongoose');

const librarianSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

const librarian = mongoose.model('Librarian', librarianSchema);

module.exports = librarian;



