'use strict';

let moment = require('moment');
let co = require('co');
let bluebird = require('bluebird');
let q = require('q');
let genit = require('genit');

let time = function *(promiseWrap) {
  let start = moment().millisecond()
  console.log(promiseWrap)
  yield promiseWrap();
  let stop = moment().millisecond()
  return stop - start;
}

co(function *() {
  let results = {};
  let test = function *() {
    for (let i = 0; i < 1000; i++) {}
  }

  results.bluebird = yield time(bluebird.coroutine(test));
  console.log(results.bluebird + 'ms');
  // results.q = yield time(q.spawn(test)());
  // console.log(results.q + 'ms');
  results.co = yield time(co.wrap(test));
  console.log(results.co + 'ms');

  console.log(results)
}).catch((e) => { console.log(e.stack) });
