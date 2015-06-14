'use strict';

var schedule = require('node-schedule');
var edumate = require('node-edumate');
var moment = require('moment');
var rethinkdb = require('./rethinkdb');

var config = require('../config');
var timetable = {};

timetable.updateJob = function(name, sql, timing) {
  schedule.scheduleJob(timing, function() {
    var now = moment().format('YYYY-MM-DD HH:mm');
    console.log('Updating table: ' + name + ' at: ' + now);
    edumate.query(sql, config.init).then(function(results) {
      var cleaned = rethinkdb.sanitize(results);
      for (var i = 0; i < cleaned.length; i++) {
        rethinkdb.updateTable(name, cleaned[i]);
      }
      edumate.close();
    }, function(error) {
      console.error(error);
    }); 
  });
};

module.exports = timetable;
