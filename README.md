Supplant
=============

  > Variable substitution on the string.

It scans through the string looking for expressions enclosed in { } braces. If an expression is found, use it as a key on the object, and if the key has a string value or number value, it is substituted for the bracket expression and it repeats.

## Installation

    $ component install bredele/supplant

## API

### supplant(str, obj)

  return the interpolation of a string with an object.

## Example
```js
var supplant = require('supplant');

var obj = {
  company : 'Github',
  status : 'awesome'
};

supplant('my job at {company} is {status}', obj);
//my job at Github is awesome
```

## License

  MIT
