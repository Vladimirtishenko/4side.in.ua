var About = require("../model/about").About;
var multer = require('multer');
var sha1 = require('sha1');
var variables = require('../middleware/variables').Variables;
var responseResult = require('../middleware/responseResult').responseResult;
var multerCommon = require('../middleware/multerCommon').multerCommon;
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;


module.exports.get = function(req, res, next) {

    About.find({}, function(err, result) {
        if (err) {
            return ErrorSelf(res, err, next);
        }
        res.json({result: result, lang: String(req.i18n_lang), translator: req.i18n_texts});
    }).sort({number: 1})

}


module.exports.post = function(req, res, next) {

    if (req.body && req.body.description && req.body.number) {

        var variable = variables(req.body);

        About.updates({
            number: parseInt(variable.number)
        }, variable, function(err) {
            responseResult(err, res);
        });

    } else {

        var multerStorage = multerCommon('/images/about/');

        var upload = multer({
            storage: multerStorage.storage
        }).any();

        upload(req, res, function(err) {

            if (err) {
                responseResult(err, res);
            }
            var variable = variables(req.body);

            variable.description = null;
            variable.src = multerStorage.namefile.name

            About.updates({
                number: parseInt(variable.number)
            }, variable, function(err) {
                responseResult(err, res);
            });

        });

    }

}
