var fixedQueue = require('./fixedQueue.js');


var jobs = new fixedQueue(5);



console.log( JSON.stringify(jobs) );

jobs.push( { id: 11});
console.log( JSON.stringify(jobs.getItems()) );
jobs.push( { id: 12});
jobs.push( { id: 13});
console.log(" Array length :" + jobs.getCount());
jobs.push( { id: 14});
jobs.push( { id: 15});
console.log( JSON.stringify(jobs.getItems()) );
jobs.push( { id: 11});
jobs.push( { id: 12});
jobs.push( { id: 13});
jobs.push( { id: 14});
console.log(" Array length :" + jobs.getCount());


jobs.push( { id: 15});
jobs.push( { id: 11});
jobs.push( { id: 12});
jobs.push( { id: 13});
console.log( JSON.stringify(jobs.getItems()) );
jobs.push( { id: 14});
jobs.push( { id: 15});
jobs.push( { id: 11});
jobs.push( { id: 12});
jobs.push( { id: 13});
jobs.push( { id: 14});
jobs.push( { id: 15});
console.log( JSON.stringify(jobs.getItems()) );


jobs.push( { id: 21});
jobs.push( { id: 22});
jobs.push( { id: 23});
jobs.push( { id: 24});
	jobs.push( { time: new Date(), action: "Valve 1 opened"});

jobs.push( { id: 25});

console.log( JSON.stringify(jobs.getItems()) );


