function categoryController(Category) {
  async function createCategory(req, res) {
    if (!req.body.name)
      return res.status(400).json({ error: 'Name is required' })

    const category = new Category(req.body)
    await category.save()

    return res.status(201).json(category)
  }

  return { createCategory }
}

module.exports = categoryController
