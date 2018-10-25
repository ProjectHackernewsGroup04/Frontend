let axios = require('axios');
let _ = require('lodash')
let backendUrl = 'http://46.101.43.21:5000/api/'
let ctrl = {};

ctrl.login = async function(user) {
  try {
    let res = await axios.post(`${backendUrl}login`, user)
    for (var idx in res.data) {
      console.log(`The response is ${JSON.stringify(res.data[idx], null, 2)}`)
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
      console.log(`The response is ${JSON.stringify(res.data[idx], null, 2)}`)
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
    console.log(`The response is ${JSON.stringify(res.data, null, 2)}`)
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
    let res = await axios.delete(`${backendUrl}item/${id}`)
    console.log(`The response is ${JSON.stringify(res.data, null, 2)}`);
    return res.data
  } catch (e) {
    console.log(`delete() ERROR: ${e.toString()}`);
    return {
      'statusCode': 500,
      'errorMessage': e.toString()
    }
  }
}

ctrl.getStories = async function() {
  try {
    let res = await axios.get(`${backendUrl}item/all`)
    return res.data

  } catch (e) {
    console.log(`getStories ERROR: ${e}`)
  }
}

ctrl.addComment = async function(content) {
  try {
    console.log('BEFORE' + JSON.stringify(content, null, 2))
    let res = await axios.post(`${backendUrl}comment`, content)
    return res.data
  } catch (e) {
    console.log(`addComment() ERROR: ${e.toString()}`)
    return {
      'statusCode': 500,
      'errorMessage': e.toString()
    }
  }
}

module.exports = ctrl;
