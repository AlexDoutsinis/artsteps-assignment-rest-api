const slugify = require('slugify')
const { nanoid } = require('nanoid')

function articlesController(Article) {
  async function createArticle(req, res) {
    const { title, content, category } = req.body

    if (!title || !content || !category)
      return res
        .status(400)
        .json({ error: 'Title, Content and Category are required' })

    const article = new Article({
      ...req.body,
      slug: `${slugify(title)}-${nanoid()}`,
    })
    await article.save()

    return res.status(201).json(article)
  }

  async function getArticles(req, res) {
    const filter = {}
    const fields = {}
    const excludeContent = req.query.excludeContent ? true : false

    const { category } = req.query
    if (category) filter.category = category
    if (excludeContent) fields.content = 0

    const articles = await Article.find(filter, fields)
    if (!articles) return res.status(400).json('No articles Found')

    return res.json(articles)
  }

  return { createArticle, getArticles }
}

module.exports = articlesController
