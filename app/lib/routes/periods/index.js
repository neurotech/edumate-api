'use strict';

const moment = require('moment');
const r = require('../../db');
const config = require('../../../config');

var periods = [
  {
    method: 'GET',
    path: '/api/periods',
    handler: (request, reply) => {
      r.db(config.db.name)
        .table('periods')
        .orderBy('startTime')
        .then((result) => {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/periods/current',
    handler: (request, reply) => {
      var now = moment().format('HH:mm:ss');
      r.db(config.db.name)
        .table('periods')
        .filter(
          r.row('startTime').lt(now)
          .and(r.row('endTime').gt(now))
        )
        .then((result) => {
          reply(result);
        });
    }
  }
];

module.exports = periods;
