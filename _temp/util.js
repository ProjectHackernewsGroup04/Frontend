let fs = require('fs')
let util = {}

util.saveUser = function(user) {
  try {
    let users = require('./tempusers')
    users.push(user)
    let str = JSON.stringify(users, null, 2)
    fs.writeFile('./_temp/tempusers.json', `${str}`)
  } catch (e) {
    console.log('saveToLog ERROR:' + e.toString())
  }
}

util.saveStory = function(story) {
  try {
    let str = JSON.stringify(story, null, 2)
    fs.appendFileSync('./_temp/testdata.json', `,${str}`)
  } catch (e) {
    console.log('saveToLog ERROR:' + e.toString())
  }
}




module.exports = util
 