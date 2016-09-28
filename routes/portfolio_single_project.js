var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;
var Portfolio = require('../model/portfolio').Portfolio;
var Gallery = require("../model/gallery").Gallery;
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
                    callback(null, result);
                });
        },
        function(arg, callback) {

            var results = {};
            Gallery.findOne({
                    gallery_id: arg.gallery_id
                },
                function(err, result) {
                    if (!result || err) return callback('error');
                    
                    results['portfolio'] = arg;
                    results['gallery'] = result;

                    callback(null, results);
                });
        },
    ], function(err, result) {

        if(err){
            return ErrorSelf(res, err, next);
        }

        var _breadcrumps_ = new Breadcrumps([{
            inRus: req.i18n_texts.PORTFOLIO,
            link: "/portfolio"
        }, {
            inRus: result.portfolio.title
        }], req.i18n_texts.GENERAL);

        res.render('portfolio_single_project', {
            breadcrumps: _breadcrumps_,
            data: result
        });
    });

}
