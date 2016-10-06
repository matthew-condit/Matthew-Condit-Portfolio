var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mailer = require('express-mailer');
var sitemap = require('express-sitemap')();

var routes = require('./routes/index');
var users = require('./routes/users');
var about = require('./routes/about');
var resume = require('./routes/resume');
var works = require('./routes/works');
var countdown = require('./routes/countdown');
var weather = require('./routes/weather');
var blog = require('./routes/blog');
var user = require('./routes/user');
var login = require('./routes/login');
var signup = require('./routes/signup');
var newblog = require('./routes/newblog');
var router = require('./api');
var email = require('./routes/sendEmail');
var app = express();

require('./data/database');
require('./data/seed');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/about', about);
app.use('/resume', resume);
app.use('/works', works);
app.use('/countdown', countdown);
app.use('/weather', weather);
app.use('/blog', blog);
app.use('/users', user);
app.use('/login', login);
app.use('/signup', signup);
app.use('/newblog', newblog);
app.use('/sendEmail', email);
app.use('/api', router);

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

sitemap.generate(app);
module.exports = app;
