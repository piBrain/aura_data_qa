import RequestDatum from './request_datum'

export default () => [
    `type Query {
      singleRequestDataRecord(id: Int!): RequestDatum
      requestDatumRecordsByRange(id: Int!, range: Int!): [RequestDatum]
      firstNonValidatedRecord: RequestDatum
    }`,
    RequestDatum
  ]
