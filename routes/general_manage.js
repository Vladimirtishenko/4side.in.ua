var Menu = require('../model/menu').Menu;
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;

module.exports.get = function(req, res, next){
	res.render('admin_panel');
}

module.exports.post = function(req, res, next){

	Menu.find({}, function(err, result) {
        if (err) {
            return ErrorSelf(res, err, next);
        }
       res.json({result: result, lang: String(req.i18n_lang), translator: req.i18n_texts});
    }).ne("context", false)

}