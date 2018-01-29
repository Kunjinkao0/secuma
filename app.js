var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(cors());

var basicAuth = require('express-basic-auth');
app.use(basicAuth({
    users: { 'admin': 'qqqqqq' }
}));

// allow cross origin access
// app.all('*',function(req,res,next){
// 	res.header("Access-Control-Allow-Origin","*");
// 	res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type");
// 	res.header("Access-Control-Allow-Methods","POST,GET");
// 	// res.header("X-Powered-By","3.2.1");
// 	// res.header("Content-Type","application/json;charset=utf-8");
// 	// res.header("Content-Type", "text/html;charset=utf-8");
// 	next();
// });


// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var index = require('./routes/index');
var zdir = require('./secuma/dirapi');

app.use('/', index);
app.use('/secuma', zdir);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
