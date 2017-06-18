export default () => [`
  type RequestDatum {

    id: Int!

    updatedAt: DateTime!

    parsed_request: String

    method: String

    data: JSON

    form: JSON

    commandExs: [String!]

    foundAt: String

    notes: String

    tags: String

  }`
]
