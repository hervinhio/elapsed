var Elapsed = require('./index.js');

var now = new Date();
var then = new Date(2013, 03, 15, 15, 22);

console.log(now, then);

var elapsedTime = new Elapsed(new Date(2013, 05, 2), new Date(2013, 05, 25));

console.log(elapsedTime.seconds.text);

console.log(elapsedTime.minutes.text);

console.log(elapsedTime.hours.text);

console.log(elapsedTime.days.text);

console.log(elapsedTime.weeks.text);

console.log(elapsedTime.months.text);

console.log(elapsedTime.years.text);

console.log(elapsedTime.optimal);