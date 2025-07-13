const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get leaderboard
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
