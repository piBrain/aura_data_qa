import { merge  } from 'lodash'
import GraphQLJSON from 'graphql-type-json'
import { GraphQLDateTime } from 'graphql-iso-date'

import db from '../../sequelize/models/db_connection'

import authHandler from './authHandler'
import prioritizeDomain from './prioritizeDomain'


const update = (_, args, context) => {
  const executeUpdate = ({
    id,
    newUpdatedAt = (new Date()),
    updatedRequest,
    updatedData,
    updatedForm,
    updatedMethod,
    updatedValidation,
    newCommandExs,
    updatedFoundAt,
    updatedTags,
    updatedNotes,
    userId
  }) => {
    return db.RequestDatum.update({
      updated_at: newUpdatedAt,
      parsed_request: updatedRequest,
      data: updatedData,
      form: updatedForm,
      found_at: updatedFoundAt,
      method: updatedMethod,
      validated: updatedValidation,
      tags: updatedTags,
      notes: updatedNotes,
      user_id: userId,
    }, { where: { id: id }, returning: true  }
    ).then((updateResults) =>
      {
        let requestDatumInstance = updateResults[1][0]
        let validCommands = newCommandExs.filter((val) => { return (val && true) || false })
        validCommands.forEach((val) => {
          db.CommandExample.upsert({
            user_id: userId,
            request_datum_id: requestDatumInstance.id,
            text: val
          })
        })
      }
    )
  }
  authHandler(context, executeUpdate, args)
}

const single_record_query = (_, { id }) => {
const requestDatumMutations = {
  Mutation: {
    mutateRequestDatum: update,
  }
}

  return db.RequestDatum.findById(id)
}

const records_by_range_query = (_, { id, range }) => {
  return db.RequestDatum.findAll({ offset: id, limit: range })
}

const first_non_validated_record = (_, args, context) => {
  console.log('someone asked for a record')
  const executeQuery = () => {
    console.log('gonna look for a record')
    return db.RequestDatum
      .findOne({
        where: {
          prioritized: true,
          validated: false,
        },
        order: [ db.Sequelize.fn( 'RANDOM' ) ]
      })
  }
  return authHandler(context, executeQuery)
}

const requestDatumMutations = {
  Mutation: {
    mutateRequestDatum: update,
    prioritizeDomain,
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

const scalarResolvers = {
  JSON: GraphQLJSON,
  DateTime: GraphQLDateTime
}

export default merge({}, requestDatumMutations, requestDatumQueries, requestDatum, scalarResolvers)
