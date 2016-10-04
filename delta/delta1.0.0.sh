mongo
db.abouts.find({"src": "null"}).forEach(function(item){item.description = "true"; item.description_ru = "Empty"; item.description_en = "Empty"; db.abouts.save(item)})