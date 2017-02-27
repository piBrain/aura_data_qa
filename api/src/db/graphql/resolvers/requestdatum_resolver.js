import db from '../../sequelize/models/db_connection'
import { merge  } from 'lodash'

const update = (_, { id, newUpdatedAt, updatedRequest, updatedData, updatedForm, updatedMethod, }) => {

  db.requestDatum.update({}, {
    updated_at: newUpdatedAt,
    parsed_request: updatedRequest,
    data: updatedData,
    form: updatedForm,
    method: updatedMethod,
  })

}
const query = (_, { id }) => {
  db.requestDatum.findOne({ where: { id } })
}

const requestDatumMutations = {
  Mutation: {
    mutateRequestDatum: update,
  }
}

const requestDatumQueries = {
  Query: {
    requestDatum: query,
  }
}


export default merge({},requestDatumMutations,requestDatumQueries)
