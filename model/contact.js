var mongoose = require("../lib/mongoose"),
    Schema = mongoose.Schema;

var schema = new Schema({
    adress: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true
    }
});

schema.statics.updates = function(where, variables, callback) {
    var Contact = this;

    Contact.update(where, {
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

exports.Contact = mongoose.model("Contact", schema);
