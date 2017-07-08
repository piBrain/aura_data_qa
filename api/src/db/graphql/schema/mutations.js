import SiteRequestData from './site_request_data'

export default () => [
  `type Mutation {
    createSiteRequestData(
      siteId: Int!,
      requestData: JSON!
    ): SiteRequestData
    newsletterSignUp( url: String!, email: String!, firstName: String!, lastName: String! ): JSON
    prioritizeDomain( domain: String): String,
    signUpUser(
      firstName: String!,
      lastName: String!,
      email: String!,
      countryCode: String!,
      url: String!,
      title: String,
      company: String,
      phoneNumber: String!
    ): JSON
    verifyUserEmail( nonce: String!, url: String! ): JSON
    verifyNewsletterEmail( url: String!, email: String!, firstName: String!, lastName: String, timestamp: DateTime! ): JSON
    forgotPassword(nonce: String!, secQuestionResponse1: String!, secQuestionResponse2: String!): JSON
    resetPassword(nonce: String!, resetToken: String!, newPassword: String!): JSON
  }`,
  SiteRequestData
]
