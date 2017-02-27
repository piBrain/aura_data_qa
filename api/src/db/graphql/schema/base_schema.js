import RequestDatum from './request_datum'
import Mutations from './mutations'
import Queries from './queries'

const baseSchema = () => `
  schema {
    query: Queries,
    mutation: Mutations,
}`

export default [
  baseSchema,
  Mutations,
  Queries,
  RequestDatum,
]
