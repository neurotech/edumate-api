'use strict';

var r = require('../db');

var auth = {};

auth.validate = function validateFunc (decoded, request, callback) {
  r.db('auth')
    .table('users')
    .filter({ user: decoded.user })
    .then(function (result) {
      if (decoded.user === 'picnic') {
        console.log('Request from user: ' + decoded.user + ' via ' + request.info.host + ' -- ' + '[' + request.method + '] ' + request.path);
        return callback(null, true);
      } else {
        return callback(null, false);
      }
    });
};

module.exports = auth;
