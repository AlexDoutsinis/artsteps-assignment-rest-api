const mongoose = require('mongoose')

function startServer(app) {
  const connectionString =
    'mongodb+srv://Alex123:alex123@cluster0.bhwtm.mongodb.net/artstepsAssignment?retryWrites=true&w=majority'
  const port = process.env.PORT || 3000

  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
      }),
    )
    .catch(err => console.log(err.message))

  return mongoose
}

module.exports = startServer
