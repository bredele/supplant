var Supplant = require('../other'),
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
				console.time('without filter');
		var result = supplant.text('hello {{     name    }}', data);
				console.timeEnd('without filter');
		assert.equal(result, 'hello foo');
	});
	
});

describe("Filters", function() {
	var supplant, data;
	beforeEach(function() {
		data = {
			name: 'foo',
			brother: 'bar'
		};
		supplant = new Supplant();
	});

	it("should filter variable", function() {
		supplant.filter('hello', function(str) {
			return 'hello ' + str + '!';
		});
		console.time('filter');
		var result = supplant.text('{{ name } | hello}', data);
		console.timeEnd('filter');
		assert.equal(result, 'hello foo!');
	});
	
});


// describe("Expression substitution", function() {
// 	var supplant, data;
// 	beforeEach(function() {
// 		data = {
// 			name: 'foo',
// 			brother: 'bar'
// 		};
// 		supplant = new Supplant();
// 	});

// 	it("grouping and binary operators", function() {
// 		var result = supplant.text("{{name + 'and' + brother}}", data);
// 		assert.equal(result, 'foo and bar');
// 	});


// 	it("identifiers", function() {
// 		var result = supplant.text("{{name.length}}", data);
// 		assert.equal(result, '3');
// 	});
	
// 	it("comparators and ternary operators", function() {
// 		var result = supplant.text("{{name.length !== 1 ? 's' : ''}}", data);
// 		assert.equal(result, 's');
// 	});

// });

