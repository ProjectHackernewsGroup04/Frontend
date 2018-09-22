let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let session = require('express-session')
let favicon = require('serve-favicon')
let path = require('path')
let passport = require('passport')
let http = require('http')

let frontendRouter = require('./routes/router')
let portNumber = 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.use(cookieParser())

app.use(session({
  secret: 'hackernewssecret',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

// app.use(favicon(path.join(__dirname, 'public','images','favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use('/', frontendRouter)


let server = http.createServer(app)
server.listen(process.env.PORT || portNumber)
console.log('listening on port ' + process.env.PORT + ' or just ' + portNumber)
module.exports = app
