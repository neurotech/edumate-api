'use strict';

const Joi = require('joi');
const moment = require('moment');
const r = require('../../db');
const config = require('../../../config');

var staff = [
  {
    method: 'GET',
    path: '/api/staff',
    handler: (request, reply) => {
      r.db(config.db.name)
        .table('staff')
        .then((result) => {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/staff/{id}',
    handler: (request, reply) => {
      r.db(config.db.name)
        .table('staff')
        .filter({staffId: Number(encodeURIComponent(request.params.id))})
        .then((result) => {
          reply(result);
        });
    },
    config: {
      validate: {
        params: {
          id: Joi.number().integer()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/staff/teachers',
    handler: (request, reply) => {
      r.db(config.db.name)
        .table('staff')
        .filter({ teacher: 'true' })
        .orderBy('surname', 'firstname')
        .then((result) => {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/staff/support',
    handler: (request, reply) => {
      r.db(config.db.name)
        .table('staff')
        .filter({ support: 'true' })
        .orderBy('surname', 'firstname')
        .then((result) => {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/staff/absent/now',
    handler: (request, reply) => {
      var now = moment().format('HH:mm:ss');
      r.db(config.db.name)
        .table('staff_absent')
        .eqJoin('staffId', r.db(config.db.name).table('staff'))
        .zip()
        .filter(
          r.row('allDayFlag').eq(0)
          .and(r.row('timeFrom').lt(now))
          .and(r.row('timeTo').gt(now))
        )
        .then((result) => {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/staff/absent/soon',
    handler: (request, reply) => {
      var now = moment().format('HH:mm:ss');
      r.db(config.db.name)
        .table('staff_absent')
        .eqJoin('staffId', r.db(config.db.name).table('staff'))
        .zip()
        .filter(
          r.row('allDayFlag').eq(0)
          .and(r.row('timeFrom').gt(now))
        )
        .then((result) => {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/staff/absent/allday',
    handler: (request, reply) => {
      r.db(config.db.name)
        .table('staff_absent')
        .eqJoin('staffId', r.db(config.db.name).table('staff'))
        .zip()
        .filter(r.row('allDayFlag').eq(1))
        .then((result) => {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/staff/absent/today',
    handler: (request, reply) => {
      r.db(config.db.name)
        .table('staff_absent')
        .eqJoin('staffId', r.db(config.db.name).table('staff'))
        .zip()
        .orderBy('sortKey')
        .then((result) => {
          reply(result);
        });
    }
  }
];

module.exports = staff;
