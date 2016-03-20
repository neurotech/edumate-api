const Joi = require('joi');
// const moment = require('moment');
// const massive = require('massive');
// const config = require('../../config');
//
// const url = `postgres://postgres:${config.db.password}@${config.db.host}/postgres`;
//
// massive.connect({connectionString: url}, (error, db) => {
//   if (!error) {
//     console.log('Successfully connected to edumate-api-db.');
//     db.run('CREATE TABLE public.blob(example_id int4, example_string varchar(25))', (error, result) => {
//       if (result) {
//         console.log('Table "blob" created in "PUBLIC" schema!');
//       } else {
//         console.error(error);
//       }
//     });
//   } else {
//     console.error(error);
//   }
// });

var routes = [
  {
    method: 'GET',
    path: '/api/staff',
    handler: function (request, reply) {}
  },
  {
    method: 'GET',
    path: '/api/staff/{id}',
    handler: function (request, reply) {}
  },
  {
    method: 'GET',
    path: '/api/staff/teachers',
    handler: function (request, reply) {}
  },
  {
    method: 'GET',
    path: '/api/staff/support',
    handler: function (request, reply) {}
  },
  {
    method: 'GET',
    path: '/api/staff/absent/now',
    handler: function (request, reply) {}
  },
  {
    method: 'GET',
    path: '/api/staff/absent/soon',
    handler: function (request, reply) {}
  },
  {
    method: 'GET',
    path: '/api/staff/absent/allday',
    handler: function (request, reply) {}
  },
  {
    method: 'GET',
    path: '/api/staff/absent/today',
    handler: function (request, reply) {}
  },
  {
    method: 'GET',
    path: '/api/reports/all',
    handler: function (request, reply) {}
  },
  {
    method: 'GET',
    path: '/api/reports/module/{module}',
    handler: function (request, reply) {},
    config: {
      validate: {
        query: {
          limit: Joi.number().integer().min(1).max(100).default(100),
          offset: Joi.number().integer().min(1).max(100).default(0)
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/periods',
    handler: function (request, reply) {}
  },
  {
    method: 'GET',
    path: '/api/periods/current',
    handler: function (request, reply) {}
  }
];

module.exports = routes;
