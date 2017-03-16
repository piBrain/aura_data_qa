import React from 'react'
import { render } from 'react-dom'
import ConnectedQualityAssuranceBox from './components/connected_quality_assurance_box'
import { ConnectedRouter, push } from 'react-router-redux'

import { Route } from 'react-router'
import ConnectedLoginBox from './components/connected_login_box'


export default class App extends React.Component {
  render() {
    return(
        <ConnectedRouter history={this.props.history}>
          <div>
            <Route exact path="/" component={ConnectedQualityAssuranceBox} />
            <Route path="/login" component={ConnectedLoginBox}/>
          </div>
        </ConnectedRouter>
    )
  }
}
