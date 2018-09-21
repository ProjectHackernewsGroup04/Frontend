let express = require('express')
let router = express.Router()
let passport = require('passport')
let request = require('request')

let ctrl = require('../backendCtrl/controller')

passport.serializeUser(function(user, done) {
  done(null, user);
})

passport.deserializeUser(function(user, done) {
  done(null, user);
})

function authenticationMiddleware() {
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`)

    if (req.isAuthenticated()) return next()
    res.redirect('/login'); //login
  }
}

router.get('/', function(req, res) {
  res.render('home')
})

router.get('/login', function(req, res) {
  res.render('login')
})

router.post('/login', async function(req, res) {
  var name = req.body.un
  var password = req.body.pw
  console.log(`Trying to login - ${name}:${password}`)
  let result = await ctrl.logintest(name, password)
  console.log(`${JSON.stringify(result)}`);
  if (result.statusCode == 200) {
    req.login(result.user, function(err) {
        res.redirect('/');
      })
  } else if (result.statusCode == 400) {
    res.render('login', {
      'message': result.errorMessage
    })
  } else {
    res.render('error', {
      'message': result.errorMessage
    })
  }
})

router.get('/logout', function(req, res) {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/forgot', function(req, res) {
  res.render('login', {
    'message': 'Please create a new account if you forgot your password. No email password reset functionality.'
  })
})

router.post('/register', async function(req, res) {
  let name = req.body.un
  let password = req.body.pw
  console.log(`Creating account for ${name}:${password}`)
  let result = await ctrl.registertest(name, password)
  if (result.statusCode == 200) {
    res.render('login', {
      'message': 'You have successfully registered. You can now login.'
    })
  } else if (result.statusCode == 400) {
    res.render('login', {
      'message': result.errorMessage
    })
  } else {
    res.render('error', {
      'message': result.errorMessage
    })
  }
})


//--------------------------------------PLAYGROUND---------------------------------------------------------------

router.get('/test', async function(req, res) {
  let result = await ctrl.getHomeContent();
  console.log(`I am back ${result.length}`);
  res.render('test', {
    content: result
  })
})

router.get('/dummy', function(req, res) {
  res.render('dummy')
})

router.get('/newest', function(req, res) {
  res.send('This feature is not yet implemented..')
})

router.get('/newcomments', function(req, res) {
  res.send('This feature is not yet implemented..')
})

router.get('/show', function(req, res) {
  res.send('This feature is not yet implemented..')
})

router.get('/ask', function(req, res) {
  res.send('This feature is not yet implemented..')
})

router.get('/jobs', function(req, res) {
  res.send('This feature is not yet implemented..')
})

router.get('/submit', authenticationMiddleware(), function(req, res) {
  res.send('This feature is not yet implemented..')
})

module.exports = router
