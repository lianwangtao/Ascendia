import { UPDATE_HOME_LOADING, UPDATE_TRANSLATOR } from "../actionTypes"
import initialState from "./InitialState"

export default function (state = initialState(), action) {
  switch (action.type) {

    case UPDATE_HOME_LOADING: {
      return Object.assign({}, state, { loading: action.data })
    }

    case UPDATE_TRANSLATOR: {
      return Object.assign({}, state, { translator: action.data })
    }

    default:
      return state
  }
}
