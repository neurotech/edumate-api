var config = {};

config.db2 = {
  host: 'HOSTNAME',
  port: 'PORT',
  suffix: '/SUFFIX',
  username: 'USERNAME',
  password: 'PASSWORD'
};

config.init = {
  libpath: './drivers/db2jcc.jar',
  drivername: 'com.ibm.db2.jcc.DB2Driver',
  url: 'jdbc:' + 'db2://' + config.db2.host + ':' + config.db2.port + config.db2.suffix + ':user=' + config.db2.username + ';password=' + config.db2.password + ';'
};

module.exports = config;