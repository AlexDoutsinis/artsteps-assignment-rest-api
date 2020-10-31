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

    if (excludeContent) {
      fields.content = 0
    }

    if (req.query.category) {
    }

    const articles = Article.find({}, fields)
  }

  return { createArticle }
}

module.exports = articlesController
