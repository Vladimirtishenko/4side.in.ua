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
 	},
 	tempTitle: {
		type: String,
	},
	date: {
		type: Date,
	},
	gallery_id: {
		type: String,
  	}
});

exports.Portfolio = mongoose.model("Portfolio", schema);