var config = require('./config'),
    Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: config.http.port });

server.start(function () {
  console.log('Server running at:', server.info.uri);
});