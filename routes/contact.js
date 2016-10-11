var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;
var Contact = require('../model/contact').Contact;
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;

module.exports.get = function(req, res, next) {
    
    res.locals.path = req.url;
    
    var _breadcrumps_ = new Breadcrumps([{
        inRus: req.i18n_texts.CONTACT
    }], req.i18n_texts.GENERAL);

    Contact.find({},
        function(err, result) {
            if(err){
                return ErrorSelf(res, err, next);
            }
            res.render('contact', {
                breadcrumps: _breadcrumps_,
                data: result,
                title: req.i18n_texts.CONTACT_TEXT,
            });
        })

}
