const mongoose = require('mongoose')

const { Schema } = mongoose

const CategoryDto = new Schema(
  {
    name: { type: String, required: true, unique: true },
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  },
  { timestamps: true, collation: { locale: 'en', strength: 2 } },
)

module.exports = mongoose.model('Category', CategoryDto)
