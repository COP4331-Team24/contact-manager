const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/contact-manager', { useNewUrlParser: true });
const database = mongoose.connection;

database.once('open', function() {
    console.log("MongoDB connection successful");
})

database.on('error', error => {
    console.error('Error connecting to server: ', error);
})

app.listen(4000, function() {
    console.log("Server is running on port 4000");
});