interpolation
=============

Interpolation on string

## Installation

    $ component install bredele/interpolation

## API

### interpolation(str, store)

  return the interpolation of a string with an [store](https://github.com/bredele/store)-like object

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
