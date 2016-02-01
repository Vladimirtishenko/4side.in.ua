var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;
var Portfolio = require('../model/portfolio').Portfolio;
var Gallery = require("../model/gallery").Gallery;
var Async = require('async');

module.exports.get = function(req, res, next) {

    var _id = req.params.id;


    Async.waterfall([
        function(callback) {
            Portfolio.findById({
                    _id: _id
                },
                function(err, result) {
                    if (err) callback(err);
                    callback(null, result);
                });
        },
        function(arg, callback) {
            var results = {};
            Gallery.findOne({
                    gallery_id: arg.gallery_id
                },
                function(err, result) {
                    if (err) callback(err);
                    
                    results['portfolio'] = arg;
                    results['gallery'] = result;

                    callback(null, results);
                });
        },
    ], function(err, result) {

        var _breadcrumps_ = new Breadcrumps([{
            inRus: "Портфолио",
            link: "/portfolio"
        }, {
            inRus: result.portfolio.title
        }]);

        if(err) next(err);
        res.render('portfolio_single_project', {
            breadcrumps: _breadcrumps_,
            data: result
        });
    });

}
