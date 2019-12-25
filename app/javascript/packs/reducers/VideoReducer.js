import { ADD_DEFINITION, ADD_SUBTITLE, UPDATE_PLAYER_CURRENT_TIME, UPDATE_CURRENT_SUBTITLE } from "../actionTypes"
import initialState from "./InitialState"

export default function (state = initialState(), action) {
  switch (action.type) {

    case ADD_DEFINITION: {
      return Object.assign({}, state, { definition: action.data })
    }

    case ADD_SUBTITLE: {
      return Object.assign({}, state, { subtitles: action.data })
    }

    case UPDATE_PLAYER_CURRENT_TIME: {
      return Object.assign({}, state, { currentTime: action.data })
    }

    case UPDATE_CURRENT_SUBTITLE: {
      return Object.assign({}, state, { currentSubtitles: action.data })
    }

    default:
      return state
  }
}
