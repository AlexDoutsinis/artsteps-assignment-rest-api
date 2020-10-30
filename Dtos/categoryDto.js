const mongoose = require('mongoose')

const { Schema } = mongoose

const CategoryDto = new Schema({
  name: { type: String, required: true },
})

module.exports = mongoose.model('Category', CategoryDto)
