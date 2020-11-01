const slugify = require('slugify')
const { nanoid } = require('nanoid')

const { badRequest } = require('../utils/error')()
const autoCatch = require('../utils/autoCatch')
const Category = require('../Dtos/categoryDto')

function articlesController(Article) {
  async function createArticle(req, res, next) {
    const { title, content, categoryId } = req.body

    if (!title || !content || !categoryId)
      return next(badRequest('Title, Content and Category are required'))

    const categoryExists = await Category.exists({ _id: categoryId })
    if (!categoryExists) return next(badRequest('Category not found'))

    const article = new Article({
      title,
      content,
      category: categoryId,
      slug: `${slugify(title)}-${nanoid()}`,
    })
    await article.save()

    return res.status(201).json(article)
  }

  async function getArticleList(req, res, next) {
    const filter = {}
    let { categoryId, page = 1, limit = 10 } = req.query
    if (categoryId) filter.category = categoryId
    page = parseInt(page)
    limit = parseInt(limit)

    const articles = await Article.find(filter, req.payload)
      .limit(limit * 1)
      .skip((page - 1) * limit)
    const count = await Article.countDocuments(filter)

    if (articles.length < 1) return next(badRequest('No articles Found'))

    const categoryParam = categoryId ? `?category=${categoryId}&` : ''

    const nextPage =
      `${req.headers.host}` +
      `${req.baseUrl}/articles${categoryParam}` +
      `?page=${page + 1}&?limit=${limit}`

    const prevPage =
      `${req.headers.host}` +
      `${req.baseUrl}/articles${categoryParam}` +
      `?page=${page - 1}&?limit=${limit}`

    const totalPages = Math.ceil(count / limit)

    return res.json({
      articles,
      totalPages,
      currentPage: parseInt(page),
      nextPage: page < totalPages ? nextPage : null,
      prevPage: page > 1 ? prevPage : null,
    })
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
