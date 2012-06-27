var reds = require('reds');
var search = reds.createSearch('questions');

var answers = [];

answers.push("John Bowe's email is: jb@jb.com");
answers.push("Bernie's office hours are: 11.00am - 12.00pm");

module.exports = answers;