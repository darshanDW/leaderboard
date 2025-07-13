const express = require('express');
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

const router = express.Router();

// Claim points for a user
router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;
    const points = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.totalPoints += points;
    await user.save();

    const history = new ClaimHistory({ userId, points });
    await history.save();

    res.json({ user, points });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
