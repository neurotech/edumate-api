var hapi = require('hapi');
var Path = require('path');
var config = require('../config');
var apiRoutes = require('./api/routes');
var toolbeltRoutes = require('./toolbelt');

var server = new hapi.Server();

server.connection({
  port: config.http.port,
  host: config.http.host,
  router: { stripTrailingSlash: true }
});

server.views({
  engines: { jade: require('jade') },
  path: './client/views',
  compileOptions: {
    pretty: true
  }
});

server.route(apiRoutes);
server.route(toolbeltRoutes);

server.route({
  method: "GET",
  path: "/js/{path*}",
  handler: {
    directory: {
      path: "./public/js",
      listing: false,
      index: false
    }
  }
});

module.exports = server;