var indexOf = require('indexof');
var trim = require('trim');


/**
 * Variable substitution on the string.
 *
 * @param {String} str
 * @param {Object} model
 * @return {String} interpolation's result
 */

module.exports = function(text, model){
  var exprs = [];
  var str = text.replace(/\{([^}]+)\}/g, function(_, expr){
    var val = trim(expr);
    if(!~indexOf(exprs, val)) exprs.push(val);
    return model.get(val) || '';
  });
  return {
    text: str,
    props: exprs
  };
};
