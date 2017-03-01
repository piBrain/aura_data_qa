import RequestDatum from './request_datum'

export default () => [
    `type Queries {
      singleRequestDataRecord(id: Int!): RequestDatum
      requestDatumRecordsByRange(id: Int!, range: Int!): RequestDatum
    }`,
    RequestDatum
  ]
