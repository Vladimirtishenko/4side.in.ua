var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;
var Portfolio = require('../model/portfolio').Portfolio;
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;

module.exports.get = function(req, res, next) {
    var _breadcrumps_ = new Breadcrumps([{
        inRus: "Портфолио"
    }]);

    Portfolio.find({},
        function(err, result) {
            if(err){
                return ErrorSelf(res, err, next);
            }
            res.render('portfolio', {
                breadcrumps: _breadcrumps_,
                data: result
            });
        }).limit(8).sort({date: -1});


}
