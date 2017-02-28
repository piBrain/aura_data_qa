import RequestDatum from './request_datum'

export default () => [
    `type Queries {
      requestDatum(id: Int!): RequestDatum
    }`,
    RequestDatum
  ]
