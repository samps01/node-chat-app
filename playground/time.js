const moment = require('moment');

let createdAt = new Date().getTime();
console.log(createdAt)

let date = moment(1497026350075).fromNow();

console.log(date);