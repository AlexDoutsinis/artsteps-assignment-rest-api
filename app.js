const express = require('express')
const bodyParser = require('body-parser')

const startServer = require('./server')
const Article = require('./Dtos/articleDto')
const Category = require('./Dtos/categoryDto')
const articlesRouter = require('./routes/articlesRouter')(Article)
const categoriesRouter = require('./routes/categoriesRouter')(Category)
const { handleError, notFound } = require('./middleware/appErrors')()
const cors = require('./middleware/cors')

const app = express()
startServer(app)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors)
app.use('/api', articlesRouter, categoriesRouter, handleError)
app.use(notFound)
