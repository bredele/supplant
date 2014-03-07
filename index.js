var indexOf = require('indexof'),
		trim = require('trim'),
		re = /\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\/|[a-zA-Z_]\w*/g,
		cache = {}; //should be in this?


/**
 * Expose 'Supplant'
 */

module.exports = Supplant;



/**
 * Get string identifiers.
 * 
 * @param  {String} str 
 * @return {Array} 
 * @api private
 */

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


/**
 * Prefix uniq identifiers with string
 * model.
 * 
 * @param  {String} str 
 * @api private
 */

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
 * @api private      
 */

function scope(str) {
  return new Function('model', 'return ' + map(str));
}


/**
 * Supplant constructor.
 * @api public
 */

function Supplant() {
	this.match = /\{\{([^}]+)\}([^}]*)\}/g;
	this.filters = {};
}


/**
 * Variable substitution on string.
 *
 * @param {String} text
 * @param {Object} model
 * @return {String}
 * @api public
 */

Supplant.prototype.text = function(text, model) {
	var _this = this;
	return text.replace(this.match, function(_, expr, filters) {
		var val;
		//is there fast regex? may be use or
		if(/[\.\'\[\+\(\|]/.test(expr)) {
			var fn = cache[expr] = cache[expr] || scope(expr);
			val = fn(model) || '';
		} else {
			val = model[trim(expr)] || '';
		}
		if(filters) {
			var list = filters.split('|');
			for(var i = 1, l = list.length; i < l; i++) {
				var filter = _this.filters[trim(list[i])];
				if(filter) val = filter(val);
			}
		}
		return val;
	});
};


/**
 * Get uniq identifiers from string.
 * example:
 *
 *    .props('{{olivier + bredele}}');
 *    //['olivier', 'bredele']
 *
 * @param {String} text
 * @return {Array}
 * @api public
 */

Supplant.prototype.props = function(text) {
  var exprs = [];
  //NOTE: may be cache expression for text
  text.replace(this.match, function(_, expr){
    var val = trim(expr);
    if(!~indexOf(exprs, val)) exprs = exprs.concat(props(val));
  });
  return exprs;
};


/**
 * Add substitution filter.
 * example:
 *
 *    .filter('hello', function(str) {
 *      return 'hello ' + str;
 *    });
 *
 * @param {String} name
 * @param {Function} fn
 * @return {Supplant}
 * @api public
 */

Supplant.prototype.filter = function(name, fn) {
	this.filters[name] = fn;
	return this;
};


//var exprs = expr.match(/([^|].*?)[^|](?=(?:\||$)(?!\|))/g);
//http://jsperf.com/split-vs-regexp-interpolation
//
//with split:
// var list = expr.split('|'),
//     val = model[trim(list.shift())] || '';
// for(var i = 0, l = list.length; i < l; i++) {
// 	val = _this.filters[trim(list[i])](val)
// }
// return val;

//{{} | hello}
