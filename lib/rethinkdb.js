'use strict';

var r = require('rethinkdbdash')();
var _ = require('lodash');
var camelCase = require('camel-case');

var rethinkdb = {};

rethinkdb.query = function(table, key) {
  r.db('edumate_toolbelt')
    .table(table)
    .get(key)
    .then(function(result) {
      console.log(result);
    });
};

rethinkdb.sanitize = function(results) {
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

rethinkdb.updateTable = function(table, results) {
  r.db('edumate_toolbelt')
    .table(table)
    .get(results.id)
    .update(results)
    .then(function(result) {
    });
};

rethinkdb.setup = function(db, schema) {
  // Create the database, then the tables
  r.dbCreate(db)
    .then(function(result) {
      console.log('Database: ' + db + ' created.');
      for (var i = 0; i < schema.length; i++) {
        console.log('Creating table: ' + schema[i]);
        r.db(db).tableCreate(schema[i])
          .then(function(result) {});
        if (i === schema.length - 1) {
          console.log('Disconnecting from rethinkdb.');
          r.getPoolMaster().drain();
        }
      }
    });
};

rethinkdb.insertResults = function(table, results) {
  r.db('edumate_toolbelt')
    .table(table)
    .insert(results)
    .then(function(result) {
      console.log(result);
    });
};

module.exports = rethinkdb;