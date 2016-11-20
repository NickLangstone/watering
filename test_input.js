var gpio = require('rpi-gpio');
var sleep = require('sleep');

 
 
gpio.setup(11, gpio.DIR_IN, readInput);
 
function readInput() {
    gpio.read(11, function(err, value) {
        console.log('The value is ' + value);
    });
}

var idx =0;

while ( idx < 20 ) {

  readInput();
  sleep.sleep(1);
  idx++;
}

console.log("Ending");

