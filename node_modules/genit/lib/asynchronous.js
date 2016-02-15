'use strict'

let helpers = require('./helpers');
let co      = require('co');

module.exports.parallel = function *(set) {
  yield function (done) {
    let setCount = set.length;
    let completion = 0;
    for (let i = 0; i < setCount; i ++) {
      process.nextTick(function () {
        co(function *() {
          yield set[i]();
          completion++;
          if (completion === setCount) { return done(); }
        }).catch(function (e) { throw e; });
      }, 0);
    }
  }
}
