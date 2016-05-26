'use strict';

const moment = require('moment');
const r = require('../db');
var storage = {};

storage.query = (table, key) => {
  r.db('edumate_api')
    .table(table)
    .get(key)
    .then((result) => {
      console.log(result);
    });
};

storage.insertTable = (table, results) => {
  r.db('edumate_api')
    .table(table)
    .insert(results)
    .then((result) => {
      console.log(result);
    });
};

storage.replaceTable = (table, results) => {
  var now = moment().format('YYYY-MM-DD HH:mm:ss');
  r.db('edumate_api')
    .table(table)
    .delete()
    .then((result) => {
      r.db('edumate_api')
        .table(table)
        .insert(results)
        .then((result) => {
          console.log(`[${now}] ${results.length} records inserted into table: ${table}`);
        });
    });
};

module.exports = storage;
