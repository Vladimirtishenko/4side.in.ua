var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config/');
var app = express();
var mongoose = require('./lib/mongoose');
var i18n=require("i18n-express");
var geolang=require("geolang-express");
var MongoStore = require('connect-mongo/es5')(session);
var ErrorSelf = require('./middleware/ErrorSelf').ErrorSelf;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images/', 'fav16.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));

app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    resave: config.get('session:resave'),
    saveUninitialized: config.get('session:saveUninitialized'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(geolang({
  siteLangs: ["en","ru"],
  cookieLangName: "lang"
}));


app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'),
  siteLangs: ["en","ru"],
  defaultLang: "ru",
  cookieLangName: "lang"
}));



require('./routes')(app);
require('./routes/manage')(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  ErrorSelf(res, err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    ErrorSelf(res, err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  ErrorSelf(res, err);
});


module.exports = app;

app.listen(config.get("port"), function () {
  console.log("4 Side server is started on port "+config.get("port"));
})