var mongoose = require("../lib/mongoose"),
	Schema = mongoose.Schema;

var schema = new Schema({
	src: {
		type: Array,
		required: true
	},
	gallery_id: {
		type: String,
		required: true
	}
});

exports.Gallery = mongoose.model("Gallery", schema);