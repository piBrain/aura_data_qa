import App from './App'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const store = createStore({})

window.onload = () => {
  render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('app')
  )
}
