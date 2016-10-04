var Portfolio = require("../model/portfolio").Portfolio;
var Gallery = require("../model/gallery").Gallery;
var multer = require('multer');
var sha1 = require('sha1');
var mongoose = require('mongoose');
var async = require('async');
var fs = require('fs');
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;

module.exports.get = function(req, res, next) {
    Portfolio.find({}, function(err, result) {
        if (err) {
            return ErrorSelf(res, err, next);
        }
        res.json({result: result, lang: String(req.session.lang)});
    })
}


module.exports.delete = function(req, res, next) {

    var galeryId;

    async.series([
            function(callback) {
                Portfolio.findByIdAndRemove(req.body.id, function(err, offer) {
                    galeryId = offer.gallery_id;
                    var filePath = "./public" + offer.src;
                    fs.unlink(filePath, function(err) {
                        callback(null, {
                            'status': 200
                        });
                    });
                })
            },
            function(callback, results) {
                Gallery.findOneAndRemove({
                    gallery_id: galeryId
                }, {
                    sort: {
                        _id: 1
                    }
                }).exec(function(err, doc) {
                    var arrayForDelete = doc.src;
                    async.each(arrayForDelete, function(src, callback) {
                        fs.unlink("./public" + src, function(err) {
                            callback();
                        });
                    }, function(err) {
                        if (err) return next(err);
                        callback(null, {
                            'status': 200
                        });
                    });

                });
            }
        ],
        function(err, results) {
            if (err) {
                res.send({
                    'status': 500,
                    'message': err
                });
            }
            res.json(results[results.length - 1]);
        });

}

module.exports.post = function(req, res, next) {

    var namefile = {
        preview: [],
        tempTitle: [],
        gallery: []
    };
    var storage = multer.diskStorage({
        destination: function(req, file, callback) {
            var dir = '/images/portfolio/';
            namefile.src = dir;
            callback(null, './public' + dir);
        },
        filename: function(req, file, callback) {
            var filename = sha1(Math.random()) + file.originalname;
            namefile.src += filename;
            if (file.fieldname == 'upload_temp_image') {
                namefile.preview.push(namefile.src);
            } else if (file.fieldname == 'upload_galery_image') {
                namefile.gallery.push(namefile.src);
            } else if (file.fieldname == 'upload_title_image'){
                namefile.tempTitle.push(namefile.src);
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
        var categoryRandom = sha1(Math.random()),
            _idPreview = req.body.idPreview || new mongoose.mongo.ObjectID(),
            _idGalery = req.body.idGallery || new mongoose.mongo.ObjectID(),
            variablesPreview = {
                title: req.body.title,
                description: req.body.description,
                technology: req.body.technology,
                origin: req.body.origin,
                src: namefile.preview[0],
                tempTitle: namefile.tempTitle[0],
                gallery_id: categoryRandom,
                date: new Date()
            },
            variablesGalery = {
                gallery_id: categoryRandom,
                src: namefile.gallery
            }

        async.series([
                function(callback) {
                    Portfolio.update({
                        _id: _idPreview
                    }, {
                        $set: variablesPreview
                    }, {
                        upsert: true
                    }, function(err) {
                        callback(null, {
                            status: 200
                        });
                    });
                },
                function(callback) {
                    Gallery.update({
                        _id: _idGalery
                    }, {
                        $set: variablesGalery
                    }, {
                        upsert: true
                    }, function(err) {
                        callback(null, {
                            status: 200
                        });
                    });
                }
            ],
            function(err, results) {
                if (err) {
                    res.send({
                        'status': 500,
                        'message': err
                    });
                }
                res.json(results[results.length - 1]);
            });
    });

}
