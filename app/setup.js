'use strict';

const r = require('./lib/db');
const series = require('async/series');
const queue = require('async/queue');
const edumate = require('node-edumate');

const queries = require('./lib/api/queries');
const config = require('./config');

const dbName = 'edumate_api';

var _manifest = () => {
  var schema = [];
  for (var key in queries) {
    if (queries.hasOwnProperty(key)) {
      schema.push({
        dataset: queries[key].dataset,
        primaryKey: queries[key].primaryKey,
        sql: queries[key].sql
      });
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

series([
  (callback) => {
    // Check if DB exists, if not then create DB
    r.dbList().then((result) => {
      if (result.indexOf(dbName) > -1) {
        console.error('DB exists! Exiting.');
        process.exit();
      } else {
        r.dbCreate(dbName).then((result) => {
          console.log(`Created database: ${dbName}`);
          callback();
        });
      }
    });
  },
  (callback) => {
    // Create tables via a queue
    var q = queue((queries, done) => {
      r.db(dbName).tableCreate(queries.dataset, {primaryKey: `${queries.primaryKey}`})
        .then((result) => {
          console.log(`Created table: ${result.config_changes[0].new_val.name}`);
          done();
        });
    }, 1);

    q.push(_manifest(), (err) => {
      if (err) { console.error(err); }
    });

    q.drain = () => {
      console.log('All tables created.');
      callback();
    };
  },
  (callback) => {
    console.log('Seeding tables with the latest data from Edumate.');
    var q = queue((queries, done) => {
      edumate.query(config.edumate, queries.sql, {clean: true})
        .then(function (results) {
          r.db(dbName)
            .table(queries.dataset)
            .insert(results)
            .then(function (result) {
              console.log(results.length + ' records inserted into table: ' + queries.dataset);
              done();
            });
        }, function (error) {
          console.error(error);
          process.exit();
        });
    }, 1);

    q.push(_manifest(), (err) => {
      if (err) { console.error(err); }
    });

    q.drain = () => {
      console.log('All tables populated.');
      callback();
    };
  },
  (callback) => {
    console.log('Setting up auth db.');
    r.db(dbName).tableCreate('auth', {primaryKey: 'id'})
      .then((result) => {
        console.log(`Created auth table.`);
        r.db(dbName)
          .table('auth')
          .insert(config.auth.admin)
          .then((result) => {
            console.log(`Setup default admin user in auth table.`);
            callback();
          });
      });
  },
  (callback) => {
    console.log('Setup complete!');
    callback();
    process.exit();
  }
]);
