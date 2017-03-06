import App from './App'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { qa_reducer } from '../reducers.js'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

const apollo_client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:4200/graphql' })
})


const store = createStore(
  combineReducers({ qa: qa_reducer, apollo: apollo_client.reducer() }),
  compose(
    applyMiddleware(apollo_client.middleware()),
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
