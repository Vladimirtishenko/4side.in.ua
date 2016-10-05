use side;

if(db.menus.find().count() == 0){
	[{name_ru: "Портфолио", name_en: "Portfolio", link: "/porfolio", context: "Portfolio"},
	{name_ru: "Команда", name_en: "Team", link: "/team", context: "Team"},
	{name_ru: "О нас", name_en: "About", link: "/about", context: "About"},
	{name_ru: "Контакты", name_en: "Contact", link: "/contact", context: "Contact"}].forEach(function(item){
		 db.menus.insert(item);
	});
}

db.abouts.find().sort({number: 1}).forEach(function(item){

	if(item.src == null || item.src == "null"){
		item.description_ru = item.description; 
		item.description_en = item.description; 
		item.description = "true";
	}
	
	db.abouts.save(item)}
);

if(db.abouts.find({number: 0}).count() == 0){
db.abouts.find({}).sort({number: 1}).forEach(function(item){
	item.number--;
	db.abouts.save(item)
});
}

db.contacts.find({}).forEach(function(item){
	item.adress_ru = item.adress; 
	item.adress_en = item.adress; 

	item.adress = "true"; 

	db.contacts.save(item)}
);

db.teams.find({}).forEach(function(item){	
	item.description_ru = item.description; 
	item.description_en = item.description; 

	item.name_ru=item.name; 
	item.name_en=item.name; 

	item.name = "true"; 
	item.description = "true";

	db.teams.save(item)}
);

db.portfolios.find({}).forEach(function(item){	
	item.description_ru = item.description; 
	item.description_en = item.description; 

	item.origin_ru=item.origin; 
	item.origin_en=item.origin; 

	item.title_ru=item.title; 
	item.title_en=item.title; 

	item.origin = "true"; 
	item.description = "true";
	item.title = "true";

	db.portfolios.save(item)}
);
