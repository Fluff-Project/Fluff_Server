const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const redis = require('redis');
const mongoose = require('mongoose');

require('dotenv').config();

let db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongod server");
});
mongoose.connect('mongodb+srv://fluff:'+process.env.MONOOSE_PWD+'@fluff-kitpk.mongodb.net/fluff?retryWrites=true&w=majority', {useUnifiedTopology: true , useNewUrlParser: true });


const app = express();
const client = redis.createClient(6379,'127.0.0.7');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes'));
app.use('/myPage', require('./routes/myPage'));
app.use('/recommend', require('./routes/recommend'));
app.use('/sales/items', require('./routes/sales/items'));
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