var cron = require('node-cron');

cron.schedule('* * * * *', function(){
  logger.debug('running a task every minute......');
});
