const express = require('express')
const path = require('path')

const app = express()

// Server routes, express middleware, etc, should be defined
// before webpack configuration. Specifically before `res.sendFile`.

if (process.env.NODE_ENV !== 'production') {

  // Setting block-scope imports
  const webpack = require('webpack')
  const webpackConfig = require('./webpack.config.js')
  const webpackMiddleware = require('webpack-dev-middleware')

  // webpackConfig instructs webpack how to behave.
  // webpack module is passed to the middleware.
  // webpackMiddleware is used in Express application.
  app.use(webpackMiddleware(webpack(webpackConfig)))

} else {

  // Allows express to serve dist directory freely to any request.
  app.use(express.static('dist'))

  // On GET request to any route (*) of server, send index.html file.
  // Works with BrowserRouter (React-Router)~ YES!
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
  })
}

// Production providers will set their own PORT
app.listen(process.env.PORT || 8000, () => {
  console.log(`Listening on ${process.env.PORT || 'localhost:8000'}`)
})