function article(Article) {
  async function includePayload(req, res, next) {
    const payload = {}
    const excludeContent = req.query.excludeContent ? true : false

    if (excludeContent) payload.content = 0
    req.payload = payload
    return next()
  }

  async function fetchArticle(req, res, next) {
    const { slug } = req.params
    const article = await Article.findOne({ slug }, req.payload)
    if (!article)
      return res.status(400).json({ error: 'Article not found' })

    req.article = article
    return next()
  }

  return { includePayload, fetchArticle }
}

module.exports = article
