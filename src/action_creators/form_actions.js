import axios from 'axios'
import util from 'util'

export function setCurrentCategory(category) {
  return {
    type: 'SET_CURRENT_CATEGORY',
    data: category,
  }
}

export function toggleTutorial() {
  return {
    type: 'TOGGLE_TUTORIAL',
  }
}

export function fetchImage(userId, imageId) {
  if (!userId || !imageId || isNaN(userId) || isNaN(imageId)) {
    console.log('Missing params')
  }
  return (dispatch, getState) => {
    axios.get('/get_image', {
      params: {
        userId,
        imageId,
      },
    })
      .then((response, state) => {
        dispatch({
          type: 'IMAGE',
          data: response.data,
        })
      })
      .catch((error) => {
        console.log('Error Fetching Image:', error)
      })
  }
}

export function fetchResponseForImage(userId, imageId) {
  console.log('Fetch Response with ID hit')
  return (dispatch, getState) => {
    axios.get('/get_response', {
      params: {
        userId,
        imageId,
      },
    })
      .then((response, state) => {
        dispatch({
          type: 'RESPONSE',
          data: response.data,
        })
      })
      .catch((error) => {
        console.log('Error Fetching Response:', error)
      })
  }
}

export function fetchResponseForUser(userId) {
  console.log('Fetch Response with User hit')
  return (dispatch, getState) => {
    axios.get('/get_response', {
      params: {
        userId,
      },
    })
      .then((response, state) => {
        dispatch({
          type: 'RESPONSE',
          data: response.data,
        })
      })
      .catch((error) => {
        console.log('Error Fetching Response:', error)
      })
  }
}

export function fetchCategories() {
  console.log('[ACTION] Fetch categories')
  return (dispatch, getState) => {
    axios.get('/get_categories')
      .then((response, state) => {
        dispatch({
          type: 'CATEGORIES',
          data: response.data,
        })
      })
  }
}

export function handleSubmit(responseData) {
  console.log('[ACTION] Getting data:', responseData)
  return (dispatch, getState) => {
    const userId = getState().user.id
    const entry = Object.assign({}, responseData, { userId })
    axios.post('/add_entry', entry)
      .then((data, status) => {
        console.log(`Submitted with status: ${status}`)
      })
  }
}
