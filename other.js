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
	this.match = /\{\{([^}]+)\}\}/g;\
	this.filters = {};
}


Supplant.prototype.text = function(text, model) {
	return text.replace(this.match, function(_, expr) {
		return model[trim(expr)] || '';
	});
};

Supplant.prototype.filter = function(name, fn) {
	this.filters[name] = fn;
};
