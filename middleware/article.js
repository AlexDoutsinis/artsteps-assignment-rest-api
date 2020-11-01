const { badRequest } = require('../utils/error')()
const articlesRepository = require('../services/articlesRepository')

function article(Article) {
  const { fetchArticle: getArticle } = articlesRepository(Article)

  async function includePayload(req, res, next) {
    const payload = {}
    const excludeContent = req.query.excludeContent ? true : false

    if (excludeContent) payload.content = 0
    req.payload = payload
    return next()
  }

  async function fetchArticle(req, res, next) {
    const { slug } = req.params
    const article = await getArticle({ slug }, req.payload)
    if (!article) return next(badRequest('Article not found'))

    req.article = article
    return next()
  }

  return { includePayload, fetchArticle }
}

module.exports = article
