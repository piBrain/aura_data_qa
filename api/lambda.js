'use strict'

console.log('spinning up new lambda execution')

exports.handler = require('./lib/index').lambdaHandler
