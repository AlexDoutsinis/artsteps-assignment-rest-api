function categoriesRepository(Category) {
  async function createCategory(body) {
    const category = new Category(body)
    await category.save()

    return category
  }

  async function fetchCategories(payload) {
    const categories = await Category.find({}, payload)

    return categories
  }

  return { createCategory, fetchCategories }
}

module.exports = categoriesRepository
