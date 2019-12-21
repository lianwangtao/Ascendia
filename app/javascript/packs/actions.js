import axios from "axios"
import hanzi from "hanzi"
import { ADD_DEFINITION, ADD_SUBTITLE, UPDATE_PLAYER_STATE } from "./actionTypes"

hanzi.start()

export function fetchDefinition(word) {
    const result = hanzi.definitionLookup(word, 's')

    return (dispatch, _) => {
        dispatch({
            type: ADD_DEFINITION,
            data: result[0]["definition"],
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

export function updatePlayerState(player_state) {
    return (dispatch, _) => {
        dispatch({
            type: UPDATE_PLAYER_STATE,
            data: player_state,
        })
    }
}

