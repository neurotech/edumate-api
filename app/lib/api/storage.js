'use strict';

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
  r.db('edumate_api')
    .table(table)
    .delete()
    .then((result) => {
      r.db('edumate_api')
        .table(table)
        .insert(results)
        .then((result) => {
          console.log(results.length + ' records inserted into table: ' + table);
        });
    });
    // .then((result) => {
    //   r.db('edumate_api')
    //     .table(table)
    //     .insert(results)
    //     .then((result) => {
    //       console.log(result);
    //     });
    // });
};

module.exports = storage;
