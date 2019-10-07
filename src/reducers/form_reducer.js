import util from 'util'
import initialState from '../initial_state'

function handleLogout(state, action) {
  return {}
}

function updateCurrentCategory(state, category) {
  return Object.assign({}, state, { currentCategory: category })
}

function setResponseForQuestionId(state, action) {
  const questionsAndResponses = Object.assign({}, state.questionsAndResponses)
  questionsAndResponses[action.id] = {
    value: action.value,
    type: action.responseType,
  }
  return Object.assign({}, state, { questionsAndResponses: questionsAndResponses })
}

function toggleTutorial(state) {
  return Object.assign({}, state, { tutorial: !state.tutorial })
}

function updateFormQuestionsAndOptions(state, data) {
  return Object.assign({}, state, { questionsAndOptions: data })
}

function setCategories(state, data) {
  return Object.assign({}, state, { categories: data })
}

function setImage(state, data) {
  return Object.assign({}, state, {
    imageUrl: data.url,
    imageId: data.id,
  })
}

const formReducer = (state = initialState(), action) => {
  switch (action.type) {
    case 'LOGOUT':
      return handleLogout(state, action)
    case 'SET_RESPONSE_FOR_QUESTION_ID':
      return setResponseForQuestionId(state, action)
    case 'CATEGORIES':
      return setCategories(state, action.data)
    case 'IMAGE':
      return setImage(state, action.data)
    case 'UPDATE_FORM_QUESTIONS_AND_OPTIONS':
      return updateFormQuestionsAndOptions(state, action.data)
    case 'SET_CURRENT_CATEGORY':
      return updateCurrentCategory(state, action.data)
    case 'TOGGLE_TUTORIAL':
      return toggleTutorial(state)
    default:
      return state
  }
}

export default formReducer
