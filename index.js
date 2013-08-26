function parse(expr){
  return new Function('obj', expr);
}

/**
 * Expose 'interpolation'
 *
 * @param {String} str
 * @param {Object} obj
 * @return {String} interpolation's result
 */

module.exports = function(str, obj){
  return str.replace(/\{([^}]+)\}/g, function(_, expr){
    var fn = parse('return '+ expr.trim());
    console.log(fn);
    var value = obj[expr.trim()];
    return value ? value : '';
  });
};