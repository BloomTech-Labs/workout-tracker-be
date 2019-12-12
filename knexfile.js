// Update with your config settings.
require("dotenv").config();
const pg = require("pg");

module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL,
    //ssl: true,
    connection: {
    database: 'firstrep'
    //user:     process.env.DB_USER,
    //password: process.env.DB_PASSWORD
     },
  migrations: {
    directory: './database/migrations'
  },
  seeds: {
    directory: './database/seeds'
  }
},
production: {
  client: 'pg',
  connection: process.env.DATABASE_URL,
    //ssl: true,
    connection: {
    database: 'firstrep'
    //user:     process.env.DB_USER,
    //password: process.env.DB_PASSWORD
     },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: './database/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './database/seeds',
  },
  useNullAsDefault: true,
},
testing: {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  connection: {
    database: 'test'
  },
  useNullAsDefault: true,
  migrations: {
    directory: './database/migrations'
  },
}
};