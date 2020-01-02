const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const redis = require('redis');
const connect = require('./models/mongoConnect');

require('dotenv').config();

const app = express();
const client = redis.createClient(6379,'127.0.0.1');  // Local 실행
// const client = redis.createClient(6379,'fluff-redis');  // AWS 실행

app.use(function(req,res,next){
  req.cache = client;
  next();
})

connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes'));
app.use('/recommend', require('./routes/recommend'));
app.use('/goods', require('./routes/goods'));
app.use('/follow', require('./routes/follow'));
app.use('/shopper', require('./routes/shopper'));
app.use('/auth', require('./routes/auth'));
app.use('/survey', require('./routes/survey'));
app.use('/cart', require('./routes/cart'));
app.use('/order', require('./routes/order'));
app.use('/magazine', require('./routes/magazine'));
app.use('/management', require('./routes/management'));
app.use('/auction', require('./routes/auction'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;