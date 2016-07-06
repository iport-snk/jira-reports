var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var bill = require('./routes/bill');
var sprints = require('./routes/sprints');

var mysql = require('mysql');
var pool  = mysql.createPool({
    host     : 'df.fun.co.ua',
    user     : 'oleg',
    password : 'Mutabor73',
    database : 'jira_iport',
    multipleStatements: true
});


/*var r = require('rethinkdb');
r.connect({
    host: 'df.fun.co.ua',
    port: 28015,
    db: 'iport'
}, function(err, connection) {

});*/

var app = express();

//ENABLE CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://df.fun.co.ua/*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    return next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(function(req, res, next) {
    req.pool = pool;
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/bill', bill);
app.use('/sprints', sprints);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
