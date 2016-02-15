'use strict'

module.exports = require('./helpers').defaults(
  require('./synchronous'),
  require('./asynchronous'),
  require('./miscellaneous'),
  require('./helpers')
);

module.exports.inject = function (target) {
  target = target || {};
  let keys   = Object.keys(module.exports);
  let length = keys.length;
  for (let i = 0; i < length; i++) {
    let key = keys[i];
    let val = module.exports[key];
    if (!val) {
      return;
    } else if (target[key]) {
      target.genit = target.genit || {};
      target.genit[key] = val;
    } else {
      target[key] = val;
    }
  }

  return target;
}
