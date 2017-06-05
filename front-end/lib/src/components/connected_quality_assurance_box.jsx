import QualityAssuranceBox from './quality_assurance_box'

import { connect } from 'react-redux'

import { gql, graphql, compose } from 'react-apollo'

import { bindActionCreators } from 'redux'


import { rejectInvalid, openAcceptModal, closeAcceptModal, toggleNewRecord, updateIntermediate, resetIntermediate } from '../../actions'

import { push } from 'react-router-redux';

const currentRecord = gql`
  query CurrentRecord {
    firstNonValidatedRecord {
       id
       parsed_request
       method
       data
       form
       foundAt
       notes
       tags
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
    $updatedFoundAt: String,
    $newCommandExs: [String!],
    $updatedNotes: String,
    $updatedTags: String,
  )
    {
      mutateRequestDatum(
        id: $id,
        updatedValidation: $updatedValidation,
        updatedData: $updatedData,
        updatedForm: $updatedForm,
        updatedMethod: $updatedMethod,
        updatedFoundAt: $updatedFoundAt,
        newCommandExs: $newCommandExs,
        updatedRequest: $updatedRequest,
        updatedNotes: $updatedNotes,
        updatedTags: $updatedTags,
      ) {
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
      resetIntermediate,
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
    persistChangesAndValidate: ( { id, request, method, data, form, commandEx1, commandEx2, foundAt, notes, tags } ) => {
      return mutate({
        variables: { id,
                     updatedRequest: request,
                     updatedValidation: true,
                     updatedForm: form,
                     updatedData: data,
                     updatedMethod: method,
                     updatedFoundAt: foundAt,
                     newCommandExs: [commandEx1, commandEx2],
                     newNotes: notes,
                     newTags: tags,
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
