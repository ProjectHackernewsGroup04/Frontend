var hbs = require('hbs');

hbs.registerHelper('if_eq', function(a, b, opts) {
  if (a != undefined && b != undefined) {
    a = a.toString();
    b = b.toString();
    if (a == b) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }

  } else {
    return opts.inverse(this);
  }
});

hbs.registerHelper('if_not', function(a, b, opts) {
  if (a != undefined && b != undefined) {
    a = a.toString();
    b = b.toString();
    if (a != b) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }

  } else {
    return opts.inverse(this);
  }
});

hbs.registerHelper("inc", function(value, options) {
  return parseInt(value) + 1;
});

hbs.registerHelper('var', function(varName, varValue, options) {
  options.data.root[varName] = varValue;
});

hbs.registerHelper('compare', function(lvalue, rvalue, options) {
  console.log(lvalue + ' == ' + rvalue);
  if (arguments.length < 3)
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

  var operator = options.hash.operator || "==";

  var operators = {
    '==': function(l, r) {
      return l == r;
    },
    '===': function(l, r) {
      return l === r;
    },
    '!=': function(l, r) {
      return l != r;
    },
    '<': function(l, r) {
      return l < r;
    },
    '>': function(l, r) {
      return l > r;
    },
    '<=': function(l, r) {
      return l <= r;
    },
    '>=': function(l, r) {
      return l >= r;
    },
    'typeof': function(l, r) {
      return typeof l == r;
    }
  }

  if (!operators[operator])
    throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);

  var result = operators[operator](lvalue, rvalue);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }

});

hbs.registerHelper('selected', function(a, b) {
  return a == b ? ' selected' : '';
});

hbs.registerHelper('mulCon', function(a, b, opts) {
  if (a == '' || b == '') {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

hbs.registerHelper("switch", function(value, options) {
  this._switch_value_ = value;
  var html = options.fn(this); // Process the body of the switch block
  delete this._switch_value_;
  return html;
});

hbs.registerHelper("case", function(value, options) {
  if (value == this._switch_value_) {
    return options.fn(this);
  }
});

let output = ''
let recursiveList = function(stuff, depth, storyid) {
  output += '<tr>';
  if (stuff) {
    if (stuff.length > 0) {
      for (idx in stuff) {
        output += `<td bgcolor=#fafaf0 class="faded-font">
                          <span style="padding-left:  ${depth+1}em;">
                          <div class="arrow-up"></div>
                          <a href="/user/${stuff[idx].by}">${stuff[idx].by}</a>
                          <span class="timeago" title="${stuff[idx].time}"></span></span><br>
                          <span style="padding-left:${depth+1}em;color: #000000">
                           &nbsp &nbsp${stuff[idx].text}<br>
                          <span style="padding-left:${depth+1}em;font-size:10px;">&nbsp &nbsp
                          <u><a href="/reply/${storyid}/${stuff[idx].id}">reply</a></u>
                          </span></span><br><br>`
        console.log('Append' + stuff[idx].id);
        if (stuff[idx].kids.length > 0) {
          kids = stuff[idx].kids
          output += '</td></tr>';
          recursiveList(kids, depth + 1, storyid)
        } else {
          output += '</td></tr>';
        }
      }
    }
  }
  return new hbs.SafeString(output);
}

hbs.registerHelper('listHelper', function(stuff, depth, storyid) {
  return recursiveList(stuff, depth, storyid)
})

hbs.registerHelper('refresh', function() {
  output = ''
})
