'use strict'

require(`./${process.env.NODE_ENV === 'production' ? 'lib' : 'src'}/index`).initHttpServer()
