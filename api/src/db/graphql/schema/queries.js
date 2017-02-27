import RequestDatum from './request_datum'

export default () => [
    `type Query {
      requestDatum(id: !Int): RequestDatum
    }`,
    RequestDatum
  ]
