const express = require('express')

const categoriesController = require('../controllers/categoriesController')
const category = require('../middleware/category')

function routes(Category) {
  const categoriesRouter = express.Router()
  const controller = categoriesController(Category)
  const { fetchCategory } = category(Category)

  categoriesRouter
    .route('/categories')
    .get(controller.getCategoryList)
    .post(controller.createCategory)

  categoriesRouter.use('/categories/:categoryId', fetchCategory)
  categoriesRouter.delete(
    '/categories/:categoryId',
    controller.deleteCategory,
  )

  return categoriesRouter
}

module.exports = routes
