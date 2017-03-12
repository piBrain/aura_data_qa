import QualityAssuranceBox from './quality_assurance_box'

import { connect } from 'react-redux'

import { graphql, compose } from 'react-apollo'

import { bindActionCreators } from 'redux'

import gql from 'graphql-tag'

import { rejectInvalid, openAcceptModal, closeAcceptModal, toggleNewRecord, updateIntermediate } from '../../actions'

const currentRecord = gql`
  query CurrentRecord {
    firstNonValidatedRecord {
     id
     parsed_request
     method
     found_at
    }
  }

`

const updateRecord = gql`
  mutation UpdateRecord(
    $id: Int!,
    $updatedRequest: String!,
    $updatedMethod: String,
    $updatedValidation: Boolean!,
    $updatedData: JSON)
    {
      mutateRequestDatum(
        id: $id,
        updatedValidation: $updatedValidation,
        updatedData: $updatedData,
        updatedMethod: $updatedMethod,
        updatedRequest: $updatedRequest) {
          id
        }
    }
`
const mapStateToProps = (state) => {
  return {
    in_validation: state.qa.in_validation,
    completed_count: state.qa.completed_count,
    is_accept_open: state.qa.is_accept_open,
    isNewRecord: state.qa.isNewRecord,
    intermediateRecord: state.qa.intermediateRecord,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      rejectInvalid,
      openAcceptModal,
      closeAcceptModal,
      toggleNewRecord,
      updateIntermediate
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
    persistChangesAndValidate: ( { id, request, method, data, form } ) => {
      return mutate({ variables: { id, updatedRequest: request, updatedValidation: true } })
    }
  }),
  // refetchQueries: ['CurrentRecord'],
})

export default compose(
    connect( mapStateToProps, mapDispatchToProps ),
    fetchNonValidatedRecord,
    persistChangesAndValidate
)(QualityAssuranceBox)
