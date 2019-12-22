import axios from "axios"
import { ADD_DEFINITION, ADD_SUBTITLE, UPDATE_PLAYER_STATE, UPDATE_CURRENT_SUBTITLE } from "./actionTypes"
import { UPDATE_HOME_LOADING, UPDATE_TRANSLATOR } from "./actionTypes"

// Video Actions
export function fetchDefinition(word, translator) {
  const result = translator.lookUpWord(word)
  const definition = result["definition"]

  return (dispatch, _) => {
    dispatch({
      type: ADD_DEFINITION,
      data: definition,
    })
  }
}

export function fetchSubtitles(id) {
  const url = `/api/v1/subtitles?video_id=${id}`
  return (dispatch, _) => {
    axios.get(url, {})
      .then(response => {
        dispatch({
          type: ADD_SUBTITLE,
          data: response.data,
        })
      })
      .catch((error) => console.log("Error while fetching subtitles: ", error))
  }
}

export function updateCurrentSubtitle(currentSubtitle) {
  return (dispatch, _) => {
    dispatch({
      type: UPDATE_CURRENT_SUBTITLE,
      data: currentSubtitle,
    })
  }
}

export function updatePlayerState(player_state) {
  return (dispatch, _) => {
    dispatch({
      type: UPDATE_PLAYER_STATE,
      data: player_state,
    })
  }
}

// Home Actions
export function updateHomeLoading(loadingState) {
  return (dispatch, _) => {
    dispatch({
      type: UPDATE_HOME_LOADING,
      data: loadingState,
    })
  }
}

export function updateTranslator(translator) {
  return (dispatch, _) => {
    dispatch({
      type: UPDATE_TRANSLATOR,
      data: translator,
    })
  }
}

