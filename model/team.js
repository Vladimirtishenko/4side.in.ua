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
    },
    data: {
        type: Date,
        require: true
    }
});

schema.statics.updates = function(where, variables, callback) {

    var Team = this;

    Team.update(
        where, {
            $set: variables
        }, {
            upsert: true
        },
        function(err) {
            if (err) {
                callback(err);
            }
            callback(null);
        });
}

exports.Team = mongoose.model("Team", schema);
