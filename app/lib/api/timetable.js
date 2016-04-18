'use strict';

const schedule = require('node-schedule');
const edumate = require('node-edumate');
const moment = require('moment');
const storage = require('./storage');

const config = require('../../config');
var timetable = {};

timetable.replaceJob = (name, sql, timing) => {
  schedule.scheduleJob(timing, () => {
    var now = moment().format('YYYY-MM-DD HH:mm');
    console.log('Updating table: ' + name + ' at: ' + now);

    edumate.query(config.edumate, sql, {clean: true})
      .then((results) => {
        storage.replaceTable(name, results);
      }, (error) => {
        console.error(error);
      });
  });
};

module.exports = timetable;
