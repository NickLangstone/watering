var Gpio = require('onoff').Gpio,
 // led = new Gpio(14, 'out'),
  button = new Gpio(17, 'in', 'both');

button.watch(function(err, value) {
 console.log("Pin 17, detected : " + value + "  err : " + err );
});