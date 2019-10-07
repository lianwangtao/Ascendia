import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { expect } from 'chai'
import React from 'react'
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils'
import { Provider } from 'react-redux'
import { shallow } from 'enzyme'
import { Home } from '../src/components/home'
import util from 'util'
import initialState from '../src/initial_state'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const testStore = mockStore(initialState)
const component = shallow(<Home />)

describe('Home Sample Test', () => {
  it('renders without exploding', () => {
    expect(component).to.have.length(1);
  })
})
