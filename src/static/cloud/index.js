require('dotenv').config()
const express = require('express')
const Conn = require('mysql-layer').Conn

const { log, error } = console

global.Conn = new Conn({
  hostname: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
})

global.Conn.connection.connect()

const CryptoDockRemote = express()

CryptoDockRemote.listen(process.env.SERVER_PORT, () => require('./src/index')())
