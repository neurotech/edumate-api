'use strict';

var config = {};

/* hapi HTTP config */
config.http = {
  host: process.env.EDUMATE_API_HTTP_HOST || 'localhost',
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

/* Postgres DB Credentials */
config.db = {
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD
};

module.exports = config;
