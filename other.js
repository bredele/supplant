var trim = require('trim');


/**
 * Expose 'Supplant'
 */

module.exports = Supplant;


/**
 * Supplant constructor.
 * @api public
 */

function Supplant() {
	//this.match = /\{\{([^}]+)\}\}/g;
	this.match = /\{\{([^}]+)\}([^}]+)*\}/g;
	this.filters = {};
}

//var exprs = expr.match(/([^|].*?)[^|](?=(?:\||$)(?!\|))/g);
//http://jsperf.com/split-vs-regexp-interpolation


Supplant.prototype.text = function(text, model) {
	var _this = this;
	///\{\{([^}]+)\}([^}]+)*\}/g
	//NOTE: regex could be better: ([^}]+)*  ??
	return text.replace(this.match, function(_, expr, filters) {
		//always split
		// var list = expr.match(/([^|].*?)[^|](?=(?:\||$)(?!\|))/g),
		//     val = model[trim(list.shift())] || '';
		// for(var i = 0, l = list.length; i < l; i++) {
		// 	val = _this.filters[trim(list[i])](val)
		// }
		// return val;
		
		//{{} | hello}
		var val = model[trim(expr)] || '';
		if(filters) {
			var list = filters.split('|');
			for(var i = 1, l = list.length; i < l; i++) {
				val = _this.filters[trim(list[i])](val);
			}
		}
		return val;
	});
};

Supplant.prototype.filter = function(name, fn) {
	this.filters[name] = fn;
};
