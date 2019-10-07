'use strict'

import { expect } from 'chai'
import util from 'util'
import models from '../models'

describe('TextResponse model', () => {
  before(() => {
    models.sequelize.sync()
  })

  it('creates a new text response', () => {
    const TextResponse = models.TextResponse

    return TextResponse.create({
      value: 'This is a test text response!',
      questionId: 1,
    })
      .then((response) => {
        expect(response.id).to.exist
        expect(response.value).to.equal('This is a test text response!')
      })
  })
})
