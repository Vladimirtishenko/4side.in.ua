var sha1 = require('sha1');
var multer = require('multer');

function multerCommon(path) {

	var namefile = {};

    var storage = multer.diskStorage({
        destination: function(req, file, callback) {
            var description = path;
            namefile.name = description;
            callback(null, './public' + description);
        },
        filename: function(req, file, callback) {
            var filename = sha1(Math.random()) + file.originalname;
            namefile.name += filename;
            callback(null, filename);
        }
    });

    return {storage: storage, namefile: namefile};

}


multerCommon.prototype.name = "multerCommon";

module.exports.multerCommon = multerCommon;