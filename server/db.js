require('dotenv').config();
const knex = require('knex');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

const db = knex(isProd ? {
  client: 'mysql2',
  connection: {
    host    : process.env.DB_HOST,
    user    : process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port    : process.env.DB_PORT || 3306,
  },
  pool: { min: 2, max: 10 },
} : {
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, 'dev.sqlite3')
  },
  useNullAsDefault: true
});

module.exports = db;
