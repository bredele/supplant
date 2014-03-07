var Supplant = require('..'),
    assert = require('assert');

describe("Variable substitution", function() {
	var supplant, data;
	beforeEach(function() {
		data = {
			name: 'foo',
			brother: 'bar'
		};
		supplant = new Supplant();
	});

	it("should substitute one variable", function() {
		var result = supplant.text('hello {{ name }}', data);
		assert.equal(result, 'hello foo');
	});

	it("should substitute and empty string if varaible undefined", function() {
		var result = supplant.text('hello {{ something }}', data);
		assert.equal(result, 'hello ');
	});

	
	it("should substitute multiple variables", function() {
		var result = supplant.text('hello {{ name }} and {{ brother }}', data);
		assert.equal(result, 'hello foo and bar');
	});

	it("should ignore whitespaces", function() {
		var result = supplant.text('hello {{     name    }}', data);
		assert.equal(result, 'hello foo');
	});
	
});

describe('Substitution props', function(){

	var supplant;
	beforeEach(function() {
		supplant = new Supplant();
	});

  it('should return an array of the store attributes', function(){
    var str = "{{welcome}} My name is {{firstname}} {{lastname}} and I love {{country}}";
    var props = supplant.props(str);
    assert.equal('["welcome","firstname","lastname","country"]',JSON.stringify(props));
  });

  it('should return a uniq array', function(){
    var str = "My github is {{github}} {{github}} and I love {{country}}";
    var props = supplant.props(str);
    assert.equal('["github","country"]', JSON.stringify(props));
  });

  it('should return a uniq array of filtered expressions', function() {
    var str = "{{ github + country } | hello}";
    var props = supplant.props(str);
    assert.equal('["github","country"]', JSON.stringify(props));
  });

});

describe("Filters", function() {
	var supplant, data;
	beforeEach(function() {
		data = {
			name: 'foo',
			brother: 'bar',
			bool: false
		};
		supplant = new Supplant();

	});

	it("should filter variable", function() {
		supplant.filter('hello', function(str) {
			return 'hello ' + str + '!';
		});
		var result = supplant.text('{{ name} | hello}', data);
		assert.equal(result, 'hello foo!');
	});

	it('should apply multiple filters', function() {
		supplant.filter('hello', function(str) {
			return 'hello ' + str + '!';
		});
		supplant.filter('upper', function(str) {
			return str.toUpperCase();
		});
		var result = supplant.text('{{ name } | upper | hello }', data);
		assert.equal(result, 'hello FOO!');
	});

	it('shoud filter complex expression', function() {
		supplant.filter('hello', function(str) {
			return 'hello ' + str + '!';
		});
		//around 4times slower than normal filter
		var result = supplant.text("{{bool || 'brick'.toUpperCase()} | hello}", data);
		assert.equal(result,'hello BRICK!');
	});

  //NOTE: trigger an error?
	it("should do nothing if filter doesn't exist", function() {
		var result = supplant.text('{{ name} | hello}', data);
		assert.equal(result, 'foo');
	});
	
});


describe("Expression substitution", function() {
	var supplant, data;
	beforeEach(function() {
		data = {
			name: 'foo',
			brother: 'bar'
		};
		supplant = new Supplant();
	});

	it("grouping and binary operators", function() {
		var result = supplant.text("{{name + ' and ' + brother}}", data);
		assert.equal(result, 'foo and bar');
	});


	it("identifiers", function() {
		var result = supplant.text("{{name.length}}", data);
		assert.equal(result, '3');
	});
	
	it("comparators and ternary operators", function() {
		var result = supplant.text("{{name.length !== 1 ? 's' : ''}}", data);
		assert.equal(result, 's');
	});

});



