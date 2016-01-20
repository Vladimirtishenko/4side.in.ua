var mongoose = require("../lib/mongoose"),
	Schema = mongoose.Schema;

var schema = new Schema({
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

exports.About = mongoose.model("About", schema);