var CheckAuth = require("../middleware/checkAuthorize");

module.exports = function(app){

app.get("/login", require("./login").get);
app.post("/login", require("./login").post);

app.get("/manage", CheckAuth, require("./general_manage").get);
app.post("/manage", CheckAuth, require("./general_manage").post);

app.get("/manage/About", CheckAuth, require("./about_manage").get);
app.post("/manage/About", CheckAuth, require("./about_manage").post);

app.get("/manage/Team", CheckAuth ,require("./team_manage").get);
app.post("/manage/Team", CheckAuth, require("./team_manage").post);
app.delete("/manage/Team", CheckAuth, require("./team_manage").delete);

app.get("/manage/Portfolio", CheckAuth, require("./portfolio_manage").get);
app.post("/manage/Portfolio", CheckAuth, require("./portfolio_manage").post);
app.delete("/manage/Portfolio", CheckAuth, require("./portfolio_manage").delete);


app.get("/manage/PortfolioElse", CheckAuth, require("./portfolio_else_manage").get);
app.post("/manage/PortfolioElse", CheckAuth, require("./portfolio_else_manage").post);
app.delete("/manage/PortfolioElse", CheckAuth, require("./portfolio_else_manage").delete);

app.get("/manage/Contact", CheckAuth, require("./contact_manage").get);
app.post("/manage/Contact", CheckAuth, require("./contact_manage").post);


}