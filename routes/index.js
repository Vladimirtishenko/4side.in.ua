module.exports = function(app){

app.get("/", require("./front").get);

}
