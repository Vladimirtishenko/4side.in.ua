use side;

if(db.menus.find({context: "PortfolioElse"}).count() == 0){
	db.menus.insert({"name_ru" : "Арт Портфолио", "name_en" : "Art Portfolio", "link" : "/portfolioElse", "context" : "PortfolioElse"});
	db.menus.update({"context" : "Portfolio"}, {$set: {"name_en": "Web Portfolio", "name_ru": "Веб Портфолио"}});
}