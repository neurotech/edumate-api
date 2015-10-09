'use strict';

var path = require('path');
var config = {};

/* hapi HTTP config */
config.http = {
  host: process.env.EDUMATE_TOOLBELT_HOST || 'localhost',
  port: process.env.EDUMATE_TOOLBELT_PORT || 8000
};

/* Edumate Credentials */
config.edumate = {
  host: process.env.EDUMATE_HOST,
  port: process.env.EDUMATE_PORT,
  suffix: process.env.EDUMATE_PATH,
  username: process.env.EDUMATE_USERNAME,
  password: process.env.EDUMATE_PASSWORD
};

/* JWT Secret */
config.secret = process.env.EDUMATE_TOOLBELT_SECRET;

module.exports = config;
