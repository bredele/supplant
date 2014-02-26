var indexOf = require('indexof'),
    trim = require('trim'),
    props = require('./lib/props');


var cache = {};

function scope(statement){
  var result = props(statement, 'model.');
  return new Function('model', 'return ' + result);
};

/**
 * Variable substitution on the string.
 *
 * @param {String} str
 * @param {Object} model
 * @return {String} interpolation's result
 */

 module.exports = function(text, model){
	//TODO:  cache the function the entire text or just the expression?
  return text.replace(/\{\{([^}]+)\}\}/g, function(_, expr) {
  	if(/[.'[+(]/.test(expr)) {
  		var fn = cache[expr] = cache[expr] || scope(expr);
  		return fn(model) || '';
  	}
    return model[trim(expr)] || '';
  });
};


module.exports.attrs = function(text) {
  var exprs = [];
  text.replace(/\{\{([^}]+)\}\}/g, function(_, expr){
    var val = trim(expr);
    if(!~indexOf(exprs, val)) exprs.push(val);
  });
  return exprs;
};