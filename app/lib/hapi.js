'use strict';

const hapi = require('hapi');
const config = require('../config');
const apiRoutes = require('./api/routes');
const auth = require('./auth');

var server = new hapi.Server();

server.connection({
  port: config.http.port,
  router: { stripTrailingSlash: true }
});

server.register(require('hapi-auth-jwt2'), (err) => {
  if (err) { console.error(err); }

  server.auth.strategy('jwt', 'jwt', {
    key: config.auth.secret,
    validateFunc: auth.validate,
    verifyOptions: { algorithms: [ 'HS256' ] }
  });

  server.auth.default('jwt');
  server.route(apiRoutes);
});

module.exports = server;
