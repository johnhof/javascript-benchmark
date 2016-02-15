'use strict'

module.exports.for = function *(collection, operation, returnResults, stopOnFalse) {
  let type   = Object.prototype.toString.call(collection);
  let result = [];

  if (typeof operation !== 'function') {
    throwError('Operation must be a function');
  }

  if (type === '[object Object]') {
    let keys = Object.keys(collection);
    for (let i = 0; i < keys.length; i++) {
      let key   = keys[i];
      let value = collection[key];
      let res   = yield operation.call(value, value, key);

      if (returnResults) { result.push(res); }
      if (stopOnFalse && res === false) { return returnResults ? result : undefined;}
    }

  } else if (type === '[object Array]') {
    for (let i = 0; i < collection.length; i++) {
      let current = collection[i];
      let res     = yield operation.call(current, current, i);

      if (returnResults) { result.push(res); }
      if (stopOnFalse && res === false) { return returnResults ? result : undefined;}
    }

  } else {
    throwError('Array or Object expected');
  }

  return returnResults ? result : undefined;
}

module.exports.filter = function *(collection, operation, returnResults, stopOnFalse) {
  let type   = Object.prototype.toString.call(collection);
  if (typeof operation !== 'function') {
    throwError('Operation must be a function');
  }

  if (type === '[object Object]') {
    let resultObj = {};
    let keys = Object.keys(collection);
    for (let i = 0; i < keys.length; i++) {
      let key   = keys[i];
      let value = collection[key];
      //if expression evaludate to true, then include the object in the result
      if(yield operation.call(value, value, key)){
         resultObj[key] = value;
      }
    }
    return resultObj;
  } else if (type === '[object Array]') {
    let resultArray = [];
    for (let i = 0; i < collection.length; i++) {
       //if expression evaluate to true, then include the element to the array
       if(yield operation.call(collection[i],collection[i])){
          resultArray.push(collection[i]);
       }
    }
    return resultArray;
  } else {
    throwError('Array or Object expected');
  }
}
var throwError = module.exports.throw = function (msg) {
  let e = new Error(msg);
  console.log(e.stack);
  throw e;
}


module.exports.defaults = function () {
  let result = {};
  let set    = arguments || [];
  for (let i = 0; i < set.length; i++) {
    let obj  = set[i];
    let keys = Object.keys(obj);
    for (let k = 0; k < keys.length; k++) {
      let key = keys[k];
      result[key] = obj[key];
    }
  }

  return result;
}
