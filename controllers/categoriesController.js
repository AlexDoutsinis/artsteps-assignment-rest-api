const { badRequest } = require('../utils/error')()
const autoCatch = require('../utils/autoCatch')

function categoryController(Category) {
  async function createCategory(req, res, next) {
    if (!req.body.name) return next(badRequest('Name is required'))

    const category = new Category(req.body)
    await category.save()

    return res.status(201).json(category)
  }

  async function getCategoryList(req, res, next) {
    const payload = { articles: 0 }
    const categories = await Category.find({}, payload)

    if (categories.length < 1)
      return next(badRequest('No categories found'))

    return res.json(categories)
  }

  return autoCatch({ createCategory, getCategoryList })
}

module.exports = categoryController
