module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: 'postgres://pxkzipseqczmhb:ecb3d2a4587d92925304bc5fab1ea4306a22cb9bcf7add923facc0e2f392458a@ec2-107-21-226-44.compute-1.amazonaws.com:5432/d2uticatv8td1r?ssl=true',
  migrations: {
    directory: './database/migrations'
  },
  seeds: {
    directory: './database/seeds'
  }
},
production: {
  client: 'pg',
  connection: 'postgres://pxkzipseqczmhb:ecb3d2a4587d92925304bc5fab1ea4306a22cb9bcf7add923facc0e2f392458a@ec2-107-21-226-44.compute-1.amazonaws.com:5432/d2uticatv8td1r?ssl=true',
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
  }
}
};