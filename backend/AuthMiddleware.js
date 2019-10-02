const User = require('./models/user');

// Auth middleware, make sure the user is logged in
function authMiddleware(req, res, next) {
    User.findOne({ auth: req.headers.authorization }, function (err, user) {
        if (err || !user || user.length === 0) {
            res.status(403).send('Forbidden');
        } else if (req.body.user_id && req.body._id !== user._id) {
            res.status(403).send('Forbidden');
        } else {
            req.user_id = user._id;
            next();
        }
    });
};

module.exports = authMiddleware;