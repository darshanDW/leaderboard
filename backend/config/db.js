const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const db_url = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
