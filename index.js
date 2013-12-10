var indexOf = require('indexof'),
    trim = require('trim'),
    scope = require('scope');


var cache = {};


/**
 * Variable substitution on the string.
 *
 * @param {String} str
 * @param {Object} model
 * @return {String} interpolation's result
 */

module.exports = function(text, model){
	//should we cache in the function the entire text or just the expression?
  return text.replace(/\{([^}]+)\}/g, function(_, expr){
  	if(/[.'[+(]/.test(expr)) {
  		var cb = cache[expr] = cache[expr] || scope(expr);
  		return cb(model.data) || '';
  	}
  	return model.get(trim(expr)) || '';
  });
};


module.exports.attrs = function(text) {
  var exprs = [];
  text.replace(/\{([^}]+)\}/g, function(_, expr){
    var val = trim(expr);
    if(!~indexOf(exprs, val)) exprs.push(val);
  });
  return exprs;
};