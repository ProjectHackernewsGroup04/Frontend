let axios = require('axios');
let _ = require('lodash')
let backendUrl = 'http://0.0.0.0:5000/api/'
let ctrl = {};

ctrl.login = async function(un, pw) {
  try {
    let res = await axios.post(`${backendUrl}login`, {
      'username': un,
      'password': pw
    })
    for (var idx in res.data) {
      console.log(`The data is ${JSON.stringify(res.data[idx], null, 2)}`)
    }
    return res.data
  } catch (e) {
    console.log(`login ERROR: ${e}`)
  }
}

ctrl.register = async function(un, pw) {
  try {
    let res = await axios.post(`${backendUrl}register`, {
      'username': un,
      'password': pw
    })
    for (var idx in res.data) {
      console.log(`The data is ${JSON.stringify(res.data[idx], null, 2)}`)
    }
    return res.data
  } catch (e) {
    console.log(`register ERROR: ${e}`)
  }
}

//-----------------------------PLAYGROUND----------------------------------------------------

ctrl.getHomeContent = async function() {
  try {
    let res = await axios.get(backendUrl)
    for (var idx in res.data) {
      console.log(`The data is ${JSON.stringify(res.data[idx], null, 2)}`)
    }
    return res.data
  } catch (e) {
    console.log(`getHomeContent ERROR: ${e.toString()}`)
  }
}

ctrl.logintest = async function(name, password) {
  try {
      let users = require('../_temp/tempusers.json')
      let res = {}
      var user = _.find(users, {
        'username': name
      });
      if (user != null) {
        if (user.username === name && user.password === password) {
          res.statusCode = 200
          res.user = user
        } else {
          res.statusCode = 400
          res.errorMessage = 'Failed to Login'
        }
      } else {
        res.statusCode = 400
        res.errorMessage = 'UNKNOWN USER'
      }
      console.log('BEFORE');
      console.log(`${JSON.stringify(res)}`)
      return res
  } catch (e) {
    console.log(`loginTest ERROR ${e.toString()}`)
  }
}

ctrl.registertest = async function(name, password){
  try{
    let util = require('../_temp/util')
    util.saveUser({'username':name, 'password': password})
    return {'statusCode': 200, 'user':{'username':name, 'password': password}}
  }catch(e){
    console.log(`resgisterTest ERROR: ${e.toString()}`)
  }
}

module.exports = ctrl;
