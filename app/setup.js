'use strict';

const r = require('./lib/db');

const queries = require('./lib/api/queries');
const config = require('./config');

const dbName = 'edumate_api';

var _manifest = (structure) => {
  var schema = [];
  for (var key in queries) {
    if (queries.hasOwnProperty(key)) {
      schema.push(queries[key].dataset);
    }
  }
  return schema;
};

/*
   Order of operations
   -------------------
   0. `async` has been modularised: https://github.com/caolan/async/blob/master/CHANGELOG.md#v200
   1. r.dbCreate(dbName).run();
   2. Put this: r.db(dbName).tableCreate(queries[key].dataset) into _manifest and rename accordingly
   3. Iterate over queries, take each `sql` key's value, query via node-edumate,
      insert results into table with name: `dataset`
   4. Refer to https://github.com/neurotech/edumate-api/blob/master/setup.js
*/
