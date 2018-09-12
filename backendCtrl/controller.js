let axios = require('axios');
let backendUrl = 'http://localhost:8080/admin/new/replies'

let ctrl = {};

ctrl.getHomeContent = async function() {
  try {
    let res = await axios.get(backendUrl);
    for (var idx in res.data) {
      console.log(`The data is ${JSON.stringify(res.data[idx], null, 2)}`);
    }
    return res.data;
  } catch (e) {
    console.log(`something went wrong! ${e}`);
  }
}

module.exports = ctrl;
