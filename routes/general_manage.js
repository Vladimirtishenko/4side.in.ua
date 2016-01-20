module.exports.get = function(req, res, next){
	res.render('admin_panel');
}

module.exports.post = function(req, res, next){
	res.json([
		{name_rus: "Портфолио", name_us: "Portfolio", link: "/porfolio", context: "Portfolio"},
		{name_rus: "Команда", name_us: "Team", link: "/team", context: "Team"},
		{name_rus: "О нас", name_us: "About", link: "/about", context: "About"},
		{name_rus: "Контакты", name_us: "Contact", link: "/contact", context: "Contact"}
		])
}