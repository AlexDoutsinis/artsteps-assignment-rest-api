const express = require('express')

const articlesController = require('../controllers/articlesController')

function routes(Article) {
  const articlesRouter = express.Router()
  const controller = articlesController(Article)

  articlesRouter
    .route('/articles')
    .post(controller.createArticle)
    .get(controller.getArticles)

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
