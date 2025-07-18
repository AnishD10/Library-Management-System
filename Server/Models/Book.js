const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  quantity: { type: Number, required: true },
  available: { type: Number, required: true },
});

const book = mongoose.model('Book', bookSchema);

module.exports = book;
