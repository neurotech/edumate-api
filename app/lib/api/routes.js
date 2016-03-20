var Joi = require('joi');
var moment = require('moment');
var r = require('../db');

var routes = [
  {
    method: 'GET',
    path: '/api/staff',
    handler: function (request, reply) {
      r.db('edumate_api')
        .table('staff')
        .then(function (result) {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/staff/{id}',
    handler: function (request, reply) {
      r.db('edumate_api')
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
    handler: function (request, reply) {
      r.db('edumate_api')
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
    handler: function (request, reply) {
      r.db('edumate_api')
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
    handler: function (request, reply) {
      var now = moment().format('HH:mm:ss');
      r.db('edumate_api')
        .table('staff_absent')
        .eqJoin('staffId', r.db('edumate_api').table('staff'))
        .zip()
        .filter(
          r.row('allDayFlag').eq(0)
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
    handler: function (request, reply) {
      var now = moment().format('HH:mm:ss');
      r.db('edumate_api')
        .table('staff_absent')
        .eqJoin('staffId', r.db('edumate_api').table('staff'))
        .zip()
        .filter(
          r.row('allDayFlag').eq(0)
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
    handler: function (request, reply) {
      r.db('edumate_api')
        .table('staff_absent')
        .eqJoin('staffId', r.db('edumate_api').table('staff'))
        .zip()
        .filter(r.row('allDayFlag').eq(1))
        .then(function (result) {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/staff/absent/today',
    handler: function (request, reply) {
      r.db('edumate_api')
        .table('staff_absent')
        .eqJoin('staffId', r.db('edumate_api').table('staff'))
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
    handler: function (request, reply) {
      r.db('edumate_api')
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
      r.db('edumate_api')
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
    handler: function (request, reply) {
      r.db('edumate_api')
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
    handler: function (request, reply) {
      var now = moment().format('HH:mm:ss');
      r.db('edumate_api')
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
