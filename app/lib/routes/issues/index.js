'use strict';

const r = require('../../db');
const config = require('../../../config');

var reports = [
  {
    method: 'GET',
    path: '/api/issues/total',
    handler: (request, reply) => {
      r.db(config.db.name)
        .table('total_issues')
        .pluck('totalIssues')
        .then((result) => {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/issues/missing-detention-classes',
    handler: (request, reply) => {
      r.db(config.db.name)
        .table('missing_detention_classes')
        .then((result) => {
          reply(result);
        });
    }
  }
];

module.exports = reports;
