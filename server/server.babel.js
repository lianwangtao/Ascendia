
import bodyParser from 'body-parser'
import express from 'express'
import helmet from 'helmet'
import httpProxy from 'http-proxy'
import path from 'path'
import util from 'util'
import { APIService } from './api_service'
import { log } from './utils'
import recoveryPage from './static_pages/recovery_page'
import servicePage from './static_pages/service_page'
import fs from 'fs'
import https from 'https'

const proxy = httpProxy.createProxyServer()
const app = express()

const IS_PROD = process.env.NODE_ENV === 'production'
const PORT = IS_PROD ? 8443 : 3000
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public')

const options = {
  cert: IS_PROD ? fs.readFileSync(path.resolve(__dirname, '..', 'certs', 'aviatr.org_ssl_certificate.cer')) : null,
  key: IS_PROD ? fs.readFileSync(path.resolve(__dirname, '..', 'certs', '_.aviatr.org_private_key.key')) : null,
  ca: IS_PROD ? fs.readFileSync(path.resolve(__dirname, '..', 'certs', '_.aviatr.org_ssl_certificate_INTERMEDIATE.cer')) : null
}

// Support encoded bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})
app.use(helmet())

// Serve static files
app.get('/password_recovery', async (req, res) => {
  const match = await APIService.checkHashForRecovery(req.query)
  console.log('Match Result: ', match)
  if (match) {
    res.send(recoveryPage)
  } else {
    res.send('Sorry the email you entered does not exist. Please check again.')
  }
})

app.post('/update_password', async (req, res) => {
  console.log('Update password hit', req.body)
  const result = await APIService.updatePassword(req.body)
  if (!result) {
    res.send('Sorry the email you entered does not exist. Please check again.')
  } else {
    res.redirect('/')
  }
})

app.post('/toggleService', async (req, res) => {
  console.log('Toggle service mode hit')
  const result = await APIService.toggleServiceMode()
  if (!result) {
    res.status(500).send('Something went wrong')
  } else {
    res.status(200).send('Service Mode toggle')
  }
})

// Serve dynamic content
app.use('/', express.static('public'))


if (!IS_PROD) {
  const bundle = require('./bundle')
  bundle()

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/build/*', (req, res) => {
    proxy.web(req, res, {
      target: 'http://localhost:8080',
    })
  })
}

app.post('/login', async (req, res, next) => {
  try {
    const user = await APIService.loginUser(req.body)
    if (user) {
      res.status(200).send(user)
      console.log('Server login succeeded!')
    } else {
      console.log('Server login failed!')
    }
  } catch (error) {
    res.status(409).send('Email and password combination incorrect. Please try again')
  }
})

app.post('/confirmFirstTimeLogin', async (req, res, next) => {
  try {
    const user = await APIService.confirmFirstTimeLogin(req.body)
    res.status(200).send(user)
    log('Server confirm succeeded!')
  } catch (error) {
    res.status(409).send('Confirm first time login failed. Please try again')
  }
})

app.post('/signup', async (req, res) => {
  console.log('[SERVER] Sign up hit count:')
  try {
    const newUser = await APIService.createUser(req.body)
    if (newUser === null) {
      res.status(409).send('Email already exists. Please log in')
    } else {
      res.status(200).send(newUser)
    }
  } catch (error) {
    res.status(500).send('Failed to create user!')
    console.log('Error: ', error)
  }
})

app.post('/add_entry', async (req, res) => {
  console.log('[SERVER] Add Entry Hit')
  try {
    const response = await APIService.addEntry(req.body)
    if (response === null) {
      res.status(400).send()
    } else {
      res.status(200).send()
    }
  } catch (error) {
    res.status(500).send('Failed to create user!')
    log(error)
  }
})

app.get('/get_categories', async (req, res, next) => {
  try {
    const categories = await APIService.getCategories()
    res.status(200)
    res.send(categories)
  } catch (error) {
    res.status(400)
    res.send(error)
    next(util.inspect(error))
  }
})

app.get('/get_image', async (req, res, next) => {
  try {
    if (req.query) {
      const image = await APIService.getImage(req.query)
      if (image) {
        res.status(200).send(image)
      }
    }
  } catch (error) {
    res.status(400)
    res.send(error)
    next(util.inspect(error))
  }
})

app.get('/get_response', async (req, res, next) => {
  try {
    if (req.query) {
      const response = await APIService.getResponse(req.query)
      if (response) {
        console.log('[IN SERVERRRRR] response: ', response)
        res.status(200).send(response)
      } else {
        console.log('No response found')
        res.status(202).send()
      }
    }
  } catch (error) {
    res.status(400)
    res.send(error)
    console.log('[Error getting response: ', error)
    next(util.inspect(error))
  }
})

app.post('/send_password_recovery', async (req, res, next) => {
  console.log('HIT password recovery')
  try {
    if (req.query) {
      const response = await APIService.sendPasswordRecovery(req.body)
      // console.log('[IN SERVERRRRR] password recovery: ', response)
      if (!response) {
        res.status(400).send()
        console.log('[Error sending password recovery: ', response)
      } else {
        res.status(200).send(response)
      }
    }
  } catch (error) {
    res.status(400)
    res.send(error)
    console.log('[Error sending password recovery: ', error)
  }
})

app.get('/password_recovery', async (req, res, next) => {
  try {
    if (req.query) {
      const response = await APIService.getResponse(req.query)
      if (response) {
        console.log('[IN SERVERRRRR] response: ', response)
        res.status(200).send(response)
      } else {
        console.log('No response found')
        res.status(202).send()
      }
    }
  } catch (error) {
    res.status(400)
    res.send(error)
    console.log('[Error getting response: ', error)
    next(util.inspect(error))
  }
})

app.post('/activate', async (req, res, next) => {
  console.log('[SERVER] Activate Entry Hit')
  try {
    const result = await APIService.activateUser(req.query)
    if (result) {
      res.status(200).send(result)
    }
    res.status(422).send('Missing param')
  } catch (error) {
    res.status(409).send(error)
    next(util.inspect(error))
  }
})

app.post('/accept_nda', async (req, res, next) => {
  console.log('[SERVER] Accept NDA Entry Hit')
  try {
    const result = await APIService.acceptNDA(req.body)
    if (result) {
      res.status(200).send(result)
    }
    res.status(422).send('Missing param')
  } catch (error) {
    res.status(409).send(error)
    next(util.inspect(error))
  }
})

proxy.on('error', (error) => {
  log(`Could not connect to proxy: ${error}`)
})

if (IS_PROD) {
  https.createServer(options, app).listen(8443, () => {
    console.log('Prod env: ', IS_PROD)
    console.log('HTTPS SERVER listening on port 8443 with options: ', options)
  })
} else {
  app.listen(PORT, () => {
    log(`Server listening on port ${String(PORT)}`)
  })
}
