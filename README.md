## Hackernews Frontend:
> This frontend is built in NodeJS environment that uses Express for routing and Handlebars as its templating engine.

##### Structure (modules definition):
- _index.js_ - the main module  that starts up the application.
- _routes_ - this where API routing is defined for the incoming HTTP requests.
- _public_ - static files such as images should be placed in here, it is tied directly to the applications directory.
- _backendCtrl_ - the controller.js uses axios which accesses REST Web Services / HTTP APIs in JavaScript, this will be used to communicate to the backend which would expect a list of JSON objects in response.
- _views_ - each page has corresponding `.hbs` file, you will be able to write html code and easily display the values in the JSON object like `{{res.data}}`. More help for the syntax here: https://handlebarsjs.com/

##### How to make a new page?
1. Create `.hbs` for the page template in the views. Remember, the `layout.hbs` is the main template for the whole application, meaning that all the new views/pages is just a part of the main layout. For Hackernews styling, it uses a table which requires you to enclose the new view with `<tr> ...<td>...</td>... </tr>` for each new content. For example,
```javascript
{{#each content}}
  <tr>
    <td bgcolor=#fafaf0>
      {{this.reply}}
    </td>
  </tr>
{{/each}}
```
_It goes through all the JSON objects in the content. `this` represents the current element and `reply` is the property name._

2. In `layout.hbs`, you'll find the headers which has the link for each page. Make sure that you will be using the same API pattern. See below.
```javascript
              <td style="line-height:12pt; height:10px;">
                <span class="pagetop">
                  <b class="hnname">
                    <a href="/">Hacker News</a>
                  </b>
                <!-- this represents the navbar -->
                  <a href="/newest">new</a> |
                  <a href="/newcomments">comments</a> |
                  <a href="/show">show</a> |
                  <a href="/ask">ask</a> |
                  <a href="/jobs">jobs</a> |
                  <a href="/submit">submit</a>
                </span>
              </td>
              <td style="text-align:right;padding-right:4px;">
                <span class="pagetop">
                  <a href="/login">login</a>
                </span>
              </td>
```

3. The new view will be rendered from `router.js`, make sure that it has a corresponding route/API. Render the page together with the JSON object/s by `res.render('test', {content: result});`

> REMEMBER: If the new route requires the user to be loggedin, include the authentication middleware like this:

```javascript
router.get('/home', authenticationMiddleware(), function(req, res) {...
```

4. Do your logics in the `controller.js`, make a request to the backend to get the data and all the transformations needed should be done only under this module. Here is a sample method that makes request to the backend using [axios](https://www.npmjs.com/package/axios):

```JavaScript
let axios = require('axios');
let _ = require('lodash')
let backendUrl = 'http://backend-app:5000/api/'
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
```

5. Execute this command to run and build the application together with its components(frontend, backend, helge-api, rabbitmq, and database):

```
vagrant@vagrant:/app$ docker-compose up --build
```

> _Locally: http://localhost:9000/_ <br>
_Deployed Version: http://46.101.43.21:3000/_
