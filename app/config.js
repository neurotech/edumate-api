'use strict';

var config = {};

/* hapi HTTP config */
config.http = {
  port: process.env.EDUMATE_API_HTTP_PORT || 8000
};

/* Edumate Credentials */
config.edumate = {
  host: process.env.EDUMATE_HOST,
  port: process.env.EDUMATE_PORT,
  suffix: process.env.EDUMATE_PATH,
  username: process.env.EDUMATE_USERNAME,
  password: process.env.EDUMATE_PASSWORD
};

/* RethinkDB Credentials */
config.db = {
  host: process.env.RETHINKDB_HOST,
  port: process.env.RETHINKDB_PORT,
  name: 'edumate_api'
};

/* Authentication Credentials */
config.auth = {
  secret: process.env.EDUMATE_API_JWT_SECRET,
  admin: {
    id: 1337,
    username: 'skeleton_key',
    admin: true
  }
}

module.exports = config;
