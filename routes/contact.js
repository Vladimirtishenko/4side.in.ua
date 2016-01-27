var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;

module.exports.get = function(req, res, next) {
    var _breadcrumps_ = new Breadcrumps([{
        inRus: "Контакты"
    }]);

    res.render('contact', {
        breadcrumps: _breadcrumps_,
    })

}
