import Sequelize from 'sequelize'
import util from 'util'
import { log } from '../utils'
import db from './models'

export const DBService = {
  async createUser(user) {
    console.log('[DB] Creating user!')
    const newUser = await db.User.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    })
    return newUser
  },

  async getCurrentImageCount() {
    return db.Image.findAndCountAll()
  },

  async getResponseForUser(userId) {
    return await db.Response.find({
      where: {
        userId,
      },
    })
  },

  async getUser(userId) {
    return await db.User.find({
      where: {
        id: userId,
      },
    })
  },

  async getImage(imageId) {
    log(`[DB] Getting image with id: ${imageId}`)
    return await db.Image.findOne({
      where: {
        id: imageId,
      },
    })
  },

  async confirmFirstTimeLogin(userId) {
    console.log(`[DB] Confirm first time login with id: ${userId}`)
    return await db.User.update(
      {
        firstTimeLogin: false,
      },
      {
        where: {
          id: userId,
        },
      },
    )
  },

  async toggleServiceMode() {
    console.log(`[DB] Toggling service mode`)
    const currentState = await db.AppSettings.findOne({
      where: {
        name: 'serviceMode',
      },
    })
    return await db.AppSettings.update({
      serviceMode: !currentState,
    }, {
      where: {
        name: 'serviceMode',
      },
    })
  },

  async getResponse(imageId, userId) {
    log(`[DB] Searching response with imageId: ${imageId} and userId: ${userId}`)
    return await db.Response.findOne({
      where: {
        imageId,
        userId,
      },
    })
  },

  async updateLastAccessedImageId(userId, imageId) {
    log(`[DB] Updating last access image id for user: ${userId}`)
    return await db.User.update({
      lastAccessImageId: imageId,
    }, {
      where: {
        id: userId,
      },
    })
  },

  async updatePassword(userId, newPassword) {
    log(`[DB] Updating password user: ${userId}`)
    return await db.User.update({
      password: newPassword,
    }, {
      where: {
        id: userId,
      },
    })
  },

  async addNumImageSeen(userId) {
    log(`[DB] Updating # image seen for user: ${userId}`)
    const currentUser = await db.User.findOne({
      where: {
        id: userId,
      },
    })
    const currentNumImageSeen = currentUser.numImageSeen
    return await db.User.update(
      {
        numImageSeen: currentNumImageSeen + 1,
      },
      {
        where: {
          id: userId,
        },
      })
  },

  async getCategories() {
    log('[DB] Getting categories')
    return await db.Category.findAll({
      order: 'id',
    })
  },

  async activateUser(userId) {
    log(`[DB] Activating user ${userId}`)
    return await db.User.update(
      {
        activation: true,
      },
      {
        where: {
          id: userId,
        },
      })
  },

  async acceptNDA(userId) {
    log(`[DB] Accepting NDA for ${userId}`)
    return await db.User.update(
      {
        nda: true,
      },
      {
        where: {
          id: userId,
        },
      })
  },

  async getUserConfigs(userId) {
    return await db.User.findOne(
      {
        where: {
          userId,
        },
      })
  },

  async createCategoryForUser(category, userId) {
    return await db.Category.create({
      userId,
      value: category,
    })
  },

  async addEntry(
    userId,
    imageId,
    categoryId,
    description,
    responseTime,
  ) {
    console.log('[DB] Add Entry')
    console.log('userId', userId)
    console.log('imageId', imageId)
    console.log('categoryId', categoryId)
    console.log('description', description)
    return await db.Response.create({
      categoryId,
      imageId,
      description,
      userId,
      time: responseTime,
    })
  },

  async findUserByEmail(email) {
    log(`[DB] Searching for: ${email}`)
    return await db.User.findOne({
      where: {
        email,
      },
    })
  },
}
