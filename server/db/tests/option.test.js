'use strict'

import { expect } from 'chai'
import util from 'util'
import models from '../models'

describe('Option model', () => {
  before(() => {
    models.sequelize.sync()
  })

  it('creates a new option', () => {
    const Option = models.Option

    return Option.create({
      value: 'This is a test option',
      questionId: 1,
    })
      .then((option) => {
        expect(option.id).to.exist
        expect(option.value).to.equal('This is a test option')
        expect(option.questionId).to.equal(1)
      })
  })
})
