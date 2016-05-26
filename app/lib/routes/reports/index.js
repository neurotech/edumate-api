'use strict';

const Joi = require('joi');
const r = require('../../db');
const config = require('../../../config');

var reports = [
  {
    method: 'GET',
    path: '/api/reports/all',
    handler: (request, reply) => {
      r.db(config.db.name)
        .table('module_reports')
        .then((result) => {
          reply(result);
        });
    }
  },
  {
    method: 'GET',
    path: '/api/reports/module/{module}',
    handler: (request, reply) => {
      var module = request.params.module ? { module: encodeURIComponent(request.params.module) } : '';
      r.db(config.db.name)
        .table('module_reports')
        .orderBy('module', 'kind', 'heading', 'reportName')
        .filter(module)
        .skip(request.query.offset)
        .limit(request.query.limit)
        .then((result) => {
          reply(result);
        });
    },
    config: {
      validate: {
        params: {
          module: Joi.string()
        },
        query: {
          limit: Joi.number().integer().min(1).max(100).default(100),
          offset: Joi.number().integer().min(1).max(100).default(0)
        }
      }
    }
  }
];

module.exports = reports;
