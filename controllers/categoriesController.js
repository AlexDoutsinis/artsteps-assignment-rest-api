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

  async function deleteCategory(req, res) {
    await req.category.remove()

    return res.sendStatus(204)
  }

  async function populateArticles(req, res, next) {
    const articles = await Category.findById(
      req.params.categoryId,
    ).populate('articles')

    if (articles < 1) return next(badRequest('No articles found'))

    return res.json(articles)
  }

  return autoCatch({
    createCategory,
    getCategoryList,
    deleteCategory,
    populateArticles,
  })
}

module.exports = categoryController
