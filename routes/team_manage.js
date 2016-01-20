var Team = require("../model/team").Team;
var multer = require('multer');
var sha1 = require('sha1');
var mongoose = require('mongoose');

module.exports.get = function(req, res, next) {

    Team.find({}, function(err, result) {
        if (err) next(err);
        res.send({
            team: result
        });
    })

}

module.exports.delete = function(req, res, next) {
    Team.remove({ _id: req.body.id }, function(err) {
    if (err) next(err);
    res.send({status: 200});
});

}

module.exports.post = function(req, res, next) {



    var namefile = {};
    var storage = multer.diskStorage({
        destination: function(req, file, callback) {
            var dir = '/images/team/';
            namefile.src = dir;
            namefile.obj = req.body;
            callback(null, './public' + dir);
        },
        filename: function(req, file, callback) {
            var filename = sha1(Math.random()) + file.originalname;
            namefile.src += filename;
            callback(null, filename);
        }
    });
    var upload = multer({
        storage: storage
    }).array('upload', 'name', 'profession', 'description', 'id');

    upload(req, res, function(err) {

        if (err) {
            return res.end("Error uploading file.");
        }


        var variables = {
            description: namefile.obj ? namefile.obj.description : req.body.description,
            name: namefile.obj ? namefile.obj.name : req.body.name,
            profession: namefile.obj ? namefile.obj.profession : req.body.profession
        };

        if(namefile.src){
        	variables.src = namefile.src;
        }

        var _id = (namefile.obj && namefile.obj.id) || (req.body.id) || new mongoose.mongo.ObjectID();

        Team.update({
            _id: _id
        }, {
            $set: variables
        }, {
            upsert: true
        }, function(err) {
            if (err) return next(err);
            res.send({status: 200});
        });
    });

}
