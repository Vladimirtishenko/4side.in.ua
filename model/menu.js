var mongoose = require("../lib/mongoose"),
	Schema = mongoose.Schema;

var schema = new Schema({
	name_ru: {
		type: String
	},
	name_en: {
		type: String
	},
	link: {
		type: String
	},
	context: {
		type: String
	}
});

exports.Menu = mongoose.model("Menu", schema);