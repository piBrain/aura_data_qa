export default () => [`type RequestDatum {

    id: Int!

    updatedAt(newUpdatedAt: DateTime): DateTime!

    parsed_request(updatedRequest: String): String

    method(updatedMethod: String): String

    data(updatedData: JSON): JSON

    form(updatedForm: JSON): JSON

  }`]
