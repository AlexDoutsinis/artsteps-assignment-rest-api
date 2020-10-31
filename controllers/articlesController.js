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

  async function getArticleList(req, res) {
    const filter = {}
    const { category } = req.query
    if (category) filter.category = category

    const articles = await Article.find(filter, req.payload)
    if (!articles)
      return res.status(400).json({ error: 'No articles Found' })

    return res.json(articles)
  }

  async function getArticle(req, res) {
    return res.json(req.article)
  }

  return { createArticle, getArticleList, getArticle }
}

module.exports = articlesController
