const { join } = require('node:path')

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: join(__dirname, 'dev.sqlite3'),
    },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
    },
  },

  test: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: ':memory:',
    },
    migrations: {
      directory: join(__dirname, 'migrations'),
    },
    seeds: {
      directory: join(__dirname, 'seeds'),
    },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
    },
  },

  production: {
    client: 'pg',
    connection: {
      connectionString:
        'postgres://mssevsjbwlaqmn:e13c39de0ad6bec4599d04896f31846d2f22a1d16c30a30d47719ad15ccc3cb4@ec2-34-193-110-25.compute-1.amazonaws.com:5432/d8ge6h0f56rst5',
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds',
    },
  },
}
