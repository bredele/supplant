
/**
 * Expose 'interpolation'
 *
 * @param {String} str
 * @param {Object} obj
 * @return {String} interpolation's result
 */

module.exports = function(str, obj){
  return str.replace(/\{([^}]+)\}/g, function(_, expr){
    return obj[expr];
  });
};