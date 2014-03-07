
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var gpio = require('rpi-gpio');
var engine = require('ejs-locals');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', engine);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//STATUS VARIABLES
var deskstatus;

app.get('/', routes.index);

app.get('/status', function(req, res){
	res.render('status.ejs', {title: "Lighting Status"});
});

app.get('/desk',function(req, res){	
	if(deskstatus == "on"){
		gpio.setup(23, gpio.DIR_OUT, deskwriteoff);
		function deskwriteoff(){
			gpio.write(23, true, function(err){
				if (err) console.log(err);
				deskstatus = "off";
				console.log("Desk lamp toggled off");
			});
		};
	}
	else {
		gpio.setup(18, gpio.DIR_OUT, deskwrite);
		function deskwrite(){
			gpio.write(18, true, function(err){
				if (err) console.log(err);
				deskstatus = "on";
				console.log("Desk lamp toggled on");
			});
		};
	};		
	res.redirect("/");
});

app.get('/bedroom',function(req, res){
	console.log("Bedroom lighting toggled");
	res.redirect("/");
});

app.get('/overhead',function(req, res){
	console.log("Overhead lighting toggled");
	res.redirect("/");
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Lighting controller listening on port ' + app.get('port'));
});
