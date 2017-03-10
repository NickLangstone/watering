var log4js = require('log4js');

//console log is loaded by default, so you won't normally need to do this
//log4js.loadAppender('console');
log4js.loadAppender('file');
//log4js.addAppender(log4js.appenders.console());
log4js.addAppender(log4js.appenders.file('/home/pi/watering/web.log'), 'mainlog');

var logger = log4js.getLogger('mainlog');
logger.setLevel('debug');

logger.debug('Logging established.');

module.exports=logger;
