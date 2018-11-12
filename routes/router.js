let express = require('express')
let router = express.Router()
let passport = require('passport')
let request = require('request')
let Prometheus = require('prom-client')

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

const metricsInterval = Prometheus.collectDefaultMetrics()
const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]  // buckets for response time from 0.1ms to 500ms
})

// Runs before each requests
// router.use((req, res, next) => {
//   res.locals.startEpoch = Date.now()
//   next()
// })


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
  let result = await ctrl.register(user)
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
  let result = await ctrl.submit(story)
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

router.get('/item/:id', async function(req, res) {
  let id = req.params.id
  let result = await ctrl.findItemById(id)
  if (result.statusCode == 200) {
    res.render('item', {
      'story': result.item,
      'storyid': result.parent
    })
  } else {
    res.render('error', {
      'message': result.errorMessage
    })
  }
})

router.get('/reply/:storyid/:id', authenticationMiddleware(), async function(req, res) {
  let id = req.params.id
  let result = await ctrl.findItemById(id)
  if (result.statusCode == 200) {
    res.render('replycomment', {
      'story': result.item,
      'storyid': req.params.storyid
    })
  } else {
    res.render('error', {
      'message': result.errorMessage
    })
  }
})

router.post('/comment', authenticationMiddleware(), async function(req, res) {
  let comment = {
    'parent': req.body.id,
    'text': req.body.text,
    'by': req.session.passport.user.username
  }
  let result = await ctrl.addComment(comment)
  if (result.statusCode == 200) {
    console.log(`HERE WE GO AGAIN ${JSON.stringify(result, null, 2)}`);
    if (req.body.parentcomm != undefined) {
      res.redirect(`item/${req.body.parentcomm}`) //COMMENT OF a comment
    } else {
      res.redirect(`item/${req.body.id}`) //
    }
  } else if (result.statusCode == 400) {
    res.render('item', {
      'message': result.errorMessage
    })
  } else {
    res.render('error', {
      'message': result.errorMessage
    })
  }
})

router.get('/delete-confirm/:id', async function(req, res) {
  let id = req.params.id
  let result = await ctrl.findItemById(id)
  if (result.statusCode == 200) {
    res.render('delconfirm', {
      'story': result.item,
      'id': id
    })
  } else {
    res.render('error', {
      'message': result.errorMessage
    })
  }
})

router.post('/delete/:id', async function(req, res) {
  let id = req.params.id
  let btnclicked = req.body.btn
  console.log(id + '----' + btnclicked)
  console.log('THE BODY --->' + JSON.stringify(req.body, null, 2));
  if (btnclicked == 'Yes') {
    //deleted-true
    let result = await ctrl.delete(id)
    if (result.statusCode == 200) {
      res.redirect('/')
    } else {
      res.render('error', {
        'message': ressult.errorMessage
      })
    }
  } else if (btnclicked == 'No') {
    res.redirect(`/item/${id}`)
  }
})

router.get(['/newest', '/newest/:max'], async function(req, res) {
  const responseTimeInMs = Date.now() - res.locals.startEpoch
  httpRequestDurationMicroseconds
    .labels(req.method, req.route.path, res.statusCode)
    .observe(responseTimeInMs)
  let max = parseInt(req.params.max)
  if (max) {
    max += 100
  } else {
    max = 100
  }
  let result = await ctrl.getStories(max)
  if (result.statusCode == 200) {
    res.render('newest', {
      'stories': result.items,
      'max': max
    })
  } else if (result.statusCode == 400) {
    res.render('error', {
      'message': result.errorMessage
    })
  } else {
    res.render('error', {
      'message': result.errorMessage
    })
  }
})

router.get('/edit/:id', async function(req, res) {
  let id = req.params.id
  let result = await ctrl.findItemById(id)
  console.log("in  url astttt :" + id)
  if (result.statusCode == 200) {
    res.render('editstory', {
      'story': result.item
    })
  } else {
    res.render('error', {
      'message': result.errorMessage
    })
  }
})
router.post('/edit/:id', async function(req, res) {
  let id = req.params.id
  let story = {
    'title': req.body.title,
    'url': req.body.url,
    'text': "",
    'by': req.session.passport.user.username,
    'id': req.params.id
  }
  console.log("story tavasote in neveshte shode" + story.by)
  console.log(`${JSON.stringify(story, null, 2)}`)

  let result = await ctrl.editStory(story)
  console.log("in  url ast " + story.title)
  if (result.statusCode == 200) {
    res.redirect('/')
  } else {
    res.render('error', {
      'message': result.errorMessage
    })
  }
})

//--------------------------------------PLAYGROUND---------------------------------------------------------------

router.get('/newcomments', function(req, res) {
  res.render('home', {
    'message': 'All comments is not implemented yet, but you can find comments of a specific story by clicking \'discuss\' from the \'new\' page.'
  })
})

router.get('/show', function(req, res) {
  res.render('home', {
    'message': 'The Show page is not implemented yet'
  })
})

router.get('/ask', function(req, res) {
  res.render('home', {
    'message': 'The Ask page is not implemented yet'
  })
})

router.get('/jobs', function(req, res) {
  res.render('home', {
    'message': 'The Jobs page is not implemented yet'
  })
})

router.get('/metrics', function(req, res) {
  res.set('Content-Type', Prometheus.register.contentType)
  res.end(Prometheus.register.metrics())
})


// router.use((req, res, next) => {
//   const responseTimeInMs = Date.now() - res.locals.startEpoch
//   console.log('HHHEYEEEY ' + JSON.stringify(req[0]));
//   httpRequestDurationMicroseconds
//     .labels(req.method, req.route.path, res.statusCode)
//     .observe(responseTimeInMs)
//
//   next()
// })

// Graceful shutdown
process.on('SIGTERM', () => {
  clearInterval(metricsInterval)

  server.close((err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    process.exit(0)
  })
})


module.exports = router
