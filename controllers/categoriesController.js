const { badRequest } = require('../utils/error')()
const autoCatch = require('../utils/autoCatch')
const categoryExists = require('../utils/categoryExists')
const categoriesRepository = require('../services/categoriesRepository')

function categoriesController(Category) {
  const repository = categoriesRepository(Category)

  async function createCategory(req, res, next) {
    const { name } = req.body
    if (!name) return next(badRequest('Name is required'))

    const alreadyExists = await categoryExists({ name })
    if (alreadyExists) return next(badRequest('Category already exists'))

    const savedCategory = await repository.createCategory(req.body)

    return res.status(201).json(savedCategory)
  }

  async function getCategoryList(req, res, next) {
    const payload = { articles: 0 }
    const categories = await repository.fetchCategories(payload)

    if (categories.length < 1) return next(badRequest('No categories found'))

    return res.json(categories)
  }

  async function deleteCategory(req, res) {
    await req.category.remove()

    return res.sendStatus(204)
  }

  return autoCatch({
    createCategory,
    getCategoryList,
    deleteCategory,
  })
}

module.exports = categoriesController
