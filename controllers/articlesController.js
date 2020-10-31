const slugify = require('slugify')
const { nanoid } = require('nanoid')

const { badRequest } = require('../utils/error')()
const autoCatch = require('../utils/autoCatch')

function articlesController(Article) {
  async function createArticle(req, res, next) {
    const { title, content, category } = req.body

    if (!title || !content || !category)
      return next(
        badRequest('Title, Content and Category are required'),
      )

    const article = new Article({
      ...req.body,
      slug: `${slugify(title)}-${nanoid()}`,
    })
    await article.save()

    return res.status(201).json(article)
  }

  async function getArticleList(req, res, next) {
    const filter = {}
    const { category } = req.query
    if (category) filter.category = category

    const articles = await Article.find(filter, req.payload)
    if (articles.length < 1)
      return next(badRequest('No articles Found'))

    return res.json(articles)
  }

  async function getArticle(req, res) {
    return res.json(req.article)
  }

  async function patchArticle(req, res, next) {
    const { content } = req.body

    if (!content)
      return next(badRequest('Only content modification is allowed'))

    const { article } = req
    article.content = content
    await article.save()

    return res.json(article)
  }

  async function deleteArticle(req, res) {
    await req.article.remove()

    return res.sendStatus(204)
  }

  return autoCatch({
    createArticle,
    getArticleList,
    getArticle,
    patchArticle,
    deleteArticle,
  })
}

module.exports = articlesController
