import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import app from './reducers/app_reducer'
import form from './reducers/form_reducer'
import user from './reducers/user_reducer'
import { AppContainer } from './components/app'
import initialState from './initial_state'

const IS_PROD = process.env.NODE_ENV === 'production'

const reducer = combineReducers({
  app,
  form,
  user,
})

let store = createStore(
  reducer,
  initialState(),
  applyMiddleware(thunk)
)

if (!IS_PROD) {
  window.store = store
}

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)
