const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const redis = require('redis');
const connect = require('./models/mongoConnect');

require('dotenv').config();

const app = express();
// const client = redis.createClient(6379,'127.0.0.1');  // Local 실행
// const client = redis.createClient(6379,'redis');  // AWS 실행

connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes'));
app.use('/myPage', require('./routes/myPage'));
app.use('/recommend', require('./routes/recommend'));
app.use('/goods', require('./routes/goods'));
app.use('/search', require('./routes/search'));
app.use('/auth', require('./routes/auth'));

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