'use strict';

var r = require('rethinkdbdash')();
var _ = require('lodash');
var camelCase = require('camel-case');

var rethinkdb = {};

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

rethinkdb.seedTable = function(table, results) {
  r.db('edumate_toolbelt')
    .table(table)
    .insert(results)
    .then(function(result) {
      console.log(result);
    });
};

rethinkdb.updateTable = function(table, results) {
  r.db('edumate_toolbelt')
    .table(table)
    .get(results.id)
    .update(results)
    .then(function(result) {
      console.log(result);
    });
};

rethinkdb.setup = function(db, skeleton) {
  // Create the database, then the tables
  r.dbCreate(db)
    .then(function(result) {
      console.log(result);

      for (var i = 0; i < skeleton.length; i++) {
        r.db('edumate_toolbelt').tableCreate(skeleton[i])
          .then(function(result) {
            console.log(result);
          });
      }
    });
};

module.exports = rethinkdb;