var User = require('../model/user').User,
    async = require('async'),
    CheckAuth = require("../middleware/checkAuthorize");

module.exports.get = function(req, res, next) {

    if (!req.session.user) {
        res.render("login");
    } else {
        res.redirect(301, '/manage');
  		res.end();
    }

    
}

module.exports.post = function(req, res, next) {
    var username = req.body.username,
        password = req.body.password;

    User.authorize(username, password, function(err, user) {
        if (err) {
            res.json({
                status: 500
            });
        } else {
            req.session.user = user._id;
            res.json({
                status: 200
            });
        }

    })
}
