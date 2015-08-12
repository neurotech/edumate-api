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

/* jdbc Initialisation Object */
config.init = {
  libpath: path.join(__dirname, '/node_modules/node-edumate/drivers/db2jcc.jar'),
  drivername: 'com.ibm.db2.jcc.DB2Driver',
  url: 'jdbc:' + 'db2://' + config.edumate.host + ':' + config.edumate.port + config.edumate.suffix + ':user=' + config.edumate.username + ';password=' + config.edumate.password + ';'
};

/* JWT Secret */
config.secret = process.env.EDUMATE_TOOLBELT_SECRET;

module.exports = config;
