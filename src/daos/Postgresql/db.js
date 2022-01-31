const pgp = require('pg-promise')();
require('dotenv').config();

const db = pgp(process.env.CONNECTION_STRING);

module.exports = db;