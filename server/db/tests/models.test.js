'use strict'

import { expect } from 'chai'
import models from '../models'

describe('Models', () => {
  it('returns the models', () => {
    expect(models).to.exist
  })

  it('returns the user model', () => {
    expect(models.User).to.exist
  })

  it('returns the question model', () => {
    expect(models.Question).to.exist
  })

  it('returns the option model', () => {
    expect(models.Option).to.exist
  })

  it('returns the selection response model', () => {
    expect(models.SelectionResponse).to.exist
  })

  it('returns the text response model', () => {
    expect(models.TextResponse).to.exist
  })

  it('returns the bug report model', () => {
    expect(models.BugReport).to.exist
  })

  it('returns the category model', () => {
    expect(models.Category).to.exist
  })
})
