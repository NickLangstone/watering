var cron = require('node-cron');
var logger = require('./logger.js');

// use a fake valve if not running on a RaspberryPi
var config = require('./config.js');
if ( config.fakevalves) {
  var valve = require('./fakevalve.js');
} else {
	var valve = require('./valve.js');
}


/*

Cron Format   https://github.com/merencia/node-cron

 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
*/

//cron.schedule('*/20 * * * * *', function(){
//  logger.debug('20  running a task every minute...... ' + new Date().toISOString() );
//  
  // make sure we know the state of the valves.
//});

// open 6:05
cron.schedule('6 5 * * *', function(){
    logger.debug('CRON Open Valve 1 ');
    valve.openValve1();     
});
// close 6:10
cron.schedule('6 10 * * *', function(){
    logger.debug('CRON Close Valve 1 ');
    valve.closeValve1();     
});

module.export = cron;