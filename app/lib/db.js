'use strict';
const pg = require('pg');
const config = require('../config');
const url = `postgres://postgres:${config.db.password}@${config.db.host}/postgres`;

var client = new pg.Client(url);

module.exports = client;
