import db from '../../sequelize/models/db_connection'
import { merge  } from 'lodash'

const update = (_, { id, newUpdatedAt, updatedRequest, updatedData, updatedForm, updatedMethod, }) => {

  db.RequestDatum.update({}, {
    updated_at: newUpdatedAt,
    parsed_request: updatedRequest,
    data: updatedData,
    form: updatedForm,
    method: updatedMethod,
  })

}
const single_record_query = (_, { id }) => {
  return db.RequestDatum.findById(id)
}

const records_by_range_query = (_, { id, range }) => {
  return db.RequestDatum.findAll({ offset: id, limit: range })
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
  }
}

const requestDatum = {
  RequestDatum: {
    id: ({id}) => (id),
  }
}


export default merge({}, requestDatumMutations, requestDatumQueries, requestDatum)
