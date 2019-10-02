const express = require('express');
const authMiddleware = require('./AuthMiddleware');

let contactRoutes = express.Router();
let Contact = require('./models/contact');

// Auth middleware, make sure the user is logged in
contactRoutes.use(authMiddleware);

// Define contact API endpoints
contactRoutes.route('/').get(function (req, res) {
    Contact.find(function (err, contacts) {
        if (err) {
            console.log(err);
        } else {
            res.json(contacts);
        }
    })
});

// Add contact
contactRoutes.route('/add').post(function (req, res) {
    let contact = new Contact(req.body);
    contact.save()
        .then(contact => {
            res.status(200).json({ 'contact': 'contact added successfully' });
        })
        .catch(err => {
            res.status(400).send('Failed to add contact');
        })
});

// Find contact by id
contactRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Contact.findById(id, function (err, contact) {
        res.json(contact);
    });
});

// Edit contact by id
contactRoutes.route('/update/:id').get(function (req, res) {
    let id = req.params.id;
    Contact.findById(id, function (err, contact) {
        if (!contact) {
            res.status(404).send("What... Where am I?\n\n What is this!?\n\n\nPlease, don't go back.");
        }
        else {
            contact.firstname = req.body.firstname;
            contact.lastname = req.body.lastname;
            contact.number = req.body.number;
        }
        contact.save()
            .then(contact => {
                res.status(200).json({ 'contact': 'contact edited successfully' });
            })
            .catch(err => {
                res.status(400).send('You\'re a failure and a disappointment.');
            });
    });
});

// Delete contact by id.
contactRoutes.route('/delete/:id').get(function (req, res) {
    let id = req.params.id;
    Contact.findByIdAndDelete(id, function (err) {
        if (err) {
            res.status(400).send('You\'re a failure and a disappointment.');
        }

        res.status(200).json({ 'contact': 'contact yeeted successfully' });
    });
});

module.exports = contactRoutes;