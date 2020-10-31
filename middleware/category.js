const { badRequest } = require('../utils/error')()

function category(Category) {
  async function fetchCategory(req, res, next) {
    const { categoryId } = req.params
    const category = await Category.findById(categoryId)

    if (!category) return next(badRequest('Category not found'))

    req.category = category
    return next()
  }

  return { fetchCategory }
}

module.exports = category
