var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;
var Team = require("../model/team").Team;

module.exports.get = function(req, res, next) {
    var _breadcrumps_ = new Breadcrumps([{
        inRus: "Команда"
    }]);
    Team.find({},
        function(err, result) {
            if (err) return next(err);
            res.render('team', {
                breadcrumps: _breadcrumps_,
                data: result
            })
        }).sort({data: -1});
}
