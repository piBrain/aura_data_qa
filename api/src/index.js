import awsServerlessExpress from 'aws-serverless-express'
import { config as dotEnvConfig } from 'dotenv'
dotEnvConfig()
import bodyParser from 'body-parser'
import express from 'express'
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './db/graphql/schema/base_schema'
import requestDatumResolvers from './db/graphql/resolvers/requestdatum_resolver'
import db from './db/sequelize/models/db_connection'
import cors from 'cors'
import GoogleAuth from 'google-auth-library'
import crypto from 'crypto'
import base64url from 'base64url'


const qaApp = express()

// console.log(typeDefs)
// console.log(requestDatumResolvers)

const schema = makeExecutableSchema({typeDefs: typeDefs, resolvers: requestDatumResolvers})

const authClient = new ( new GoogleAuth ).OAuth2(process.env.GOOGLE_CLIENT_ID)

const generateNonceString = () => {
  return base64url(crypto.randomBytes(64))
}

qaApp.use(cors())


qaApp.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress((request) => {
    const token = request.headers
      && request.headers.authorization
      && request.headers.authorization.split(' ')[1]
      || undefined
    return {
      context: { token },
      schema, 
    }
  }),
)


qaApp.use(
    '/graphiql',
    graphiqlExpress({ endpointURL: '/graphql' }),
)

async function authenticationHandler( req, res ) {
   async function googleSuccessCallback(e, login) {
    if(e) {
      console.log(e)
      res.sendStatus(500)
      return
    }
    let payload = login.getPayload()
    if(process.env.GSUITE_DOMAIN == payload['hd']) {
      const user = (await db.User.findOrCreate({ where: { email: payload['email'], token: payload['sub']} }))[0]
      const dstroyed_sessions = await db.Session.destroy({ where: { user_id: user.id } })
      const session = await db.Session.create({ nonce: generateNonceString(), user_id: user.id})
      res.write(session.nonce)
      res.end()
      return
    } else {
      res.sendStatus(401)
      return
    }
  }
  authClient.verifyIdToken( req.headers['google-access-token'], process.env.GOOGLE_CLIENT_ID, googleSuccessCallback)
}

qaApp.use(
  '/auth',
  authenticationHandler
)

const db_sync_result = initDB()


export async function initHttpServer() {
  let db_success = await db_sync_result

  const server = qaApp.listen(process.env.LISTEN_PORT)
  return new Promise((resolve, reject) => {
    server.on('listening', () => {
      console.log(`DataQA API now listening on port ${process.env.LISTEN_PORT}`)
      resolve(server)
    })
    server.on('error', err => reject(err))
  })
}

export function initDB() {
  console.log('Initializing DB.')
  return db.sequelize.sync()
}


// initServer(qaApp,db)

const qaServer = awsServerlessExpress.createServer(qaApp)

export const lambdaHandler = async (event, context) => {
  await db_sync_result
  // console.log(`process.env keys: ${Object.keys(process.env)}`)
  console.log(`process.env.DATABASE_URL: ${process.env.DATABASE_URL}`)
  return awsServerlessExpress.proxy(qaServer, event, context)
}
