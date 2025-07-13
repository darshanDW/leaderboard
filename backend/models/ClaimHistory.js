const mongoose = require('mongoose');

const claimHistorySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  points: Number,
  claimedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ClaimHistory', claimHistorySchema);
