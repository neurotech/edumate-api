var hapi = require('hapi');
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

module.exports = server;