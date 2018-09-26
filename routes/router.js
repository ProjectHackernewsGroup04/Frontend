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
  let user = {
    'username': req.body.un,
    'password': req.body.pw
  }
  let result = await ctrl.login(user)
  console.log(`${JSON.stringify(result)}`);
  if (result.statusCode == 200) {
    req.login(user, function(err) {
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
  let user = {
    'username': req.body.un,
    'password': req.body.pw
  }
  let result = await ctrl.registertest(user) //NOTE:This should call the register() instead once connected to the backend
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

router.get('/submit', authenticationMiddleware(), async function(req, res) {
  res.render('addstory')
})

router.post('/submit', authenticationMiddleware(), async function(req, res) {
  let story = {
    'title': req.body.title,
    'url': req.body.url,
    'text': req.body.text,
    'by': req.session.passport.user.username
  }
  console.log(`${JSON.stringify(story, null, 2)}`)
  let result = await ctrl.submittest(story) //NOTE:This should call the submit() instead once connected to the backend
  if (result.statusCode == 200) {
    res.redirect('/newest')
  } else if (result.statusCode == 400) {
    res.render('submit', {
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


router.get('/newest', async function(req, res) {
  res.render('newest', { "stories": await ctrl.getStories() })
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
router.get('/', function(req, res, next) {
  // res.render('layout', { title: 'Movieseat' });

  connection.connect();

    connection.query('SELECT * FROM `users` WHERE `first_name` = "Kees"', function (error, results, fields) {
      // error will be an Error if one occurred during the query
      // results will contain the results of the query
      // fields will contain information about the returned results fields (if any)
      console.log(results);
    });

  connection.end();
});

module.exports = router
