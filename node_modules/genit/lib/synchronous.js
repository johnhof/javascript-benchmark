'use strict'

let helpers = require('./helpers');


module.exports.each = function *(collection, operation) {
  yield helpers.for(collection, operation, false, true);
}

module.exports.map = function *(collection, operation) {
  return yield helpers.for(collection, operation, true);
}

module.exports.filter = function *(collection, operation) {
  return yield helpers.filter(collection, operation);
}
