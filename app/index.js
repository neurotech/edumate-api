'use strict';

const moment = require('moment');
const config = require('./config');
const server = require('./lib/hapi');
const queries = require('./lib/db/queries');
const timetable = require('./lib/timetable');

server.start(function () {
  var today = moment().format('DD/MM/YY');
  var now = moment().format('HH:mm:ss');
  var logNow = moment().format('YYYY-MM-DD HH:mm:ss');
  var edumateString = `${config.edumate.username}@${config.edumate.host}:${config.edumate.port}/${config.edumate.suffix}`;

  // Log a basic startup message
  console.log(`
    Starting edumate-api on ${today} at ${now}
    hapi server: http://${server.info.address}:${server.info.port}
    Edumate Connection String: ${edumateString}
  `);

  // Iterate over `./lib/api/queries` and pass each one to `./lib/api/timetable`
  for (var key in queries) {
    if (queries.hasOwnProperty(key)) {
      timetable.replaceJob(queries[key].dataset, queries[key].sql, queries[key].schedule);
      console.log(`[${logNow}] Scheduled job: ${queries[key].dataset}`);
    }
  }
});
