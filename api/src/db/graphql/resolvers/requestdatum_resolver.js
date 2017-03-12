import db from '../../sequelize/models/db_connection'
import { merge  } from 'lodash'

const update = (_, { id, newUpdatedAt=(new Date()), updatedRequest, updatedData, updatedForm, updatedMethod, updatedValidation}) => {
  console.log(newUpdatedAt)
  db.RequestDatum.update({
    updated_at: newUpdatedAt,
    parsed_request: updatedRequest,
    data: updatedData,
    form: updatedForm,
    method: updatedMethod,
    validated: updatedValidation,
  }, { where: { id: id } })

}
const single_record_query = (_, { id }) => {
  return db.RequestDatum.findById(id)
}

const records_by_range_query = (_, { id, range }) => {
  return db.RequestDatum.findAll({ offset: id, limit: range })
}

const first_non_validated_record = () => {
  return db.RequestDatum.findOne({ where: { validated: false  } })
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


export default merge({}, requestDatumMutations, requestDatumQueries, requestDatum)
