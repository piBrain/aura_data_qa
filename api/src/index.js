import bodyParser from 'body-parser'
import express from 'express'
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import { config as dotEnvConfig } from 'dotenv'
import typeDefs from './db/graphql/schema/base_schema'
import requestDatumResolvers from './db/graphql/resolvers/requestdatum_resolver'
import db from './db/sequelize/models/db_connection'

import { GraphQLJSON } from 'graphql-type-json'
import { GraphQLDateTime } from 'graphql-iso-date'
import cors from 'cors'

dotEnvConfig()

const qaApp = express()

const schema = makeExecutableSchema({typeDefs: typeDefs, resolvers: requestDatumResolvers})

qaApp.use(cors())

qaApp.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({ schema }),
)


qaApp.use(
    '/graphiql',
    graphiqlExpress({ endpointURL: '/graphql' }),
)

// qaApp.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// })

async function initServer(app, db) {
  let db_success = await initDB(db)

  console.log(`pgstring: ${process.env.DATABASE_URL}`)
  const server = app.listen(process.env.LISTEN_PORT)
  return new Promise((resolve, reject) => {
    server.on('listening', () => {
      console.log(`DataQA API now listening on port ${process.env.LISTEN_PORT}`)
      resolve(server)
    })
    server.on('error', err => reject(err))
  })
}

async function initDB(db) {
  return new Promise((resolve, reject) => {
    console.log('Initializing DB.')
    resolve(db.sequelize.sync())
  })
}


initServer(qaApp,db)
