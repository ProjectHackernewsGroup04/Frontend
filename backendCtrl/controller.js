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

//-----------------------------PLAYGROUND-------------------
ctrl.play = async function() {
  return {
    "statusCode": 200,
    "item": {
      "_id": {
        "$oid": "5bd6d3a3364377000cf930c7"
      },
      "title": "The new story",
      "url": "http://46.101.43.21:3000/",
      "text": "text stuff",
      "by": {
        "_id": {
          "$oid": "5bc62d8ecd11d1000b5415bd"
        },
        "username": "che",
        "password": {
          "$binary": "JDJiJDEyJEJVVXdLRmFiUC9IUHQ4WUg3TWFVMnUwTC5WUktOd1JFTU1rLzZNcVlOaVhFNGZiLm5OWFpT",
          "$type": "00"
        }
      },
      "id": "2afacc1307d7441183962d99ab1c0284",
      "descendants": 7,
      "kids": [{
        "_id": {
          "$oid": "5bd6d57f364377000cf930c8"
        },
        "parent": "2afacc1307d7441183962d99ab1c0284",
        "text": "First comment",
        "by": "che",
        "id": "945f8ca3c71a47619302c6e44db67625",
        "descendants": 7,
        "kids": [{
          "_id": {
            "$oid": "5bd6d586364377000cf930c9"
          },
          "parent": "945f8ca3c71a47619302c6e44db67625",
          "text": "2nd comment",
          "by": "che",
          "id": "0ba9eb20edb445aabc9cdaab277d8f45",
          "descendants": 7,
          "kids": [{
            "_id": {
              "$oid": "5bd6d591364377000cf930ca"
            },
            "parent": "0ba9eb20edb445aabc9cdaab277d8f45",
            "text": "3rd comment",
            "by": "che",
            "id": "674f46eb07a84d2fb5754c3702d43717",
            "descendants": 7,
            "kids": [],
            "score": 1,
            "time": {
              "$date": 1540806033699
            },
            "type": "comment",
            "deleted": false,
            "poll": 222,
            "parts": [],
            "title": "",
            "url": ""
          }],
          "score": 1,
          "time": {
            "$date": 1540806022885
          },
          "type": "comment",
          "deleted": false,
          "poll": 222,
          "parts": [],
          "title": "",
          "url": ""
        }],
        "score": 1,
        "time": {
          "$date": 1540806015202
        },
        "type": "comment",
        "deleted": false,
        "poll": 222,
        "parts": [],
        "title": "",
        "url": ""
      }],
      "score": 3,
      "time": {
        "$date": 1540805539454
      },
      "type": "story",
      "deleted": false,
      "poll": 222,
      "parts": [],
      "parent": -1
    }
  }
}

module.exports = ctrl;
