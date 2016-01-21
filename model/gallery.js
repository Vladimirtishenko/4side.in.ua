var mongoose = require("../lib/mongoose"),
	Schema = mongoose.Schema,
	async = require("async");

var schema = new Schema({
	src: {
		type: String,
		required: true
	},
	gallery_id: {
		type: String,
		required: true
	}
});

exports.Gallery = mongoose.model("Gallery", schema);