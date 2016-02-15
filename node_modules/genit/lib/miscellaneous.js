'use strict'

module.exports.isGenerator = function (fn) {
  return !!(fn && (fn.constructor.name === 'GeneratorFunction'));
}
