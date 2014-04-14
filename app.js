// dependencies

var express = require('express');
var http = require('http');
var path = require('path');
var swig = require('swig');

var app = express();

// configuration

var views = __dirname + '/views';

app.configure(function(){
	app.engine('.html', swig.renderFile);
	app.set('view engine', 'html');
	app.set('views', views);
	app.set('port', process.env.PORT || 3000);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('__SECRET__'));
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

// routes

app.get('/', function(req, res) {
	res.render('index', { greeting: 'welcome' });
});

// run

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});

