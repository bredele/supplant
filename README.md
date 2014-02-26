Supplant
=============

  > Variable substitution on the string.

It scans through the string looking for expressions enclosed in {{ }} braces. If an expression is found, use it as a key on the object, and if the key has a string value or number value, it is substituted for the bracket expression and it repeats.

## Installation

with component:

    $ component install bredele/supplant

with nodejs:

    $ npm install supplant

## API

### supplant(str, obj)

  return the interpolation of a string with an object.

## Example

### Basic

```js
supplant('my job at {{ company }} is {{ status }}', {
  company : 'Github',
  status : 'awesome'
});

//my job at Github is awesome
```

### Expressions

```js
supplant('{{ company.toUpperCase() }}', {
  company : 'github'
});

//GITHUB
```

## License

  MIT
