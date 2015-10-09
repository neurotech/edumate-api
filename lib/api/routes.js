var Joi = require('joi');
var moment = require('moment');
var r = require('../db');

var routes = [
  {
    method: 'GET',
    path: '/api/staff',
    config: { auth: 'jwt' },
    handler: function (request, reply) {
      r.db('edumate_toolbelt')
        .table('staff')
        .then(function (result) {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/staff/{id}',
    config: { auth: 'jwt' },
    handler: function (request, reply) {
      r.db('edumate_toolbelt')
        .table('staff')
        .get(encodeURIComponent(request.params.id))
        .then(function (result) {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/staff/teachers',
    config: { auth: 'jwt' },
    handler: function (request, reply) {
      r.db('edumate_toolbelt')
        .table('staff')
        .filter({ teacher: 'true' })
        .orderBy('surname', 'firstname')
        .then(function (result) {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/staff/support',
    config: { auth: 'jwt' },
    handler: function (request, reply) {
      r.db('edumate_toolbelt')
        .table('staff')
        .filter({ support: 'true' })
        .orderBy('surname', 'firstname')
        .then(function (result) {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/staff/absent/now',
    config: { auth: 'jwt' },
    handler: function (request, reply) {
      var now = moment().format('HH:mm:ss');
      r.db('edumate_toolbelt')
        .table('staff_absent')
        .eqJoin('staffId', r.db('edumate_toolbelt').table('staff'))
        .zip()
        .filter(
          r.row('allDayFlag').eq('0')
          .and(r.row('timeFrom').lt(now))
          .and(r.row('timeTo').gt(now))
        )
        .then(function (result) {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/staff/absent/soon',
    config: { auth: 'jwt' },
    handler: function (request, reply) {
      var now = moment().format('HH:mm:ss');
      r.db('edumate_toolbelt')
        .table('staff_absent')
        .eqJoin('staffId', r.db('edumate_toolbelt').table('staff'))
        .zip()
        .filter(
          r.row('allDayFlag').eq('0')
          .and(r.row('timeFrom').gt(now))
        )
        .then(function (result) {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/staff/absent/allday',
    config: { auth: 'jwt' },
    handler: function (request, reply) {
      r.db('edumate_toolbelt')
        .table('staff_absent')
        .eqJoin('staffId', r.db('edumate_toolbelt').table('staff'))
        .zip()
        .filter(r.row('allDayFlag').eq('1'))
        .then(function (result) {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/staff/absent/today',
    config: { auth: 'jwt' },
    handler: function (request, reply) {
      r.db('edumate_toolbelt')
        .table('staff_absent')
        .eqJoin('staffId', r.db('edumate_toolbelt').table('staff'))
        .zip()
        .orderBy('sortKey')
        .then(function (result) {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/reports/all',
    config: { auth: 'jwt' },
    handler: function (request, reply) {
      r.db('edumate_toolbelt')
        .table('module_reports')
        .then(function (result) {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/reports/module/{module}',
    handler: function (request, reply) {
      var module = request.params.module ? { module: encodeURIComponent(request.params.module) } : '';
      r.db('edumate_toolbelt')
        .table('module_reports')
        .orderBy('module', 'kind', 'heading', 'reportName')
        .filter(module)
        .skip(request.query.offset)
        .limit(request.query.limit)
        .then(function (result) {
          reply(result);
        });
    },
    config: {
      auth: 'jwt',
      validate: {
        query: {
          limit: Joi.number().integer().min(1).max(100).default(100),
          offset: Joi.number().integer().min(1).max(100).default(0)
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/periods',
    config: { auth: 'jwt' },
    handler: function (request, reply) {
      r.db('edumate_toolbelt')
        .table('periods')
        .orderBy('startTime')
        .then(function (result) {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/periods/current',
    config: { auth: 'jwt' },
    handler: function (request, reply) {
      var now = moment().format('HH:mm:ss');
      r.db('edumate_toolbelt')
        .table('periods')
        .filter(
          r.row('startTime').lt(now)
          .and(r.row('endTime').gt(now))
        )
        .then(function (result) {
          reply(result);
        });
    }
  }
];

module.exports = routes;
