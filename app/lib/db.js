'use strict';

const config = require('../config');

const server = {
  db: 'edumate_api',
  silent: true,
  servers: [
    {
      host: config.db.host,
      port: config.db.port
    }
  ]
};

const rethinkdb = require('rethinkdbdash')(server);

module.exports = rethinkdb;
