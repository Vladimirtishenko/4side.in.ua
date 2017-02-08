var SitemapGenerator = require('sitemap-generator');
var fs = require('fs');

var generator = new SitemapGenerator('http://4side.xyz');
 
generator.on('done', function (sitemap) {
	fs.writeFile("./sitemap.xml", sitemap, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	}); 
});
 
generator.start();