// Load environment variables and core modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Whitelist of allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://library-management-system-ylrf.onrender.com",
  "https://librarymanagementsystem10.netlify.app"
];

// Enable CORS for frontend requests
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


// Parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Serve uploaded book images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import and use API routes with debug logging
const librarianRoute = require('./Routes/librarianRoutes');
const borrowerRoute = require('./Routes/burrowerRoutes');
const bookRoute = require('./Routes/bookRoutes');
const userRoute = require('./Routes/userRoutes');
const recordRoute = require('./Routes/recordRoutes');

console.log('librarianRoute:', typeof librarianRoute);
console.log('borrowerRoute:', typeof borrowerRoute);
console.log('bookRoute:', typeof bookRoute);
console.log('userRoute:', typeof userRoute);
console.log('recordRoute:', typeof recordRoute);

app.use('/api/librarians', librarianRoute);
app.use('/api/borrowers', borrowerRoute);
app.use('/api/books', bookRoute);
app.use('/api/users', userRoute);
app.use('/api/records', recordRoute);


// Global error handler (for when things go sideways)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start the server (cue the confetti!)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 📦 The App Export Department!
// Making our app available for testing adventures and future expansions 🧪
module.exports = app; 
// Think of this as giving other files a VIP backstage pass to our server! 🎫✨
