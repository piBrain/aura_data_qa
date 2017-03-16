require('dotenv').config()

module.exports = {
  "development": {
    "url": process.env.DATABASE_URL,
    "dialect": "postgres"
  },
  "test": {
    "username": "aura",
    "password": "login123",
    "database": "aura_qa_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "url": process.env.DATABASE_URL,
    "dialect": "postgres"
  }
}
