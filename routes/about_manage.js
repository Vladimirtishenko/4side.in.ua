var About = require("../model/about").About;
var multer = require('multer');
var sha1 = require('sha1');


module.exports.get = function(req, res, next) {

    About.find({}, function(err, result) {
        res.send({
            abouts: result
        });
    })

}


module.exports.post = function(req, res, next) {

    if (req.body && req.body.description && req.body.number) {

        var variables = {
            description: req.body.description,
            src: req.body.src
        };

        About.update({
            number: parseInt(req.body.number)
        }, {
            $set: variables
        }, {
            upsert: true
        }, function(err) {

            if (err) return next(err);
            res.send("Add in DataBase");

        });

    } else {

        var namefile = {};
        var storage = multer.diskStorage({
            destination: function(req, file, callback) {
                var description = '/images/about/';
                namefile.name = description;
                namefile.number = req.body;
                callback(null, './public'+description);
            },
            filename: function(req, file, callback) {
                var filename = sha1(Math.random()) + file.originalname;
                namefile.name += filename;
                callback(null, filename);
            }
        });
        var upload = multer({
            storage: storage
        }).array('upload', 'number');

        upload(req, res, function(err) {

            if (err) {
                return res.end("Error uploading file.");
            }
            var variables = {
                description: null,
                src: namefile.name
            };

            About.update({
                number: parseInt(namefile.number.number)
            }, {
                $set: variables
            }, {
                upsert: true
            }, function(err) {
                if (err) return next(err);
                res.send(namefile.name);

            });
        });

    }

}
