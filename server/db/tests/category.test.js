'use strict'

import { expect } from 'chai'
import util from 'util'
import models from '../models'

describe('Category model', () => {
  before(() => {
    models.sequelize.sync()
  })

  it('creates a new category', () => {
    const Category = models.Category

    return Category.create({
      value: 'Foobar',
      userId: 1,
    })
      .then((category) => {
        expect(category.id).to.exist
        expect(category.value).to.equal('Foobar')
        expect(category.userId).to.equal(1)
      })
  })
})
