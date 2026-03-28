require('dotenv').config();

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './server/dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './server/migrations'
    }
  },
  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306
    },
    migrations: {
      directory: './server/migrations'
    }
  }
};
