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
const query = (_, { id }) => {
  db.RequestDatum.findOne({ where: { id } })
}

const requestDatumMutations = {
  Mutations: {
    mutateRequestDatum: update,
  }
}

const requestDatumQueries = {
  Queries: {
    requestDatum: query,
  }
}


export default merge({},requestDatumMutations,requestDatumQueries)
