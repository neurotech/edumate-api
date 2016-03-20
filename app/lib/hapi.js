'use strict';

var hapi = require('hapi');
var config = require('../config');
var apiRoutes = require('./api/routes');

var server = new hapi.Server();

server.connection({
  port: config.http.port,
  router: { stripTrailingSlash: true },
  routes: { cors: true }
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    var nope = { response: 'nope' };
    reply(nope);
  }
});

server.route(apiRoutes);

module.exports = server;
