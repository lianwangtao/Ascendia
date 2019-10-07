import axios from 'axios'
import util from 'util'
import ActivePage from '../enums/active_page'

export function handleSignup(data, redirect) {
  return function (dispatch, getState) {
    axios.post('/signup', data)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: 'CONFIRM_SIGNUP',
            response: response.data,
          }, redirect(ActivePage.JOURNAL))
        }
      })
      .catch((error) => {
        console.log('[User action: sign-up Error]: ', error)
        if (error) {
          dispatch({
            type: 'INVALID_SIGNUP',
            response: error.response.data,
          })
        }
      })
  }
}

export function activateUser(data, redirect) {
  return function (dispatch, getState) {
    axios.post('/activate', data)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: 'CONFIRM_ACTIVATION',
          }, redirect(ActivePage.JOURNAL))
        }
      })
      .catch((error) => {
        console.log('[User action: activate Error]: ', error)
        if (error) {
          dispatch({
            type: 'INVALID_ACTIVATION',
            response: error.response.data,
          })
        }
      })
  }
}

export function recoverPassword(email) {
  return function (dispatch, getState) {
    const data = { email }
    axios.post('/send_password_recovery', data)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: 'CONFIRM_RECOVERY',
          })
        }
      })
      .catch((error) => {
        console.log('[User action: recover password Error]: ', error)
        if (error) {
          dispatch({
            type: 'INVALID_RECOVERY',
            response: error.response.data,
          })
        }
      })
  }
}

export function acceptNDA(data, redirect) {
  return function (dispatch, getState) {
    const userInfo = {
      userId: data,
    }
    axios.post('/accept_nda', userInfo)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: 'CONFIRM_NDA',
          })
        }
      })
      .catch((error) => {
        console.log('[User action: accept NDA Error]: ', error)
        if (error) {
          dispatch({
            type: 'INVALID_NDA',
            response: error.response.data,
          })
        }
      })
  }
}

export function closeError() {
  return {
    type: 'CLOSESNACK',
  }
}

export function confirmFirstTimeLogin(userId) {
  return function (dispatch, getState) {
    const data = { userId }
    axios.post('/confirmFirstTimeLogin', data)
      .then((response, status) => {
        // console.log('Confirm first time login')
      })
      .catch((error) => {
        console.log('Cannot confirm first time login')
      })
  }
}

export function handleLogin(data, redirect) {
  return function (dispatch, getState) {
    axios.post('/login', data)
      .then((response, status) => {
        dispatch({
          type: 'CONFIRM_LOGIN',
          response: response.data,
        }, redirect(ActivePage.JOURNAL))
        if (response.data.firstTimeLogin) {
          dispatch({
            type: 'TOGGLE_TUTORIAL',
          })
        }
      })
      .catch((error) => {
        const errorMessage = 'User name or password not correct. Please try again.'
        dispatch({
          type: 'INVALID_LOGIN',
          response: errorMessage,
        })
      })
  }
}

export function handleLogout() {
  return {
    type: 'LOGOUT',
  }
}
