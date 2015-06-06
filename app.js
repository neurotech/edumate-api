'use strict';

var edumate = require('node-edumate');
var rethinkdb = require('./lib/rethinkdb');
var config = require('./config.js');

var staffUsers = 'SELECT * FROM DB2INST1.view_api_v1_staff_users';

edumate.query(staffUsers, config.init).then(function(results) {
  var cleaned = rethinkdb.sanitize(results);
  for (var i = 0; i < cleaned.length; i++) {
    rethinkdb.updateTable('staff', cleaned[i]);
  }
}, function(error) {
  console.error(error);
});