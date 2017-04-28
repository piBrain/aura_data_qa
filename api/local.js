'use strict'

require('babel-register')

const moduleDirectory = process.env.NODE_ENV === 'production' ? 'lib' : 'src'

require(`./${moduleDirectory}/index`).initHttpServer()
