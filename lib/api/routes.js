var Joi = require('joi');
var r = require('rethinkdbdash')();

var routes = [
  {
    method: 'GET',
    path: '/api/staff',
    handler: function (request, reply) {
      r.db('edumate_toolbelt')
        .table('staff')
        .then(function(result) {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/staff/{id}',
    handler: function (request, reply) {
      r.db('edumate_toolbelt')
        .table('staff')
        .get(encodeURIComponent(request.params.id))
        .then(function(result) {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/staff/teachers',
    handler: function (request, reply) {
      r.db('edumate_toolbelt')
        .table('staff')
        .filter({teacher: "true"})
        .orderBy('surname', 'firstname')
        .then(function(result) {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/staff/support',
    handler: function (request, reply) {
      r.db('edumate_toolbelt')
        .table('staff')
        .filter({support: "true"})
        .orderBy('surname', 'firstname')
        .then(function(result) {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/staff/absent',
    handler: function (request, reply) {
      r.db('edumate_toolbelt')
        .table('staff_absent')
        .eqJoin('id', r.db('edumate_toolbelt').table('staff'))
        .zip()
        .orderBy('sortKey')
        .then(function(result) {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/reports/all',
    handler: function (request, reply) {
      r.db('edumate_toolbelt')
        .table('module_reports')
        .then(function(result) {
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
        .then(function(result) {
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
      r.db('edumate_toolbelt')
        .table('periods')
        .orderBy('startTime')
        .then(function(result) {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/periods/current',
    handler: function (request, reply) {
      r.db('edumate_toolbelt')
        .table('periods')
        .filter({current: '1'})
        .then(function(result) {
          reply(result);
        });
    }
  }
];

module.exports = routes;
