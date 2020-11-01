const Category = require('../Dtos/categoryDto')

async function categoryExists(identifier) {
  const exists = await Category.exists(identifier)

  return exists
}

module.exports = categoryExists
