export default () => [`type RequestDatum {

    id: Int!

    updatedAt(newUpdatedAt: DateTime): DateTime!

    parsedRequest(updatedRequest: String): String

    method(updatedMethod: String): String

    data(updatedData: JSON): JSON

    form(updatedForm: JSON): JSON

  }`]
