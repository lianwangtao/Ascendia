import { DBService } from '../server/db/db_service'
import { Mailer } from '../server/mailer'

async function run() {
  console.log('Activating User')
  try {
    const result = await Mailer.sendActivationEmail('lianwangtao@gmail.com')
    console.log('Result: ', result)
  } catch (error) {
    console.log('Error: ', error.response.text)
  }
  process.exit()
}
run()
