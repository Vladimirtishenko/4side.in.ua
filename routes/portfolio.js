var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;
var Portfolio = require('../model/portfolio').Portfolio;

module.exports.get = function(req, res, next) {
    var _breadcrumps_ = new Breadcrumps([{
        inRus: "Портфолио"
    }]);

    Portfolio.find({},
        function(err, result) {
            if (err) return next(err);
            res.render('portfolio', {
                breadcrumps: _breadcrumps_,
                data: result
            });
        }).limit(10);


}

module.exports.post = function(req, res, next){

}