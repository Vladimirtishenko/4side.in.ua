var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;
var About = require('../model/about').About;
var Async = require('async');
var Contact = require('../model/contact').Contact;
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;

module.exports.get = function(req, res, next) {

    var _breadcrumps_ = new Breadcrumps([{
        inRus: req.i18n_texts.ABOUT
    }], req.i18n_texts.GENERAL);

    Async.waterfall([
        function(callback) {
            About.find({},
                function(err, result) {
                    if (!result || err) return callback('error');
                    callback(null, result);
                }).sort({ number: 1 })
        },
        function(arg, callback) {

            var results = {};
            Contact.find({},
                function(err, result) {
                    if (!result || err) return callback('error');

                    results['about'] = arg;
                    results['contact'] = result;

                    callback(null, results);
                });
        },
    ], function(err, result) {

        if (err) {
            return ErrorSelf(res, err, next);
        }

        res.render('about', {
            breadcrumps: _breadcrumps_,
            data: result,
            lang: String(req.session.lang)
        });
    });


}
