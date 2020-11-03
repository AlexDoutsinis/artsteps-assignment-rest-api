function categoriesRepository(Category) {
  async function createCategory(body) {
    const category = new Category(body)
    await category.save()

    return category
  }

  async function fetchCategory(filter) {
    const category = await Category.findOne(filter)

    return category
  }

  async function fetchCategories(payload) {
    const categories = await Category.find({}, payload)

    return categories
  }

  async function removeCategory(category) {
    return await category.remove()
  }

  return { createCategory, fetchCategory, fetchCategories, removeCategory }
}

module.exports = categoriesRepository
