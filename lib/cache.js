'use strict';

var _ = require('lodash');
var fs = require('fs');
var Acho = require('acho');
var camelCase = require('camel-case');
var moment = require('moment');
var config = require('../config');

var acho = new Acho({color: true});
var cache = {};

// Create `resource`.json if it doesn't exist.
function cacheCreate(dataset) {
  var cacheFile = config.cache.path + dataset + '.json';

  return new Promise(function(resolve) {
    if (!fs.existsSync(cacheFile)) {
      fs.closeSync(fs.openSync(cacheFile, 'w'));
      resolve([dataset, 'created']);
    } else {
      resolve([dataset, 'exists']);
    }
  });
}

function cachePrep(dataset, results) {
  return new Promise(function(resolve) {
    var output = {};
    output.query = dataset;
    output.requested = moment().format();
    output.response = [];

    _.forEach(results, function(object) {
      var records = {};
      var keys = Object.keys(object);
      for (var i = 0; i < keys.length; i++) {
        records[camelCase(keys[i])] = object[keys[i]];
      }
      output.response.push(records);
    });

    resolve(output);
  });
}

cache.write = function(dataset, results) {
  cacheCreate(dataset)
    .then(function(res) {
      if (res[1] === 'exists') {
        acho.warning(res[0] + '.json ' + res[1]);
      } else {
        acho.success(res[0] + '.json ' + res[1]);
      }
      cachePrep(dataset, results)
        .then(function(output) {
          fs.writeFileSync(config.cache.path + dataset + '.json', JSON.stringify(output));
          acho.success('wrote ' + output.response.length + ' records to ' + dataset + '.json');
        }, function(error) {
          acho.error(error);
        });
    }, function(error) {
      acho.error(error);
    });
};

module.exports = cache;