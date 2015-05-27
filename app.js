'use strict';

var edumate = require('node-edumate');
var config = require('./config.js');

var staffUsers = 'SELECT * FROM DB2INST1.view_api_v1_staff_users';

edumate.query(staffUsers, config.init).then(function(results) {
  // Do something with results
  console.log(results);
}, function(error) {
  console.error(error);
});