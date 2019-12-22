// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react"
import { render } from "react-dom"
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import App from "../components/App"
import initialState from './reducers/InitialState'
import videoReducer from "./reducers/VideoReducer"
import homeReducer from "./reducers/HomeReducer"
import CloudinaryConfig from '../config/CloudinaryConfig'

let store = createStore(
  combineReducers({ home: homeReducer, video: videoReducer }),
  initialState(),
  applyMiddleware(thunk)
)

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}>
      <App cloudName={CloudinaryConfig.cloud_name} />
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  )
})
