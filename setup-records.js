'use strict';

var edumate = require('node-edumate');

var queries = require('./lib/queries');
var rethinkdb = require('./lib/rethinkdb');

var config = require('./config');

Object.keys(queries).map(function(key) {
  var value = queries[key];
  edumate.query(value.sql, config.init).then(function(results) {
    rethinkdb.insertResults(value.name, results);
  }, function(error) {
    console.error(error);
  });
});