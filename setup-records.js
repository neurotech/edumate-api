'use strict';

var async = require('async');
var edumate = require('node-edumate');

var queries = require('./lib/queries');
var rethinkdb = require('./lib/rethinkdb');

var config = require('./config');

function populateTables(element) {
  console.log('Populating table: ' + element.name + ' with latest data from Edumate.');
  edumate.query(element.sql, config.init).then(function(results) {
    var cleaned = rethinkdb.sanitize(results);
    rethinkdb.insertResults(element.name, cleaned);
    edumate.close();
  }, function(error) {
    console.error(error);
  });
};

for (var key in queries) {
  if (queries.hasOwnProperty(key)) {
    var value = queries[key];
    populateTables(value);
  }
}