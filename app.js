
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var mongoose = require("mongoose");

var index = require('./routes/index');
var home = require("./routes/home");
var login = require("./routes/login");
var app = express();

//database setup
var db_url = "mongodb://nguyen:nguyen@ds263707.mlab.com:63707/online-chess";
var mongoDB = db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error',console.error.bind(console,'Database connection error'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); 
app.locals.basedir = path.join(__dirname, 'views');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:"i love cookies",
    resave:true,
    saveUninitialized:true
  }));

app.get('/', (req,res)=>{
  res.redirect("/home");
});
app.use('/home',home);
app.use('/login',login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//start the server with "start": "nodemon ./bin/www/app.js" in package.json

module.exports = app;
