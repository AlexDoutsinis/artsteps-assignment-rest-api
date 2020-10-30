const express = require('express')

function routes() {
  const articlesRouter = express.Router()

  articlesRouter
    .route('/articles')
    .post((req, res) => {
      res.json({ msg: 'Create an article' })
    })
    .get((req, res) => {
      res.json({ msg: 'Get articles' })
    })

  articlesRouter
    .route('/articles/:articleId')
    .get((req, res) => {
      res.json({ msg: 'Get an article' })
    })
    .patch((req, res) => {
      res.json({ msg: 'Partially update of an article' })
    })
    .delete((req, res) => {
      res.json({ msg: 'Delete an article' })
    })

  return articlesRouter
}

module.exports = routes
