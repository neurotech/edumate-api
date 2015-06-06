'use strict';

var rethinkdb = require('./lib/rethinkdb');

var db = 'edumate_toolbelt';
var skeleton = ['staff', 'staff_away'];

rethinkdb.setup(db, skeleton);