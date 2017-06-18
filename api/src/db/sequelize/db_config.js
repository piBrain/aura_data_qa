var config = require('../../../config')
config()

module.exports = {
  "local": {
    "url": process.env.DATABASE_URL,
    dialect: 'postgres',
    pool: {
      min: 0,
      max: 5,
      idle: 10000,
      acquire: 10000,
    },
    retry: {
      max: 3,
    }
  },
  "test": {
    "username": "aura",
    "password": "login123",
    "database": "aura_qa_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "url": process.env.PROD_DATABASE_URL,
    "dialect": "postgres"
  }
}
