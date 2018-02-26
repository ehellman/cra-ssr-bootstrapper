import express from 'express'
import serverRenderer from './middleware/renderer'
import Loadable from 'react-loadable'

const path = require('path')
const indexController = require('./controllers/index').default

const PORT = 3001
const app = express()

app.use(indexController)

Loadable.preloadAll().then(() => {
  app.listen(PORT, (error) => {
    if (error) {
      return console.log('Oops! Something bad happened!', error)
    }
    console.log('Listening on port ', PORT, '...')
  })
})