const { badRequest } = require('../utils/error')()
const categoriesRepository = require('../services/categoriesRepository')

function category(Category) {
  const { fetchCategory: getCategory } = categoriesRepository(Category)

  async function fetchCategory(req, res, next) {
    const category = await getCategory(req.params.categoryId)

    if (!category) return next(badRequest('Category not found'))

    req.category = category
    return next()
  }

  return { fetchCategory }
}

module.exports = category
