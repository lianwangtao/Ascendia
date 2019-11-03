import { ADD_DEFINITION, ADD_SUBTITLE } from "../actionTypes"
<<<<<<< HEAD
import initialState from "./initial_state"
=======
import initialState from "../initialState"
>>>>>>> Add redux support for subtitles

export default function(state = initialState(), action) {
  switch (action.type) {
    case ADD_DEFINITION: {
      return Object.assign({}, state, { definitions: action.data })
    }
    case ADD_SUBTITLE: {
<<<<<<< HEAD
      console.log("Hit Add subtitle with data: ", action.data)
=======
>>>>>>> Add redux support for subtitles
      return Object.assign({}, state, { subtitles: action.data })
    }
    default:
      return state
  }
}
