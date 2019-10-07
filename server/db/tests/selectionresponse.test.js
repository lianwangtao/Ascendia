'use strict'

import { expect } from 'chai'
import util from 'util'
import models from '../models'

describe('SelectionResponse model', () => {
  before(() => {
    models.sequelize.sync()
  })

  it('creates a new selection response', () => {
    const Option = models.Option
    const SelectionResponse = models.SelectionResponse

    return Option.create({
      value: 'This is a test option',
      questionId: 1,
    })
      .then((option) => {
        return SelectionResponse.create({
          optionId: option.id,
        })
          .then((response) => {
            expect(response.id).to.exist
            expect(response.optionId).to.equal(option.id)
          })
      })
  })
})
