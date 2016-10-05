var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;
var Portfolio = require('../model/portfolio').Portfolio;
var Contact = require('../model/contact').Contact;
var Async = require('async');
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;

module.exports.get = function(req, res, next) {

    var _breadcrumps_ = new Breadcrumps([{
        inRus: req.i18n_texts.PORTFOLIO
    }], req.i18n_texts.GENERAL);


    Async.waterfall([
        function(callback) {

             Portfolio.find({},
                function(err, result) {

                    if(!result || err) return callback('error');
                    
                    callback(null, result);
                   
                }).sort({date: -1});


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

        res.render('portfolio', {
            breadcrumps: _breadcrumps_,
            data: result,
            lang: String(req.session.lang)
        });
    });


}
