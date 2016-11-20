var express = require('express')
var app = express()

var log4js = require('log4js');
//var scheduled_tasks = require('scheduled_tasks.js');
var cron = require('node-cron');

var valve = require('./valve.js');




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
  
  // make sure we know the state of the valves.
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


