const express = require('express');
const authMiddleware = require('./AuthMiddleware');

let contactRoutes = express.Router();
let Contact = require('./models/contact');

// Auth middleware, make sure the user is logged in
contactRoutes.use(authMiddleware);

// Define contact API endpoints
contactRoutes.route('/').get(function (req, res) {
    Contact.find({ 'user_id': req.user_id }, function (err, contacts) {
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
contactRoutes.route('/get').get(function (req, res) {
    let id = req.body._id;
    Contact.findById(id, function (err, contact) {
        if (err) {
            res.status(400).send("Couldn't find contact");
        } else {
            res.json(contact);
        }
    });
});

// Edit contact by id
contactRoutes.route('/update').patch(function (req, res) {
    let id = req.body._id;
    Contact.findById(id, function (err, contact) {
        if (!contact) {
            res.status(400).send("Couldn't update contact.");
        }
        else {
            contact.firstname = req.body.firstname;
            contact.lastname = req.body.lastname;
            contact.number = req.body.number;
            contact.save()
                .then(contact => {
                    res.status(200).json(contact);
                })
                .catch(err => {
                    res.status(500).send('Error updating contact');
                });
        }
    });
});

// Delete contact by id.
contactRoutes.route('/delete').delete(function (req, res) {
    let id = req.body._id;
    Contact.findByIdAndDelete(id, function (err) {
        if (err) {
            res.status(400).send('Could not delete contact');
        }
        res.status(200).send('deleted contact: ' + id + ' successfully.');
    });
});

module.exports = contactRoutes;