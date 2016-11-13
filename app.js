var express = require('express')
var app = express()

var log4js = require('log4js');
//var scheduled_tasks = require('scheduled_tasks.js');
var cron = require('node-cron');

// Setup the board and the ports assigned
var gpio = require('rpi-gpio');


var SW1_PORT = 17;
var M1_PORT = 25;
var SW2_PORT = 27;
var M2_PORT = 24;

gpio.setup(SW1_PORT, gpio.DIR_IN, gpio.EDGE_BOTH); // Input for valve switch - Rising edge = Open, Falling Edge = Closed
gpio.setup(SW2_PORT, gpio.DIR_IN, gpio.EDGE_BOTH); // Input for valve switch - Rising edge = Open, Falling Edge = Closed

gpio.setup(M1_PORT, gpio.DIR_OUT, write);      // output - valve motor
gpio.setup(M2_PORT, gpio.DIR_OUT, write);      // output - valve motor

function write() {
    gpio.write(7, true, function(err) {
        if (err) throw err;
        logger.debug('Written to pin');
    });
}

gpio.on('change', function(channel, value) {
    logger.info('Channel ' + channel + ' value is now ' + value);
	
	// Valve 1
    if ( channel == SW1_PORT && value == 1   )
	{
        logger.info( "===Rising edge detected on " + channel +" - Valve Open");
		gpio.write(M1_PORT,0);
	}
	if ( channel == SW1_PORT && value == 0   )
	{
        logger.info( "===Rising edge detected on " + channel +" - Valve Closed");
		gpio.write(M1_PORT,0);
	}
	//Valve 2
    if ( channel == SW2_PORT && value == 1   )
	{
        logger.info( "===Rising edge detected on " + channel +" - Valve Open");
		gpio.write(M2_PORT,0);
	}
    if ( channel == SW2_PORT && value == 0   )
	{
        logger.info( "===Rising edge detected on " + channel +" - Valve Closed");
		gpio.write(M2_PORT,0);
	}


});





var router = express.Router();
var path = __dirname + '/views/';





//console log is loaded by default, so you won't normally need to do this
//log4js.loadAppender('console');
log4js.loadAppender('file');
//log4js.addAppender(log4js.appenders.console());
log4js.addAppender(log4js.appenders.file('./web.log'), 'mainlog');

var logger = log4js.getLogger('mainlog');
logger.setLevel('debug');

logger.debug('Logging established.');

cron.schedule('* * * * *', function(){
  logger.debug('running a task every minute...... ' + new Date().toISOString() );
});


router.use(function (req,res,next) {
  logger.info("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

router.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000, function () {
  logger.info('Example app listening on port 3000!')
})


