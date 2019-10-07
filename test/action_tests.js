import * as appActions from '../src/action_creators/app_actions'
import ActivePage from '../src/enums/active_page'
import { expect, assert } from 'chai'

describe('actions', () => {
  it('should create an action to set the active page to home', () => {
    const text = ActivePage.HOME
    const expectedAction = {
      type: 'SET_ACTIVE_PAGE',
      activePage: text,
    }
    expect(appActions.setActivePage(text)).to.deep.equal(expectedAction)
  })
})
