function handleError(err, req, res, next) {
  if (res.headersSent) return next(err)

  const statusCode = err.statusCode
  const errorMessage = err.message

  if (!statusCode)
    return res.status(500).json({ error: 'Something went wrong' })

  return res.status(statusCode).json({ error: errorMessage })
}

module.exports = handleError
