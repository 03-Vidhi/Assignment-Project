// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

router.post('/signup', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    // Create a new user object with the provided role (default 'user' if not provided)
    const newUser = new User({ username, password, role: role || 'user' });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Generate JWT token for the new user
    const token = jwt.sign({ userId: savedUser._id }, config.secretKey);

    return res.status(200).json({ token, message: "Signup Done" });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid information' });
    } else{
       res.status(200).json({ message: 'Login Done' });
    }

    // Check if the user is an admin
    if (user.role !== 'admin') {
       res.status(403).json({ error: 'Access forbidden' });
    } 

    // // Generate JWT token for the admin user
    // const token = jwt.sign({ userId: user._id }, config.secretKey);

    // return res.json({ token });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
