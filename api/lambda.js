'use strict'

const awsServerlessExpress = require('aws-serverless-express')
require('babel-register')

const app = require('./src/index').default
const initDB = require('./src/index').initDB


const server = awsServerlessExpress.createServer(app)

const db_sync_result = initDB()

exports.handler = (event, context) =>
  db_sync_result
    .then(() =>
      awsServerlessExpress.proxy(server, event, context)
    )
