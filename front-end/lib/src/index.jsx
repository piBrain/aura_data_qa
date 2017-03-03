import App from './App'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { qa_reducer } from '../reducers.js'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

const apollo_client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:4200/graphql' })
})
const initial_state = {
  qa: {
    in_validation: true,
    loading_records: true,
    records: {
      active_record: null,
      byId: {},
    },
    allIds: []
  },
  apollo: {

  }
}

const store = createStore(
  combineReducers({ qa: qa_reducer, apollo: apollo_client.reducer() }),
  initial_state,
  compose(
    applyMiddleware(thunkMiddleware, apollo_client.middleware()),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
)


window.onload = () => {
  render(
    <ApolloProvider store={ store } client={ apollo_client }>
      <App/>
    </ApolloProvider>,
    document.getElementById('app')
  )
}
