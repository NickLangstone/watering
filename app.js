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



app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000, function () {
  logger.info('Watering app listening on port 3000!')
})


