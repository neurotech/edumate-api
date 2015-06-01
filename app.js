'use strict';

var edumate = require('node-edumate');
var low = require('lowdb');
var _ = require('lodash');
var camelCase = require('camel-case');
var db = low('db.json');

var config = require('./config.js');
var staffUsers = 'SELECT * FROM DB2INST1.view_api_v1_staff_users';

edumate.query(staffUsers, config.init).then(function(results) {
  db('staff').remove();
  for (var i = 0; i < results.length; i++) {
    db('staff').push(
      _.transform(results[i], function (result, val, key) {
        result[camelCase(key)] = val;
      })
    );
    if (i === results.length - 1) {
      console.log('lowdb updated with ' + results.length + ' records.')
    }
  };
}, function(error) {
  console.error(error);
});