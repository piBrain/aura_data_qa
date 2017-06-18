import SiteRequestData from './site_request_data'

export default () => [
  `type Mutation {
    createSiteRequestData(
      siteId: Int!,
      requestData: JSON!
    ): Boolean
    prioritizeDomain( domain: String): String
  }`,
  SiteRequestData
]
