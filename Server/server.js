require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const authorize = require('./Middlewaeres/auth');  // Import auth middleware
const PORT = process.env.PORT || 3000;

// Enable CORS with specified origin
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the process if the database connection fails
});

// Import routes
const librarianRoute = require('./Routes/librarianRoutes');
const borrowerRoute = require('./Routes/burrowerRoutes');
const bookRoute = require('./Routes/bookRoutes'); // Assuming you have a book route
const userRoute = require('./Routes/userRoutes'); // Assuming you have a user route
const recordRoute = require('./Routes/recordRoutes'); // Assuming you have a record route

// Use routes
app.use('/api/librarians',authorize, librarianRoute);
app.use('/api/borrowers',authorize, borrowerRoute);
app.use('/api/books',authorize, bookRoute);
app.use('/api/users', userRoute);
app.use('/api/records',authorize, recordRoute);

// Default route for health check
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Library Management System API is running' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app for testing purposes
module.exports = app;
