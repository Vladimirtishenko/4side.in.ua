module.exports = function(app){

app.get("/manage", require("./general_manage").get);
app.post("/manage", require("./general_manage").post);

app.get("/manage/About", require("./about_manage").get);
app.post("/manage/About", require("./about_manage").post);

app.get("/manage/Team", require("./team_manage").get);
app.post("/manage/Team", require("./team_manage").post);
app.delete("/manage/Team", require("./team_manage").delete);

app.get("/manage/Portfolio", require("./portfolio_manage").get);
app.post("/manage/Portfolio", require("./portfolio_manage").post);
app.delete("/manage/Portfolio", require("./portfolio_manage").delete);


}