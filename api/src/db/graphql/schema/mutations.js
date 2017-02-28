import RequestDatum from './request_datum'

export default () => [
  `type Mutations {
    mutateRequestDatum(
        id: Int!,
        newUpdatedAt: DateTime!,
        updatedData: JSON,
        updatedForm: JSON,
        updatedMethod: JSON,
    ): RequestDatum
  }`,
  RequestDatum
]
