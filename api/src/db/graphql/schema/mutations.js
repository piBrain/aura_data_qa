import RequestDatum from './request_datum'

export default () => [
  `type Mutation {
    mutateRequestDatum(
        id: !Int,
        newUpdatedAt: !DateTime,
        updatedData: JSON,
        updatedForm: JSON,
        updatedMethod: JSON,
    ): RequestDatum
  }`,
  RequestDatum
]
