import initialState from '../initial_state'
import util from 'util'

function setActivePage(state, activePage) {
  return Object.assign({}, state, { activePage })
}

const appReducer = (state = initialState(), action) => {
  switch (action.type) {
    case 'SET_ACTIVE_PAGE':
      return setActivePage(state, action.activePage)
    default:
      return state
  }
}

export default appReducer
