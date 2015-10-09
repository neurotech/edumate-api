'use strict';

var fs = require('fs');
var path = require('path');
var hapi = require('hapi');
var config = require('../config');
var auth = require('./auth');
var apiRoutes = require('./api/routes');

var server = new hapi.Server();
var privateKey = config.secret;

server.connection({
  host: config.http.host,
  port: config.http.port,
  router: { stripTrailingSlash: true },
  routes: { cors: true }
});

server.register(require('hapi-auth-jwt2'), function () {
  server.auth.strategy('jwt', 'jwt', true, {
    key: privateKey,
    validateFunc: auth.validate,
    verifyOptions: { algorithms: [ 'HS512' ] }
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

  server.route(apiRoutes);
});

module.exports = server;
