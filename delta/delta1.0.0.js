use side;
db.abouts.find(
{
	"src": "null"
}).forEach(function(item){
	item.description_ru = item.description; 
	item.description_en = item.description; 

	item.description = "true"; 
	
	db.abouts.save(item)}
);

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
