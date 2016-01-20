var mongoose = require("../lib/mongoose"),
	Schema = mongoose.Schema;

var schema = new Schema({
	src: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	profession: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
});

exports.Team = mongoose.model("Team", schema);