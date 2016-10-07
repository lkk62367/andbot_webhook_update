// Module dependencies.
var express = require('express');
var routes = require('./routes');
var andbot = require('./routes/andbot');
var rugby = require('./routes/rugby');
var angel = require('./routes/angel');
var path = require('path');
var app = express();
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

var MongoClient = require('mongodb').MongoClient;
// Database
var db;

// setup mongo connection
MongoClient.connect('mongodb://52.198.123.110:27017/webhook', function (err, database) {
	if (err) {
		throw err;
	}
	else {
		db = database;
		console.log("Connected to db!");
	}
});

// make our db accessible to our router
app.use(function (req, res, next) {
	req.db = db;
	next();
});

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'uwotm8'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(errorHandler());
}

// routes
app.get('/', routes.andbot);
app.get('/rugby', routes.rugby);
app.get('/angel', routes.angel);



app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});


