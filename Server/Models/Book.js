// Book Model: Mongoose schema for books. Every book needs a home (in the database).
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn : { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  available: { type: Number },
  description : { type: String, default: 'No description available.' },
  quote: { type: String, default: 'No quote available.' },
  category: { type: String, default: 'General' },
  coverImage: { type: String, default: null }, // Default cover image
});

const book = mongoose.model('Book', bookSchema);

module.exports = book;
