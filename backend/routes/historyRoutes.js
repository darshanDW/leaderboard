const express = require('express');
const ClaimHistory = require('../models/ClaimHistory');

const router = express.Router();

// Get claim history
router.get('/', async (req, res) => {
  try {
    const history = await ClaimHistory.find().populate('userId', 'name');
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
