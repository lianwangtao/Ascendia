import { ADD_DEFINITION, ADD_SUBTITLE } from "../actionTypes"
<<<<<<< HEAD:app/javascript/packs/reducers/video_reducer.js
import initialState from "../initialState"
=======
import initialState from "./InitialState"
>>>>>>> Add react video player:app/javascript/packs/reducers/VideoReducer.js

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
