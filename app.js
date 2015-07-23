'use strict';

var server = require('./lib/hapi');

var timetable = require('./lib/api/timetable');
var queries = require('./lib/api/queries');

timetable.replaceJob(queries.staff.name, queries.staff.sql, queries.staff.schedule);
timetable.replaceJob(queries.moduleReports.name, queries.moduleReports.sql, queries.moduleReports.schedule);
timetable.replaceJob(queries.staffAbsent.name, queries.staffAbsent.sql, queries.staffAbsent.schedule);
timetable.replaceJob(queries.periods.name, queries.periods.sql, queries.periods.schedule);

server.start();
