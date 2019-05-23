// app-server.js
var express = require('express');
var http_module = require('http');
var hogan = require('hogan-express');
var compression = require('compression');
var bodyParser = require('body-parser');
var rest = require('restler');
// var mysql = require("mysql");

// import compression from 'compression'
// import _ from 'lodash'

const app = express()
app.use(bodyParser.json())
app.use(compression())
app.engine('html', hogan)
app.set('views', __dirname + '/views')
app.set('port', 3000)
app.use(express.static(__dirname + '/public'))
app.use((req, res, next) => {
  if (req.url === '/favicon.ico')
    return res.end()
  // Set global variables
  res.locals.year = new Date().getFullYear()

  next()
})

const partials = {
  header: 'partials/header',
  footer: 'partials/footer'
}
require('./routes')(app, rest, partials)

const http = http_module.Server(app)
http.listen(app.get('port'), () => {
  console.info('==> 🌎  Go to http://localhost:%s', app.get('port'));
})
