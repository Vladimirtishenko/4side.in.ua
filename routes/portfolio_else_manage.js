var PortfolioElse = require("../model/portfolioElse").PortfolioElse;
var multer = require('multer');
var sha1 = require('sha1');
var mongoose = require('mongoose');
var async = require('async');
var fs = require('fs');
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;
var variables = require('../middleware/variables').Variables;
var responseResult = require('../middleware/responseResult').responseResult;

module.exports.get = function(req, res, next) {
    PortfolioElse.find({}, function(err, result) {
        if (err) {
            return ErrorSelf(res, err, next);
        }
        res.json({ result: result, lang: String(req.i18n_lang), translator: req.i18n_texts });
    })
}

module.exports.post = function(req, res, next) {

	if (Object.keys(req.body).length > 0) {
        var variable = variables(req.body);

        PortfolioElse.update({
            _id: req.body.id
        }, variable, function(err) {
            responseResult(err, res);
        });

    } else {

        var namefile = {
            gallery: []
        };

        var storage = multer.diskStorage({
            destination: function(req, file, callback) {
                var dir = '/images/portfolioElse/';
                namefile.src = dir;
                callback(null, './public' + dir);
            },
            filename: function(req, file, callback) {
                var filename = sha1(Math.random()) + file.originalname;
                namefile.src += filename;
                if (file.fieldname == 'upload_galery_image') {
                    namefile.gallery.push(namefile.src);
                }
                delete namefile.src;
                callback(null, filename);
            }
        });
        var upload = multer({
            storage: storage
        }).any();


        upload(req, res, function(err) {
            if (err) {
                res.send({
                    'status': 500,
                    'message': err
                });
                return;
            }

            var _idPreview = req.body.idPreview || new mongoose.mongo.ObjectID(),
            	variablesPreview = {
                    title_ru: req.body.title_ru,
                    title_en: req.body.title_en,
                    category: req.body.category,
                    description_ru: req.body.description_ru,
                    description_en: req.body.description_en,
                    technology: req.body.technology,
                    date: new Date(),
                    src: namefile.gallery
                };

             PortfolioElse.update({
	                _id: _idPreview
	            }, {
	                $set: variablesPreview
	            }, {
	                upsert: true
	            }, function(err) {
	                responseResult(err, res);
	            });

        });
    }


}