const { badRequest } = require('../utils/error')()
const autoCatch = require('../utils/autoCatch')

function categoryController(Category) {
  async function createCategory(req, res, next) {
    if (!req.body.name) return next(badRequest('Name is required'))

    const category = new Category(req.body)
    await category.save()

    return res.status(201).json(category)
  }

  return autoCatch({ createCategory })
}

module.exports = categoryController
