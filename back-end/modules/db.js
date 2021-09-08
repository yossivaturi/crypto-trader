const knex =require('knex');
const env = require('dotenv').config();

module.exports = {
  db: knex({
    client:'pg',
    connection:{
      host: process.env.HOST,
      user:process.env.USER,
      password:process.env.PASSWORD,
      database:process.env.DATABASE
    }
  })
}
