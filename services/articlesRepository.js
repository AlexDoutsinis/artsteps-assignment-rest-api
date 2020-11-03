function articlesRepository(Article) {
  async function createArticle(body) {
    const article = new Article(body)
    await article.save()

    return article
  }

  async function fetchArticle(filter, payload) {
    const article = await Article.findOne(filter, payload)

    return article
  }

  async function fetchAndPaginateArticles({ filter, payload, page, limit }) {
    const articles = await Article.find(filter, payload)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('category')

    return articles
  }

  async function editArticleContent({ article, content }) {
    article.content = content
    await article.save()

    return article
  }

  async function removeArticle(article) {
    return await article.remove()
  }

  return {
    createArticle,
    fetchArticle,
    fetchAndPaginateArticles,
    editArticleContent,
    removeArticle,
  }
}

module.exports = articlesRepository
