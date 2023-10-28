const mongoose = require('mongoose');
require('dotenv').config();

const CONNECTION = process.env.CONNECTION;

const connectToDB = async () => {
    try {
        await mongoose.connect(CONNECTION, {
  serverSelectionTimeoutMS: 30000, // Adjust the timeout value as needed
        });
        const db = mongoose.connection;

        // Event listeners for checking the connection
        db.on('error', (error) => {
          console.error('MongoDB connection error:', error);
        });
        
        db.once('open', () => {
          console.log('Connected to MongoDB!');
        });
        
        db.on('disconnected', () => {
          console.log('MongoDB disconnected.');
        });

    } catch (error) {
        throw error
    }
}



module.exports = { connectToDB };


