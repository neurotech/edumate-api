'use strict';

var chalk = require('chalk');
var moment = require('moment');

var server = require('./lib/hapi');
var timetable = require('./lib/api/timetable');
var queries = require('./lib/api/queries');
var config = require('./config');

(function spinUp () {
  var today = chalk.magenta(moment().format('DD/MM/YY'));
  var now = chalk.yellow(moment().format('HH:mm:ss'));
  console.log('Starting ' + chalk.green('edumate-toolbelt') + ' on ' + today + ' at ' + now);
  console.log(chalk.cyan('API: ') + chalk.underline('http://' + config.http.host + ':' + config.http.port));
  console.log(chalk.blue('Edumate: ') + process.env.EDUMATE_USERNAME + '@' + process.env.EDUMATE_HOST + ':' + process.env.EDUMATE_PORT + process.env.EDUMATE_PATH);
}());

// Iterate over `./lib/api/queries` and pass each one to ``./lib/api/timetable`
for (var key in queries) {
  if (queries.hasOwnProperty(key)) {
    timetable.replaceJob(queries[key].dataset, queries[key].sql, queries[key].schedule);
    console.log(chalk.red('Scheduled job: ') + queries[key].dataset);
  }
}

server.start();
