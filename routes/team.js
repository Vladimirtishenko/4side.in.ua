var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;

module.exports.get = function (req, res, next) {
	var _breadcrumps_ = new Breadcrumps([{inRus: "Команда"}]);
	res.render('team', {breadcrumps: _breadcrumps_});
}