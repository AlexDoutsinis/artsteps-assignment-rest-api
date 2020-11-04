const slugify = require('slugify')
const { nanoid } = require('nanoid')

const { badRequest } = require('../utils/error')()
const autoCatch = require('../utils/autoCatch')
const articlesRepository = require('../services/articlesRepository')
const exists = require('../utils/categoryExists')

function articlesController(Article) {
  const repository = articlesRepository(Article)

  async function createArticle(req, res, next) {
    const { title, content, description, categoryId } = req.body

    if (!title || !content || !categoryId)
      return next(badRequest('Title, Content and Category are required'))

    const categoryExists = await exists({ _id: categoryId })
    if (!categoryExists) return next(badRequest('Category not found'))

    const article = {
      title,
      description,
      content,
      category: categoryId,
      slug: `${slugify(title)}-${nanoid()}`,
    }
    const savedArticle = await repository.createArticle(article)

    return res.status(201).json(savedArticle)
  }

  async function getArticleList(req, res, next) {
    const filter = {}
    let { categoryId, page = 1, limit = 10 } = req.query
    if (categoryId) filter.category = categoryId
    page = parseInt(page)
    limit = parseInt(limit)

    const articles = await repository.fetchAndPaginateArticles({
      filter,
      payload: req.payload,
      page,
      limit,
    })
    const count = await Article.countDocuments(filter)

    if (articles.length < 1) return next(badRequest('No articles Found'))

    const noContent = req.payload.content === 0 ? true : false
    const excludeContent = noContent ? `&excludeContent=true` : ''
    const categoryParam = categoryId ? `&category=${categoryId}` : ''

    const nextPage =
      // `${req.headers.host}` +
      `${req.baseUrl}/articles` +
      `?page=${page + 1}&limit=${limit}` +
      excludeContent +
      categoryParam

    const prevPage =
      // `${req.headers.host}` +
      `${req.baseUrl}/articles` +
      `?page=${page - 1}&limit=${limit}` +
      excludeContent +
      categoryParam

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

    const editedArticle = await repository.editArticleContent({
      article: req.article,
      content,
    })

    return res.json(editedArticle)
  }

  async function deleteArticle(req, res) {
    await repository.removeArticle(req.article)

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
