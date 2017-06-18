import QualityAssuranceBox from './quality_assurance_box'

import { connect } from 'react-redux'

import { gql, graphql, compose } from 'react-apollo'

import { bindActionCreators } from 'redux'

import { rejectInvalid, openAcceptModal, closeAcceptModal, toggleNewRecord, updateRequest, updateSite, skip, reset, addRequest, removeRequest } from '../../actions'

import { push } from 'react-router-redux';

const currentRecord = gql`
  query CurrentRecord {
    firstNonValidatedRecord {
       id,
       url
    }
  }

`

const updateRecord = gql`
  mutation UpdateRecord(
    $siteId: Int!,
    $requestData: JSON!
  )
    {
      createSiteRequestData(
        siteId: $siteId,
        requestData: $requestData
      ) {
          siteId
        }
    }
`
const mapStateToProps = (state) => {
  return {
    in_validation: state.qa.in_validation,
    completed_count: state.qa.completed_count,
    is_accept_open: state.qa.is_accept_open,
    isNewRecord: state.qa.isNewRecord,
    site: state.qa.site,
    requests: state.qa.requests,
    token: state.login.serverNonce ? true : false
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      rejectInvalid,
      openAcceptModal,
      closeAcceptModal,
      toggleNewRecord,
      updateRequest,
      updateSite,
      addRequest,
      removeRequest,
      reset,
      skip,
      pushHistory: push
    },
    dispatch
  )
}

const fetchNonValidatedRecord = graphql(currentRecord, {
  fetchPolicy: 'network-only',
  name: 'CurrentRecord',
})

const persistChangesAndValidate = graphql(updateRecord, {
  props: ({ mutate }) => ({
    persistChangesAndValidate: ( { siteId, requestData } ) => {
      return mutate({
        variables: {
          siteId,
          requestData
        },
      })
    }
  }),
})

export default compose(
    connect( mapStateToProps, mapDispatchToProps ),
    fetchNonValidatedRecord,
    persistChangesAndValidate
)(QualityAssuranceBox)
