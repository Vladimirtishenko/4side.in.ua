var mongoose = require("../lib/mongoose"),
	Schema = mongoose.Schema;

var schema = new Schema({
	title_ru: {
		type: String,
		required: true
	},
	title_en: {
		type: String,
		required: true
	},
	description_ru: {
		type: String,
		required: true
	},
	description_en: {
		type: String,
		required: true
	},
	technology: {
		type: String ,
		required: true
	},
	origin_ru: {
		type: String,
		required: true
	},
	origin_en: {
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