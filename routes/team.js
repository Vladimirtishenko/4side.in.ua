var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;
var Team = require("../model/team").Team;
var Async = require('async');
var Contact = require('../model/contact').Contact;
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;

module.exports.get = function(req, res, next) {

    var _breadcrumps_ = new Breadcrumps([{
        inRus: req.i18n_texts.TEAM
    }], req.i18n_texts.GENERAL);

    Async.waterfall([
        function(callback) {
            Team.find({},
                function(err, result) {
                    if (!result || err) return callback('error');
                    callback(null, result);
                }).sort({data: -1})
        },
        function(arg, callback) {

            var results = {};
            Contact.find({},
                function(err, result) {
                    if (!result || err) return callback('error');

                    results['team'] = arg;
                    results['contact'] = result;

                    callback(null, results);
                });
        },
    ], function(err, result) {

        if (err) {
            return ErrorSelf(res, err, next);
        }

        res.render('team', {
            breadcrumps: _breadcrumps_,
            data: result,
            lang: String(req.session.lang)
        });
    });


}