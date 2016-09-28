var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;
var Portfolio = require('../model/portfolio').Portfolio;
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;

module.exports.get = function(req, res, next) {
    var _breadcrumps_ = new Breadcrumps([{
        inRus: req.i18n_texts.PORTFOLIO
    }], req.i18n_texts.GENERAL);

    Portfolio.find({},
        function(err, result) {
            if(err){
                return ErrorSelf(res, err, next);
            }
            res.render('portfolio', {
                breadcrumps: _breadcrumps_,
                data: result
            });
        }).sort({date: -1});


}
