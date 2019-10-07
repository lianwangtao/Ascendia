import util from 'util'
import { DBService } from './db/db_service'
import { log, LoginErrorMessage } from './utils'
import { Mailer } from './mailer'
import { ENODEV } from 'constants';
import Authentication from './authenticate'

const currentImageCount = 64536

function _isObjectEmpty(obj) {
  return Object.keys(obj).length === 0
}

function _doUserPasswordsMatch(
  userCreds,
  otherUserCreds,
) {
  return userCreds.password === otherUserCreds.password
}

function _buildQuestion(
  question,
  response,
) {
  return {
    id: question.id,
    title: question.value,
    response,
  }
}

export const APIService = {
  async createUser(reqBody) {
    const user = {
      firstName: reqBody.firstName,
      lastName: reqBody.lastName,
      email: reqBody.email.toLowerCase(),
      password: reqBody.password,
    }

    const resultUser = await DBService.findUserByEmail(user.email)
    if (resultUser === null) {
      const hashedPassword = await Authentication.getHashedValue(user.password)
      const hashedUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
      }
      console.log('Hashed user before sign up: ', hashedUser)
      const newUser = await DBService.createUser(hashedUser)
      if (newUser) {
        try {
          const addUser = await Mailer.addUserToList(newUser)
          console.log('SendinBlue addUser response: ', addUser)
          const sendAlert = await Mailer.sendAlert(newUser)
          console.log('SendinBlue sendAlert response: ', sendAlert)
        } catch (error) {
          console.log('SendinBlue Error: ', error.response.text)
        }
        console.log('[API] New user created successfully!')
        let startImageId = newUser.id * 100
        if (newUser === 0) {
          startImageId = 0
        }
        const updatedId = await DBService.updateLastAccessedImageId(newUser.id, startImageId)
        const finalUser = await DBService.getUser(newUser.id)
        return finalUser
      }
    }
    console.log('[API] A user with that email has already been created')
    return null
  },

  async addEntry(reqBody) {
    console.log('[API] Add entry with data:', reqBody)
    const userId = reqBody.userId
    const categoryId = reqBody.categoryId
    const description = reqBody.description ? reqBody.description : ''
    const imageId = reqBody.imageId
    const responseTime = reqBody.responseTime
    const newAccessImageId = await DBService.updateLastAccessedImageId(userId, imageId + 1)
    return await DBService.addEntry(
      userId,
      imageId,
      categoryId,
      description,
      responseTime,
    )
  },

  async loginUser(credentials, callback) {
    log(`Attempting to login: ${util.inspect(credentials)}`)

    const userToLogin = {
      email: credentials.email.toLowerCase(),
      password: credentials.password,
    }

    const resultUser = await DBService.findUserByEmail(
      userToLogin.email,
    )

    if (!resultUser) {
      log(`No matching email for '${userToLogin.email}'. Failed to login.`)
      throw LoginErrorMessage.INVALID_EMAIL
    } else {
      const resultUserCreds = {
        email: resultUser.email,
        password: resultUser.password,
      }
      const match = await
        Authentication.doesRawMatchHash(userToLogin.password, resultUserCreds.password)
      if (match) {
        console.log('Pw match')
        const response = {
          email: resultUser.email,
          firstName: resultUser.firstName,
          lastName: resultUser.lastName,
          createdAt: resultUser.createdAt,
          id: resultUser.id,
          nda: resultUser.nda,
          activation: resultUser.activation,
          lastAccessImageId: resultUser.lastAccessImageId,
          firstTimeLogin: resultUser.firstTimeLogin,
        }
        log(`Matched passwords. Logging in '${userToLogin.email}'`)
        return response
      }
      log(`Passwords do not match. Failed to login '${userToLogin.email}'`)
      throw LoginErrorMessage.INVALID_PASSWORD
    }
  },

  async confirmFirstTimeLogin(reqBody) {
    // console.log('[API] Confirm first time login: ', reqBody.userId)
    if (!reqBody.userId) {
      return false
    }
    return await DBService.confirmFirstTimeLogin(reqBody.userId)
  },

  // async activateUser(reqBody) {
  //   console.log('[API] Activate user with data:', reqBody)
  //   if (!reqBody.userId) {
  //     return false
  //   }
  //   const userId = reqBody.userId
  //   const response = await DBService.activateUser(userId)
  //   return response
  // },

  async acceptNDA(reqBody) {
    console.log('[API] Accept NDA with data:', reqBody)
    if (!reqBody.userId) {
      return false
    }
    const userId = reqBody.userId
    const response = await DBService.acceptNDA(userId)
    return response
  },

  async checkHashForRecovery(reqQuery) {
    console.log('[API] Password recovery:', reqQuery)
    if (!reqQuery.email || !reqQuery.hash) {
      return false
    }
    return await Authentication.doesRawMatchHash(reqQuery.email, reqQuery.hash)
  },

  async toggleServiceMode() {
    return await DBService.toggleServiceMode()
  },

  async updatePassword(reqBody) {
    console.log('[API] Update password:', reqBody)
    if (!reqBody.password || !reqBody.email) {
      return false
    }
    const user = await DBService.findUserByEmail(reqBody.email)
    if (!user) {
      return false
    }
    const hashedPassword = await Authentication.getHashedValue(reqBody.password)
    return await DBService.updatePassword(user.id, hashedPassword)
  },

  async sendPasswordRecovery(reqBody) {
    console.log('[API] Password recovery:', reqBody)
    if (!reqBody.email) {
      return false
    }
    const user = await DBService.findUserByEmail(reqBody.email)
    if (!user) {
      return null
    }
    try {
      const hash = await Authentication.getHashedValue(user.email)
      return await Mailer.sendPasswordRecovery(user.email, hash)
    } catch (error) {
      console.log('SendinBlue Error: ', error.response.text)
    }
    return user
  },

  async getCategories(reqQuery) {
    const categories = await DBService.getCategories()
    return categories
  },

  async getResponse(reqQuery) {
    if (!reqQuery || !reqQuery.userId || !reqQuery.imageId) {
      return null
    }
    const userId = reqQuery.userId
    const imageId = reqQuery.imageId
    // console.log('[API Service] Getting response with User ID:', userId, " and imageId: ", imageId)
    return await DBService.getResponse(userId, imageId)
  },

  async getResponseForUser(reqQuery) {
    if (!reqQuery || !reqQuery.userId) {
      return null
    }
    const userId = reqQuery.userId
    // console.log('[API Service] Getting response with User ID:', userId)
    return await DBService.getResponseForUser(userId)
  },

  async getImage(reqQuery) {
    if (!reqQuery || !reqQuery.userId || !reqQuery.imageId) {
      return null
    }
    console.log('[API]')
    const userId = reqQuery.userId
    const user = await DBService.getUser(userId)
    if (!user.activation) {
      return null
    }
    const lastAccessedImageId = user.lastAccessImageId
    const updatedUser = await DBService.addNumImageSeen(userId)
    let requestImageId = reqQuery.imageId
    if (requestImageId > currentImageCount) {
      requestImageId = parseInt((
        (updatedUser.id * 100) - updatedUser.numImageSeen) % currentImageCount)
    }
    await DBService.updateLastAccessedImageId(userId, requestImageId)
    return await DBService.getImage(requestImageId)
  },
}
