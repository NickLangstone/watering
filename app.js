var express = require('express')
var app = express()
var logger = require('./logger.js');

// use a fake valve if not running on a RaspberryPi
var config = require('./config.js');
if ( config.fakevalves) {
  var valve = require('./fakevalve.js');
} else {
	var valve = require('./valve.js');
}
var schedule = require('./scheduled_tasks.js');

var router = express.Router();
var path = __dirname + '/views/';

app.use(express.static('public'))

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

router.get("/close1",function(req,res){
  logger.debug("close1 called");
  valve.closeValve1();
  res.sendFile(path + "index.html");
});

router.get("/open1",function(req,res){
    logger.debug("open1 called");
    valve.openValve1();
    res.sendFile(path + "index.html");
});

function close1(){
 logger.debug("open1for5min 5 min timeout function called -- closing valve");
valve.closeValve1();
}
router.get("/valve/:valve/time/:time",function(req,res){
    logger.debug("open  valve " + req.params.valve + " called for time:" + req.params.time);
	if ( req.params.valve == 1 ) {
		valve.openValve1();
		setTimeout( close1 , req.params.time *1000 );
	}
	if ( req.params.valve == 2 ) {
		valve.openValve2();
		setTimeout( close2 , req.params.time *1000 );
	}
    res.sendFile(path + "index.html");
});

router.get("/close2",function(req,res){
  logger.debug("close2 called");
  valve.closeValve2();
  res.sendFile(path + "index.html");
});

router.get("/open2",function(req,res){
    logger.debug("open2 called");
    valve.openValve2();
    res.sendFile(path + "index.html");
});

router.get("/getvalvestatus",function(req,res){
    logger.debug("getvalvestatus called");
	
	//var status = { status : [ { name : "Valve1", status: "OPEN"},{ name : "Valve2", status: "OPEN"}]};
//	valve.getStatus()
  // logger.debug("getvalvestatus called - Status :" + JSON.stringify(valve.getStatus()) );
    res.json(valve.getStatus());
});

function close2(){
 logger.debug("open2for5min 5 min timeout function called -- closing valve");
valve.closeValve2()
}
router.get("/valve/2/time/:time",function(req,res){
    logger.debug("open2for5min called time:" + req.params.time);
    valve.openValve2();
	setTimeout( close2 , req.params.time *1000 );
    res.sendFile(path + "index.html");
});


app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000, function () {
  logger.info('Watering app listening on port 3000!')
  
  logger.info('Closing Valves to ensure we are not loosing water !!')
  valve.closeValve1()
  valve.closeValve2()
})


