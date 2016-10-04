var Team = require("../model/team").Team;
var multer = require('multer');
var sha1 = require('sha1');
var mongoose = require('mongoose');
var multerCommon = require('../middleware/multerCommon').multerCommon;
var responseResult = require('../middleware/responseResult').responseResult;
var variables = require('../middleware/variables').Variables;
var fs = require('fs');
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;

module.exports.get = function(req, res, next) {

    Team.find({}, function(err, result) {
        if (err) {
            return ErrorSelf(res, err, next);
        }
        res.json({result: result, lang: String(req.session.lang), translator: req.i18n_texts});
    })

}

module.exports.delete = function(req, res, next) {
    Team.findByIdAndRemove(
        req.body.id,
        function(err, offen) {
            if (err) {
                responseResult(err, res)
            };
            var filePath = "./public" + offen.src;
            fs.unlink(filePath, function(err) {
                responseResult(err, res);
            });

        });

}

module.exports.post = function(req, res, next) {

    var multerStorage = multerCommon('/images/team/'),
        upload = multer({
            storage: multerStorage.storage
        }).any();

    upload(req, res, function(err) {

        if (err) {
            responseResult(err, res);
        }

        var variable = variables(req.body),
            _id = req.body.id || new mongoose.mongo.ObjectID();

        variable.data = new Date();

        delete variable.upload;

        if (multerStorage.namefile.name) {
            variable.src = multerStorage.namefile.name;
        }

        Team.updates({
            _id: _id
        }, variable, function(err) {
            responseResult(err, res);
        });

    });

}
