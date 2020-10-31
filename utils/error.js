function error() {
  function badRequest(message) {
    return { statusCode: '400', message }
  }

  return { badRequest }
}

module.exports = error
