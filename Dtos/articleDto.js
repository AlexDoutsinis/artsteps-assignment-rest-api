const mongoose = require('mongoose')

const { Schema } = mongoose

const ArticleDto = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, unique: true },
})

ArticleDto.pre('save', next => {
  this.slug = slugify(this.title)
  next()
})

module.exports = mongoose.model('Article', ArticleDto)
