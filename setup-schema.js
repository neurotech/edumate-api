'use strict';

var queries = require('./lib/api/queries');
var rethinkdb = require('./lib/api/rethinkdb');

var manifest = function createManifest() {
  var output = [];
  for(var key in queries) {
    if (queries.hasOwnProperty(key)) {
      var value = queries[key];
      output.push(value.name);
    }
  };
  return output;
};

rethinkdb.setup('edumate_toolbelt', manifest());
