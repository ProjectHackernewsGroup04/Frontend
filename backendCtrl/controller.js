let axios = require('axios');
let _ = require('lodash')
let backendUrl = 'http://backend:5000/api/'
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


ctrl.getStories = async function(maxval) {
  try {
    // console.log('MAKING REQUEST TO THIS: ' + `${backendUrl}item/pagination/from=0&to=${maxval}`);
    let res = await axios.get(`${backendUrl}item/pagination?from=0&to=${maxval}`)
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


ctrl.editStory = async function(story) {
    try {
        console.log(`THIS IS STORYy: ${JSON.stringify(story)}\n`)
        let res = await axios.put(`${backendUrl}edit/${story.id}`, story)
        console.log("requst sendes to the backend")
        return res.data
    } catch (e) {
        console.log(`edit() ERROR: ${e.toString()}`);
        return {
            'statusCode': 500,
            'errorMessage': e.toString()
        }
    }
}

module.exports = ctrl;
