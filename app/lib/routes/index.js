'use strict';

const periods = require('./periods');
const reports = require('./reports');
const staff = require('./staff');
const issues = require('./issues');

module.exports = [].concat(periods, reports, staff, issues);
