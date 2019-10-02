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

authRoutes.route('/login').post(function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            let auth = bcrypt.hashSync(new Date().getTime().toString(), salt);
            user.auth = auth;
            user.save()
                .then(() => {
                    res.status(200).json({
                        'message': 'Logged in',
                        'auth': auth
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.status('500').send('Failed to generate auth token')
                });
        } else {
            res.status(400).send('Failed to find user');
        }
    });
})

module.exports = authRoutes;