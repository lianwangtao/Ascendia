import { ADD_DEFINITION, ADD_SUBTITLE } from "../actionTypes"
import initialState from "./initial_state"

export default function(state = initialState(), action) {
  switch (action.type) {
    case ADD_DEFINITION: {
      return Object.assign({}, state, { definitions: action.data })
    }
    case ADD_SUBTITLE: {
      console.log("Hit Add subtitle with data: ", action.data)
      return Object.assign({}, state, { subtitles: action.data })
    }
    default:
      return state
  }
}
