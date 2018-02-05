import express from 'express'
import serverRenderer from './middleware/renderer'
import Loadable from 'react-loadable'
const path = require('path')

const PORT = 3001
const app = express()
const router = express.Router()



router.use('^/$', serverRenderer)
router.use(express.static(
  path.resolve(__dirname, '..', 'build'),
  { maxAge: '30d' }
))
router.use('*', serverRenderer)

app.use(router)

Loadable.preloadAll().then(() => {
  app.listen(PORT, (error) => {
    if (error) {
      return console.log('Oops! Something bad happened!', error)
    }
    console.log('Listening on port ', PORT, '...')
  })
})