// @flow

import util from 'util'
import initialState from '../initial_state'

function _buildUserInfo(response) {
  return {
    firstName: response.firstName,
    lastName: response.lastName,
    email: response.email,
    id: response.id,
    error: null,
    nda: response.nda,
    activated: response.activation,
    lastAccessImageId: response.lastAccessImageId,
    firstTimeLogin: response.firstTimeLogin,
  }
}

function confirmSignup(state, action) {
  const userInfo = _buildUserInfo(action.response)
  const result = Object.assign({}, state, userInfo)
  return result
}

function confirmLogin(state, action) {
  const userInfo = _buildUserInfo(action.response)
  const result = Object.assign({}, state, userInfo)
  return result
}

function invalidLogin(state, action) {
  return Object.assign({}, state, {
    error: {
      open: true,
      message: action.response,
    },
  })
}

function invalidSignup(state, action) {
  return Object.assign({}, state, {
    error: {
      open: true,
      message: action.response,
    },
  })
}

function closeSnack(state) {
  return Object.assign({}, state, {
    error: {
      open: false,
      message: '',
    },
  })
}

function logout(state, action) {
  const newState = Object.assign({}, state, {
    error: {
      open: false,
      message: '',
    },
  })
  return Object.assign({}, newState, {
    lastAccessImageId: null,
  })
}

function confirmActivation(state) {
  return Object.assign({}, state, {
    activated: true,
  })
}

function confirmNDA(state) {
  return Object.assign({}, state, {
    nda: true,
  })
}

function confirmRecovery(state) {
  console.log('Confirm recovery hit')
  return Object.assign({}, state, {
    error: {
      open: true,
      message: 'Please check your email for password recovery',
    },
  })
}

function invalidRecovery(state) {
  return Object.assign({}, state, {
    error: {
      open: true,
      message: 'Please enter the email you registered your account with',
    },
  })
}

const userReducer = (state = initialState(), action) => {
  switch (action.type) {
    case 'CONFIRM_SIGNUP':
      return confirmSignup(state, action)
    case 'CONFIRM_LOGIN':
      return confirmLogin(state, action)
    case 'INVALID_LOGIN':
      return invalidLogin(state, action)
    case 'INVALID_SIGNUP':
      return invalidSignup(state, action)
    case 'LOGOUT':
      return logout(state, action)
    case 'CLOSESNACK':
      return closeSnack(state)
    case 'CONFIRM_ACTIVATION':
      return confirmActivation(state)
    case 'CONFIRM_NDA':
      return confirmNDA(state)
    case 'CONFIRM_RECOVERY':
      return confirmRecovery(state)
    case 'INVALID_RECOVERY':
      return invalidRecovery(state)
    default:
      return state
  }
}

export default userReducer
