var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var gpio = require('rpi-gpio');
var engine = require('ejs-locals');
var twilio = require('twilio');
var url = require('url');

var app = express();

var client = new twilio.RestClient('', '');

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
				         if(err) console.log(err);
					 console.log('Offswitch is ' + value);
				    });
				};
				
				gpio.setup(18, gpio.DIR_IN, readOnswitchInput);

				function readOnswitchInput() {
				    gpio.read(18, function(err, value) {
					if(err) console.log(err);
				        console.log('Onswitch is ' + value);
				    });
				};
				renderIndex(res);
				res.end();
			});
            
            function closePins() {
                gpio.destroy(function() {
                    console.log('All pins unexported');
                    return process.exit(0);
                });
            };
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
					if(err) console.log(err);
				        console.log('Offswitch is ' + value);
				    });
				};
				
				gpio.setup(18, gpio.DIR_IN, readOnswitchInput);

				function readOnswitchInput() {
				    gpio.read(18, function(err, value) {
					if (err) console.log(err);
				        console.log('Onswitch is ' + value);
				    });
				};
				renderIndex(res);
				res.end();
			});
            function closePins() {
                gpio.destroy(function() {
                    console.log('All pins unexported');
                    return process.exit(0);
                });
            };
		};
	};
});

app.get('/bedroom',function(req, res){
	if(bedroomstatus == "on"){
		gpio.setup(21, gpio.DIR_OUT, bedroomwriteoff);
		function bedroomwriteoff(){
			gpio.write(21, true, function(err){
				if (err) console.log(err);
				bedroomstatus = "off";
				console.log("Bedroom lamp toggled off");
				
				gpio.setup(21, gpio.DIR_IN, readOffswitchInput);

				function readOffswitchInput() {
				    gpio.read(21, function(err, value) {
				        console.log('Offswitch is ' + value);
				    });
				};
				
				gpio.setup(22, gpio.DIR_IN, readOnswitchInput);

				function readOnswitchInput() {
				    gpio.read(22, function(err, value) {
				        console.log('Onswitch is ' + value);
				    });
				};
				renderIndex(res);
				//res.end();
			});
            function closePins() {
                gpio.destroy(function() {
                    console.log('All pins unexported');
                    return process.exit(0);
                });
            };
		};
	}
	else {
		gpio.setup(22, gpio.DIR_OUT, bedroomwrite);
		function bedroomwrite(){
			gpio.write(22, true, function(err){
				if (err) console.log(err);
				bedroomstatus = "on";
				console.log("Bedroom lamp toggled on");
				
				gpio.setup(21, gpio.DIR_IN, readOffswitchInput);

				function readOffswitchInput() {
				    gpio.read(21, function(err, value) {
				        console.log('Offswitch is ' + value);
				    });
				};
				
				gpio.setup(22, gpio.DIR_IN, readOnswitchInput);

				function readOnswitchInput() {
				    gpio.read(22, function(err, value) {
				        console.log('Onswitch is ' + value);
				    });
				};
				renderIndex(res);
				//res.end();
			});
            function closePins() {
                gpio.destroy(function() {
                    console.log('All pins unexported');
                    return process.exit(0);
                });
            };
		};
	};
});

app.get('/overhead',function(req, res){
	if(overheadstatus == "on"){
		gpio.setup(19, gpio.DIR_OUT, overheadwriteoff);
		function overheadwriteoff(){
			gpio.write(19, true, function(err){
				if (err) console.log(err);
				overheadstatus = "off";
				console.log("Overhead lamp toggled off");
				
				gpio.setup(19, gpio.DIR_IN, readOffswitchInput);

				function readOffswitchInput() {
				    gpio.read(19, function(err, value) {
				        console.log('Offswitch is ' + value);
				    });
				};
				
				gpio.setup(16, gpio.DIR_IN, readOnswitchInput);

				function readOnswitchInput() {
				    gpio.read(16, function(err, value) {
				        console.log('Onswitch is ' + value);
				    });
				};
				renderIndex(res);
				//res.end();
			});
            function closePins() {
                gpio.destroy(function() {
                    console.log('All pins unexported');
                    return process.exit(0);
                });
            };
		};
	}
	else {
		gpio.setup(16, gpio.DIR_OUT, overheadwrite);
		function overheadwrite(){
			gpio.write(16, true, function(err){
				if (err) console.log(err);
				overheadstatus = "on";
				console.log("Overhead lamp toggled on");
				
				gpio.setup(19, gpio.DIR_IN, readOffswitchInput);

				function readOffswitchInput() {
				    gpio.read(19, function(err, value) {
				        console.log('Offswitch is ' + value);
				    });
				};
				
				gpio.setup(16, gpio.DIR_IN, readOnswitchInput);

				function readOnswitchInput() {
				    gpio.read(16, function(err, value) {
				        console.log('Onswitch is ' + value);
				    });
				};
				renderIndex(res);
				//res.end();
			});
            function closePins() {
                gpio.destroy(function() {
                    console.log('All pins unexported');
                    return process.exit(0);
                });
            };
		};
	};
});

app.get('/sms', function(req, res){
	var sms = url.parse(req.url, true).query;
	console.log("SMS RECEIVED: " + sms.Body);
	
	switch(content.Body) {
	case 'toggle bedroom': console.log("toggling bedroom lights");
		break;
	case 'toggle overhead': console.log("toggling overhead lights");
		break;
	case 'toggle desk': console.log("toggling desk light");
		break;
	};
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Lighting controller listening on port ' + app.get('port'));
});
