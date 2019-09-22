const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const contactRoutes = express.Router();
let Contact = require('./models/contact');

app.use(cors());
app.use(bodyParser.json());

// Attempt to connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/contact-manager', { useNewUrlParser: true });
const database = mongoose.connection;

database.once('open', function() {
    console.log("MongoDB connection successful");
})

database.on('error', error => {
    console.error('Error connecting to server: ', error);
})


// Define contact API endpoints
contactRoutes.route('/').get(function(req, res) {
    Contact.find(function(err, contacts) {
        if (err) {
            console.log(err);
        } else {
            res.json(contacts);
        }
    })
});

contactRoutes.route('/add').post(function(req, res){
    let contact = new Contact(req.body);
    contact.save()
        .then(contact => {
            res.status(200).json({'contact': 'contact added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to add contact');
        })
});


// Connect routes and start server
app.use('/api/contacts', contactRoutes);

app.listen(4000, function() {
    console.log("Server is running on port 4000");
});