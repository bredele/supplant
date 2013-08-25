var interpolation = require('interpolation');
var assert = require('assert');


describe('string interpolation', function(){
  it('should support initialization', function(){
    var str = "This is a {petrofeed} interpolation";
    var obj = {
      petrofeed : 'awesome'
    };
    var result = interpolation(str, obj);
    assert('This is a awesome interpolation' === result);
  });

  it('should return an empty string if the interpolation doesn\'t exist', function(){
    var str = "This is a {petrofeed} interpolation";
    var obj = {
      other : 'awesome'
    };
    var result = interpolation(str, obj);
    assert('This is a interpolation' === result);
  });

  it('should ignore whitespace', function(){
    var str = "This is a { petrofeed   } interpolation";
    var obj = {
      petrofeed : 'awesome'
    };
    var result = interpolation(str, obj);
    assert('This is a awesome interpolation' === result);
  });

  it('should support mutiple interpolation', function(){
    var str = "This is a {petrofeed} interpolation made by {name}";
    var obj = {
      petrofeed : 'awesome',
      name : 'Bredele'
    };
    var result = interpolation(str, obj);
    assert('This is a awesome interpolation made by Bredele' === result);
  });
});
