var Breadcrumps = require("../middleware/breadcrumps").Breadcrumps;

module.exports.get = function (req, res, next) {
	var _breadcrumps_ = new Breadcrumps([{inRus: "О Компании"}]);
	res.render('about', {breadcrumps: _breadcrumps_});
}