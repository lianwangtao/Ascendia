'use strict'

import { expect } from 'chai'
import util from 'util'
import models from '../models'

describe('Question model', () => {
  before(() => {
    models.sequelize.sync()
  })

  it('creates a new question with associated options', () => {
    const Question = models.Question

    return Question.create({
      value: 'This is a test question',
      type: 'radio',
      categoryId: 1,
      userId: 1,
    })
      .then((question) => {
        expect(question.id).to.exist
        expect(question.value).to.equal('This is a test question')
        expect(question.type).to.equal('radio')
        expect(question.categoryId).to.equal(1)
        expect(question.userId).to.equal(1)

        Promise.all([
          models.Option.create({
            value: 'Yes',
            questionId: question.id,
          }),
          models.Option.create({
            value: 'No',
            questionId: question.id,
          }),
        ])
          .then((options) => {
            expect(options.length).to.equal(2)
            expect(options[0].value).to.equal('Yes')
            expect(options[0].questionId).to.equal(question.id)
            expect(options[1].value).to.equal('No')
            expect(options[1].questionId).to.equal(question.id)
          })
      })
  })

  it('creates a new question with no options', () => {
    const Question = models.Question

    return Question.create({
      value: 'This is another test question',
      type: 'text_field',
      categoryId: 1,
      userId: 1,
    })
      .then((question) => {
        expect(question.id).to.exist
        expect(question.value).to.equal('This is another test question')
        expect(question.type).to.equal('text_field')
        expect(question.categoryId).to.equal(1)
        expect(question.userId).to.equal(1)
      })
  })
})
