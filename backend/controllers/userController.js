const User = require('../models/userModel');

// Middleware to verify JWT (you can add this as a separate middleware)
const jwt = require('jsonwebtoken');

exports.getProfile = async (req, res) => {
  try {
    // Check if user is authenticated via token in headers
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Authentication failed. Token missing or invalid.' });
    }

    // Fetch the user details from the database using the authenticated user's ID
    const user = await User.findById(req.user.id);

    // If user doesn't exist, return error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send the user profile data
    res.json({
      email: user.email,
      walletAddress: user.walletAddress,
      balance: user.balance
    });
  } catch (error) {
    console.error('Error fetching profile:', error); // Log for internal debugging
    res.status(500).json({ error: 'Failed to fetch profile. Please try again later.' });
  }
};
