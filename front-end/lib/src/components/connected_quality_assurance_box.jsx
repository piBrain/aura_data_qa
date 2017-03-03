import QualityAssuranceBox from './quality_assurance_box'

import { connect } from 'react-redux'

import { graphql, compose } from 'react-apollo'

import { bindActionCreators } from 'redux'

import gql from 'graphql-tag'

import { acceptValid, rejectInvalid } from '../../actions'

const currentFiveRecords = gql`
  query CurrentFiveRecords($id: Int!, $range: Int!) {
    requestDatumRecordsByRange(id: $id, range: $range) {
     id
    }
  }

`

const mapStateToProps = (state) => {
  const active_request = state.qa.records.byId[state.qa.records.activeRecord]
  // return {
  //   active_rest_request: active_request.parsed_request,
  //   active_data_fields: active_request.data,
  //   in_validation: state.qa.in_validation,
  //   loading_records: state.qa.loading_records,
  // }
  return {}
}

const mapDispatchToProps = (dispatch) => ({
  acceptValid: bindActionCreators( acceptValid, dispatch ),
  rejectInvalid: bindActionCreators( rejectInvalid, dispatch ),
})



export default compose(
    connect( mapStateToProps, mapDispatchToProps ),
    graphql(currentFiveRecords,{
      options: ({ activeRecordId }) => ({ variables: { id: 1, range: 5 } }),
    })
)(QualityAssuranceBox)
