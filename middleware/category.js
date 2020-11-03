const { badRequest } = require('../utils/error')()
const categoriesRepository = require('../services/categoriesRepository')

function category(Category) {
  const repository = categoriesRepository(Category)

  async function fetchCategory(req, res, next) {
    const category = await repository.fetchCategory({
      name: req.params.categoryName,
    })

    if (!category) return next(badRequest('Category not found'))

    req.category = category
    return next()
  }

  return { fetchCategory }
}

module.exports = category
