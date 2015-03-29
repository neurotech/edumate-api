var path = require('path');
var schedule = require('node-schedule');
var config = {};

config.http = {
  host: 'localhost',
  port: 3000
};

config.edumate = {
  host: 'HOST',
  port: 'PORT',
  suffix: '/PATH',
  username: 'USERNAME',
  password: 'SECRET'
};

config.init = {
  libpath: './drivers/db2jcc.jar',
  drivername: 'com.ibm.db2.jcc.DB2Driver',
  url: 'jdbc:' + 'db2://' + config.edumate.host + ':' + config.edumate.port + config.edumate.suffix + ':user=' + config.edumate.username + ';password=' + config.edumate.password + ';'
};

config.cache = {
  value: 5,
  units: 'minutes',
  path: path.join(__dirname, '/cache/')
};

module.exports = config;
