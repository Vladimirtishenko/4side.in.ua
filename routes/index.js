module.exports = function(app){

app.get("/", require("./front").get);

app.get("/team", require("./team").get);

app.get("/about", require("./about").get);

app.get("/contact", require("./contact").get);

app.get("/portfolio", require("./portfolio").get);

app.get("/portfolio/:id", require("./portfolio_single_project").get);

app.post("/mail", require("./mail").post);

app.get("/art", require("./art").get);

}
