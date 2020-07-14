var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var app = express();




const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/heroesTour";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(function(req, res, next){
    req.mongo = client;
    next();
  })
  app.use('/', indexRouter);
  app.use('/api', apiRouter);
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    console.log(req.url);
    next(createError(404));
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

  
});
module.exports = app;