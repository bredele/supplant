function parse(expr){
  return new Function('model', expr);
}

/**
 * Expose 'interpolation'
 *
 * @param {String} str
 * @param {Object} model
 * @return {String} interpolation's result
 */

module.exports = function(str, model){
  return str.replace(/\{([^}]+)\}/g, function(_, expr){
    var fn = parse('return '+ expr.trim());
    console.log(fn);
    var value = model.get(expr.trim());
    return value ? value : '';
  });
};