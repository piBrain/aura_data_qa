export default () => [`
  type RequestDatum {

    id: Int!

    updatedAt: DateTime!

    parsed_request: String

    method: String

    data: JSON

    form: JSON

    commandExs: [String!]

    validated: Boolean

    foundAt: String

    notes: String

    tags: String

    user_id: Int

  }`
]
