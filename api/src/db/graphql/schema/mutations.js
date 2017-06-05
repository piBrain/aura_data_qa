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
        updatedValidation: Boolean!,
        updatedFoundAt: String,
        newCommandExs: [String!],
        updatedNotes: String,
        updatedTags: String,
        userId: Int,
    ): RequestDatum
    prioritizeDomain( domain: String): String
  }`,
  RequestDatum
]
