'use strict';

var schedule = require('node-schedule');
var queries = {};

var businessDays = [new schedule.Range(1, 5)];
var businessHours = [new schedule.Range(7, 19)];

queries.staff = {
  dataset: 'staff',
  sql: 'SELECT * FROM DB2INST1.view_api_v1_staff_users',
  schedule: {
    dayOfWeek: businessDays,
    hour: businessHours,
    minute: [new schedule.Range(0, 59, 15)] }
};

queries.staffAbsent = {
  dataset: 'staff_absent',
  sql: 'SELECT * FROM DB2INST1.view_api_v1_staff_users_absent',
  schedule: {
    dayOfWeek: businessDays,
    hour: businessHours,
    minute: [new schedule.Range(0, 59, 5)] }
};

queries.moduleReports = {
  dataset: 'module_reports',
  sql: 'SELECT * FROM DB2INST1.view_api_v1_all_reports',
  schedule: {
    dayOfWeek: businessDays,
    hour: businessHours,
    minute: [new schedule.Range(0, 59, 10)] }
};

queries.periods = {
  dataset: 'periods',
  sql: 'SELECT * FROM DB2INST1.view_api_v1_periods',
  schedule: {
    dayOfWeek: businessDays,
    hour: businessHours,
    minute: [new schedule.Range(0, 59, 6)] }
};

module.exports = queries;
