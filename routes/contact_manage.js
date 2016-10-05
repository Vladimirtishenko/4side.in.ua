var Contact = require('../model/contact').Contact;
var multer = require('multer');
var multerCommon = require('../middleware/multerCommon').multerCommon;
var variables = require('../middleware/variables').Variables;
var responseResult = require('../middleware/responseResult').responseResult;
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;


module.exports.get = function(req, res, next) {
    Contact.find({}, function(err, result) {
        if (err) {
            return ErrorSelf(res, err, next);
        }
        res.json({result: result, lang: String(req.i18n_lang), translator: req.i18n_texts});
    })
}

module.exports.post = function(req, res, next) {


    console.log(req.body);
    
    if (req.body && req.body.src) {

        var variable = variables(req.body),
            _id = req.body.id || new mongoose.mongo.ObjectID();

        Contact.updates({
            _id: _id
        }, variable, function(err) {
            responseResult(err, res);
        });

    } else {

        var multerStorage = multerCommon('/images/contact/');

        var upload = multer({
            storage: multerStorage.storage
        }).any();

        upload(req, res, function(err) {
            if (err) {
                responseResult(err, res);
            }
            var variable = variables(req.body),
                _id = req.body.id || new mongoose.mongo.ObjectID();

            variable.src = multerStorage.namefile.name;

            Contact.updates({
                _id: _id
            }, variable, function(err) {
                responseResult(err, res);
            })

        });

    }
}
