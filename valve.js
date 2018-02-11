var logger = require('./logger.js');
var dateFormat = require('dateformat');
var fixedQueue = require('./fixedqueue.js');
var sleep = require('sleep');
var history = new fixedQueue(100);

var Gpio = require('onoff').Gpio,
  valve1 = new Gpio(17, 'in', 'both'),
  valve2 = new Gpio(27, 'in', 'both'),
  valve3 = new Gpio(22, 'in', 'both'),
  valve1Motor  = new Gpio(25, 'out'),
  valve2Motor  = new Gpio(24, 'out'),
  valve3Motor  = new Gpio(23, 'out');
  
var valve1State = null;
var valve1DesiredState = null;
var valve2State = null;
var valve2DesiredState = null;
var valve3State = null;
var valve3DesiredState = null;

var OFF = 0;
var ON = 1;  

valve1.watch(function(err, value) {
     logger.debug("Valve1, detected : " + value + "  err : " + err  + "  Desitred state : " + valve1DesiredState );
     sleep.msleep(50);  // Sleep fo 50ms to allow for microswitches to debounce and valve to complete its rotation

    if ( valve1DesiredState == "OPEN" && value == 1 ){
         valve1State = "OPEN";
         valve1Motor.writeSync(OFF);
     }
      else if ( valve1DesiredState == "CLOSED" && value == 0 ){
         valve1State = "CLOSED";
         valve1Motor.writeSync(OFF);
     }
    logger.debug("Valve1 is in state : " + valve1State );
});

valve2.watch(function(err, value) {
     logger.debug("Valve2, detected : " + value + "  err : " + err  + "  Desitred state : " + valve2DesiredState );
     sleep.msleep(50);  // Sleep fo 50ms to allow for microswitches to debounce and valve to complete its rotation

     if ( valve2DesiredState == "OPEN" && value == 1 ){
         valve2State = "OPEN";
         valve2Motor.writeSync(OFF);
     }
      else if ( valve2DesiredState == "CLOSED" && value == 0 ){
         valve2State = "CLOSED";
         valve2Motor.writeSync(OFF);
     }
     logger.debug("Valve2 is in state : " + valve1State );
});

valve3.watch(function(err, value) {
    logger.debug("Valve3, detected : " + value + "  err : " + err  + "  Desitred state : " + valve3DesiredState );
    sleep.msleep(50);  // Sleep fo 50ms to allow for microswitches to debounce and valve to complete its rotation

    if ( valve3DesiredState == "OPEN" && value == 1 ){
        valve3State = "OPEN";
        valve3Motor.writeSync(OFF);
    }
    else if ( valve3DesiredState == "CLOSED" && value == 0 ){
        valve3State = "CLOSED";
        valve3Motor.writeSync(OFF);
    }
    logger.debug("Valve3 is in state : " + valve1State );
});


function valve1Turn(){
    valve1Motor.writeSync(ON);
    logger.debug("Valve1 - turning");
    
}
function valve2Turn(){
    valve2Motor.writeSync(ON);
    logger.debug("Valve2 - turning");
}
function valve3Turn(){
    valve3Motor.writeSync(ON);
    logger.debug("Valve3 - turning");
}

//---------------
var openValve1 = function valve1Open(){
   logger.debug("valve1Open() ");
   valve1DesiredState = "OPEN";

   if ( valve1State == null )
   {
    logger.debug("State unknown");
    valve1Turn();
    }
   if ( valve1State == "CLOSED" )
   {
    valve1Turn();
    }
	history.push( { time: dateFormat(), action: "Valve 1 Opened"});
};

var closeValve1 = function valve1Close(){
  logger.debug("valve1Close() ");
   valve1DesiredState = "CLOSED";

   if ( valve1State == null )
   {
    logger.debug("State unknown");
    valve1Turn();
    }
   if ( valve1State == "OPEN" )
   {
    valve1Turn();
    }
	history.push( { time: dateFormat(), action: "Valve 1 Closed"});
};


//---------------
var openValve2 = function valve2Open(){
   logger.debug("valve2Open() ");
   valve2DesiredState = "OPEN";
   if ( valve2State == null )
   {
    logger.debug("State unknown");
    valve2Turn();
    }
      if ( valve2State == "CLOSED" )
   {
    valve2Turn();
    }
	history.push( { time: dateFormat(), action: "Valve 2 Opened"});
};

var closeValve2 = function valve2Close(){
   logger.debug("valve2Close() ");
   valve2DesiredState = "CLOSED";

   if ( valve2State == null )
   {
    logger.debug("State unknown");
    valve2Turn();
    }
   if ( valve2State == "OPEN" )
   {
    valve2Turn();
    }
	history.push( { time: dateFormat(), action: "Valve 2 Closed"});

};



//---------------
var openValve3 = function valve3Open(){
    logger.debug("valve3Open() ");
    valve3DesiredState = "OPEN";
    if ( valve3State == null )
    {
        logger.debug("State unknown");
        valve3Turn();
    }
    if ( valve3State == "CLOSED" )
    {
        valve3Turn();
    }
    history.push( { time: dateFormat(), action: "Valve 3 Opened"});
};

var closeValve3 = function valve3Close(){
    logger.debug("valve3Close() ");
    valve3DesiredState = "CLOSED";

    if ( valve3State == null )
    {
        logger.debug("State unknown");
        valve3Turn();
    }
    if ( valve3State == "OPEN" )
    {
        valve3Turn();
    }
    history.push( { time: dateFormat(), action: "Valve 3 Closed"});
};
//---------------


function getStatus(){

	return  { status : [ { name : "Valve1", status: valve1State},{ name : "Valve2", status: valve2State},{ name : "Valve3", status: valve3State}], history: history.getItems(), time :  dateFormat() };
}


// Cleanup
function exit() {
    valve1.unexport();
    valve1Motor.unexport();
    valve2.unexport();
    valve2Motor.unexport();
    valve3.unexport();
    valve3Motor.unexport();
    process.exit();
}
process.on('SIGINT', exit);

exports.openValve1 = openValve1;
exports.openValve2 = openValve2;
exports.openValve3 = openValve3;
exports.closeValve1 = closeValve1;
exports.closeValve2 = closeValve2;
exports.closeValve3 = closeValve3;
exports.getStatus = getStatus;

