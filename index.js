var indexOf = require('indexof'),
    trim = require('trim'),
    re = /\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\/|[a-zA-Z_]\w*/g;


var cache = {};


function props(str) {
  //benchmark with using match and uniq array
  var arr = [];
  str.replace(/\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\//g, '')
    .replace(/[a-zA-Z_]\w*/g, function(expr) {
      if(!~indexOf(arr, expr)) arr.push(expr);
    });
  return arr;
}


function fn(_) {
  return 'model.' + _;
}


function map(str) {
  var arr = props(str);
  return str.replace(re, function(_){
    if ('(' == _[_.length - 1]) return fn(_);
    if (!~indexOf(arr, _)) return _;
    return fn(_);
  });
}


/**
 * Scope statement with object.
 * 
 * @param  {string} statement
 * @return {Function}         
 */

function scope(str) {
  return new Function('model', 'return ' + map(str));
}



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
    if(!~indexOf(exprs, val)) exprs = exprs.concat(props(val));
  });
  return exprs;
};