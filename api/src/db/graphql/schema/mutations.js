import SiteRequestData from './site_request_data'

export default () => [
  `type Mutation {
    createSiteRequestData(
      siteId: Int!,
      requestData: JSON!
    ): SiteRequestData
    prioritizeDomain( domain: String): String
  }`,
  SiteRequestData
]
