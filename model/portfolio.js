var mongoose = require("../lib/mongoose"),
	Schema = mongoose.Schema;

var schema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	technology: {
		type: String ,
		required: true
	},
	origin: {
		type: String,
		required: true
	},
	src: {
		type: String,
		required: true
	},
	tempTitle: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	gallery_id: {
		type: String,
		required: true
	}
});

exports.Portfolio = mongoose.model("Portfolio", schema);