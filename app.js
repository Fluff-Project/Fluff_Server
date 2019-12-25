const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const redis = require('redis');

require('dotenv').config();

const app = express();
var { sequelize } = require('./models');
//sequelize.sync();
const client = redis.createClient(6379,'54.180.65.91');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes'));
app.use('/myPage', require('./routes/myPage'));
app.use('/recommend', require('./routes/recommend'));
app.use('/sales', require('./routes/sales'));
app.use('/search', require('./routes/search'));
app.use('/users', require('./routes/users'));

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
  res.render('error');
});

module.exports = app;