var Portfolio = require('../model/portfolio').Portfolio;
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;
var Contact = require('../model/contact').Contact;
var Async = require('async');

module.exports.get = function(req, res, next) {

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

        res.render('index', {
            data: result,
            lang: String(req.i18n_lang)
        });
    });


}
