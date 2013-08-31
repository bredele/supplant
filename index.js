// function parse(expr){
//   return new Function('model', expr);
// }

/**
 * Expose 'interpolation'
 *
 * @param {String} str
 * @param {Object} model
 * @return {String} interpolation's result
 */

module.exports.text = function(text, model){
  //TODO: refactor with attrs
  return text.replace(/\{([^}]+)\}/g, function(_, expr){
    //var fn = parse('return '+ expr.trim());
    var value = model.get(expr.trim());
    return value ? value : '';
  });
};

module.exports.attrs = function(text, model){
  var exprs = [];
  text.replace(/\{([^}]+)\}/g, function(_, expr){
    var value = expr.trim();
    if(!~exprs.indexOf(value)) exprs.push(value);
  });
  return exprs;
};