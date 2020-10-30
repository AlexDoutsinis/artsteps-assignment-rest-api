const express = require('express')

const startServer = require('./server')
const articlesRouter = require('./routes/articlesRouter')()

const app = express()
startServer(app)

app.use('/api', articlesRouter)
