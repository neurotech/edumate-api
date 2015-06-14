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

module.exports = queries;