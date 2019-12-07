const knex = require('knex');

const pg = require('pg');

require('dotenv').config();

const knexConfig = require('../knexfile');

const environment = process.env.NODE_ENV || 'development'

module.exports = knex(knexConfig[environment]);