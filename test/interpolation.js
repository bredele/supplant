var interpolation = require('interpolation');

describe('string interpolation', function(){
  it('should support initialization', function(){
    var str = "This is a {petrofeed} interpolation";
    var obj = {
      petrofeed : 'awesome'
    };
    var result = interpolation(str, obj);
    assert('This is a awesome interpolation' === result);
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
