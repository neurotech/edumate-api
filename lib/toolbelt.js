var routes = [
  {
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply('Hello world!');
    }
  }
];

module.exports = routes;
