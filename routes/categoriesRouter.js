const express = require('express')

function routes() {
  const categoriesRouter = express.Router()

  categoriesRouter
    .route('/categories')
    .get((req, res) => {
      res.json({ msg: 'Get Categories' })
    })
    .post((req, res) => {
      res.json({ msg: 'Create category' })
    })

  categoriesRouter.delete('/categories/:categoryId', (req, res) => {
    res.json({ msg: 'Delete category' })
  })

  return categoriesRouter
}

module.exports = routes
