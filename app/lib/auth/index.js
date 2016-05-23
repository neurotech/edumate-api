'use strict';

const r = require('../db');
const config = require('../../config');

var auth = {};

auth.validate = (decoded, request, callback) => {
  r.db(config.db.name)
    .table('auth')
    .filter({ id: Number(encodeURIComponent(decoded.id)) })
    .then((result) => {
      if (decoded.id !== result[0].id) {
        var critical = new Error(`Unauthorised attempt to request a manual sync by ${request.info.remoteAddress}!`);
        console.error(critical);
        return callback(null, false);
      } else {
        return callback(null, true);
      }
    });
};

module.exports = auth;
