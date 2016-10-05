var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;
var Portfolio = require('../model/portfolio').Portfolio;
var Gallery = require("../model/gallery").Gallery;
var Contact = require('../model/contact').Contact;
var Async = require('async');
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;

module.exports.get = function(req, res, next) {

    var _id = req.params.id;

    Async.waterfall([
        function(callback) {
            Portfolio.findById({
                    _id: _id
                },
                function(err, result) {
                    if (!result || err) return callback('error');
                    callback(null, {portfolio: result});
                });
        },
        function(arg, callback) {

            Gallery.findOne({
                    gallery_id: arg.portfolio.gallery_id
                },
                function(err, result) {
                    if (!result || err) return callback('error');
                    arg.gallery = result;
                    callback(null, arg);
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
            inRus: req.i18n_texts.PORTFOLIO,
            link: "/portfolio"
        }, {
            inRus: result.portfolio['title_'+String(req.session.lang)]
        }], req.i18n_texts.GENERAL);

        res.render('portfolio_single_project', {
            breadcrumps: _breadcrumps_,
            data: result,
            lang: String(req.session.lang)
        });
    });

}
