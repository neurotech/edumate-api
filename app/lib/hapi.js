'use strict';

const hapi = require('hapi');
const config = require('../config');
const apiRoutes = require('./api/routes');

var server = new hapi.Server();

server.connection({
  port: config.http.port,
  router: { stripTrailingSlash: true },
  routes: { cors: true }
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    var nope = { response: 'nope' };
    reply(nope);
  }
});

server.route(apiRoutes);

module.exports = server;
