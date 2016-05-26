'use strict';

const periods = require('./periods');
const reports = require('./reports');
const staff = require('./staff');

module.exports = [].concat(periods, reports, staff);
