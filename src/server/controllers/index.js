import express from 'express'
import serverRenderer from '../middleware/renderer'
import configureStore from '../../store'
import { setMessage } from '../../actions'
const router = express.Router()
const path = require('path')

// optional data
import data from '../data.json'

const indexAction = (request, response, next) => {
  const store = configureStore(data) // omit data if you dont want it
  store.dispatch(setMessage('server!'))

  serverRenderer(store)(request, response, next)
}

router.use('^/$', indexAction)

router.use(express.static(
  path.resolve(__dirname, '..', '..', '..', 'build'),
  { maxAge: '30d' },
))

export default router