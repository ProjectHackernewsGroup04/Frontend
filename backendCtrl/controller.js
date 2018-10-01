let axios = require('axios');
let _ = require('lodash')
let backendUrl = 'http://backend-app:5000/api/'
let ctrl = {};

ctrl.login = async function(user) {
  try {
    let res = await axios.post(`${backendUrl}login`, user)
    for (var idx in res.data) {
      console.log(`The data is ${JSON.stringify(res.data[idx], null, 2)}`)
    }
    return res.data
  } catch (e) {
    console.log(`login() ERROR: ${e.toString()}`)
    return {
      'statusCode': 500,
      'errorMessage': e.toString()
    }
  }
}

ctrl.register = async function(user) {
  try {
    let res = await axios.post(`${backendUrl}register`, user)
    for (var idx in res.data) {
      console.log(`The data is ${JSON.stringify(res.data[idx], null, 2)}`)
    }
    return res.data
  } catch (e) {
    console.log(`register() ERROR: ${e.toString()}`)
    return {
      'statusCode': 500,
      'errorMessage': e.toString()
    }
  }
}

ctrl.submit = async function(story) {
  try {
    let res = await axios.post(`${backendUrl}submit`, story)
    for (var idx in res.data) {
      console.log(`The data is ${JSON.stringify(res.data[idx], null, 2)}`)
    }
    return res.data
  } catch (e) {
    console.log(`submit() ERROR: ${e.toString()}`)
    return {
      'statusCode': 500,
      'errorMessage': e.toString()
    }
  }
}

ctrl.findItemById = async function(id) {
  try {
    let res = await axios.get(`${backendUrl}item/${id}`)
    console.log(`The data is ${JSON.stringify(res.data, null, 2)}`)
    return res.data
  } catch (e) {
    console.log(`findItemById() ERROR: ${e.toString()}`)
    return {
      'statusCode': 500,
      'errorMessage': e.toString()
    }
  }
}

ctrl.delete = async function(id) {
  try {
    let res = axios.delete(`${backendUrl}item/${id}`)
    console.log(`The data is ${JSON.stringify(res.data, null, 2)}`);
    return res.data
  } catch (e) {
    console.log(`delete() ERROR: ${e.toString()}`);
    return {
      'statusCode': 500,
      'errorMessage': e.toString()
    }
  }
}

//-----------------------------PLAYGROUND----------------------------------------------------
let util = require('../_temp/util')

ctrl.getHomeContent = async function() {
  try {
    let res = await axios.get(backendUrl)
    for (var idx in res.data) {
      console.log(`The data is ${JSON.stringify(res.data[idx], null, 2)}`)
    }
    return res.data
  } catch (e) {
    console.log(`getHomeContent ERROR: ${e.toString()}`)
    return {
      'statusCode': 500,
      'errorMessage': e.toString()
    }
  }
}

ctrl.logintest = async function(user) {
  try {
    let users = require('../_temp/tempusers.json')
    let res = {}
    var userDb = _.find(users, {
      'username': user.username
    });
    if (userDb != null) {
      if (userDb.username === user.username && userDb.password === user.password) {
        res.statusCode = 200
        res.user = userDb
      } else {
        res.statusCode = 400
        res.errorMessage = 'Bad login.'
      }
    } else {
      res.statusCode = 400
      res.errorMessage = 'UNKNOWN USER'
    }
    return res
  } catch (e) {
    console.log(`loginTest ERROR ${e.toString()}`)
    return {
      'statusCode': 500,
      'errorMessage': e.toString()
    }
  }
}

ctrl.registertest = async function(user) {
  try {
    util.saveUser(user)
    return {
      'statusCode': 200,
      'user': user
    }
  } catch (e) {
    console.log(`resgisterTest ERROR: ${e.toString()}`)
    return {
      'statusCode': 500,
      'errorMessage': e.toString()
    }
  }
}

ctrl.submittest = async function(story) {
  try {
    util.saveStory(story)
    return {
      'statusCode': 200,
      'story': story
    }
  } catch (e) {
    console.log(`resgisterTest ERROR: ${e.toString()}`)
    return {
      'statusCode': 500,
      'errorMessage': e.toString()
    }
  }
}

module.exports = ctrl;
