'use strict';

var schedule = require('node-schedule');
var queries = {};

queries.staff = {
  name: 'staff',
  sql: 'SELECT * FROM DB2INST1.view_api_v1_staff_users',
  schedule: { minute: [new schedule.Range(0,59,15)] }
};

queries.staffAbsent = {
  name: 'staff_absent',
  sql: 'SELECT * FROM DB2INST1.view_api_v1_staff_users_absent',
  schedule: { minute: [new schedule.Range(0,59,5)] }
};

queries.moduleReports = {
  name: 'module_reports',
  sql: 'SELECT * FROM DB2INST1.view_api_v1_all_reports',
  schedule: { minute: [new schedule.Range(0,59,10)] }
};

queries.periods = {
  name: 'periods',
  sql: 'SELECT * FROM DB2INST1.view_api_v1_periods',
  schedule: { minute: [new schedule.Range(0,59,6)] }
};

module.exports = queries;