Supplant
=============
[![Build Status](https://travis-ci.org/bredele/supplant.png?branch=master)](https://travis-ci.org/bredele/supplant)

  > Variable substitution on the string.

It scans through the string looking for expressions enclosed in {{ }} braces. If an expression is found, use it as a key on the object, and if the key has a string value or number value, it is substituted for the bracket expression and it repeats.

## Installation

with component:

    $ component install bredele/supplant

with nodejs:

    $ npm install supplant

## API

```js
var Supplant = require('supplant');
var subs = new Supplant();
```

### supplant.text(str, obj)

  return the interpolation of a string with an object.

```js
subs.text('my name is {{ name }}', {
  name : 'Olivier',
});

//my name is Olivier
```


### supplant.props(str)

  return uniq identifiers

```js
subs.props('hello {{ name }} and {{other}}'');
//['name', 'other']
```

## Advanced

### Expressions

```js
subs.text('{{ company.toUpperCase() }}', {
  company : 'github'
});

//GITHUB
```
  `supplant` supports grouping, binary operators, identifiers, comparators and ternary operators (see [test](https://github.com/bredele/supplant/blob/master/test/supplant.js)).

### Filters

```js
subs.filter('hello', function(str) {
  return 'hello ' + str;
});
subs.text('{{ company} | hello}', {
  company : 'github'
});

//hello github 
```

## License

  MIT
