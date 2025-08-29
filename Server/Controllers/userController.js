// User Controller: Handles all user-related operations. Users: the real plot twist.


const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateOtp, findUserByOtp, clearOtpFields } = require("../Utils/otpUtils");
const nodemailer = require('nodemailer');
const EmailFinder = require('../Utils/EmailFinder');
const borrower = require('../Models/Borrower');



// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Utility: handle async controller errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    res.status(500).json({ message: err.message || 'Internal Server Error' });
  });
};

// Utility: find user by email and return error if not found
const getUserByEmailOrError = async (email, res) => {
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    throw new Error('User not found');
  }
  return user;
};

// Login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmailOrError(email, res);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  await user.populate('borrowerId'); // or 'borrowerId' if that's your field
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      borrowerId: user.borrowerId?._id,
      borrowerName: user.borrowerId?.name,
      borrowerEmail: user.borrowerId?.email,
      borrowedBooks: user.borrowerId?.booksBorrowed || []
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.status(200).json({
    message: 'Login successful',
    token,
    role: user.role,
    name: user.name,
    borrowerId: user.borrowerId?._id,
    borrowerName: user.borrowerId?.name
  });
});

// Forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await getUserByEmailOrError(email, res);
  user.otp = generateOtp();
  user.otpExpiry = Date.now() + 10 * 60 * 1000;
  await user.save();
  await transporter.sendMail({
    to: email,
    subject: "Your OTP",
    text: `Your OTP is ${user.otp}. It expires in 10 minutes.`,
  });
  res.status(200).send({ message: "OTP sent", OTP: user.otp });
});

// Reset password
const resetPassword = asyncHandler(async (req, res) => {
  const { newPassword, otp } = req.body;
  const user = await findUserByOtp(otp);
  if (!user) {
    return res.status(400).send({ message: "Invalid or expired OTP" });
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await clearOtpFields(user);
  res.status(200).send({ message: "Password reset successful" });
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }
  const user = await User.findOne({ email, otp, otpExpiry: { $gt: Date.now() } });
  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }
  res.status(200).json({ message: 'OTP verified successfully' });
});

// Create a new user
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const emailExists = await EmailFinder.findUserByEmail(email);
  if (emailExists) {
    return res.status(400).json({ message: 'Email already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: 'User created successfully', user: newUser });
});

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// Get a user by ID
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
});

// Update a user by ID
const updateUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  if (!updateData || Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: 'Update data is required' });
  }
  const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(updatedUser);
});

// Delete a user by ID
const deleteUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ message: 'User deleted successfully' });
});

// Get current user profile
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});
module.exports = {
  loginUser,
  forgotPassword,
  resetPassword,
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  verifyOtp,
  getProfile
};