var Menu = require('../model/menu').Menu;
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;

module.exports.get = function(req, res, next){
	res.render('admin_panel');
}

module.exports.post = function(req, res, next){

	console.log(Menu);

	Menu.find({}, function(err, result) {
        if (err) {
            return ErrorSelf(res, err, next);
        }
       console.log(result);
       res.json({result: result, lang: String(req.i18n_lang), translator: req.i18n_texts});
    })

}