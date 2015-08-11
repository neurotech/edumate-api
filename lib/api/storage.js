'use strict';

var r = require('rethinkdbdash')();
var storage = {};

storage.query = function (table, key) {
  r.db('edumate_toolbelt')
    .table(table)
    .get(key)
    .then(function (result) {
      console.log(result);
    });
};

storage.insertTable = function (table, results) {
  r.db('edumate_toolbelt')
    .table(table)
    .insert(results)
    .then(function (result) {
      console.log(result);
    });
};

storage.updateTable = function (table, results) {
  r.db('edumate_toolbelt')
    .table(table)
    .get(results.id)
    .update(results)
    .then(function (result) {
      console.log(result);
    });
};

storage.replaceTable = function (table, results) {
  r.db('edumate_toolbelt')
    .table(table)
    .delete()
    .then(function (result) {
      r.db('edumate_toolbelt')
        .table(table)
        .insert(results)
        .then(function (result) {
          console.log(result);
        });
    });
};

module.exports = storage;