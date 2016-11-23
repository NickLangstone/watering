
var logger = require('./logger.js');
  
var valve1State = null;
var valve1DesiredState = null;
var valve2State = null;
var valve2DesiredState = null;

var OFF = 0;
var ON = 1;  

logger.error("USING FAKE VALVES");


var openValve1 = function valve1Open(){
   logger.debug("valve1Open() ");
   valve1DesiredState = "OPEN";
   valve1State = "OPEN";
   logger.debug("valve1Open()  state :" + valve1State);

}


var closeValve1 = function valve1Close(){
   logger.debug("valve1Close() ");
   valve1DesiredState = "CLOSED";
   valve1State = "CLOSED";
   logger.debug("valve1Open()  state :" + valve1State);
}

var openValve2 = function valve2Open(){
   logger.debug("valve2Open() ");
   valve2DesiredState = "OPEN";
   valve2State = "OPEN" ;
  
}

var closeValve2 = function valve2Close(){
   logger.debug("valve2Close() ");
   valve2DesiredState = "CLOSED";
   valve2State = "CLOSED";
   logger.debug("valve2Open()  state :" + valve2State);
}

var statusValve1 = function statusValve1(){
    return valve1State;
}

var statusValve2 = function statusValve2(){
   return valve2State ;
}

exports.openValve1 = openValve1;
exports.openValve2 = openValve2;
exports.closeValve1 = closeValve1;
exports.closeValve2 = closeValve2;
exports.statusValve1 = valve1State;
exports.statusValve2 = valve2State;

