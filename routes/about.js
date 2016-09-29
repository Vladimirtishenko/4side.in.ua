var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;
var About = require('../model/about').About;
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;

module.exports.get = function(req, res, next) {
    var _breadcrumps_ = new Breadcrumps([{
        inRus: req.i18n_texts.ABOUT
    }], req.i18n_texts.GENERAL);

    About.find({},
        function(err, result) {
            if(err){
                return ErrorSelf(res, err, next);
            }
            res.render('about', {
                breadcrumps: _breadcrumps_,
                data: result,
                lang: String(req.session.lang)
            });
        }).sort({number:1})
}
