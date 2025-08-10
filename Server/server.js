// 🏰 Welcome to the Library Management System Command Center!
// Where books meet technology and magic happens! ✨📚
require('dotenv').config(); // 🔐 Loading our secret environment spells from the .env grimoire
const express = require('express'); // 🚀 The rocket ship that powers our API adventures
const mongoose = require('mongoose'); // 🐱 Our trusty database cat (it's not actually a cat, but we can pretend!)
const cors = require('cors'); // 🌐 The diplomatic ambassador that helps frontend and backend be friends
const app = express(); // 🎭 Our main character - the Express application star of the show!
const authorize = require('./Middlewaeres/auth'); // 🛡️ The security bouncer (keeps the riffraff out)
const PORT = process.env.PORT || 3000; // 🚪 Our digital address (3000 is our backup plan if env fails us)

// 🌉 The CORS Bridge Builder!
// Helps our frontend talk to backend without getting "blocked by browser police" 👮‍♀️
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // 🏠 Welcome mat for our React app (or fallback localhost)
}));

// 📦 The JSON Translator!
// Converts incoming data from gibberish to beautiful JavaScript objects
app.use(express.json()); // Without this, requests would be like trying to read hieroglyphics! 📜

// 🚀 MongoDB Launch Sequence!
// Time to connect to our database mothership in the cloud ☁️
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB'); // 🎉 Houston, we have database connection!
})
.catch((err) => {
  console.error('MongoDB connection error:', err); // 💥 Red alert! Database is MIA!
  process.exit(1); // 🆘 Abandon ship! If no database, no party 🎉❌
});

// 🎪 The Great Route Circus!
// Importing all our API performers for the grand show 🎭
const librarianRoute = require('./Routes/librarianRoutes'); // 🤓 The knowledge guardians management team
const borrowerRoute = require('./Routes/burrowerRoutes'); // 📚 The book borrowing enthusiasts handlers  
const bookRoute = require('./Routes/bookRoutes'); // 📖 The literary treasure management squad
const userRoute = require('./Routes/userRoutes'); // 👥 The human identity management crew
const recordRoute = require('./Routes/recordRoutes'); // 📋 The transaction history archivists

// 🎯 The API Route Command Center!
// Where URLs meet their destiny and requests find their handlers ⚡
app.use('/api/librarians', librarianRoute); // 🤓 Librarian HQ: Where book guardians are managed
app.use('/api/borrowers', borrowerRoute); // 📚 Borrower Central: Book lover registration & management  
app.use('/api/books', bookRoute); // 📖 Book Vault: Our literary treasure management system
app.use('/api/users', userRoute); // 👥 User Portal: Digital identity management hub
app.use('/api/records', recordRoute); // 📋 Record Archive: Transaction history database

// 🏥 The Health Check Doctor!
// A simple "Are you alive?" endpoint for worried servers and curious developers
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Library Management System API is running' }); 
  // Translation: "Yes, I'm alive and ready to manage your books!" 📚✅
});

// 🚨 The Global Error Emergency Response Team!
// When things go wrong, we don't panic - we handle it with style! 😎
app.use((err, req, res, next) => {
  console.error(err.stack); // 🖨️ Print the error crime scene for debugging detectives
  res.status(500).json({ message: 'Internal Server Error', error: err.message }); 
  // Translation: "Oops! Something exploded, but we're handling it professionally!" 💥🎭
});

// 🚀 The Grand Server Launch Sequence!
// 3... 2... 1... BLAST OFF! 🌟
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
  // 🎉 Party time! Our server is now accepting visitors at this digital address!
  // Fun fact: If this were a physical library, we'd be cutting the ribbon right now! 🎀✂️
});

// 📦 The App Export Department!
// Making our app available for testing adventures and future expansions 🧪
module.exports = app; 
// Think of this as giving other files a VIP backstage pass to our server! 🎫✨
