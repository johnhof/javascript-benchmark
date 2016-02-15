# genit

Generator based utility belt

[![Build Status](https://travis-ci.org/fleekjs/genit.svg?branch=master)](https://travis-ci.org/fleekjs/genit) [![npm](https://img.shields.io/npm/l/express.svg)](https://github.com/fleekjs/genit/blob/master/LICENSE)  [![Dependencies](https://img.shields.io/david/fleekjs/genit.svg)](https://david-dm.org/fleekjs/genit)

`$ npm install genit`

# Key

- [Usage](#usage)
  - [Direct](#direct)
  - [Module Extention](#moduleextension)
- [Utilities](#utilities)
  - [Synchronous](#Synchronous)
    - [Mixed](#mixed-synchronous)
      - [each](#each)
      - [map](#map)
  - [Asynchronous](#Synchronous)
    - _Coming Soon_
  - [Miscellaneous](#miscellaneous)
    - [isGenerator](#isgenerator)
    - [inject](#inject)

# Usage

### Direct

```javascript
  'use strict'

  let genit  = require('genit');
  let fooFunc = function *(someSet) {
    return yield genit.map(someSet, function *(value, index) {
      return yield someGeneratorFunction('foo', 'bar', value);  
    });
  }
```

### Module Extension

```javascript
  'use strict'

  let _       = require('lodash');
  let genit  = require('genit');

  genit.inject(_);

  _.each(someSet, function () { }); //existing
  _.isGenerator(mightBeAGenerator) // injected
  function *() {
    return yield _.genit.map(someSet, function *(value, index) {  }); // injected to .genit property (name collision)
  }
```


# Utilities

## Synchronous

### Mixed Synchronous

#### `each`

- Parameters
  - [Required] [Mixed] - Collection to operate on,
  - [Required] [Generator Function] - Operation to perform
- Functionality
  - Iterates over every item in the collection (objec tor array)
  - Executes the operation on each item
- Returns
  - Undefined

```javascript
yield genit.each([one, two, three], function *(value, index) {
  console.log(index + ' = ' + this + ' ~ ' + value);
});
// console:
// 1 = one ~ one
// 2 = two ~ two
// 3 = three ~ three

yield genit.each({ one:'foo', two:'bar', three:'biz' }, function *(value, key) {
  console.log(key + ' = ' + this + ' ~ ' + value);
});
// console:
// one = foo ~ foo
// two = bar ~ bar
// three = biz ~ biz
```

#### `map`

- Parameters
  - [Required] [Mixed] - Collection to operate on,
  - [Required] [Generator Function] - Operation to perform
- Functionality
  - Iterates over every item in the collection (objec tor array)
  - Executes the operation on each item
  - Returned value is added to the resulting array
- Returns
  - Array of values returned

```javascript
let result = yield genit.filter([-1, -2, -3, 4, 5], function *(value) {
  return value > 0;
});
console.log(result);
// console:
// [4,5]

let result = yield genit.filter({ one:'foo', two:'bar', three:'biz' }, function *(value, key) {
  return value == "biz" || value == "bar";
});
console.log(result);
// console:
// {two : 'bar', three: 'biz'}
```
  console.log(index + ' = ' + this + ' ~ ' + value);
  return index * 2;
});
// console:
// 1 = one ~ one
// 2 = two ~ two
// 3 = three ~ three
console.log(result);
// console:
// [0, 1, 2]

let result = yield genit.each({ one:'foo', two:'bar', three:'biz' }, function *(value, key) {
  console.log(key + ' = ' + this + ' ~ ' + value);
  return value;
});
// console:
// one = foo ~ foo
// two = bar ~ bar
// three = biz ~ biz
console.log(result);
// console:
// ['foo', 'bar', 'biz']
```

## Asynchronous

**Coming Soon**

## Miscellaneous

#### `isGenerator`

- Parameters
  - [Required] [Mixed] - object to type check
- Functionality
  - Test whether or not a function is a generator
- Returns
  - Boolean of generator status

```javascript
let result = yield genit.isGenerator(function () {});
console.log(result); // => false

let result = yield genit.isGenerator(function *() {});
console.log(result); // => true
```

#### `inject`

- Parameters
  - [Required] [Object] - object to inject properties to
- Functionality
  - Inject properties into target Object
  - Collision in property name move genit property to the `.genit` property
- Returns
  - target object with injected properties

```javascript
  'use strict'

  let test   = { each : function () { return 'Original Each'; } };
  let genit = require('genit');

  genit.inject(test);

  console.log(test.each()); // => "Original Each"
  console.log(test.isGenerator(function () {})) // => "false"
  console.log(test.isGenerator(test.genit.each)) // => "true"
   ```

# Authors

- John Hofrichter
