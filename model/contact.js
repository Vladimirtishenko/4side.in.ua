var mongoose = require("../lib/mongoose"),
	Schema = mongoose.Schema;

var schema = new Schema({
	adress: {
		type: String,
		required: true
	},
	number: {
		type: String,
		required: true
	},
	mail: {
		type: String,
		required: true
	}
});

exports.Contact = mongoose.model("Contact", schema);