const User = require('./models/user');

// Auth middleware, make sure the user is logged in
function authMiddleware(req, res, next) {
    User.find({ auth: req.headers.authorization }, function (err, user) {
        if (err || user === undefined || user.length === 0) {
            res.status(403).send('Forbidden');
        } else {
            next();
        }
    });
};

module.exports = authMiddleware;