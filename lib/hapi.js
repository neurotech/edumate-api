var hapi = require('hapi');
var Joi = require('joi');
var r = require('rethinkdbdash')();

var config = require('../config');

var server = new hapi.Server();

server.connection({
  port: config.http.port,
  host: config.http.host,
  labels: ['api'],
  router: { stripTrailingSlash: true }
});

server.route({
  method: 'GET',
  path: '/staff',
  handler: function (request, reply) {
    r.db('edumate_toolbelt')
      .table('staff')
      .then(function(result) {
        reply(result);
      });
  }
});

server.route({
  method: 'GET',
  path: '/staff/{id}',
  handler: function (request, reply) {
    r.db('edumate_toolbelt')
      .table('staff')
      .get(encodeURIComponent(request.params.id))
      .then(function(result) {
        reply(result);
      });
  }
});

server.route({
  method: 'GET',
  path: '/reports/all',
  handler: function (request, reply) {
    r.db('edumate_toolbelt')
      .table('module_reports')
      .then(function(result) {
        reply(result);
      });
  }
});

server.route({
  method: 'GET',
  path: '/reports/module/{module}',
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
      })
  },
  config: {
    validate: {
      query: {
        limit: Joi.number().integer().min(1).max(100).default(100),
        offset: Joi.number().integer().min(1).max(100).default(0)
      }
    }
  }
});

module.exports = server;