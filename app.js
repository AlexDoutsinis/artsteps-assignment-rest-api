const express = require('express')

const startServer = require('./server')

const app = express()
startServer(app)

app.get('/', (req, res) => {
  res.json({ msg: 'Hello!' })
})
