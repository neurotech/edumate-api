'use strict';

const schedule = require('node-schedule');

var queries = {};
const businessDays = [new schedule.Range(1, 5)];
const businessHours = [new schedule.Range(7, 18)];
const fiveMinutes = [new schedule.Range(0, 59, 5)];
const tenMinutes = [new schedule.Range(0, 59, 10)];
const fifteenMinutes = [new schedule.Range(0, 59, 15)];
const twentyMinutes = [new schedule.Range(0, 59, 20)];

queries.staff = {
  dataset: 'staff',
  primaryKey: 'staffId',
  sql: 'SELECT * FROM DB2INST1.view_api_v1_staff_users',
  schedule: {
    dayOfWeek: businessDays,
    hour: businessHours,
    minute: fifteenMinutes
  }
};

queries.staffAbsent = {
  dataset: 'staff_absent',
  primaryKey: 'staffId',
  sql: 'SELECT * FROM DB2INST1.view_api_v1_staff_users_absent',
  schedule: {
    dayOfWeek: businessDays,
    hour: businessHours,
    minute: fiveMinutes
  }
};

queries.moduleReports = {
  dataset: 'module_reports',
  primaryKey: 'id',
  sql: 'SELECT * FROM DB2INST1.view_api_v1_all_reports',
  schedule: {
    dayOfWeek: businessDays,
    hour: businessHours,
    minute: 0
  }
};

queries.periods = {
  dataset: 'periods',
  primaryKey: 'id',
  sql: 'SELECT * FROM DB2INST1.view_api_v1_periods',
  schedule: {
    dayOfWeek: businessDays,
    hour: businessHours,
    minute: 50
  }
};

module.exports = queries;
