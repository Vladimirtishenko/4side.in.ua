var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;
var Contact = require('../model/contact').Contact;

module.exports.get = function(req, res, next) {
    var _breadcrumps_ = new Breadcrumps([{
        inRus: "Контакты"
    }]);

    Contact.find({},
        function(err, result) {
            if (err) return next(err);
            res.render('contact', {
                breadcrumps: _breadcrumps_,
                data: result
            });
        })

}
