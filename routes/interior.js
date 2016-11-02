var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;
var Async = require('async');
var PortfolioElse = require('../model/portfolioElse').PortfolioElse;
var Contact = require('../model/contact').Contact;
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;

module.exports.get = function(req, res, next) {

    res.locals.path = req.url;
    
    var _breadcrumps_ = new Breadcrumps([{
        inRus: req.i18n_texts.INTERIOR
    }], req.i18n_texts.GENERAL);


    Async.waterfall([
        function(callback) {

             PortfolioElse.find({category: "interior"},
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

        res.render('interior', {
            data: result,
            breadcrumps: _breadcrumps_,
            title: req.i18n_texts.INTERIOR_TITLE,
            lang: String(req.i18n_lang)
        });
    });

}
