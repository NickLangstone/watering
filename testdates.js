var logger = require('./logger.js');
var dateFormat = require('dateformat');


var data= { time: new Date(), formattedDate: dateFormat(), action: "Valve 1 Closed"};

logger.debug("Data : " + JSON.stringify(data));

