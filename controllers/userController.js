const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../jwt');


// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, age, address, aadharCardNumber, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, age, address, aadharCardNumber, password: hashedPassword, role });

    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user and set token in cookie
exports.loginUser = async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body;

    const user = await User.findOne({ aadharCardNumber });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

    // Generate token
    const token = generateToken(user._id, user.role);

    // Set token as an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true, // Accessible only by the server
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // Prevent CSRF
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ message: 'Login successful.', role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { aadharCardNumber, newPassword } = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ aadharCardNumber }, { password: hashedPassword });

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.user; // Extract from req.user set by middleware
    const user = await User.findById(userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout user and clear the cookie
exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie('token'); // Clear the token cookie
    res.status(200).json({ message: 'Logout successful.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const User = require('../models/user.js');
// const bcrypt = require('bcryptjs');
// const { generateToken } = require('../jwt');


// // Register a new user
// exports.registerUser = async (req, res) => {
//   try {
//     const { name, age, address, aadharCardNumber, password, role } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, age, address, aadharCardNumber, password: hashedPassword, role });

//     await user.save();
//     res.status(201).json({ message: 'User registered successfully.' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Login user
// exports.loginUser = async (req, res) => {
//   try {
//     const { aadharCardNumber, password } = req.body;

//     const user = await User.findOne({ aadharCardNumber });
//     if (!user) return res.status(404).json({ message: 'User not found.' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

//     const token = generateToken(user._id, user.role);
//     res.status(200).json({ token, role: user.role });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Change password
// exports.changePassword = async (req, res) => {
//   try {
//     const { aadharCardNumber, newPassword } = req.body;

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     await User.findOneAndUpdate({ aadharCardNumber }, { password: hashedPassword });

//     res.status(200).json({ message: 'Password updated successfully.' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get user profile
// // exports.getProfile = async (req, res) => {
// //   try {
// //     const { userId } = req.user; // Extract from token
// //     const user = await User.findById(userId).select('-password');

// //     res.status(200).json(user);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };
// exports.getProfile = async (req, res) => {
//   try {
//     const { userId } = req.user; // Extract from req.user set by middleware
//     const user = await User.findById(userId).select('-password'); // Exclude password

//     if (!user) {
//       return res.status(404).json({ error: 'User not found.' });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
