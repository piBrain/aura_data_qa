import { map } from 'bluebird'
import { merge  } from 'lodash'
import GraphQLJSON from 'graphql-type-json'
import { GraphQLDateTime } from 'graphql-iso-date'
import db from '../../sequelize/models/db_connection'
import authHandler from './authHandler'

const createSiteRequestData = (_, args, context) => {
  const executeUpdate = async ({
    siteId,
    requestData,
    userId
  }) => {
    const nonEmptyRequestData = Object.values(requestData)
      .filter((requestDatum) => (requestDatum.request !== '' && requestDatum.method !== ''))

    const processNonEmptyRequestDatum = async (requestDatum) => {
      const requestDatumRecord = await createRequestDatum(requestDatum, userId, siteId)
      const requestDatumId = requestDatumRecord.id
      await db.SiteRequestData.create({site_id: siteId, request_datum_id: requestDatumId}, { returning: true })
      const newCommandExs = [requestDatum.commandEx1, requestDatum.commandEx2]
      const validCommands = newCommandExs.filter((val) => (val))
      await attachCommandExamplesToRequestDatum(validCommands, userId, requestDatumId)
      return db.Site.update(
        { validated: true },
        { where: { id: siteId } },
      )
    }

    await map(nonEmptyRequestData, processNonEmptyRequestDatum)

    return { siteId }
  }
  return authHandler(context, executeUpdate, args)
}

const createRequestDatum = (requestDatum, userId, siteId) => {
  return db.RequestDatum.create({
    updatedAt: (new Date()).toISOString(), request: requestDatum.request, data: requestDatum.data, form: requestDatum.form,
    method: requestDatum.method, tags: requestDatum.tags, notes: requestDatum.notes
  }, { returning: true })
}

const attachCommandExamplesToRequestDatum = async (validCommands, userId, requestDatumId) => {
  for( let val of validCommands ) {
    await db.CommandExample.create({
      user_id: userId,
      text: val
    }, { returning: true }).then((example) => {
      db.RequestDatumCommandExample.create({ command_example_id: example.id, request_datum_id: requestDatumId })
    })
  }
}

const single_record_query = (_, { id }) => {
  return db.RequestDatum.findById(id)
}

const records_by_range_query = (_, { id, range }) => {
  return db.RequestDatum.findAll({ offset: id, limit: range })
}

const first_non_validated_record = (_, args, context) => {
  console.log('someone asked for a record')
  const executeQuery = () => {
    console.log('gonna look for a record')
    return db.Site
      .findOne({
        where: {
          priority_domain: true,
          validated: false,
        },
        order: [ db.Sequelize.fn( 'RANDOM' ) ]
      })
  }
  return authHandler(context, executeQuery)
}

const requestDatumMutations = {
  Mutation: {
    createSiteRequestData,
  }
}

const requestDatumQueries = {
  Query: {
    singleRequestDataRecord: single_record_query,
    requestDatumRecordsByRange: records_by_range_query,
    firstNonValidatedRecord: first_non_validated_record,
  }
}

const requestDatum = {
  RequestDatum: {
    id: ({id}) => (id),
    foundAt: ({ found_at }) => (found_at),
  }
}

const siteRequestData = {
  SiteRequestData: {
    id: ({id}) => (id),
  }
}

const scalarResolvers = {
  JSON: GraphQLJSON,
  DateTime: GraphQLDateTime
}

export default merge({}, requestDatumMutations, requestDatumQueries, requestDatum, scalarResolvers, siteRequestData)
