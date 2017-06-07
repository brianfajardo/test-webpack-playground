const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const webpackMiddleware = require('webpack-dev-middleware')

const app = express()

// webpackConfig instructs webpack how to behave.
// webpack module is passed to the middleware.
// webpackMiddleware is used in Express application

app.use(webpackMiddleware(webpack(webpackConfig)))



app.listen(8000, () => console.log('Listening on localhost:8000'))