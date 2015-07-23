'use strict';

var r = require('rethinkdbdash')();
require('rethinkdb-init')(r);

var edumate = require('node-edumate');
var async = require('async');
var readline = require('readline');
var chalk = require('chalk');

var queries = require('./lib/api/queries');
var config = require('./config');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function manifest (structure) {
  var schema = [];
  for (var key in queries) {
    if (queries.hasOwnProperty(key)) {
      schema.push(queries[key].dataset);
    }
  }
  return schema;
}

async.series([
  function welcome (callback) {
    console.log('This script will setup the RethinkDB database and it\'s tables.');
    console.log('It will then seed those tables with the latest data from Edumate using node-edumate.');
    rl.question('Press ENTER to continue...', function (answer) {
      rl.close();
      callback(null, 'begin!');
    });
  },
  function skeleton (callback) {
    r.init({
        host: 'localhost',
        db: 'edumate_toolbelt'
      }, manifest(queries))
      .then(function (conn) {
        console.log(chalk.magenta('[rethinkdb] ') + 'Created db ' + chalk.green('edumate_toolbelt') + ' with tables: ');
        console.log(chalk.magenta('[rethinkdb] ') + manifest(queries));
        callback(null, 'skeleton');
      }
    );
  },
  function records (callback) {
    Object.keys(queries).map(function (key) {
      var value = queries[key];
      edumate.query(config.init, value.sql, {clean: true})
        .then(function (results) {
          r.db('edumate_toolbelt')
            .table(value.dataset)
            .insert(results)
            .then(function (result) {
              console.log(chalk.blue('[node-edumate] ') + chalk.yellow(results.length) + ' records inserted into table: ' + chalk.blue(value.dataset));
            });
        }, function (error) {
          console.error(error);
        });
    });
    callback(null, 'records');
  }
]);
