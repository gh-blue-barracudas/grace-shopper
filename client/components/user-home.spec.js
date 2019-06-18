/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('<UserHome /> component', () => {
  let userHomeWrapper

  beforeEach('Create component', () => {
    userHomeWrapper = shallow(<UserHome />)
  })

  it('renders the welcome message in a h1', () => {
    expect(userHomeWrapper.find('h1').text()).to.be.equal('Welcome, Dreamer ')
  })

  it('renders the account information in a h2', () => {
    expect(userHomeWrapper.find('h2').text()).to.be.equal('Account Information')
  })
})
