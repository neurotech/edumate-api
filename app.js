'use strict';

var server = require('./lib/hapi');

var timetable = require('./lib/timetable');
var queries = require('./lib/queries');

timetable.updateJob(queries.staff.name, queries.staff.sql, queries.staff.schedule);
timetable.updateJob(queries.staffAbsent.name, queries.staffAbsent.sql, queries.staffAbsent.schedule);
timetable.updateJob(queries.moduleReports.name, queries.moduleReports.sql, queries.moduleReports.schedule);

server.start();