var hapi = require('hapi');
var config = require('../config');
var apiRoutes = require('./api/routes');

var server = new hapi.Server();

server.connection({
  host: config.http.host,
  port: config.http.port,
  router: { stripTrailingSlash: true },
  routes: {cors: true}
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply([]);
  }
});

server.route({
  method: 'GET',
  path: '/js/{path*}',
  handler: {
    directory: {
      path: './public/js',
      listing: false,
      index: false
    }
  }
});

server.route(apiRoutes);

module.exports = server;
