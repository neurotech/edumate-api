'use strict';

var schedule = require('node-schedule');
var edumate = require('node-edumate');
var moment = require('moment');
var db = require('./rethinkdb');

var config = require('../../config');
var timetable = {};

timetable.updateJob = function(name, sql, timing) {
  schedule.scheduleJob(timing, function() {
    var now = moment().format('YYYY-MM-DD HH:mm');
    console.log('Updating table: ' + name + ' at: ' + now);
    edumate.query(sql, config.init).then(function(results) {
      db.updateTable(name, results);
    }, function(error) {
      console.error(error);
    }); 
  });
};

timetable.replaceJob = function(name, sql, timing) {
  schedule.scheduleJob(timing, function() {
    var now = moment().format('YYYY-MM-DD HH:mm');
    console.log('Updating table: ' + name + ' at: ' + now);
    edumate.query(sql, config.init).then(function(results) {
      db.replaceTable(name, results);
    }, function(error) {
      console.error(error);
    }); 
  });
};

module.exports = timetable;