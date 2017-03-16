import QualityAssuranceBox from './quality_assurance_box'

import { connect } from 'react-redux'

import { graphql, compose } from 'react-apollo'

import { bindActionCreators } from 'redux'

import gql from 'graphql-tag'

import { rejectInvalid, openAcceptModal, closeAcceptModal, toggleNewRecord, updateIntermediate } from '../../actions'

import { push } from 'react-router-redux';

const currentRecord = gql`
  query CurrentRecord {
    firstNonValidatedRecord {
     id
     parsed_request
     method
     data
     form
     found_at
     commandEx1
     commandEx2
    }
  }

`

const updateRecord = gql`
  mutation UpdateRecord(
    $id: Int!,
    $updatedRequest: String!,
    $updatedMethod: String,
    $updatedValidation: Boolean!,
    $updatedForm: JSON,
    $updatedData: JSON,
    $updatedCommandEx1: String!,
    $updatedCommandEx2: String!)
    {
      mutateRequestDatum(
        id: $id,
        updatedValidation: $updatedValidation,
        updatedData: $updatedData,
        updatedForm: $updatedForm,
        updatedMethod: $updatedMethod,
        updatedCommandEx1: $updatedCommandEx1,
        updatedCommandEx2: $updatedCommandEx2,
        updatedRequest: $updatedRequest) {
          id
        }
    }
`
const mapStateToProps = (state) => {
  console.log(state.login.serverNonce)
  console.log(state.login.serverNonce ? true : false)
  return {
    in_validation: state.qa.in_validation,
    completed_count: state.qa.completed_count,
    is_accept_open: state.qa.is_accept_open,
    isNewRecord: state.qa.isNewRecord,
    intermediateRecord: state.qa.intermediateRecord,
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
      updateIntermediate,
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
    persistChangesAndValidate: ( { id, request, method, data, form, commandEx1, commandEx2 } ) => {
      return mutate({ 
        variables: { id,
                     updatedRequest: request,
                     updatedValidation: true,
                     updatedForm: form,
                     updatedData: data,
                     updatedMethod: method,
                     updatedCommandEx1: commandEx1,
                     updatedCommandEx2: commandEx2} })
    }
  }),
})

export default compose(
    connect( mapStateToProps, mapDispatchToProps ),
    fetchNonValidatedRecord,
    persistChangesAndValidate
)(QualityAssuranceBox)
