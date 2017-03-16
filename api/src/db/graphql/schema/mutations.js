import RequestDatum from './request_datum'

export default () => [
  `type Mutation {
    mutateRequestDatum(
        id: Int!,
        newUpdatedAt: DateTime,
        updatedRequest: String!
        updatedData: JSON,
        updatedForm: JSON,
        updatedMethod: String,
        updatedCommandEx1: String!,
        updatedCommandEx2: String!,
        updatedValidation: Boolean!,
    ): RequestDatum
  }`,
  RequestDatum
]
