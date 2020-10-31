const { badRequest } = require('../utils/error')()
const autoCatch = require('../utils/autoCatch')

function categoryController(Category) {
  async function createCategory(req, res, next) {
    const { name } = req.body

    if (!name) return next(badRequest('Name is required'))

    const alreadyExists = await Category.exists({ name })
    if (alreadyExists)
      return next(badRequest('Category already exists'))

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

  async function deleteCategory(req, res, next) {
    console.log(req.category)
  }

  return autoCatch({
    createCategory,
    getCategoryList,
    deleteCategory,
  })
}

module.exports = categoryController
