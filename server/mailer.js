// @flow

import sendinblue from 'sendinblue-api'
import SibApiV3Sdk from 'sib-api-v3-sdk'
import { DBService } from '../server/db/db_service'

const defaultClient = SibApiV3Sdk.ApiClient.instance
const apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = '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'

const accountApi = new SibApiV3Sdk.AccountApi()
const contactsApi = new SibApiV3Sdk.ContactsApi()
const smtpApi = new SibApiV3Sdk.SMTPApi()

export class Mailer {
  static async testResponse() {
    console.log('Function called')
    const input = {}
    return accountApi.getAccount()
  }

  static async sendAlert(user) {
    const admins = await this.getAdmins()
    console.log('Admins: ', admins)
    const alertContent = {
      sender: { email: 'aviatrlab@gmail.com' },
      subject: 'New user signup',
      to: admins,
      htmlContent:
      `User test has signed up with email: ${user.email}`,
    }
    return smtpApi.sendTransacEmail(alertContent)
  }

  static async getAdmins() {
    try {
      const admins = await contactsApi.getContactsFromList(2)
      return admins.contacts
    } catch (error) {
      return error.response
    }
  }

  static addUserToList(user) {
    const userData = {
      email: user.email,
      attributes: {
        FIRSTNAME: user.firstName,
        NAME: `${user.firstName} ${user.lastName}`,
      },
      listIds: [4],
    }
    return contactsApi.createContact(userData)
  }

  static async sendPasswordRecovery(email, hash) {
    const emailContent = {
      sender: {
        email: 'aviatrlab@gmail.com',
      },
      subject: 'Your password recovery link',
      to: [{
        email,
      }],
      htmlContent: `
      <h2>You recently filed for password recovery</h2>
      <p> You can now change your password with the following link:
        <a href="https://image-cat-web-app.aviatr.org:49161/password_recovery?email=${email}&hash=${hash}">
          https://image-cat-web-app.aviatr.org
        </a>
      </p>
    `,
    }
    console.log('Content: ', emailContent)
    return smtpApi.sendTransacEmail(emailContent)
  }

  static async sendActivationEmail(email) {
    const emailContent = {
      sender: { email: 'aviatrlab@gmail.com' },
      subject: 'Your account has been activated',
      to: [{ email }],
      htmlContent: `
        <h2>Your account has been activated</h2>
        <p> You can now login to the site:
          <a href="https://image-cat-web-app.aviatr.org">
            https://image-cat-web-app.aviatr.org
          </a>
        </p>
      `,
    }
    console.log('Content: ', emailContent)
    return smtpApi.sendTransacEmail(emailContent)
  }
}
