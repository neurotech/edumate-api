'use strict';

var edumate = require('node-edumate');
var r = require('rethinkdb');
var _ = require('lodash');
var camelCase = require('camel-case');

var config = require('./config.js');
var staffUsers = 'SELECT * FROM DB2INST1.view_api_v1_staff_users';

var connection = null;
r.connect({host: 'localhost', port: 28015, db: 'edumate_toolbelt'}, function(err, conn) {
  if (err) {
    throw err;
  }
  connection = conn;
});

var sanitize = function(results) {
  var output = [];
  _.each(results, function(object) {
    var records = {};
    var keys = Object.keys(object);
    for (var i = 0; i < keys.length; i++) {
      records[camelCase(keys[i])] = object[keys[i]];
    }
    output.push(records);
  });

  return output;
};

var updateTable = function(table, results) {
  r.table(table)
    .get(results.id)
    .update(results)
    .run(connection, function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
    });
};

edumate.query(staffUsers, config.init).then(function(results) {
  var cleaned = sanitize(results);
  for (var i = 0; i < cleaned.length; i++) {
    updateTable('staff', cleaned[i]);
  }
}, function(error) {
  console.error(error);
});