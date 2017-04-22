import db from '../../sequelize/models/db_connection'
import { merge  } from 'lodash'
import GraphQLJSON from 'graphql-type-json'
import { GraphQLDateTime } from 'graphql-iso-date'

async function authHandler(context, callback, callback_args=undefined) {
  const session = await db.Session.findOne({ where: { nonce: context.token } })
  if( session == null ) { return }
  debugger;
  const user = await db.User.findOne({ where: { id: session.user_id } })
  if ( typeof user === "undefined" || user == null) { return }
  return callback(callback_args)
}

const update = (_, args, context) => {
  const executeUpdate = ({ id, newUpdatedAt=(new Date()), updatedRequest, updatedData, updatedForm, updatedMethod, updatedValidation, newCommandExs, updatedFoundAt, }) => {
      return db.RequestDatum.update({
        updated_at: newUpdatedAt,
        parsed_request: updatedRequest,
        data: updatedData,
        form: updatedForm,
        found_at: updatedFoundAt,
        method: updatedMethod,
        validated: updatedValidation,
      }, { where: { id: id } })
      .addCommandExs(newCommandExs)
    }
  authHandler(context, executeUpdate, args)
}
const single_record_query = (_, { id }) => {
  return db.RequestDatum.findById(id)
}

const records_by_range_query = (_, { id, range }) => {
  return db.RequestDatum.findAll({ offset: id, limit: range })
}

const first_non_validated_record = (_, args, context) => {
  const executeQuery = () => {
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
  }
}

const scalarResolvers = {
  JSON: GraphQLJSON,
  DateTime: GraphQLDateTime
}

export default merge({}, requestDatumMutations, requestDatumQueries, requestDatum, scalarResolvers)
