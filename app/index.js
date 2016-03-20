'use strict';

const moment = require('moment');
const config = require('./config');
const server = require('./lib/hapi');
const postgres = require('./lib/db');
const queries = require('./lib/api/queries');

const staff = require('./staff');

var db = postgres;
db.connect(function (err) {
  if (err) {
    return console.error('Could not connect to edumate-api-db!', err);
  }
  for (var result in staff) {
    if (staff.hasOwnProperty(key)) {
      db.query('INSERT INTO visit (date) VALUES ($1)', [new Date()], function (err, result) {
        if (err) {
          return console.error('Error running query!', err);
        }
        db.end();
      });
    }
  }
  // db.query('INSERT INTO visit (date) VALUES ($1)', [new Date()], function (err, result) {
  //   if (err) {
  //     return console.error('Error running query!', err);
  //   }
  //   db.end();
  // });
});

// const timetable = require('./lib/api/timetable');

server.start(function () {
  var today = moment().format('DD/MM/YY');
  var now = moment().format('HH:mm:ss');
  var api = `http://${config.http.host}:${config.http.port}`;
  var edumateString = `${config.edumate.username}@${config.edumate.host}:${config.edumate.port}/${config.edumate.suffix}`;

  // Log a basic startup message
  console.log(`
    Starting edumate-api on ${today} at ${now}
    API Host: ${api}
    Edumate Connection String: ${edumateString}
  `);

  // Iterate over `./lib/api/queries` and pass each one to `./lib/api/timetable`
  // for (var key in queries) {
  //   if (queries.hasOwnProperty(key)) {
  //     timetable.replaceJob(queries[key].dataset, queries[key].sql, queries[key].schedule);
  //     console.log(`${chalk.red('Scheduled job: ')} ${queries[key].dataset}`);
  //   }
  // }
});
