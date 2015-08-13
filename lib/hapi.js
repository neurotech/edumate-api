'use strict';

var fs = require('fs');
var path = require('path');
var hapi = require('hapi');
var config = require('../config');
var tls = require('./tls');
var auth = require('./auth');
var apiRoutes = require('./api/routes');

var server = new hapi.Server();
var privateKey = config.secret;

server.connection({
  host: config.http.host,
  port: config.http.port,
  router: { stripTrailingSlash: true },
  routes: { cors: true },
  tls: {
    key: fs.readFileSync(path.join(__dirname, '../private/server.key'), 'utf8'),
    cert: fs.readFileSync(path.join(__dirname, '../private/server.crt'), 'utf8'),
    ciphers: tls.ciphers,
    honorCipherOrder: tls.honorCipherOrder,
    secureOptions: tls.secureOptions
  }
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

  server.route({
    method: 'GET',
    path: '/js/{path*}',
    config: { auth: { mode: 'optional' } },
    handler: {
      directory: {
        path: './public/js',
        listing: false,
        index: false
      }
    }
  });

  server.route(apiRoutes);
});

module.exports = server;
