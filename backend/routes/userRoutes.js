const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get all users (with optional pagination)
router.get('/', async (req, res) => {
  try {
    const { page, limit } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    console.log(`Page: ${pageNumber}, Limit: ${limitNumber}`);
    if (page && limit) {
      const users = await User.find()
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      const totalUsers = await User.countDocuments();

      return res.json({
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: parseInt(page),
        users,
      });
    }

    // If no pagination parameters, return all users
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new user
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
