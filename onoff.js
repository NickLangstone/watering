

var Gpio = require('onoff').Gpio,
  valve1 = new Gpio(17, 'in', 'both'),
  valve2 = new Gpio(27, 'in', 'both'),
  valve1Motor  = new Gpio(25, 'out');
  
var valve1State = null;
var valve1DesiredState = null;
var valve2State = null;
var valve2DesiredState = null;

var OFF = 0;
var ON = 1;  

valve1.watch(function(err, value) {
 console.log("Valve1, detected : " + value + "  err : " + err );
 sleep.usleep(100);
 
 if ( valve1DesitedState == "OPEN" && value == 1 ){
     valve1State = "OPEN";
     valve1Motor.writeSync(OFF);
 }
  else if ( valve1DesitedState == "CLOSED" && value == 0 ){
     valve1Motor.writeSync(OFF);
     valve1State = "CLOSED";
 }
 console.log("Valve1 is in state : " + valve1State );

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
    valve1Motor.writeSync(ON);
	console.log("Valve1 - turning");
	
}

function valve1Open(){
   console.log("valve1Open() ");


   if ( valve1State == null )
   {
		console.log("State unknown");
                valve1DesitedState = "OPEN";
		valve1Turn();
                console.log("Valve1 is in state : " + valve1State );
        if ( valve1State == "CLOSED" ) {
                valve1DesitedState = "CLOSED";
		valve1Turn();  // we want it open - so keep turning
	}
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



