var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;
var Async = require('async');
var Portfolio = require('../model/portfolio').Portfolio;
var Contact = require('../model/contact').Contact;
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;

module.exports.get = function(req, res, next) {

    var _breadcrumps_ = new Breadcrumps([{
        inRus: req.i18n_texts.ART
    }], req.i18n_texts.GENERAL);


    Async.waterfall([
        function(callback) {

             Portfolio.find({},
                function(err, result) {

                    if(!result || err) return callback('error');
                    
                    callback(null, result);
                   
                }).limit(10).sort({date: -1});


        },
        function(arg, callback) {

            var results = {};
            Contact.find({},
                function(err, result) {
                    if (!result || err) return callback('error');
                    
                    results['portfolio'] = arg;
                    results['contact'] = result;

                    callback(null, results);
                });
        },
    ], function(err, result) {

        if(err){
            return ErrorSelf(res, err, next);
        }

        res.render('art', {
            data: result,
            breadcrumps: _breadcrumps_,
            title: req.i18n_texts.ART_TEXT,
            lang: String(req.i18n_lang)
        });
    });

}
