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
  db.RequestDatum.findById(id)
}

const records_by_range_query = (_, { id, range }) => {
  db.RequestDatum.findAll({ offset: id, range: range })
}

const requestDatumMutations = {
  Mutations: {
    mutateRequestDatum: update,
  }
}

const requestDatumQueries = {
  Queries: {
    singleRequestDataRecord: single_record_query,
    requestDatumRecordsByRange: records_by_range_query,
  }
}


export default merge({},requestDatumMutations,requestDatumQueries)
