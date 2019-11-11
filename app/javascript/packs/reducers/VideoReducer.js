import { ADD_DEFINITION, ADD_SUBTITLE } from "../actionTypes"
import initialState from "./InitialState"

export default function(state = initialState(), action) {
  switch (action.type) {
    case ADD_DEFINITION: {
      return Object.assign({}, state, { definitions: action.data })
    }
    case ADD_SUBTITLE: {
      return Object.assign({}, state, { subtitles: action.data })
    }
    default:
      return state
  }
}
