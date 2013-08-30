var interpolation = require('interpolation');
var assert = require('assert');

function Store(data){
  var _data = data;
  this.set = function(name, value) {
    _data[name] = value;
  };
  this.get = function(name){
    return _data[name];
  };
};


describe('string interpolation', function(){
  var store = null;
  beforeEach(function(){
    store = new Store({
      petrofeed : 'awesome'
    });
  });

  it('should support initialization', function(){
    var str = "This is an {petrofeed} interpolation";
    var result = interpolation(str, store);
    assert('This is an awesome interpolation' === result);
  });

  it('should return an empty string if the interpolation doesn\'t exist', function(){
    var str = "This is an {something} interpolation";
    var result = interpolation(str, store);
    assert('This is an  interpolation' === result);
  });

  it('should ignore whitespace', function(){
    var str = "This is an { petrofeed   } interpolation";
    var result = interpolation(str, store);
    assert('This is an awesome interpolation' === result);
  });

  it('should support mutiple interpolation', function(){
    var str = "This is an {petrofeed} interpolation made by {name}";
    store.set('name', 'Bredele');
    var result = interpolation(str, store);
    assert('This is an awesome interpolation made by Bredele' === result);
  });
});

describe('interpolation magic', function(){
  it('should do some math', function(){
    var str = "This is simple math: { a + b }";
    var obj = {
      a : 2,
      b : 3
    };
    var result = interpolation(str, obj);
    assert('This is simple math: 5' === result);
  });

  it('should manipulate a string', function(){
    var str = 'Hello { label.replace("w", "W") }';
    var obj = {
      label : 'world'
    };
    var result = interpolation(str, obj);
    assert('Hello World' === result);
  });
  
});