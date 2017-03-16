export default () => [`type RequestDatum {

    id: Int!

    updatedAt(newUpdatedAt: DateTime): DateTime!

    parsed_request(updatedRequest: String): String

    method(updatedMethod: String): String

    data(updatedData: JSON): JSON

    form(updatedForm: JSON): JSON

    commandEx1(updatedCommandEx1: String): String!

    commandEx2(updatedCommandEx2: String): String!

    validated(updatedValidation: Boolean): Boolean

    found_at: String

  }`]
