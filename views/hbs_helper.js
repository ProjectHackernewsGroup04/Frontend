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

hbs.registerHelper("inc", function(value, options)
{
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
