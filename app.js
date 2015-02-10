var config = require('./config'),
    Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: config.http.port });

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('There is nothing here.');
  }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});