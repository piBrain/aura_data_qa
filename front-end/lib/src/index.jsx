import App from './App'
import { apiUrl } from '../../config'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { qa_reducer, login_reducer } from '../reducers.js'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import {  routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk';

const history = createHistory()
const networkInterface = createNetworkInterface({ uri: `${apiUrl}/graphql` })

const apollo_client = new ApolloClient({
  networkInterface
})

const getCookieValue = (key) => {
    var matches = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
    return matches ? matches.pop() : '';
}

const store = createStore(
  combineReducers({ qa: qa_reducer, apollo: apollo_client.reducer(), router: routerReducer, login: login_reducer }),
  {login: { serverNonce: getCookieValue('piBrainQASessionNonce')  }},
  compose(
    applyMiddleware( apollo_client.middleware(), routerMiddleware(history), thunk ),
  )
)

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    const state = store.getState()
    console.log(JSON.stringify({ login: state.login }, null, 2))
    const token = state.login.serverNonce
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
}]);


window.onload = () => {
  render(
    <ApolloProvider store={ store } client={ apollo_client }>
      <App history={ history }/>
    </ApolloProvider>,
    document.getElementById('app')
  )
}
