'use strict';

var r = require('../db');
var storage = {};

storage.query = function (table, key) {
  r.db('edumate_api')
    .table(table)
    .get(key)
    .then(function (result) {
      console.log(result);
    });
};

storage.insertTable = function (table, results) {
  r.db('edumate_api')
    .table(table)
    .insert(results)
    .then(function (result) {
      console.log(result);
    });
};

storage.updateTable = function (table, results) {
  r.db('edumate_api')
    .table(table)
    .get(results.id)
    .update(results)
    .then(function (result) {
      console.log(result);
    });
};

storage.replaceTable = function (table, results) {
  r.db('edumate_api')
    .table(table)
    .delete()
    .then(function (result) {
      r.db('edumate_api')
        .table(table)
        .insert(results)
        .then(function (result) {
          console.log(result);
        });
    });
};

module.exports = storage;
