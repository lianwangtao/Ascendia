import axios from "axios"
import { ADD_DEFINITION, ADD_SUBTITLE, UPDATE_PLAYER_STATE } from "./actionTypes"

export function fetchDefinitions(word) {
  const url = '/api/v1/definitions'
  return (dispatch, _) => {
    axios.get(url, {
      params: { word },
    })
      .then(response => {
        dispatch({
          type: ADD_DEFINITION,
          data: response.data,
        })
      })
      .catch((error) => console.log("Error while fetching definition: ", error))
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

export function updatePlayerState(player_state) {
  return (dispatch, _) => {
    dispatch({
      type: UPDATE_PLAYER_STATE,
      data: player_state,
    })
  }
}

