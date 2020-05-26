var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var literalsRouter = require('./routes/literals');
var tokenizeRouter = require('./routes/tokenize');
var networkclient = require('../networkclient/NetworkClient')
var app = express();
const port = 3000;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/literals', literalsRouter);
app.use('/tokenize', tokenizeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
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
