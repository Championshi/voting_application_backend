// Importing required modules
const jwt = require('jsonwebtoken');
require('dotenv').config(); // To load environment variables from .env file

// Function to generate a JWT token
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Middleware to authenticate token from cookies
const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token; // Get the token from cookies
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  try {
    // Verify the token
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user data to the request
    req.user = user;

    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token.' });
  }
};
module.exports = { generateToken, authenticateToken };



