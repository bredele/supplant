Supplant
=============
[![Build Status](https://travis-ci.org/bredele/supplant.png?branch=master)](https://travis-ci.org/bredele/supplant)

  Variable substitution/interpolation on string. Look for expressions enclosed in {{ }} braces and substitutes its value with data.

  Built for **[brick](http://github.com/bredele/brick)** and **[datastore](http://github.com/bredele/datastore)**. Supplant is agnostic and can be used as a standalone template engine on both client and server sides. For example, supplant is used by **[marc](http://github.com/bredele/marc)** to make markdown a dynamic template engine.

## Installation

  with [component](http://github.com/component/component):

    $ component install bredele/supplant

  with [nodejs](http://nodejs.org):

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

// = > my name is Olivier
```

### supplant.props(str)

  return uniq identifiers

```js
subs.props('hello {{ name }} and {{other}}');
// => ['name', 'other']
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

// => hello github 
```

## License

  MIT
