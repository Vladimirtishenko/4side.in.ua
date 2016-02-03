var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;
var About = require('../model/about').About;
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;

module.exports.get = function(req, res, next) {
    var _breadcrumps_ = new Breadcrumps([{
        inRus: "О Компании"
    }]);

    About.find({},
        function(err, result) {
            if(err){
                return ErrorSelf(res, err, next);
            }
            res.render('about', {
                breadcrumps: _breadcrumps_,
                data: result
            });
        }).sort({number:1})


}
