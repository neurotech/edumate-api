'use strict';

var hapi = require('hapi');
var config = require('../config');
var api = require('./api/routes');

var server = new hapi.Server();

server.connection({
  host: config.http.host,
  port: config.http.port,
  router: { stripTrailingSlash: true },
  routes: { cors: true }
});

server.route({
  method: 'GET',
  path: '/',
  config: { auth: false },
  handler: function (request, reply) {
    var nope = { response: 'nope' };
    reply(nope);
  }
});

server.route(api);

module.exports = server;
