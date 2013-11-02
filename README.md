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
  company : 'Github',
  status : 'awesome'
};

interpolation('my job at {github} is {status}', obj);
//my job at PetroFeed is awesome
```

## License

  MIT
