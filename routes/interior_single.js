var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;
var PortfolioElse = require('../model/portfolioElse').PortfolioElse;
var Contact = require('../model/contact').Contact;
var Async = require('async');
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;

module.exports.get = function(req, res, next) {

    res.locals.path = req.url;
 
    var _id = req.params.id;

    Async.waterfall([
        function(callback) {
            PortfolioElse.findById({
                    _id: _id
                },
                function(err, result) {
                    if (!result || err) return callback('error');
                    callback(null, {portfolio: result});
                });
        },
        function(arg, callback){
            Contact.find({},
                function(err, result) {
                    if (!result || err) return callback('error');
                    arg.contact = result;
                    callback(null, arg);
                });
        }
    ], function(err, result) {

        if(err){
            return ErrorSelf(res, err, next);
        }

        var _breadcrumps_ = new Breadcrumps([{
            inRus: req.i18n_texts.INTERIOR,
            link: "/interior"
        }, {
            inRus: result.portfolio['title_'+String(req.session.lang)]
        }], req.i18n_texts.GENERAL);

        res.render('interior_single', {
            breadcrumps: _breadcrumps_,
            data: result,
            lang: String(req.i18n_lang),
            title: result.portfolio['title_'+req.i18n_lang]
        });
    });

}
