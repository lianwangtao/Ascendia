import axios from "axios"
import { ADD_DEFINITION, ADD_SUBTITLE, UPDATE_PLAYER_STATE } from "./actionTypes"

export function fetchDefinitions(id) {
  const url = '/api/v1/definitions'
  return (dispatch, _) => {
    axios.get(url, {
      params: {
        subtitle_id: id
      },
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
  console.log("Hit fetch subtitles")
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

