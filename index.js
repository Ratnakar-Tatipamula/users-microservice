const express = require('express');
const mongoConnection = require('./config/mongoConnection');

const app = express();
const users = require('./routes/users');

app.use(express.json());
app.use('/user', users);

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("users microservice");
})

const start = async() => {
    try {
        mongoConnection.connectToDB()
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT} ${process.env.PORT}`)
        });
    } catch (error) {
        console.log('error :: ', error);
    }
}

start()