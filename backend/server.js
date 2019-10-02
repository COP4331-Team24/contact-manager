const contactRoutes = require('./ContactRoutes');
const authRoutes = require('./AuthRoutes');
const dotenv = require('dotenv').config({ path: './.env' });
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

if (dotenv.error) {
    throw dotenv.error;
}

app.use(cors());
app.use(bodyParser.json());

// Attempt to connect to the MongoDB database
const uri = process.env.DB_HOST
    .replace('<username>', process.env.DB_USER)
    .replace('<password>', process.env.DB_PASSWORD);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;

database.once('open', function () {
    console.log("MongoDB connection successful");
})

database.on('error', error => {
    console.error('Error connecting to server: ', error);
})

// Connect routes and start server
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

app.listen(4000, function () {
    console.log("Server is running on port 4000");
});
