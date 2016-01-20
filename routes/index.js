module.exports = function(app){

app.get("/", require("./front").get);

app.get("/team", require("./team").get);

app.get("/about", require("./about").get);

}
