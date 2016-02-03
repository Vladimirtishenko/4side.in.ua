var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;
var Team = require("../model/team").Team;
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;

module.exports.get = function(req, res, next) {
    var _breadcrumps_ = new Breadcrumps([{
        inRus: "Команда"
    }]);
    Team.find({},
        function(err, result) {
            if(err){
                return ErrorSelf(res, err, next);
            }
            res.render('team', {
                breadcrumps: _breadcrumps_,
                data: result
            })
        }).sort({data: -1});
}
