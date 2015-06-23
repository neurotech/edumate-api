var routes = [
  {
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.view('index');
    }
  },
  {
    method: 'GET',
    path: '/reports',
    handler: function (request, reply) {
      reply.view('reports');
    }
  },
  {
    method: 'GET',
    path: '/picnic',
    handler: function (request, reply) {
      reply.view('picnic');
    }
  },
];

module.exports = routes;
