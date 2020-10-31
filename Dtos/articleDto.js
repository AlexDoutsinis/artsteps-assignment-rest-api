const mongoose = require('mongoose')

const Category = require('./categoryDto')

const { Schema } = mongoose

const ArticleDto = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

ArticleDto.post('save', async (article, next) => {
  await Category.findOneAndUpdate(
    article.category,
    {
      $push: { articles: article._id },
    },
    { useFindAndModify: false },
  )

  next()
})

module.exports = mongoose.model('Article', ArticleDto)
