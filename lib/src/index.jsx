import App from './App'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { qa_reducer } from '../reducers.js'

const store = createStore(
  qa_reducer,
  applyMiddleware(thunkMiddleware)
)

window.onload = () => {
  render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('app')
  )
}
