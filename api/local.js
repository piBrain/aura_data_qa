'use strict'

require('babel-register')

console.log('spinning up local server')

require('./src/index').initHttpServer()
