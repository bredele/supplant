interpolation
=============

Interpolation on string

## Installation

    $ component install bredele/interpolation

## API

### interpolation(str, obj)

  return the interpolation of a string with an object

## Example
```js
var interpolation = require('interpolation');

var obj = {
  company : 'PetroFeed',
  status : 'awesome'
};

interpolation('my job at {company} is {status}', obj);
//my job at PetroFeed is awesome
```

## License

  MIT
