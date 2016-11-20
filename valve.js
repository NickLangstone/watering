

var Gpio = require('onoff').Gpio,
  valve1 = new Gpio(17, 'in', 'both'),
  valve2 = new Gpio(27, 'in', 'both'),
  valve1Motor  = new Gpio(25, 'out'),
  valve2Motor  = new Gpio(24, 'out');
  
var valve1State = null;
var valve1DesiredState = null;
var valve2State = null;
var valve2DesiredState = null;

var OFF = 0;
var ON = 1;  

valve1.watch(function(err, value) {
	 console.log("Valve1, detected : " + value + "  err : " + err  + "  Desitred state : " + valve1DesiredState );
	 
	 if ( valve1DesiredState == "OPEN" && value == 1 ){
		 valve1State = "OPEN";
		 valve1Motor.writeSync(OFF);
	 }
	  else if ( valve1DesiredState == "CLOSED" && value == 0 ){
		 valve1State = "CLOSED";
		 valve1Motor.writeSync(OFF);
	 }
	 console.log("Valve1 is in state : " + valve1State );
});

valve2.watch(function(err, value) {
	 console.log("Valve2, detected : " + value + "  err : " + err  + "  Desitred state : " + valve2DesiredState );
	 
	 if ( valve2DesiredState == "OPEN" && value == 1 ){
		 valve2State = "OPEN";
		 valve2Motor.writeSync(OFF);
	 }
	  else if ( valve2DesiredState == "CLOSED" && value == 0 ){
		 valve2State = "CLOSED";
		 valve2Motor.writeSync(OFF);
	 }
	 console.log("Valve2 is in state : " + valve1State );
});


function valve1Turn(){
    valve1Motor.writeSync(ON);
	console.log("Valve1 - turning");
	
}

function valve2Turn(){
    valve2Motor.writeSync(ON);
	console.log("Valve2 - turning");
	
}

var openValve1 = function valve1Open(){
   console.log("valve1Open() ");
   valve1DesiredState = "OPEN";

   if ( valve1State == null )
   {
	console.log("State unknown");
	valve1Turn();
    }
   if ( valve1State == "CLOSED" )
   {
	valve1Turn();
	}
}


var closeValve1 = function valve1Close(){
   console.log("valve1Close() ");
   valve1DesiredState = "CLOSED";

   if ( valve1State == null )
   {
	console.log("State unknown");
	valve1Turn();
	}
   if ( valve1State == "OPEN" )
   {
	valve1Turn();
	}
}





var openValve2 = function valve2Open(){
   console.log("valve2Open() ");
   valve2DesiredState = "OPEN";
   if ( valve2State == null )
   {
	console.log("State unknown");
	valve2Turn();
	}
      if ( valve2State == "CLOSED" )
   {
	valve2Turn();
	}
}

var closeValve2 = function valve2Close(){
   console.log("valve2Close() ");
   valve2DesiredState = "CLOSED";

   if ( valve2State == null )
   {
	console.log("State unknown");
	valve2Turn();
	}
   if ( valve2State == "OPEN" )
   {
	valve2Turn();
	}
}


// Cleanup
function exit() {
    valve1.unexport();
    valve1Motor.unexport();
	valve2.unexport();
   valve2Motor.unexport();
    process.exit();
}
process.on('SIGINT', exit);

exports.openValve1 = openValve1;
exports.openValve2 = openValve2;
exports.closeValve1 = closeValve1;
exports.closeValve2 = closeValve2;

