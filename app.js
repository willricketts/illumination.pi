
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

app.get('/', routes.index);

app.get('/status', function(req, res){
	res.render('status.ejs', {title: "Lighting Status"});
});

app.get('/desk',function(req, res){
	function toggledesk(){
		var status = "off";
		gpio.setup(18, gpio.DIR_OUT, write);
		gpio.setup(23, gpio.DIR_OUT, write);
		
		if(status == "off"){
			gpio.destroy(23, function(err){
				if(err) console.log(err);
			});
			function write(){
				gpio.write(18, true, function(err){
					if (err) console.log(err);
					status = "on";
					console.log("Desk lamp toggled");
				});
			};
		}
		else {
			gpio.destroy(18, function(err){
				if(err) console.log(err);
			});
			function write(){
				gpio.write(23, true, function(err){
					if (err) console.log(err);
					status = "off";
					console.log("Desk lamp toggled");	
				});
			};
		};
	};
	toggledesk();
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
