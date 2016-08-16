'use strict';

const r = require('../../db');
const config = require('../../../config');

var issues = [
  {
    method: 'GET',
    path: '/api/issues',
    handler: (request, reply) => {
      r.db(config.db.name)
        .table('issues')
        .then((result) => {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/issues/total',
    handler: (request, reply) => {
      r.db(config.db.name)
        .table('issues')
        .pluck('category')
        .distinct()
        .count()
        .then((result) => {
          reply(result);
        });
    }
  }
];

module.exports = issues;
