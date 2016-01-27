var Contact = require('../model/contact').Contact;

module.exports.get = function(req, res, next) {
    Contact.find({}, function(err, result) {
        if (err) next(err)
        res.json(result);
    })
}

module.exports.post = function(req, res, next) {
    
}