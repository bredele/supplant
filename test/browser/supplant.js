var supplant = require('supplant');
var assert = require('assert');

describe('string interpolation', function(){
  var store = null;
  beforeEach(function(){
    store = {
      test : 'awesome'
    };
  });

  it('should support initialization', function(){
    var str = "This is an {{test}} interpolation";
    var result = supplant(str, store);
    assert('This is an awesome interpolation' === result);
  });

  it('should return an empty string if the interpolation doesn\'t exist', function(){
    var str = "This is an {{something}} interpolation";
    var result = supplant(str, store);
    assert('This is an  interpolation' === result);
  });

  it('should ignore whitespace', function(){
    var str = "This is an {{ test   }} interpolation";
    var result = supplant(str, store);
    assert('This is an awesome interpolation' === result);
  });

  it('should support mutiple interpolation', function(){
    var str = "This is an {{test}} interpolation made by {{name}}";
    store.name = 'Bredele';
    var result = supplant(str, store);
    assert('This is an awesome interpolation made by Bredele' === result);
  });
});

// describe('handlebars', function() {
//   it("should return the content of simple handlebars", function() {
//     var str = "{{test}}";
//     var result = supplant(str, {test:'bredele'});
//     assert(bredele === result);
//   });

// });

describe('interpolation attrs utils', function(){

  var store = null;
  beforeEach(function(){
    store = {
      firstname : 'olivier',
      lastname:'wietrich',
      country: 'France',
      github:'bredele'
    };
  })

  it('should return an array of the store attributes', function(){

    var str = "{{welcome}} My name is {{firstname}} {{lastname}} and I love {{country}}";
    var props = supplant.attrs(str, store);
    console.log(props);
    assert('["welcome","firstname","lastname","country"]' === JSON.stringify(props));
  });

  it('should return a uniq array', function(){
    var str = "My github is {{github}} {{github}} and I love {{country}}";
    var props = supplant.attrs(str);
    assert('["github","country"]' === JSON.stringify(props));
  });

});

describe('interpolation magic', function(){
  it('should do some math', function(){
    var str = "This is simple math: {{ a + b }}";
    var obj = {
      a : 2,
      b : 3
    };
    var result = supplant(str, obj);
    assert('This is simple math: 5' === result);
  });

  it('should manipulate a string', function(){
    var str = 'Hello {{ label.replace("w", "W") }}';
    var obj = {
      label : 'world'
    };
    var result = supplant(str, obj);
    assert('Hello World' === result);
  });

  it('should return a uniq array of attributes to interpolate', function() {
    var str = 'Hello {{ label + (label - other)}}';
    console.time('benchmark');
    var arr = supplant.attrs(str);
    console.timeEnd('benchmark');
    console.log(arr);
    assert.equal(arr.length, 2);
    assert.equal(arr[0], 'label');
    assert.equal(arr[1], 'other');
  });
  
});