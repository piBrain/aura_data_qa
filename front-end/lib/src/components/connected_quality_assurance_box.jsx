import QualityAssuranceBox from './quality_assurance_box'

import { connect } from 'react-redux'

import { graphql, compose } from 'react-apollo'

import { bindActionCreators } from 'redux'

import gql from 'graphql-tag'

import { acceptValid, rejectInvalid, openAcceptModal, closeAcceptModal } from '../../actions'

const currentRecord = gql`
  query CurrentRecord {
    firstNonValidatedRecord {
     id
     parsed_request
     method
    }
  }

`
const mapStateToProps = (state) => {
  return {
    in_validation: state.qa.in_validation,
    completed_count: state.qa.completed_count,
    is_accept_open: state.qa.is_accept_open
  }
}

const mapDispatchToProps = (dispatch) => (bindActionCreators({
      acceptValid,
      rejectInvalid,
      openAcceptModal,
      closeAcceptModal },
      dispatch))



export default compose(
    connect( mapStateToProps, mapDispatchToProps ),
    graphql(currentRecord,{
      options: ({ activeRecordId }) => ({ variables: { id: 1 } }),
    })
)(QualityAssuranceBox)
