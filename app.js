
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
var title = "Lighting Control"
var deskstatus;
var bedroomstatus;
var overheadstatus;

//Render Functions
function renderIndex(res){
	res.render('index.ejs',{title: title, deskflash: deskstatus, bedroomflash: bedroomstatus, overheadflash: overheadstatus});
};

app.get('/', function(req, res){
	renderIndex(res);
});

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
				
				gpio.setup(23, gpio.DIR_IN, readOffswitchInput);

				function readOffswitchInput() {
				    gpio.read(23, function(err, value) {
				        console.log('Offswitch is ' + value);
				    });
				};
				
				gpio.setup(18, gpio.DIR_IN, readOnswitchInput);

				function readOnswitchInput() {
				    gpio.read(18, function(err, value) {
				        console.log('Onswitch is ' + value);
				    });
				};
				renderIndex(res);
				//res.end();
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
				
				gpio.setup(23, gpio.DIR_IN, readOffswitchInput);

				function readOffswitchInput() {
				    gpio.read(23, function(err, value) {
				        console.log('Offswitch is ' + value);
				    });
				};
				
				gpio.setup(18, gpio.DIR_IN, readOnswitchInput);

				function readOnswitchInput() {
				    gpio.read(18, function(err, value) {
				        console.log('Onswitch is ' + value);
				    });
				};
				renderIndex(res);
				//res.end();
			});
		};
	};
	
	
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
