'use strict';
const chalk = require('chalk');
const moment = require('moment');

const server = require('./lib/hapi');
const timetable = require('./lib/api/timetable');
const queries = require('./lib/api/queries');
const config = require('./config');

server.start(function () {
  var today = chalk.magenta(moment().format('DD/MM/YY'));
  var now = chalk.yellow(moment().format('HH:mm:ss'));
  var api = 'http://' + config.http.host + ':' + config.http.port;
  var edumateString = process.env.EDUMATE_USERNAME + '@' + process.env.EDUMATE_HOST + ':' + process.env.EDUMATE_PORT + '/' + process.env.EDUMATE_PATH;

  // Log a basic startup message
  console.log(
    `
      Starting ${chalk.green('edumate-api')} on ${today} at ${now}.
      ${chalk.cyan('API: ')} ${chalk.underline(api)}
      ${chalk.blue('Edumate: ')} ${chalk.white(edumateString)}
    `
  );

  // Iterate over `./lib/api/queries` and pass each one to ``./lib/api/timetable`
  for (var key in queries) {
    if (queries.hasOwnProperty(key)) {
      timetable.replaceJob(queries[key].dataset, queries[key].sql, queries[key].schedule);
      console.log(`${chalk.red('Scheduled job: ')} ${queries[key].dataset}`);
    }
  }
});
