const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;

const userRoutes = require('./routes/userRoutes');
const claimRoutes = require('./routes/claimRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const historyRoutes = require('./routes/historyRoutes');

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Routes
app.use('/users', userRoutes);
app.use('/claim', claimRoutes);
app.use('/leaderboard', leaderboardRoutes);
app.use('/history', historyRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});