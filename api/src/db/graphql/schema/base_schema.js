import RequestDatum from './request_datum'
import Site from './site'
import SiteRequestData from './site_request_data'
import Mutations from './mutations'
import Queries from './queries'

const baseSchema = () => [ `
  scalar JSON
  scalar DateTime

  schema {
    query: Query,
    mutation: Mutation, }
`]

export default [
  baseSchema,
  Mutations,
  Queries,
  RequestDatum,
  Site,
  SiteRequestData,
]
