const knex =require('knex');
const env = require('dotenv').config();

module.exports = {
  db: knex({
    client:'pg',
    connection:{
      host: process.env.DB_HOST,
      user:process.env.DB_USER,
      password:process.env.DB_PASSWORD,
      database:process.env.DB_DATABASE_NAME
    }
  })
}
