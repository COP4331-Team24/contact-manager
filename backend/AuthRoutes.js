const express = require('express');
const bcrypt = require('bcrypt');

let authRoutes = express.Router();
let User = require('./models/user');

const salt = 10;

authRoutes.route('/create').post(function (req, res) {
    // TODO validate data
    let pw = bcrypt.hashSync(req.body.password, salt);
    let auth = bcrypt.hashSync(new Date().getTime().toString(), salt);
    let user = new User({
        username: req.body.username,
        password: pw,
        auth: auth
    });
    user.save()
        .then(user => {
            res.status(200).json({
                'message': 'User created',
                'auth': auth
            });
        })
        .catch(err => {
            res.status(400).send('Failed to create user.' + err);
        })
});

module.exports = authRoutes;