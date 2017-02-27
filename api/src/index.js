import bodyParser from 'body-parser'
import express from 'express'
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import typeDefs from './db/graphql/schema/base_schema'
import requestDatumResolvers from './db/graphql/resolvers/requestdatum_resolver'

import { GraphQLJSON } from 'graphql-type-json'
import { GraphQLDateTime } from 'graphql-iso-date'

const qaApp = express()

const schema = makeExecutableSchema({typeDefs: typeDefs, resolvers: requestDatumResolvers})
console.log('here')
qaApp.use(
    '/',
    bodyParser.json(),
    graphqlExpress({ schema }),
)

qaApp.use(
    '/graphiql',
    graphiqlExpress({ endpointURL: '/graphiql' }),
)

async function initServer(app) {
  console.log(`pgstring: ${process.env.pibrainPostgresString}`)
  await syncDb()
  const server = app.listen(process.env.port)
  return new Promise((resolve, reject) => {
    server.on('listening', () => {
      console.log(`Aura API now listening on port ${process.env.port}`)
      resolve(server)
    })
    server.on('error', err => reject(err))
  })
}
