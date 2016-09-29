var mongoose = require("../lib/mongoose"),
	Schema = mongoose.Schema;

var schema = new Schema({
	description_ru: {
		type: String
	},
	description_en: {
		type: String
	},
	description: {
		type: String
	},
	src: {
		type: String
	},
	number: {
		type: Number,
		unique: true,
		required: true
	}
});

schema.statics.updates = function(where, variables, callback) {
    var About = this;

    About.update(where, {
        $set: variables
    }, {
        upsert: true
    }, function(err) {
        if (err) {
            callback(err);
        }
        callback(null);
    })
}

exports.About = mongoose.model("About", schema);