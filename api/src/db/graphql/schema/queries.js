import RequestDatum from './request_datum'
import Site from './site'

export default () => [
    `type Query {
      singleRequestDataRecord(id: Int!): Site
      requestDatumRecordsByRange(id: Int!, range: Int!): [Site!]
      firstNonValidatedRecord: Site
    }`,
    Site
  ]
