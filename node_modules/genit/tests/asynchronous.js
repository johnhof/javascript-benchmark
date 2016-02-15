'use strict'

let mocha   = require('mocha');
let expect  = require('chai').expect;
let co      = require('co');
let genit  = require('../lib/genit');

function onErr (done) {
  return function (e) {
    // console.log(e.stack);
    done(e);
  };
}

describe('asynchronous', function () {
  let now  = function () { return new Date().getTime(); }
  let wait = function *(milliseconds) {
    var start = now();
    while ((now() - start) <= milliseconds) {}
    console.log('timeout')
    return;
  }
return; // Ignore until full support exists
  describe('.parallel', function () {
    let result  = [];
    it('should call a functionset asynchronously', function (done) {
      let timeoutTest = function (pushVal, timeout) {
        return function *() {
          console.log('starting ' + pushVal)
          yield wait(timeout);
          console.log('done timeout')
          result.push(pushVal)
          console.log('stopping ' + pushVal)
        }
      }
      co(function *() {
        let execSet = [timeoutTest(1, 10000), timeoutTest(2, 1), timeoutTest(3, 1)];
        yield genit.parallel(execSet);
        console.log(result);

        done();
      }).catch(onErr(done));
    })
  });
});
