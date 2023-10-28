const mongoose = require('mongoose');
require('dotenv').config();

const CONNECTION = process.env.CONNECTION;

const connectToDB = async () => {
    try {
        await mongoose.connect(CONNECTION);
    } catch (error) {
        throw error
    }
}

module.exports = { connectToDB };


