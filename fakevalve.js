
var logger = require('./logger.js');
var fixedQueue = require('./fixedqueue.js');
var dateFormat = require('dateformat');
var history = new fixedQueue(100);
  
var valve1State = null;
var valve1DesiredState = null;
var valve2State = null;
var valve2DesiredState = null;
var valve3State = null;
var valve3DesiredState = null;


var OFF = 0;
var ON = 1;  

logger.error("USING FAKE VALVES");


var openValve1 = function valve1Open(){
   logger.debug("valve1Open() ");
   valve1DesiredState = "OPEN";
   valve1State = "OPEN";
   logger.debug("valve1Open()  state :" + valve1State);
   history.push( { time: dateFormat(), action: "Valve 1 Opened"});
};

var closeValve1 = function valve1Close(){
   logger.debug("valve1Close() ");
   valve1DesiredState = "CLOSED";
   valve1State = "CLOSED";
   logger.debug("valve1Open()  state :" + valve1State);
   history.push( { time: dateFormat(), action: "Valve 1 Closed"});
};
//------------------------------

var openValve2 = function valve2Open(){
   logger.debug("valve2Open() ");
   valve2DesiredState = "OPEN";
   valve2State = "OPEN" ;
   history.push( { time: dateFormat(), action: "Valve 2 Opened"});
};

var closeValve2 = function valve2Close(){
   logger.debug("valve2Close() ");
   valve2DesiredState = "CLOSED";
   valve2State = "CLOSED";
   logger.debug("valve2Close()  state :" + valve2State);
   history.push( { time: dateFormat(), action: "Valve 2 Closed"});
};
//------------------------------

var openValve3 = function valve3Open(){
    logger.debug("valve3Open() ");
    valve3DesiredState = "OPEN";
    valve3State = "OPEN" ;
    logger.debug("valve3Open()  state :" + valve3State);
    history.push( { time: dateFormat(), action: "Valve 3 Opened"});
};

var closeValve3 = function valve3Close(){
    logger.debug("valve3Close() ");
    valve3DesiredState = "CLOSED";
    valve3State = "CLOSED";
    logger.debug("valve3Close()  state :" + valve3State);
    history.push( { time: dateFormat(), action: "Valve 3 Closed"});
};
//--------------------------------

function getStatus(){

	if ( null == valve1State || null == valve2State || null == valve3State ) {
	// only randomize if we do not know the current state.
		var statusArray = [
			'OPEN',
			'CLOSED'
		];
		var randomNumber1 = Math.floor(Math.random()*statusArray.length);
        var randomNumber2 = Math.floor(Math.random()*statusArray.length);
        var randomNumber3 = Math.floor(Math.random()*statusArray.length);

		return  { status : [ { name : "Valve1", status: statusArray[randomNumber1]},{ name : "Valve2", status: statusArray[randomNumber2]},{ name : "Valve3", status: statusArray[randomNumber3]}], history: history.getItems() , time :  dateFormat()};
	}
	else
		return  { status : [ { name : "Valve1", status: valve1State},{ name : "Valve2", status: valve2State},{ name : "Valve3", status: valve3State}], history: history.getItems() , time :  dateFormat()};

};

exports.openValve1 = openValve1;
exports.openValve2 = openValve2;
exports.openValve3 = openValve3;

exports.closeValve1 = closeValve1;
exports.closeValve2 = closeValve2;
exports.closeValve3 = closeValve3;

exports.getStatus = getStatus;

