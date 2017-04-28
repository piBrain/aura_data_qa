require('dotenv').config()

env = process.env.NODE_ENV //|| throw new Error('Please specify "NODE_ENV"')

const configs = {
  "development": {
    "dbUrl": process.env.DATABASE_URL || (throw new Error('Please specify "DATABASE_URL"')),
    "dialect": "postgres",
  },
  local: {
    dbUrl: 'postgres://127.0.0.1:5432/aura_qa_development',
    dialect: 'postgres',
    port: '3142',
  },
  "test": {
    "username": "aura",
    "password": "login123",
    "database": "aura_qa_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "dbUrl": process.env.PROD_DATABASE_URL || (throw new Error('Please specify "PROD_DATABASE_URL"')),
    "dialect": "postgres"
  }
}

process.env = { ...{}, ...process.env, ...configs[env] }

module.exports = configs
