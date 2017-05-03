'use strict'

require('babel-register')

console.log('spinning up new lambda execution')

exports.handler = require('./src/index').lambdaHandler
