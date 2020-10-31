const mongoose = require('mongoose')

const { Schema } = mongoose

const CategoryDto = new Schema(
  {
    name: { type: String, required: true },
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  },
  { timestamps: true },
)

module.exports = mongoose.model('Category', CategoryDto)
