var Portfolio = require("../model/portfolio").Portfolio;
var Gallery = require("../model/gallery").Gallery;
var multer = require('multer');
var sha1 = require('sha1');
var mongoose = require('mongoose');

module.exports.get = function(req, res, next){
	res.send({});
}

module.exports.post = function(req, res, next){

	var namefile = {};
	var storage =  multer.diskStorage({
	  destination: function (req, file, callback) {
	  	namefile.obj = file;
	    var dir = '/images/portfolio/',
        	srcRandom = 'src'+Math.random();
        
        namefile[srcRandom] = dir;
        callback(null, './public' + dir);
	  },
	  filename: function (req, file, callback) {
	    var filename = sha1(Math.random()) + file.originalname;
        namefile.src += filename;
        callback(null, filename);
	  }
	});
	var upload = multer({ storage : storage }).any();


	upload(req,res,function(err) {
        console.log(req.body);
        console.log(namefile);
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });


	// var namefile = {};
 //    var storage = multer.diskStorage({
 //        destination: function(req, file, callback) {
 //            var dir = '/images/portfolio/',
 //            	srcRandom = 'src'+Math.random();
 //            namefile[srcRandom] = dir;
 //            namefile.obj = req.body;
 //            callback(null, './public' + dir);
 //        },
 //        filename: function(req, file, callback) {
 //            var filename = sha1(Math.random()) + file.originalname;
 //            namefile.src += filename;
 //            callback(null, filename);
 //        }
 //    });
 //    var upload = multer({
 //        storage: storage
 //    }).array('title', 'description', 'technology', 'origin', 'upload', 'uploads');

 //     upload(req, res, function(err) {
 //     	if (err) {
 //            return res.end("Error uploading file.");
 //        }

 //        console.log(req.body);

 //     });

}