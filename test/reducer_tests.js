import appReducer from '../src/reducers/app_reducer'
import appAction from '../src/action_creators/app_actions'
import ActivePage from '../src/enums/active_page'
import initialState from '../src/initial_state'
import { expect, assert } from 'chai'

describe('on setActivePage', function() {
  it('returns the new active page HOME in given action', function() {
    let action = {
      type: 'SET_ACTIVE_PAGE',
      activePage: ActivePage.HOME
    }
    let newState = appReducer(initialState, action)

    expect(newState).to.deep.equal({ activePage: action.activePage })
  })
})
