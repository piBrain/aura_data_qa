import LoginBox from './login_box.jsx'

import { connect } from 'react-redux'

import { graphql, compose } from 'react-apollo'

import { bindActionCreators } from 'redux'

import gql from 'graphql-tag'

import { rejectLogin, requestNonceFromServer } from '../../actions'

import { push } from 'react-router-redux';

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      requestNonceFromServer,
      rejectLogin,
      pushHistory: push
    },
    dispatch
  )
}


export default compose(
  connect( mapStateToProps, mapDispatchToProps ),
)(LoginBox)

