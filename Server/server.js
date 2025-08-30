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
  "https://68b2fab5d2318479b1e5387d--librarymanagementsystem10.netlify.app/", // <-- Add your Netlify URL here
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

app.options('*', cors()); // <-- Add this line to handle preflight requests

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

// Import and use API routes
const librarianRoute = require('./Routes/librarianRoutes');
const borrowerRoute = require('./Routes/burrowerRoutes');
const bookRoute = require('./Routes/bookRoutes');
const userRoute = require('./Routes/userRoutes');
const recordRoute = require('./Routes/recordRoutes');

app.use('/api/librarians', librarianRoute);
app.use('/api/borrowers', borrowerRoute);
app.use('/api/books', bookRoute);
app.use('/api/users', userRoute);
app.use('/api/records', recordRoute);

// Health check endpoint (because even servers need a checkup)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Library Management System API is running' });
});

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
