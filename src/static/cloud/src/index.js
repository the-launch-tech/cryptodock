require('dotenv').config()

import express from 'express'
import bodyParser from 'body-parser'
import { Conn } from 'mysql-layer'
import RestBuilder from './builder/index'
import routes from './routes/index'

const { log, error } = console

global.Conn = new Conn({
  hostname: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
})

global.Conn.connection.connect()

const Api = express()
const Router = express.Router()

Api.use(bodyParser.urlencoded({ extended: true }))

Api.use(bodyParser.json())

Api.use((req, res, next) => {
  log('%s %s %s %s', req.method, req.url, req.path, process.env.DB_API)
  next()
})

routes(Api)

Api.listen(process.env.PORT, () => {
  log('App Booted At: ' + process.env.PORT + '. Version: ' + process.env.VERSION)
  log('Just adding a log!')

  RestBuilder()
})
