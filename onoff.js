var Gpio = require('onoff').Gpio,
  valve1 = new Gpio(17, 'in', 'both'),
  valve2 = new Gpio(27, 'in', 'both'),
  valve1Motor  = new Gpio(25, 'out');
  
var valve1State = null;
var valve2State = null;

var OFF = 0;
var ON = 1;  

valve1.watch(function(err, value) {
 console.log("Valve1, detected : " + value + "  err : " + err );
 valve1Motor.writeSync(OFF);
 if ( 1 == value ) {
	valve1State = "OPEN";
 }
 else
	valve1State = "CLOSED";
});

valve2.watch(function(err, value) {
 console.log("Valve2, detected : " + value + "  err : " + err );
  if ( 1 == value ) {
	valve2State = "OPEN";
 }
 else
	valve2State = "CLOSED";
});

function valve1Turn(){
    valve1.writeSync(ON);
	console.log("Valve1 - turning");
	
}

function valve1Open(){
   if ( valve1State == null )
   {
		console.log("State unknown");
		valve1Turn();
		sleep.sleep(3); // wait for the valve to turn to find out the state
   }
      if ( valve1State == "CLOSED" )
   {
		valve1Turn();
	}
}

// Cleanup
function exit() {
    valve1.unexport();
    valve1Motor.unexport();
	valve2.unexport();
   //valve2Motor.unexport();
    process.exit();
}
process.on('SIGINT', exit);