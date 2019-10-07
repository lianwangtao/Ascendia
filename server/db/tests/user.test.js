'use strict'

import { expect } from 'chai'
import util from 'util'
import models from '../models'

describe('User model', () => {
  before(() => {
    models.sequelize.sync()
  })

  it('creates a new user with associated question', () => {
    const User = models.User

    return User.create({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jdoe@gmail.com',
      password: 'foobarfoobar',
    })
      .then((user) => {
        expect(user.id).to.exist
        expect(user.firstName).to.equal('Jane')
        expect(user.lastName).to.equal('Doe')
        expect(user.email).to.equal('jdoe@gmail.com')
        expect(user.password).to.equal('foobarfoobar')

        models.Question.create({
          value: 'This is a test question',
          type: 'text_field',
          categoryId: 1,
          userId: user.id,
        })
          .then((question) => {
            expect(question.id).to.exist
            expect(question.value).to.equal('This is a test question')
            expect(question.type).to.equal('text_field')
            expect(question.categoryId).to.equal(1)
            expect(question.userId).to.equal(user.id)
          })
      })
  })
})
