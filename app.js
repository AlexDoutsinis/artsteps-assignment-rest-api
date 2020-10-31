const express = require('express')
const bodyParser = require('body-parser')

const startServer = require('./server')
const Article = require('./Dtos/articleDto')
const Category = require('./Dtos/categoryDto')
const articlesRouter = require('./routes/articlesRouter')(Article)
const categoriesRouter = require('./routes/categoriesRouter')(
  Category,
)
const { handleError, notFound } = require('./middleware/appErrors')()

const app = express()
startServer(app)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', articlesRouter, categoriesRouter, handleError)
app.use(notFound)
