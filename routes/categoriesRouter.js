const express = require('express')

const categoriesController = require('../controllers/categoriesController')

function routes(Category) {
  const categoriesRouter = express.Router()
  const controller = categoriesController(Category)

  categoriesRouter
    .route('/categories')
    .get((req, res) => {
      res.json({ msg: 'Get Categories' })
    })
    .post(controller.createCategory)

  categoriesRouter.delete('/categories/:categoryId', (req, res) => {
    res.json({ msg: 'Delete category' })
  })

  return categoriesRouter
}

module.exports = routes
