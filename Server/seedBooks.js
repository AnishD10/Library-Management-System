const mongoose = require('mongoose');
const Book = require('./Models/Book');

const categories = [
  { name: 'philosophy', cover: 'https://covers.openlibrary.org/b/id/8231856-L.jpg' },
  { name: 'romance', cover: 'https://covers.openlibrary.org/b/id/8228691-L.jpg' },
  { name: 'scifi', cover: 'https://covers.openlibrary.org/b/id/10521213-L.jpg' },
  { name: 'history', cover: 'https://covers.openlibrary.org/b/id/10523339-L.jpg' },
  { name: 'fantasy', cover: 'https://covers.openlibrary.org/b/id/7984916-L.jpg' },
  { name: 'mystery', cover: 'https://covers.openlibrary.org/b/id/8231996-L.jpg' },
  { name: 'biography', cover: 'https://covers.openlibrary.org/b/id/10523340-L.jpg' },
  { name: 'adventure', cover: 'https://covers.openlibrary.org/b/id/8231857-L.jpg' },
  { name: 'self-help', cover: 'https://covers.openlibrary.org/b/id/10523341-L.jpg' },
  { name: 'science', cover: 'https://covers.openlibrary.org/b/id/10523342-L.jpg' }
];

const baseBooks = [
  {
    title: 'Meditations',
    author: 'Marcus Aurelius',
    isbn: '9780140449334',
    quantity: 5,
    available: 5,
    description: 'A series of personal writings by Marcus Aurelius, Roman Emperor.',
    quote: 'You have power over your mind - not outside events.',
    category: 'philosophy',
    coverImage: 'https://covers.openlibrary.org/b/id/8231856-L.jpg',
  },
  {
    title: 'The Republic',
    author: 'Plato',
    isbn: '9780140455113',
    quantity: 4,
    available: 4,
    description: 'A Socratic dialogue concerning justice and the order of a just city-state.',
    quote: 'The beginning is the most important part of the work.',
    category: 'philosophy',
    coverImage: 'https://covers.openlibrary.org/b/id/10523339-L.jpg',
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '9780141439518',
    quantity: 6,
    available: 6,
    description: 'A romantic novel of manners written by Jane Austen.',
    quote: 'I could easily forgive his pride if he had not mortified mine.',
    category: 'romance',
    coverImage: 'https://covers.openlibrary.org/b/id/8228691-L.jpg',
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    isbn: '9780441013593',
    quantity: 7,
    available: 7,
    description: 'A science fiction novel about politics, religion, and ecology on the desert planet Arrakis.',
    quote: 'Fear is the mind-killer.',
    category: 'scifi',
    coverImage: 'https://covers.openlibrary.org/b/id/10521213-L.jpg',
  },
];

function generateBooks(count) {
  const books = [];
  let isbnBase = 1000000000000;
  for (let i = 0; i < count; i++) {
    const cat = categories[i % categories.length];
    books.push({
      title: `Book Title ${i + 1}`,
      author: `Author ${i + 1}`,
      isbn: (isbnBase + i).toString(),
      quantity: Math.floor(Math.random() * 10) + 1,
      available: Math.floor(Math.random() * 10) + 1,
      description: `Description for Book Title ${i + 1}.`,
      quote: `Inspirational quote from Book Title ${i + 1}.`,
      category: cat.name,
      coverImage: cat.cover,
    });
  }
  return books;
}

const books = [
  ...baseBooks,
  ...generateBooks(100 - baseBooks.length)
];

async function seed() {
  await mongoose.connect('mongodb+srv://np05cp4a240274:ZO3fGeth3CIet4Xx@lmsdb.bzvj8mf.mongodb.net/?retryWrites=true&w=majority&appName=LMSDB');
  await Book.deleteMany({});
  await Book.insertMany(books);
  console.log('Books seeded!');
  mongoose.disconnect();
}

seed();