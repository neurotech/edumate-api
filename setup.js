'use strict';

var r = require('rethinkdbdash')();
require('rethinkdb-init')(r);

var edumate = require('node-edumate');
var async = require('async');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var readline = require('readline');
var chalk = require('chalk');

var queries = require('./lib/api/queries');
var config = require('./config');

var now = moment().format();
var token = jwt.sign({ user: 'picnic', generated: now }, config.secret, { algorithm: 'HS512' });

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
  function secretSkeleton (callback) {
    r.init({
        host: 'localhost',
        port: 28015,
        db: 'auth'
      }, ['users'])
      .then(function (conn) {
        console.log(chalk.magenta('[rethinkdb] ') + 'Created db: ' + chalk.green('auth') + ' and table: ' + chalk.green('users'));
        callback(null, 'token');
      });
  },
  function secret (callback) {
    r.db('auth')
      .table('users')
      .insert({
        user: 'picnic',
        generated: now,
        token: token
      })
      .then(function (result) {
        var tokenSize = function sizeHandler (token) {
          if (token.length >= 1024) {
            return (token.length / 1024) + ' KB';
          } else {
            return token.length + ' bytes';
          }
        };
        console.log(chalk.yellow('[jwt] ') + 'Token generated (' + chalk.red(tokenSize(token)) + ') and written to the ' + chalk.green('users') + ' table in the ' + chalk.green('auth') + ' db.');
      });
  },
  function skeleton (callback) {
    r.init({
        host: 'localhost',
        port: 28015,
        db: 'edumate_toolbelt'
      }, manifest(queries))
      .then(function (conn) {
        console.log(chalk.magenta('[rethinkdb] ') + 'Created db: ' + chalk.green('edumate_toolbelt') + ' with tables: ');
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
