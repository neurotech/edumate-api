var hapi = require('hapi');
var config = require('../config');
var apiRoutes = require('./api/routes');
var toolbeltRoutes = require('./toolbelt');

var server = new hapi.Server();

server.connection({
  port: config.http.port,
  host: config.http.host,
  router: { stripTrailingSlash: true }
});

server.route(apiRoutes);
server.route(toolbeltRoutes);

module.exports = server;