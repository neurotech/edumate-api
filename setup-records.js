'use strict';

var edumate = require('node-edumate');

var queries = require('./lib/api/queries');
var rethinkdb = require('./lib/api/rethinkdb');

var config = require('./config');

Object.keys(queries).map(function(key) {
  var value = queries[key];
  edumate.query(value.sql, config.init, {clean: true}).then(function(results) {
    rethinkdb.insertTable(value.name, results);
  }, function(error) {
    console.error(error);
  });
});
